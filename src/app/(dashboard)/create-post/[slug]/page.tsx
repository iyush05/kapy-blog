import { EditorView } from "@/modules/posts/ui/views/editor-view"


const Page = async ({params}: { params: { slug: string}}) => {
    const { slug } = await params
    return (
        <EditorView slug={slug} />
    )
}

export default Page;