"use client"
import AllPostCard from "../components/AllPost";
import { trpc } from "@/trpc/react";

export const PostView = () => {
    const { data, isLoading } = trpc.post.getAll.useQuery({ page: 1, limit: 5 });
    const categories  = trpc.category.list.useQuery();
    if (isLoading) return <p>Loading...</p>;
    if (!data || data.data.length === 0) return <p>No published posts.</p>;
    return (
        <>
            <AllPostCard CardData={data.data} categories={categories.data}/>
        </>
            

    )
}

export default PostView;