import { DeleteIcon } from "../icons/DeleteIcon";
import { LinkLogo } from "../icons/LinkLogo";
import { ShareIcon } from "../icons/ShareIcon";
import { getFacebookEmbedUrl, getInstagramEmbedUrl, getLinkedInEmbedUrl, getYoutubeEmbedUrl } from "../utils/LinkModifier";

interface CardProps {
    title: string,
    link: string,
    type: "twitter" | "youtube" | "linkedin" | "instagram" | "facebook",
    onClick?: () => void;
}


export function Card({ title, link, type, onClick }: CardProps) {
    return <div>
        <div className="p-4 bg-amber-200 rounded-md shadow-md outline-slate-300 max-w-72 min-h-48 min-w-72 border-2 border-gray-700">
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

                {
                    type === "twitter" && (
                        <div className=" overflow-y-auto w-full">
                            <blockquote className="twitter-tweet">
                                <a href={link.replace("x.com", "twitter.com")}></a>
                            </blockquote>
                        </div>
                    )
                }

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
        </div>
    </div>
}