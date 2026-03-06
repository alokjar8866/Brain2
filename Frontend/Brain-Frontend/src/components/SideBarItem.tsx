import type { ReactElement } from "react";

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
}