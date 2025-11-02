"use client"
import AllPostCard from "../components/AllPost";
import { trpc } from "@/trpc/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Loader from "@/components/loader"
import { useState } from "react";
import RecentPosts from "../components/RecentPosts";



export const PostView = () => {
    const [page, setPage] = useState(1);
    const limit = 6;
    const { data, isLoading } = trpc.post.getAll.useQuery(
        { page, limit },
        { 
            placeholderData: (previousData) => previousData,
        }
    );
    const categories  = trpc.category.list.useQuery();
    const { data: recentData } = trpc.post.getRecent.useQuery();

    if (isLoading) return(
        <div className="flex justify-center gap-3 pt-4">
            <Loader />
            <Loader />
            <Loader />
        </div>
    );
    if (!data || data.data.length === 0) return <p>No published posts.</p>;

    const totalPages = data.totalPages;

    return (
        <>  <div className="bg-gray-50 pl-4 py-4 md:pl-21 text-2xl font-semibold">
                Recent Post
            </div>
            <RecentPosts CardData={recentData} categories={categories.data}/>
            <AllPostCard CardData={data.data} categories={categories.data}/>
            <div className="py-2 bg-muted">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                            href="#"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            className={page === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                href="#"
                                isActive={page === i + 1}
                                onClick={() => setPage(i + 1)}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                            href="#"
                            onClick={() =>
                                setPage((p) => Math.min(totalPages, p + 1))
                            }
                            className={
                                page === totalPages ? "pointer-events-none opacity-50" : ""
                            }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
            

    )
}

export default PostView;