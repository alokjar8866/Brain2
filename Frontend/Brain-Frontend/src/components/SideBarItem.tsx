import type { ReactElement } from "react";

export function SideBarItem({text, icon}:{
    text:string;
    icon:ReactElement;
}){
    return <div className="flex items-center py-2 cursor-pointer
    hover:bg-gray-400 rounded max-w-48 pl-4">
           <div className="pr-2">{icon}</div>
           <div className="font-semibold">{text}</div>
    </div>
}