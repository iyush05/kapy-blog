import BigPostCard from "./BigPostCard";
import { useRouter } from "next/navigation";

export default function RecentPosts({ CardData, categories }: { CardData: any, categories: any }) {
    const router = useRouter();
    const topPosts = CardData.data
    const [ first, second, third ] = topPosts;
    return (
        <div className="flex justify-center  bg-gray-50">
             <div onClick={() => router.push(`/post/${first.slug}`)}>
                <BigPostCard CardData={first} categories={categories}/>
             </div>
        </div>
    )
}