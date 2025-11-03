"use client"
import { trpc } from "@/trpc/react"
import ProfileCard from "../component/ProfileCard"
import ProfilePostCard from "../component/ProfilePostCard";
import Loader from "@/components/loader";

export const ProfileView = () => {
    const { data, isLoading } = trpc.profile.getMany.useQuery();
    const categories  = trpc.category.list.useQuery();
    const totalPosts = data?.length;
    let parsedData
    if (data) {
        parsedData = data[0];
    }

    if (isLoading) return(
            <div className="flex justify-center gap-3 pt-4">
                <Loader />
                <Loader />
                <Loader />
            </div>
        );
    return (
        <>
            <ProfileCard
                name={parsedData?.author.name || ""}
                username={parsedData?.author.username || ""}
                email={parsedData?.author.email || ""}
                blogCount={totalPosts || 0}
            />
            <div className="text-2xl font-semibold pl-2 md:pl-16 mb-4">Recent Post</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {data?.map((post, index) => (
                <ProfilePostCard key={index} CardData={post} categories={categories.data}/>
            ))}
            </div>
        </>
    )
}