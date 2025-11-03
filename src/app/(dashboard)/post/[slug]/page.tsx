import { BlogViewer } from "@/modules/posts/ui/views/blog-viewer";

const Page = async ({params}: { params: { slug: string}}) => {
    const { slug } = await params;
    return (
        <>
            <BlogViewer slug={slug}/>
        </>
    )
}

export default Page;