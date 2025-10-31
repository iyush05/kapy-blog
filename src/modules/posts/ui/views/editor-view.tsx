"use client";
import { trpc } from "@/trpc/react";
import MarkdownEditor from "../components/MarkdownEditor"
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button"
import CategoryDialog from "../components/CategoryDialog";

export const EditorView = ({ slug }: { slug: string }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

    const { data: categoriesData } = trpc.category.list.useQuery();
    const categoryOptions = (categoriesData ?? []).map((c) => c.name);

    // Create a map to convert between names and IDs
    const categoryNameToId = new Map((categoriesData ?? []).map((c) => [c.name, c.id]));
    const categoryIdToName = new Map((categoriesData ?? []).map((c) => [c.id, c.name]));

    // Convert selected IDs to names for the dialog - filter out any undefined values
    const selectedCategoryNames = selectedCategories
        .map(id => categoryIdToName.get(id))
        .filter((name): name is string => name !== undefined && name !== "");

    // Handler to convert names back to IDs when dialog changes
    const handleCategoryChange = (names: string[]) => {
        const ids = names
            .map(name => categoryNameToId.get(name))
            .filter((id): id is number => id !== undefined);
        setSelectedCategories(ids);
    };

    const createMutation = trpc.post.create.useMutation({
        onSuccess: () => {
            toast.success("Post created successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
    const saveMutation = trpc.post.save.useMutation({
        onSuccess: () => {
            toast.success("Draft saved successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
    const removeMutation = trpc.post.remove.useMutation({
        onSuccess: () => {
            toast.success("Post deleted successfully");
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
	return (
		<div className="h-screen p-4 max-w-3xl mx-auto flex flex-col gap-4 overflow-hidden">
		  <input
			type="text"
			placeholder="Title"
			className="w-full border p-2 rounded"
			value={title}
			onChange={(e) => setTitle(e.target.value)}
		  />

		  <div className="flex-1 min-h-0 overflow-hidden">
			<MarkdownEditor value={content} onChange={setContent} setImageUrl={setImageUrl} />
		  </div>

		  <div>
			<Button variant="outline" onClick={() => setIsCategoryDialogOpen(true)}>
				Select categories
			</Button>
			<CategoryDialog
				open={isCategoryDialogOpen}
				onOpenChange={setIsCategoryDialogOpen}
				selected={selectedCategoryNames}
				onChange={handleCategoryChange}
				options={categoryOptions}
			/>
		  </div>
		  {selectedCategories.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{selectedCategories.map((id) => {
						const name = categoryIdToName.get(id);
						return name ? (
							<span key={id} className="px-2 py-1 text-xs bg-muted rounded border">
								{name}
							</span>
						) : null;
					})}
				</div>
		  )}

		<div className="flex gap-3 pt-1">
		  <Button onClick={() => createMutation.mutate({ title, content, published: true, slug, categories: selectedCategories, coverImage: imageUrl })}>
			Publish
		</Button>
		<Button variant="outline" onClick={() => saveMutation.mutate({ title, content, published: false, slug , categories: selectedCategories, coverImage: imageUrl })}>Save as draft</Button>
        <div className="flex-1" />
			<Button variant={"destructive"} onClick={() => removeMutation.mutate({ slug })}>Delete</Button>
		</div>
		</div>
	)
}