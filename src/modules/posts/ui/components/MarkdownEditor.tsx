"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  setImageUrl: (v: string) => void;
}

export default function MarkdownEditor({ value, onChange, setImageUrl }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isBoldActive, setIsBoldActive] = useState(false);
  const [isItalicActive, setIsItalicActive] = useState(false);
  const [isUnderlineActive, setIsUnderlineActive] = useState(false);

  useEffect(() => {
    const handleSelectionChange = () => {
      try {
        setIsBoldActive(document.queryCommandState("bold"));
        setIsItalicActive(document.queryCommandState("italic"));
        setIsUnderlineActive(document.queryCommandState("underline"));
      } catch {}
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);

  const exec = (command: string, valueArg?: string) => {
    try {
      document.execCommand(command, false, valueArg);
    } catch {}
  };

  const focusEditor = () => {
    const el = editorRef.current;
    if (el) el.focus();
  };

  const toggleBold = () => {
    focusEditor();
    setIsBoldActive((v) => !v); 
    exec("bold");
    requestAnimationFrame(() => {
      try { setIsBoldActive(document.queryCommandState("bold")); } catch {}
    });
  };
  const toggleItalic = () => {
    focusEditor();
    setIsItalicActive((v) => !v); 
    exec("italic");
    requestAnimationFrame(() => {
      try { setIsItalicActive(document.queryCommandState("italic")); } catch {}
    });
  };
  const toggleUnderline = () => {
    focusEditor();
    setIsUnderlineActive((v) => !v);
    exec("underline");
    requestAnimationFrame(() => {
      try { setIsUnderlineActive(document.queryCommandState("underline")); } catch {}
    });
  };

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (el.innerHTML !== value) {
      el.innerHTML = value || "";
    }
  }, [value]);

  const handleImageUpload = async (file: File) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME
    const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", uploadPreset!); 

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { 
        method: "POST", 
        body: form 
      }
    );
    
    const data = await res.json();
    const url = data.secure_url; 
    setImageUrl(url);
    
    exec("insertImage", url);
    const html = editorRef.current?.innerHTML ?? value;
    onChange(html);
  };

  return (
    <div className="flex flex-col h-full border rounded-xl bg-white shadow-sm p-0">
      <div className="flex items-center gap-1 px-2 py-2 border-b sticky top-0 z-10 bg-white rounded-t-xl">
        <button
          aria-pressed={isBoldActive}
          title="Bold (Ctrl/Cmd+B)"
          onMouseDown={(e) => { e.preventDefault(); toggleBold(); }}
          className={`px-2.5 py-1.5 text-sm border rounded-md transition hover:bg-gray-100 active:scale-[.99] ${isBoldActive ? "bg-gray-200 border-gray-300 text-gray-900" : "border-gray-200 text-gray-700"}`}
        >
          <span className="font-semibold">B</span>
        </button>
        <button
          aria-pressed={isItalicActive}
          title="Italic (Ctrl/Cmd+I)"
          onMouseDown={(e) => { e.preventDefault(); toggleItalic(); }}
          className={`px-2.5 py-1.5 text-sm border rounded-md transition hover:bg-gray-100 active:scale-[.99] ${isItalicActive ? "bg-gray-200 border-gray-300 text-gray-900" : "border-gray-200 text-gray-700"}`}
        >
          <span className="italic">I</span>
        </button>
        <button
          aria-pressed={isUnderlineActive}
          title="Underline (Ctrl/Cmd+U)"
          onMouseDown={(e) => { e.preventDefault(); toggleUnderline(); }}
          className={`px-2.5 py-1.5 text-sm border rounded-md transition hover:bg-gray-100 active:scale-[.99] ${isUnderlineActive ? "bg-gray-200 border-gray-300 text-gray-900" : "border-gray-200 text-gray-700"}`}
        >
          <span className="underline">U</span>
        </button>

        <div className="h-5 w-px bg-gray-200 mx-1" />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) handleImageUpload(e.target.files[0]);
          }}
        />
        <button
          onMouseDown={(e) => { e.preventDefault(); fileInputRef.current?.click(); }}
          className="px-2.5 py-1.5 text-sm border rounded-md transition hover:bg-gray-100 active:scale-[.99] border-gray-200 text-gray-700"
          title="Insert image"
        >
          Insert image
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="w-full flex-1 min-h-0 p-4 overflow-auto outline-none focus:outline-none rounded-b-xl"
        onInput={(e) => {
          const html = (e.currentTarget as HTMLDivElement).innerHTML;
          onChange(html);
        }}
      />
    </div>
  );
}
