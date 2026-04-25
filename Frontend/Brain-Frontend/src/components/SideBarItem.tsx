/* import type { ReactElement } from "react";

interface SideBarItemProps {
    text: string;
    icon: ReactElement;
    active?: boolean; // Added optional active prop
    onClick?: () => void; // Added onClick to handle the filter change
}

export function SideBarItem({ text, icon, active, onClick }: SideBarItemProps) {
    return (
        <div 
            onClick={onClick}
            className={`flex items-center py-2 cursor-pointer rounded max-w-48 pl-4 mb-1 transition-all duration-200 
                ${active 
                    ? "bg-gray-700 border-l-4 border-blue-500 text-blue-400" 
                    : "hover:bg-gray-600 text-gray-200"
                }`}
        >
            <div className={`pr-2 ${active ? "text-blue-400" : "text-gray-400"}`}>
                {icon}
            </div>
            <div className="font-semibold">{text}</div>
        </div>
    );
} */


import type { ReactElement } from "react";

interface SideBarItemProps {
    text: string;
    icon: ReactElement;
    active?: boolean;
    onClick?: () => void;
    style?:React.CSSProperties
}

export function SideBarItem({ text, icon, active, onClick, style }: SideBarItemProps) {
    return (
            <div
            onClick={onClick}
            style={style}
            className={`group relative flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer select-none transition-all duration-150 ease-out animate-[fadeSlideIn_0.3s_ease_both]
             ${active ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/5 hover:text-gray-200"} `}>

            <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.75 rounded-r-full bg-blue-400 transition-all duration-150 ${active ? "h-5 opacity-100" : "h-0 opacity-0"}`} />

            {/* Icon */}
            <span className={`shrink-0 transition-all duration-150 ${active ? "text-blue-400" : "text-gray-500 group-hover:text-gray-300 group-hover:-translate-y-px"}`}>
                {icon}
            </span>

            {/* Label */}
            <span className="text-sm font-normal tracking-wide truncate">
                {text}
            </span>

            {/* Active dot */}
            {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
            )}
        </div>
    );
}