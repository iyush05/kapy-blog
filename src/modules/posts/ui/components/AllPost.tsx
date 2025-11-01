import PostCard from "./PostCard"

export default function AllPostCard({ CardData, categories }: { CardData: any[], categories: any }) {
    return (
        <>
            <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CardData.map((data, index) => (
                            <div key={index} className="overflow-hidden hover:shadow-md transition-shadow w-fit rounded-2xl h-[436px]">
                                <PostCard CardData={data} categories={categories}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}