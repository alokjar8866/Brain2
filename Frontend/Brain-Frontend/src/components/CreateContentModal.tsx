import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Youtube } from "../icons/Youtube";
import { Instagram } from "../icons/Instagram";
import Facebook from "../icons/Facebook";
import { Linkedin } from "../icons/Linkedin";
import Xnew from "../icons/Xnew";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Instagram = "instagram",
    Facebook = "facebook",
    LinkedIn = "linkedin"
}

const typeConfig = {
    youtube: { emoji: <Youtube />, label: "YouTube" },
    twitter: { emoji: <Xnew />, label: "Twitter" },
    instagram: { emoji: <Instagram />, label: "Instagram" },
    facebook: { emoji: <Facebook />, label: "Facebook" },
    linkedin: { emoji: <Linkedin />, label: "LinkedIn" },
};

export function CreateContentModal({ open, onClose }) {
    const queryClient = useQueryClient();
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);

    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");

    const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const val = tagInput.trim().toLowerCase();
            if (val && !tags.includes(val)) setTags([...tags, val]);
            setTagInput("");
        }
    };

    const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag));

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const response = await axios.post(`${BACKEND_URL}/api/v1/content`,
                {
                    link: linkRef.current?.value,
                    title: titleRef.current?.value,
                    type,
                    tags
                },
                { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contents"] });
            setTags([]);
            setTagInput("");
            onClose();
        },
        onError: () => {
            alert("Failed to add content");
        }
    });

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-[#0e0e14] border border-white/[0.07] rounded-2xl shadow-2xl shadow-black/60 w-full max-w-md mx-4 overflow-hidden">

                {/* Top glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-[#3088fc]/10 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative p-8">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="font-sans font-bold text-xl text-white tracking-tight">
                                Add to Brain2
                            </h2>
                            <p className="text-xs text-white/30 mt-0.5">
                                Save a new piece of content
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-lg bg-white/4 border border-white/[0.07] flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 transition-all duration-200"
                        >
                            <CrossIcon />
                        </button>
                    </div>

                    <div className="space-y-5">

                        {/* Title input */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-widest text-white/30">
                                Title
                            </label>
                            <Input
                                ref={titleRef}
                                placeholder="Give it a name..."
                            //className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#3088fc]/50 focus:ring-1 focus:ring-[#3088fc]/20 outline-none transition-all"
                            />
                        </div>

                        {/* Link input */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-widest text-white/30">
                                Link
                            </label>
                            <Input
                                ref={linkRef}
                                placeholder="Paste your URL here..."
                            //className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#3088fc]/50 focus:ring-1 focus:ring-[#3088fc]/20 outline-none transition-all"
                            />
                        </div>

                        {/* Tags addding and management */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-widest text-white/30">Tags</label>
                            <div className="flex flex-wrap gap-1.5 bg-white/4 border border-white/8 rounded-xl px-3 py-2.5 focus-within:border-[#3088fc]/50 transition-all min-h-11">
                                {tags.map(tag => (
                                    <span key={tag} className="flex items-center gap-1 text-xs bg-[#3088fc]/15 text-[#3088fc] border border-[#3088fc]/20 rounded-full px-2.5 py-1">
                                        #{tag}
                                        <button
                                            onClick={() => removeTag(tag)}
                                            className="text-[#3088fc]/50 hover:text-[#3088fc] leading-none"
                                        >
                                            x
                                        </button>
                                    </span>
                                ))}
                                <input
                                    value={tagInput}
                                    onChange={e => setTagInput(e.target.value)}
                                    onKeyDown={addTag}
                                    placeholder={tags.length ? "" : "Add tags..."}
                                    className="bg-transparent text-sm text-white outline-none placeholder:text-white/20 flex-1 min-w-25"
                                />
                            </div>
                            <p className="text-[11px] text-white/20">
                                Press{" "}
                                <kbd className="bg-white/6 px-1.5 py-0.5 rounded text-white/30">Enter</kbd>
                                {" "}or{" "}
                                <kbd className="bg-white/6 px-1.5 py-0.5 rounded text-white/30">,</kbd>
                                {" "}to add a tag
                            </p>
                        </div>

                        {/* Type selector */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-widest text-white/30">
                                Content Type
                            </label>
                            <div className="grid grid-cols-5 gap-2">
                                {Object.values(ContentType).map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => setType(option)}
                                        className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border text-center transition-all duration-200 
                                            ${type === option
                                                ? "bg-[#3088fc]/15 border-[#3088fc]/50 shadow-lg shadow-[#3088fc]/10"
                                                : "bg-gray-600 border-white/[0.07] hover:border-white/20 hover:bg-white/6"
                                            }`}
                                    >
                                        <span className="text-lg">{typeConfig[option].emoji}</span>
                                        <span className={`text-[10px] font-semibold tracking-wide ${type === option ? "text-[#3088fc]" : "text-white/30"}`}>
                                            {typeConfig[option].label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />

                        {/* Submit */}
                        <button
                            onClick={() => mutate()}
                            disabled={isPending}
                            className="w-full bg-[#1549e6] hover:bg-[#257cec] disabled:opacity-50 disabled:cursor-not-allowed text-white font-sans font-bold text-sm py-3 rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                        >
                            {isPending ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <>Save to Brain2</>
                            )}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

