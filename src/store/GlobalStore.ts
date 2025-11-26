import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type GlobalState = {
    theme: "dark" | "light";
    language: "en" | "es";
};

export type GlobalActions = {
    toggleTheme: () => void;
    setTheme: (theme: "dark" | "light") => void;
    setLanguage: (language: "en" | "es") => void;
};

export type GlobalStore = GlobalState & GlobalActions;

export const initGlobalStore = (): GlobalState => {
    const browserLanguage = typeof window !== "undefined" ? (navigator.language.startsWith("es") ? "es" : "en") : "en";
    return { theme: "dark", language: browserLanguage }
}

export const defaultInitState: GlobalState = {
    theme: "dark", language: "en"
}

export const createGlobalStore = (initState: GlobalState = defaultInitState) => {
    return createStore<GlobalStore>()(
        persist((set) => ({
            ...initState,

            toggleTheme: () =>
                set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),

            setTheme: (theme: "dark" | "light") => set({ theme }),

            setLanguage: (language: "en" | "es") => set({ language })
        }),
            {
                name: "global-storage", storage: createJSONStorage(() => localStorage), merge: (persisted, current) => ({
                    ...current,
                    ...defaultInitState,
                    ...(persisted as Partial<GlobalStore>),
                }),
            })
    )
}