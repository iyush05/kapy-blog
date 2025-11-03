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
import { useRouter } from "next/navigation"
import { Timer } from 'lucide-react';

export default function ProfilePostCard({ CardData, categories }: { CardData: any, categories: any }) {
    const router = useRouter();
    const cardCategories = CardData.categories;
    const categoryNames = [];
    for (let i = 0; i < categories.length; i++) {
        if (cardCategories.includes(categories[i].id))
            categoryNames[i] = categories[i].name;
    }
    const content = parseBlogContent(CardData.content);
    const startContent = content.split(" ").slice(0, 12).join(" ");
    const readTime = estimateReadingTime(content);
    const fallbackImage = `/cover-${Math.floor(Math.random() * 4 ) + 1}.jpg`;
    const badgeVariants = ["lightBlue", "lightGreen", "lightYellow", "lightRed", "lightPurple", "lightPink", 'lightOrange', "lightTeal", "lightGray"] as const;
    const published = CardData.published;
    
    return (
        <div onClick={() => router.push(`/create-post/${CardData.slug}`)}>
            <Card className="w-[350px] h-full">
                <CardHeader>
                    <div className="relative w-full h-48 shadow-md flex items-center overflow-hidden rounded-2xl">
                        <Image
                            src={CardData.coverImage || fallbackImage}
                            alt="cover"
                            fill
                            className="object-center rounded-2xl shadow-md"
                            placeholder="empty"
                            loading="eager">
                        </Image>
                    </div>
                    <span className="text-purple-800 font-semibold text-xs">{CardData.author.name} &bull; {new Date(CardData.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}</span>
                    <CardTitle className="text-xl">{CardData.title}</CardTitle>
                    <CardDescription>{startContent}...</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between items-center">
                    <div className="flex space-x-2.5">
                        {categoryNames.map((category: string, index: number) => (
                            <Badge
                                variant={badgeVariants[index % badgeVariants.length]}
                                key={index}
                                className="border-sm shadow"
                            >
                                {category}
                            </Badge>
                        ))}
                    </div>
                    <Badge variant={(published) ? "greenSuccessBorder" : "destructive"}>{(published) ? "Published" : "Draft"}</Badge>
                    <div className="flex text-sm"><Timer size={18}/>{readTime}</div>
                </CardFooter>
            </Card>
        </div>
    )
}