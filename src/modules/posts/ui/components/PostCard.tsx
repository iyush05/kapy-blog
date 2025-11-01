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

export default function PostCard({ CardData, categories }: { CardData: any, categories: any }) {
    const cardCategories = CardData.categories;
    let categoryNames = [];
    for (let i = 0; i < categories.length; i++) {
        if (cardCategories.includes(categories[i].id))
            categoryNames[i] = categories[i].name;
    }
    const content = parseBlogContent(CardData.content);
    const startContent = content.split(" ").slice(0, 14).join(" ");
    const readTime = estimateReadingTime(content);
    const fallbackImage = `/cover-${Math.floor(Math.random() * 4 ) + 1}.jpg`;
    return (
        <Card className="w-[350px] h-full">
            <CardHeader>
                <div className="relative w-full h-56 flex items-center overflow-hidden rounded-2xl">
                    <Image
                        src={CardData.coverImage || fallbackImage} 
                        alt="cover" 
                        height={200}
                        width={300}
                        className="object-center rounded-2xl"
                        placeholder="empty"
                        loading="eager">
                    </Image>
                </div>
                <span className="text-purple-800 font-semibold text-xs">{CardData.author.name} &bull; {new Date(CardData.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })}</span>
                <CardTitle>{CardData.title}</CardTitle>
                <CardDescription>{startContent}...</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between items-center">
                <div className="flex space-x-2.5">
                    {categoryNames.map((category: string, index: number) => (
                        <Badge key={index}>{category}</Badge>
                    ))}
                </div>
                <div className="flex text-sm"><Timer size={18}/>{readTime}</div>
            </CardFooter>

        </Card>
    )
}