import { CrossIcon } from "../icons/CrossIcon";
import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
    title: string,
    link: string,
    type: "twitter" | "youtube",
    onClick?:() => void;
}

const getYoutubeEmbedUrl = (url: string) => {
    // This regex captures the ID from youtube.com/watch?v=ID or youtu.be/ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;

    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
};

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
                    <div className="pr-2 text-red-500">
                        <a href={link} target="_blank">
                            <ShareIcon size="md" />
                        </a>
                    </div>
                    <div className="text-red-500 cursor-pointer hover:scale-110 transition-transform" onClick={onClick}>
                    <CrossIcon />
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
                        <div className="max-h-64 overflow-y-auto w-full">
                            <blockquote className="twitter-tweet">
                                <a href={link.replace("x.com", "twitter.com")}></a>
                            </blockquote>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
}