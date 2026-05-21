# CLAUDE.md

Project guidance for Claude Code. Read this before making changes.

## Stack

- **Next.js 16** (App Router, Turbopack for dev & build)
- **React 19** + **TypeScript** (strict mode)
- **Zustand** for client state (with `persist` middleware)
- **Custom i18n** built on JSON locale files + a React Context provider (`i18next` is a dependency but the runtime uses the in-repo `LanguageProvider`)
- **Vanilla CSS Modules** + CSS custom properties — no Tailwind, no CSS-in-JS
- **GSAP**, **embla-carousel-react** for motion/carousel
- **Vercel Analytics** + **Speed Insights**

Scripts: `npm run dev` (turbopack), `npm run build` (turbopack), `npm run start`, `npm run lint`.

Path alias: `@/*` → `./src/*`.

## Folder structure

```
src/
  app/                          Next.js App Router. One folder per route.
    layout.tsx                  Root layout; wires all providers.
    page.tsx                    Home page (uses Hero).
    {route}/page.tsx            Route entry points (about, blog, contact, projects, services).
    sitemap.ts, robots.ts       SEO metadata routes.
  components/
    pages/{page}/               Page-scoped components (e.g. components/pages/services/ServiceCard.tsx).
    layout/                     App-wide layout primitives.
      navbar/ footer/ cards/ background/ loader/
      icons/{domain}/           SVG icon components grouped by domain (navbar, services, common).
  providers/                    React context providers (Global store, Theme, Language, Loading).
  store/                        Zustand store factory + hook.
  types/                        TypeScript domain types.
  lib/                          Pure utility helpers.
  locales/{lang}/{file}.json    i18n content (en, es).
  assets/styles/                CSS Modules + globals.css.
    globals.css                 CSS variables, theme tokens, resets.
    components/                 Mirrors src/components/ structure exactly.
```

**Style files mirror component paths.** A component at `src/components/pages/services/ServiceCard.tsx` has its styles at `src/assets/styles/components/pages/services/ServiceCard.module.css`. Keep this in sync when adding new components.

## Naming conventions

- **Components**: PascalCase files, named exports (e.g. `ServiceCard.tsx` exports `ServiceCard`).
- **Pages / Layouts**: `page.tsx`, `layout.tsx` (Next.js requirement; default export).
- **Providers**: PascalCase, suffix `Provider` (`ThemeProvider.tsx`).
- **Hooks / utilities**: camelCase (`useStore.ts`, `asTranslations.ts`).
- **Types**: PascalCase file matching the main exported type (`Service.ts`, `HomeSection.ts`).
- **Icon-key unions**: `*IconKey` suffix (`ServiceIconKey`, `LinkIconKey`).
- **Home page section types**: `*Section` suffix (`BlogSection`, `ServicesSection`).
- **CSS Module files**: match component name + `.module.css`.
- **Locale files**: lowercase namespaces (`common.json`, `nav.json`).
- **Routes**: lowercase, kebab-case if multi-word.

## Component patterns

- Default exports **only** for `page.tsx` / `layout.tsx`. Everything else uses **named exports**.
- Prefer arrow functions for components: `export const Name = (props: NameProps): React.JSX.Element => { ... }`.
- Props interface declared inline above the component as `interface ComponentNameProps`.
- Server components by default. Add `"use client"` only when the component needs hooks, browser APIs, or interaction (e.g. anything calling `useTranslations`, `useGlobalStore`, `useEffect`).
- Return type: `React.JSX.Element` for components; `Promise<…>` types when async.
- 4-space indentation, double quotes, semicolons, trailing commas (matches existing files).

## Page → component composition

Page files are thin. Pattern:

```tsx
// src/app/{route}/page.tsx
export default function RoutePage(): React.JSX.Element {
    return (
        <div className="container">
            <RouteHeader />
            <RouteContent />
        </div>
    );
}
```

Heavy logic lives in `src/components/pages/{route}/`. The `container` class is a global utility from `globals.css`.

## i18n

- Source of truth: `src/locales/{en,es}/{common,nav}.json`.
- `LanguageProvider` (in `src/providers/LanguageProvider.tsx`) loads JSON on language change and exposes them via context.
- Consume via `const { t, translations } = useTranslations();`.
  - `t("path.to.key")` returns a string (falls back to the key if missing).
  - `translations.common` is the loaded `common.json`; `translations.nav` is `nav.json` (typed as `NavConfig[]`).
- For typed access to nested objects, use `asTranslations<T>(translations.common?.something)` (in `src/lib/asTranslations.ts`).
- Adding a new language: drop matching JSON files into `src/locales/{lang}/`, then extend the `language` union in `src/store/GlobalStore.ts` and the `NavLanguageOption.value` union in `src/types/NavConfig.ts`.
- Adding a new locale namespace (a new JSON file beyond `common`/`nav`): extend the load step in `LanguageProvider` and the `CombinedTranslations` type there.

## State management (Zustand)

- Store factory in `src/store/GlobalStore.ts`. Persisted keys: `theme`, `language` (via `partialize`). `isLoading` is always reset to `true` on hydrate.
- Access via `useGlobalStore(selector)` from `@/providers/GlobalStoreProvider`. Always pass a selector to avoid over-subscribing.
- Provider must wrap any consumer; `RootLayout` already does this.

## Styling conventions

- **CSS Modules** scoped per component: `import styles from "@/assets/styles/components/.../X.module.css"` then `className={styles.foo}`.
- **Globals**: `globals.css` defines the CSS variable system and base resets. Two themes via `:root` (dark default) and `html.light`.
- **Theme switching**: `ThemeProvider` toggles the `light` / `dark` class on `<html>`. Always reference colors through CSS variables (`var(--foreground)`, `var(--card-background)`, etc.) so both themes work.
- **Container width / responsive**: use the global `.container` class for page wrappers; per-component breakpoints via `@media` inside the component's CSS module.
- **Animations**: re-use `var(--animation-slide-in-down)` and `var(--animation-reveal-element)` for staggered card reveals (drive timing with `--index` custom prop on the element — see `ServiceCard.module.css`).
- No utility classes, no global selectors outside `globals.css`.

## Icon pattern

Icons are React components that render inline SVG, accept `width`/`height` (default 32) plus rest props. They live under `src/components/layout/icons/{domain}/`:

- `navbar/` — navigation & socials
- `services/` — service category icons
- `common/` — reusable utility icons (link, download, etc.)

When a component needs to render an icon chosen by a string key from JSON, build a `Record<IconKey, JSX.Element>` lookup map and index into it. See `NavbarLinks.tsx` and `ServiceCard.tsx` for the canonical pattern. Add new icons by: (1) creating the SVG component, (2) extending the corresponding `*IconKey` union in `src/types/`, (3) adding it to the relevant lookup map.

## Bento card pattern (home grid)

The home page is a CSS-grid bento layout. Each card lives in `components/pages/home/*Card.tsx` and wraps `BentoCard` (`components/layout/cards/BentoCard.tsx`), passing a `gridArea` matching the section `type`. The `Hero` component switches on `section.type` from the loaded translations to render the right card. To add a new home section: define its type in `types/HomeSection.ts`, add the section data in `locales/{lang}/common.json`, build a new `*Card.tsx`, register it in `Hero.tsx`'s switch, and add a CSS grid area in the Hero stylesheet.

## SEO / metadata

- Root metadata lives in `src/app/layout.tsx`.
- Per-page metadata: export `metadata` (static) or `generateMetadata` (dynamic) from the route's `page.tsx`.
- Add new routes to `src/app/sitemap.ts` with appropriate `priority` / `changeFrequency`.

## What to avoid

- Don't introduce Tailwind, styled-components, or any new styling system — stick to CSS Modules + variables.
- Don't add new global CSS classes outside `globals.css`.
- Don't bypass `useGlobalStore` to read Zustand state.
- Don't hard-code text — route through the locale JSON files.
- Don't make components client components unless they need it.
- Don't import a CSS module from a path that doesn't mirror the component's path under `src/assets/styles/components/`.

## Branching

Feature work happens on a feature branch off `main` (e.g. `feat/blog`).

## Commit format

Single-line conventional commit, lowercase, no body, no footer:

```
type(scope): short description
```

- **type**: `feat`, `fix`, `docs`, `refactor`, `chore` (use the smallest accurate type).
- **scope**: one or two lowercase words naming the affected area (e.g. `services`, `about card`, `styles`, `translations`, `general` for cross-cutting).
- **description**: imperative, concise. If you must combine concerns, separate with `, also …` or `and …` on the same line.
- **No multi-line bodies. No `Co-Authored-By` footer. No emojis.**

Examples (from history):
- `feat(services): services card in home has new styles, also remove heading from projects card`
- `fix(about card): tweak hex animation timing`
- `docs(claude): add CLAUDE.md documenting stack and conventions`
