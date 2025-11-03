import { useState } from "react";
import PostCard from "./PostCard";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { CategoryData, PostData } from "@/trpc/react";

export default function AllPostCard({
  CardData,
  categories,
}: {
  CardData: PostData[];
  categories: CategoryData;
}) {
        const router = useRouter();
        const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

        const getCategoryNames = (cardCategories: number[]) => {
            const categoryNames: string[] = [];
            for (let i = 0; i < categories.length; i++) {
                if (cardCategories.includes(categories[i].id)) {
                    categoryNames.push(categories[i].name);
                }
            }
            return categoryNames;
        };

        const filteredPosts = selectedCategory
            ? CardData.filter((post) => {
                const postCategoryNames = getCategoryNames(post.categories);
                return postCategoryNames.includes(selectedCategory);
            })
            : CardData;

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
            <div className="max-w-7xl w-full">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                    <h2 className="text-2xl font-semibold">All Blog Posts</h2>
                    <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-lg font-semibold mr-2">Filter:</span>
                        <Badge
                            onClick={() => setSelectedCategory(null)}
                            className={`cursor-pointer ${
                                selectedCategory === null
                                ? "bg-blue-600 text-white"
                                : "bg-gray-400 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-200"
                            }`}
                        >
                            All
                        </Badge>
                        {categories.map((category) => (
                            <Badge
                                key={category.id}
                                onClick={() => setSelectedCategory(category.name)}
                                className={`cursor-pointer ${
                                selectedCategory === category.name
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-400 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-200"
                                }`}
                            >
                                {category.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {filteredPosts.map((data, index) => {
                    return (
                        <div
                        key={index}
                        className="overflow-hidden hover:shadow-md transition-shadow w-fit rounded-2xl h-[400px]"
                        onClick={() => router.push(`/post/${data.slug}`)}
                        >
                            <PostCard CardData={data} categories={categories} />
                        </div>
                    );
                })}
                {filteredPosts.length === 0 && (
                    <p className="col-span-full text-center text-gray-500">
                        No posts found for this category.
                    </p>
                )}
            </div>
        </div>
    </div>
  );
}
