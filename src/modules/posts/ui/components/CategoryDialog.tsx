"use client";
import { useEffect, useState } from "react";
import CategoryMultiSelect from "./CategoryMultiSelect";
import { trpc } from "@/trpc/react";

type Props = {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    selected: string[];
    onChange: (next: string[]) => void;
    options: string[];
};

export default function CategoryDialog({ open, onOpenChange, selected, onChange, options }: Props) {
    const [newCategory, setNewCategory] = useState("");
    const [localOptions, setLocalOptions] = useState<string[]>(options);
    useEffect(() => setLocalOptions(options), [options]);

    const utils = trpc.useUtils();
    const createCategory = trpc.category.create.useMutation({
        onSuccess: async (created) => {
            // Optimistically ensure it's present locally and selected
            const name = created?.name ?? newCategory.trim();
            if (name) {
                setLocalOptions((prev) => (prev.includes(name) ? prev : [...prev, name]));
                onChange(Array.from(new Set([...selected, name])));
            }
            setNewCategory("");
            // Refresh the server list so parent gets updated options
            await utils.category.list.invalidate();
        },
    });

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30" onClick={() => onOpenChange(false)} />
            <div className="relative z-10 w-full max-w-md rounded-lg border bg-white p-4 shadow-lg">
                <div className="mb-3">
                    <h2 className="text-base font-semibold">Select categories</h2>
                    <p className="text-xs text-gray-500">Choose existing or create a new one.</p>
                </div>

                <div className="space-y-2 mb-4">
                    <label className="text-sm font-medium">Existing categories</label>
                    <CategoryMultiSelect options={localOptions} value={selected} onChange={onChange} />
                </div>

                <div className="space-y-2 mb-4">
                    <label className="text-sm font-medium">Create new category</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 border p-2 rounded"
                            placeholder="e.g. Productivity"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            disabled={createCategory.isPending}
                        />
                        <button
                            type="button"
                            className="border px-3 py-2 rounded"
                            onClick={() => {
                                const name = newCategory.trim();
                                if (!name) return;
                                createCategory.mutate({ name });
                            }}
                            disabled={createCategory.isPending}
                        >
                            {createCategory.isPending ? "Adding..." : "Add"}
                        </button>
                    </div>
                </div>

                {selected.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                        {selected.map((c) => (
                            <span key={c} className="px-2 py-1 text-xs bg-muted rounded border">{c}</span>
                        ))}
                    </div>
                )}

                <div className="flex justify-end gap-2">
                    <button type="button" className="border px-3 py-2 rounded" onClick={() => onOpenChange(false)}>
                        Close
                    </button>
                    <button
                        type="button"
                        className="border px-3 py-2 rounded bg-black text-white hover:bg-slate-800"
                        onClick={() => onOpenChange(false)}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}


