import BigPostCard from "./BigPostCard";

export default function RecentPosts({ CardData, categories }: { CardData: any, categories: any }) {
    const topPosts = CardData.data
    const [ first, second, third ] = topPosts;
    return (
        <div className="flex justify-center  bg-gray-50">
             <div className="">
                <BigPostCard CardData={first} categories={categories}/>
             </div>
        </div>
    )
}