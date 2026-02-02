import { ShareIcon } from "../icons/ShareIcon";

interface CardProps{
    title:string,
    link: string,
    type: "twitter" | "youtube"
}

export function Card({title, link, type}: CardProps) {
    return <div>
        <div className="p-4 bg-amber-200 rounded-md shadow-md outline-slate-300 max-w-72 min-h-48 min-w-72 border-2 border-gray-700">
            <div className="flex justify-between">
                <div className="flex items-center text-md font-medium">
                    <div className="text-red-500 pr-2">
                        <ShareIcon size="md" />
                    </div>
                    {title || "hello"}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-red-500">
                        <a href={link} target="_blank">
                        <ShareIcon size="md" />
                        </a>
                    </div>
                    <div className="text-red-500">
                        <ShareIcon size="md" />
                    </div>
                </div>
            </div>
            <div className="pt-4 rounded-xl">
               { type === "youtube" &&  <iframe className="w-full rounded-md" src={ link.replace("watch","embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> }

               {
                type === "twitter" && <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>
               }
            </div>
        </div>
    </div>
}