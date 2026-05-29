import { BlogLayout } from "@/components/pages/blog/BlogLayout";
import { getPosts } from "@/lib/blog";

export default async function BlogPage(): Promise<React.JSX.Element> {
    const [enPosts, esPosts] = await Promise.all([
        getPosts("en"),
        getPosts("es"),
    ]);

    return (
        <div className="container">
            <BlogLayout enPosts={enPosts} esPosts={esPosts} />
        </div>
    );
}
