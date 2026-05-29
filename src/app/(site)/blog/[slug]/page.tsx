import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostBackLink } from "@/components/pages/blog/PostBackLink";
import { PostView } from "@/components/pages/blog/PostView";
import { getAllPostSlugs, getPost } from "@/lib/blog";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const generateStaticParams = async (): Promise<
    Array<{ slug: string }>
> => {
    const all = await getAllPostSlugs();
    const uniqueSlugs = Array.from(new Set(all.map((p) => p.slug)));
    return uniqueSlugs.map((slug) => ({ slug }));
};

export const generateMetadata = async ({
    params,
}: PageProps): Promise<Metadata> => {
    const { slug } = await params;
    const post =
        (await getPost("en", slug)) ?? (await getPost("es", slug));
    if (!post) return { title: "Post not found" };
    return {
        title: `${post.title} — Ricardo Albarenque`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
        },
    };
};

export default async function BlogPostPage({
    params,
}: PageProps): Promise<React.JSX.Element> {
    const { slug } = await params;
    const [enPost, esPost] = await Promise.all([
        getPost("en", slug),
        getPost("es", slug),
    ]);

    if (!enPost && !esPost) notFound();

    return (
        <div className="container">
            <PostBackLink />
            <PostView enPost={enPost} esPost={esPost} />
        </div>
    );
}
