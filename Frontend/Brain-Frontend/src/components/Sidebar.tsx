import { SideBarItem } from "./SideBarItem";
import { BrainLogo } from "../icons/BrainLogo";
import {
    BookMarked,
    FolderOpen,
    FileText,
    Video,
    Newspaper,
    Link2,
} from "lucide-react";

export function Sidebar({ selectedType, setSelectedType }: any) {
    const primaryItems = [
        { text: "All Bookmarks", icon: <BookMarked size={18} />, type: null },
        { text: "Unsorted", icon: <FolderOpen size={18} />, type: "unsorted" },
    ];

    const contentItems = [
        { text: "Notes", icon: <FileText size={18} />, type: "notes" },
        { text: "Videos", icon: <Video size={18} />, type: "videos" },
        { text: "Articles", icon: <Newspaper size={18} />, type: "articles" },
        { text: "Links", icon: <Link2 size={18} />, type: "links" },
    ];

    return (
        <div className="pl-2 h-screen bg-zinc-950 border-r w-65 fixed left-0 top-0">
            {/* Logo */}
            <div
                className="flex items-center gap-2.5 px-2 py-2 cursor-pointer group"
                onClick={() => setSelectedType(null)}
            >
                <div className="text-purple-500 transition-colors duration-150">
                    <BrainLogo />
                </div>
                <span className="text-xl font-bold tracking-normal text-white/90 group-hover:text-white transition-colors duration-150">
                    Brain<span className="text-pink-500 group-hover:text-purple-400 transition-colors duration-150">2</span>
                </span>
            </div>
            <div className="border-t border-white/10" />

            <div className="pt-2 pl-2 pr-2 flex flex-col gap-1">
                {/* Primary filters */}
                {primaryItems.map((item, index) => (
                    <SideBarItem
                        key={item.type}
                        text={item.text}
                        icon={item.icon}
                        active={selectedType === item.type}
                        onClick={() => setSelectedType(item.type)}
                        style={{ animationDelay: `${index * 60}ms` }}
                    />
                ))}

                {/* Divider */}
                <div className="my-1 border-t border-white/10" />

                {/* Content type filters */}
                {contentItems.map((item, index) => (
                    <SideBarItem
                        key={item.type}
                        text={item.text}
                        icon={item.icon}
                        active={selectedType === item.type}
                        onClick={() => setSelectedType(item.type)}
                        style={{ animationDelay: `${(primaryItems.length + 1 + index) * 60}ms` }}
                    />
                ))}
            </div>
        </div>
    );
}