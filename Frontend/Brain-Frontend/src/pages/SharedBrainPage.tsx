import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Card } from "../components/Card";
import { BrainLogo } from "../icons/BrainLogo";

export function SharedBrainPage() {
    const { shareLink } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["shared", shareLink],
        queryFn: async () => {
            const res = await axios.post(`${BACKEND_URL}/api/v1/brain/shared/${shareLink}`);
            return res.data; // { username, content[] }
        }
    });

    if (isLoading || !data) return (
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-zinc-700 border-t-zinc-400 animate-spin" />
        </div>
    );

    if (isError) return (
        <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center gap-3">
            <p className="text-zinc-400 text-lg">This shared brain doesn't exist.</p>
            <a href="/home2" className="text-blue-400 text-sm hover:underline">Go home</a>
        </div>
    );

    return (
        <div className="min-h-screen bg-zinc-900">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <BrainLogo />
                        <div>
                            <p className="text-xs text-zinc-500 uppercase tracking-widest">Shared Brain</p>
                            <h1 className="text-white font-bold text-lg capitalize">
                                {data.username}'s Brain
                            </h1>
                        </div>
                    </div>
                    <span className="text-xs text-zinc-500">
                        {data.content.length} items · read only
                    </span>
                </div>
            </div>

            {/* Cards — pass no onEdit/onDelete so buttons are hidden */}
            <div className="max-w-6xl mx-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {data.content.map((item: any) => (
                        <Card
                            key={item._id}
                            type={item.type}
                            link={item.link}
                            title={item.title}
                            tags={item.tags}
                            date={new Date(item.createdAt).toLocaleDateString("en-US", {
                                year: "numeric", month: "short", day: "numeric"
                            })}
                        // no onEdit or onDelete = buttons don't render
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}