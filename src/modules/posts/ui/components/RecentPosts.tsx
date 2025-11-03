import BigPostCard from "./BigPostCard";
import { useRouter } from "next/navigation";

export default function RecentPosts({ CardData, categories }: { CardData: any, categories: any }) {
    const router = useRouter();

    if (!CardData?.data || CardData.data.length === 0) {
        return null; 
    }

    const topPosts = CardData.data
    const [ first ] = topPosts;
    return (
        <div className="flex justify-center bg-gray-50">
             <div onClick={() => router.push(`/post/${first.slug}`)} className="w-full md:w-[850px] md:h-fit">
                <BigPostCard CardData={first} categories={categories}/>
             </div>
        </div>
    )
}