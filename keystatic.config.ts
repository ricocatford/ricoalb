import { config, fields, collection } from "@keystatic/core";

const postSchema = (locale: "en" | "es") =>
    collection({
        label: `Posts (${locale.toUpperCase()})`,
        slugField: "title",
        path: `content/blog/${locale}/*/`,
        format: { contentField: "content" },
        entryLayout: "content",
        columns: ["title", "publishedAt"],
        schema: {
            title: fields.slug({
                name: { label: "Title", validation: { length: { min: 1 } } },
                slug: {
                    label: "Slug",
                    description: "Used in the post URL.",
                },
            }),
            publishedAt: fields.date({
                label: "Published at",
                defaultValue: { kind: "today" },
            }),
            excerpt: fields.text({
                label: "Excerpt",
                description: "Short summary shown in lists and meta tags.",
                multiline: true,
                validation: { length: { min: 1, max: 280 } },
            }),
            category: fields.text({
                label: "Category",
                description:
                    "Single grouping label shown in the blog aside (e.g. Architecture, React, Backend).",
                defaultValue: "Notes",
                validation: { length: { min: 1 } },
            }),
            tags: fields.array(
                fields.text({ label: "Tag" }),
                {
                    label: "Tags",
                    itemLabel: (props) => props.value,
                }
            ),
            coverImage: fields.image({
                label: "Cover image",
                directory: `public/images/blog/${locale}`,
                publicPath: `/images/blog/${locale}/`,
            }),
            content: fields.markdoc({
                label: "Content",
                options: {
                    image: {
                        directory: `public/images/blog/${locale}`,
                        publicPath: `/images/blog/${locale}/`,
                    },
                },
            }),
        },
    });

export default config({
    storage: { kind: "local" },
    ui: {
        brand: { name: "ricoalb" },
    },
    collections: {
        postsEn: postSchema("en"),
        postsEs: postSchema("es"),
    },
});
