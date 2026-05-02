import { DeleteIcon } from "../icons/DeleteIcon";
import { LinkLogo } from "../icons/LinkLogo";
import { getFacebookEmbedUrl, getGithubEmbedUrl, getInstagramEmbedUrl, getLinkedInEmbedUrl, getMediumEmbedUrl, getNotionEmbedUrl, getRedditEmbedUrl, getYoutubeEmbedUrl } from "../utils/LinkModifier";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube" | "linkedin" | "instagram" | "facebook" | "reddit" | "notion" | "medium" |"github";
    onClick?: () => void;
    tags?: { _id: string; name: string }[];
    date?: string;
}

export function Card({ title, link, type, onClick, tags, date }: CardProps) {
    const displayDate = date || new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        // Smaller max-width for dashboard density
        <div className="max-w-[320px] w-full h-full group">
            <div className="flex flex-col h-full p-3 bg-zinc-800 rounded-xl shadow-lg border border-zinc-700/50 hover:border-zinc-500 transition-all duration-300">

                {/* Header Section */}
                <div className="flex justify-between items-center mb-3 gap-3">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-md font-semibold text-zinc-100 truncate" title={title}>
                            {title || "Untitled Note"}
                        </h3>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                        <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-zinc-500 hover:text-blue-400 transition-colors p-1"
                        >
                            <LinkLogo size="lg" />
                        </a>
                        <button
                            onClick={onClick}
                            className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                        >
                            <DeleteIcon size="lg" />
                        </button>
                    </div>
                </div>
                {/* Content / Embed Section */}
                <div className="grow overflow-hidden rounded-lg bg-zinc-900/50 border border-zinc-700/30 mb-2 min-h-40">
                    {type === "youtube" && (
                        <iframe
                            className="w-full aspect-video"
                            src={getYoutubeEmbedUrl(link)}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}

                    {type === "twitter" && (
                        <div className="w-full max-h-60 overflow-y-auto scrollbar-hide px-1">
                            <blockquote className="twitter-tweet" data-theme="dark">
                                <a href={link.replace("x.com", "twitter.com")}></a>
                            </blockquote>
                        </div>
                    )}

                    {(type === "instagram" || type === "linkedin" || type === "facebook") && (
                        <iframe
                            className="w-full min-h-50 border-none"
                            src={type === "instagram" ? getInstagramEmbedUrl(link) :
                                type === "linkedin" ? getLinkedInEmbedUrl(link) :
                                    getFacebookEmbedUrl(link)}
                            allowTransparency={true}
                        ></iframe>
                    )}

                    {type === "reddit" && (
                        <iframe
                            className="w-full min-h-50 border-none"
                            src={getRedditEmbedUrl(link)}
                            sandbox="allow-scripts allow-same-origin allow-popups"
                            allowFullScreen
                        ></iframe>
                    )}

                    {type === "notion" && (
                        <iframe
                            className="w-full min-h-50 border-none"
                            src={getNotionEmbedUrl(link)}
                            allowFullScreen
                        ></iframe>
                    )}


                    {(type === "medium" || type === "github") && (
                        <div className="w-full h-full flex items-center justify-center p-4">
                            <a
                                href={type === "medium" ? getMediumEmbedUrl(link) : getGithubEmbedUrl(link)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors underline underline-offset-2"
                            >
                                {type === "medium" ? "📝 Read on Medium" : "💻 View on GitHub"}
                                <span className="text-zinc-500 text-xs truncate max-w-60">{link}</span>
                            </a>
                        </div>
                    )}

                </div>

                {/* Footer Section */}
                <div className="mt-auto">
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {tags.map((tag) => (
                                <span
                                    key={tag._id}
                                    className="text-[10px] font-medium px-2 py-0.5 bg-gray-500 text-white rounded border border-zinc-600/50 lowercase"
                                >
                                    #{tag.name}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-4 border-t border-zinc-700/50 pt-2.5 mt-2">


                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-zinc-100 font-medium whitespace-nowrap">
                                {displayDate}
                            </span>
                        </div>

                        <div className="flex items-center bg-zinc-700/30 px-2 py-0.5 rounded border border-zinc-700/50">
                            <span className="text-[10px] font-bold text-zinc-100 uppercase tracking-widest">
                                {type}
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}