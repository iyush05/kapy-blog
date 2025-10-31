"use client";
import { useState } from "react";

type Props = {
    options: string[];
    value: string[];
    onChange: (next: string[]) => void;
    label?: string;
};

export default function CategoryMultiSelect({ options, value, onChange, label = "Categories" }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">{label}</label>
            <div className="relative inline-block">
                <button
                    type="button"
                    className="border px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    onClick={() => setIsOpen((v) => !v)}
                >
                    <span className="truncate">
                        {value.length > 0 ? `${value.length} selected` : "Select categories"}
                    </span>
                    <span className="text-xs opacity-60">▾</span>
                </button>
                {isOpen && (
                    <div className="absolute z-10 bottom-full mb-1 min-w-[12rem] border bg-white rounded-md shadow p-2 max-h-48 overflow-auto">
                        <ul className="space-y-1">
                            {options.map((c) => {
                                const checked = value.includes(c);
                                return (
                                    <li key={c} className="flex items-center gap-2 px-1 py-1 hover:bg-gray-50 rounded">
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    onChange(Array.from(new Set([...value, c])));
                                                } else {
                                                    onChange(value.filter((x) => x !== c));
                                                }
                                            }}
                                        />
                                        <label className="text-sm select-none">{c}</label>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="mt-2 flex items-center justify-between">
                            <button
                                type="button"
                                className="text-xs px-2 py-1 border rounded"
                                onClick={() => onChange([])}
                            >
                                Clear
                            </button>
                            <button
                                type="button"
                                className="text-xs px-2 py-1 border rounded"
                                onClick={() => setIsOpen(false)}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


