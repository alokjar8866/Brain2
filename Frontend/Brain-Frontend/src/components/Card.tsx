import { DeleteIcon } from "../icons/DeleteIcon";
import { LinkLogo } from "../icons/LinkLogo";
import { ShareIcon } from "../icons/ShareIcon";
import { getFacebookEmbedUrl, getInstagramEmbedUrl, getLinkedInEmbedUrl, getYoutubeEmbedUrl } from "../utils/LinkModifier";

interface CardProps {
    title: string,
    link: string,
    type: "twitter" | "youtube" | "linkedin" | "instagram" | "facebook",
    onClick?: () => void;
    tags?: { _id: string; name: string }[];
}



export function Card({ title, link, type, onClick, tags }: CardProps) {
    
    return <div>
        <div className="p-4 bg-amber-200 rounded-md shadow-md border-2 border-gray-700 w-full min-h-48">
            <div className="flex justify-between">
                <div className="flex items-center text-md font-medium">
                    <div className="text-red-500 pr-2">
                        <ShareIcon size="md" />
                    </div>
                    {title || "Untitled"}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-red-500 hover:scale-110">
                        <a href={link} target="_blank">
                            <LinkLogo size="lg" />
                        </a>
                    </div>
                    <div className="text-red-500 cursor-pointer hover:scale-110 transition-transform" onClick={onClick}>
                        <DeleteIcon size="lg" />
                    </div>
                </div>
            </div>
            <div className="pt-4 rounded-xl">
                {type === "youtube" && (
                    <iframe
                        className="w-full rounded-md aspect-video"
                        src={getYoutubeEmbedUrl(link)}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                )}

                {type === "twitter" && (
                    <div className="w-full max-w-full overflow-hidden">
                        <blockquote
                            className="twitter-tweet"
                            data-width="260"
                            data-theme="light"
                        >
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    </div>
                )}

                {type === "instagram" && (
                    <iframe
                        className="w-full rounded-md border-none"
                        src={getInstagramEmbedUrl(link)}
                        allowTransparency={true}
                        scrolling="no"
                    ></iframe>
                )}

                {type === "linkedin" && (
                    <iframe
                        src={getLinkedInEmbedUrl(link)}
                        className="w-full rounded-md"
                        title="LinkedIn"
                    ></iframe>
                )}

                {type === "facebook" && (
                    <iframe
                        src={getFacebookEmbedUrl(link)}
                        className="w-full border-none rounded-md"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    ></iframe>
                )}
            </div>


            {/* Tags — add right here, after the embed block */}
            {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                    {tags.map((tag) => (
                        <span
                            key={tag._id}
                            className="text-[11px] text-[#1a5fd4] bg-[#3088fc]/20 border border-[#3088fc]/40 rounded-full px-2.5 py-0.5 tracking-wide font-medium"
                        >
                            #{tag.name}
                        </span>
                    ))}
                </div>
            )}


        </div>
    </div>
}