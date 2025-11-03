"use client"
import { trpc } from "@/trpc/react"
import PostViewer from "../components/PostViewer"
import { useState, useEffect } from "react"
import Loader from "@/components/loader"

export const BlogViewer = ({slug}: {slug: string}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { data: postData, isLoading } = trpc.post.getOne.useQuery({ slug });
    const post = Array.isArray(postData) ? postData?.[0] : postData;

    useEffect(() => {
        if (post?.content) {
            setContent(post.content);
        } else {
            setContent("");
        }
        if (post?.title) {
            setTitle(post.title);
        } else {
            setTitle("");
        }
    }, [post]);

    if (isLoading) {
        return (
            <div className="flex justify-center pt-24">
                <Loader />
            </div>
        )
    }
    return (
        <>
            <PostViewer title={title} content={content}/>
        </>
    )
}