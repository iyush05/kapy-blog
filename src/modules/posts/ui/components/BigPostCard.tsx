import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { estimateReadingTime, parseBlogContent } from "@/lib/parser"
import { Timer } from 'lucide-react';

const randomNum = Math.floor(Math.random() * 4) + 1;
const fallbackImage = `/cover-${randomNum}.jpg`;

export default function BigPostCard({ CardData, categories }: { CardData: any, categories: any }) {
    const cardCategories = CardData.categories;
    const categoryNames = [];

    for (let i = 0; i < categories.length; i++) {
        if (cardCategories.includes(categories[i].id))
            categoryNames[i] = categories[i].name;
    }
    
    const content = parseBlogContent(CardData.content);
    const startContent = content.split(" ").slice(0, 70).join(" ");
    const readTime = estimateReadingTime(content);
    const badgeVariants = ["lightBlue", "lightGreen", "lightYellow", "lightRed", "lightPurple", "lightPink", 'lightOrange', "lightTeal", "lightGray"] as const;

    return (
        <div className="px-3">
            <Card className="w-full max-w-[850px] h-full hover:shadow-md px-4 sm:px-6 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 h-full">
                    <div className="col-span-3 h-full mt-0 md:mt-7">
                        <CardHeader className="h-full">
                            <div className="relative w-full h-full min-h-[250px] flex items-center overflow-hidden rounded-2xl shadow-md">
                                <Image
                                    src={CardData.coverImage || fallbackImage}
                                    alt="cover"
                                    fill
                                    className="object-cover rounded-2xl shadow-md"
                                    placeholder="empty"
                                    loading="eager"
                                />
                            </div>
                        </CardHeader>
                    </div>
                <div className="col-span-2 flex flex-col justify-between mr-0 md:mr-4 pb-4 md:pb-0">
                    <div>
                        <span className="text-purple-800 font-semibold text-xs sm:text-sm">
                            {CardData.author.name} &bull;{" "}
                            {new Date(CardData.updatedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </span>
                        <CardTitle className="text-xl sm:text-2xl mt-1">
                        {CardData.title}
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base mt-2">
                        {startContent}...
                        </CardDescription>
                    </div>
                    <CardFooter className="flex flex-wrap justify-between items-center mt-4">
                        <div className="flex flex-wrap gap-2">
                            {categoryNames.map((category: string, index: number) => (
                                <Badge
                                variant={badgeVariants[index % badgeVariants.length]}
                                key={index}
                                className="border-sm shadow text-xs sm:text-sm"
                                >
                                {category}
                                </Badge>
                            ))}
                        </div>
                        <div className="flex items-center text-xs sm:text-sm mt-2 md:mt-0">
                            <Timer size={16} className="mr-1" />
                            {readTime}
                        </div>
                    </CardFooter>
                </div>
            </div>
                </Card>
        </div>
)}