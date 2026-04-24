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
    youtube: { icon: <Youtube />, label: "YouTube", color: "#FF0000" },
    twitter: { icon: <Xnew />, label: "Twitter", color: "#1DA1F2" },
    instagram: { icon: <Instagram />, label: "Instagram", color: "#E1306C" },
    facebook: { icon: <Facebook />, label: "Facebook", color: "#1877F2" },
    linkedin: { icon: <Linkedin />, label: "LinkedIn", color: "#0A66C2" },
};

function detectPlatform(url: string): ContentType | null {
    try {
        const { hostname } = new URL(url);
        const host = hostname.replace("www.", "");
        if (host.includes("youtube.com") || host.includes("youtu.be")) return ContentType.Youtube;
        if (host.includes("twitter.com") || host.includes("x.com")) return ContentType.Twitter;
        if (host.includes("instagram.com")) return ContentType.Instagram;
        if (host.includes("facebook.com") || host.includes("fb.com")) return ContentType.Facebook;
        if (host.includes("linkedin.com")) return ContentType.LinkedIn;
    } catch { }
    return null;
}

export function CreateContentModal({ open, onClose }) {
    const queryClient = useQueryClient();
    const titleRef = useRef<HTMLInputElement>(null);

    const [link, setLink] = useState("");
    const [detectedType, setDetectedType] = useState<ContentType | null>(null);

    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setLink(val);
        setDetectedType(detectPlatform(val));
    };

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
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/content`,
                {
                    link,
                    title: titleRef.current?.value,
                    type: detectedType,
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
            setLink("");
            setDetectedType(null);
            onClose();
        },
        onError: () => {
            alert("Failed to add content");
        }
    });

    if (!open) return null;

    const detected = detectedType ? typeConfig[detectedType] : null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

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
                            <Input ref={titleRef} placeholder="Give it a name..." />
                        </div>

                        {/* Link input with platform badge */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-widest text-white/30">
                                Link
                            </label>
                            <div className="relative">
                                <Input
                                    value={link}
                                    onChange={handleLinkChange}
                                    placeholder="Paste your URL here..."
                                    className={detected ? "pr-28" : ""}
                                />
                                {detected && (
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#24242c] border border-white/[0.07]">
                                        <span className="[&>svg]:w-3.5 [&>svg]:h-3.5">{detected.icon}</span>
                                        <span className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
                                            {detected.label}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Detection status hint */}
                            <p className="text-[11px] text-white/20">
                                {link && !detected
                                    ? "⚠ Platform not recognised — check the URL"
                                    : detected
                                        ? `✓ Detected as ${detected.label}`
                                        : "Platform will be detected automatically"}
                            </p>
                        </div>

                        {/* Tags */}
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

                        {/* Divider */}
                        <div className="w-full h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />

                        {/* Submit */}
                        <button
                            onClick={() => mutate()}
                            disabled={isPending || !detectedType}
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