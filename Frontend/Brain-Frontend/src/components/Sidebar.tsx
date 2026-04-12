import { Twitter } from "../icons/Twitter";
import { SideBarItem } from "./SideBarItem";
import { Youtube } from "../icons/Youtube";
import { BrainLogo } from "../icons/BrainLogo";
import { Linkedin } from "../icons/Linkedin";
import { Instagram } from "../icons/Instagram";
import Facebook from "../icons/Facebook";

export function Sidebar({ selectedType, setSelectedType }:any) {
    const menuItems = [
        { text: "Twitter", icon: <Twitter />, type: "twitter" },
        { text: "Youtube", icon: <Youtube />, type: "youtube" },
        { text: "LinkedIn", icon: <Linkedin />, type: "linkedin" },
        { text: "Instagram", icon: <Instagram />, type: "instagram" },
        { text: "Facebook", icon: <Facebook />, type: "facebook" },
    ];

    return (
        <div className="pl-6 h-screen bg-zinc-600 border-r w-72 fixed left-0 top-0">
            <div className="flex text-2xl pt-4 items-center justify-baseline font-semibold cursor-pointer" 
                 onClick={() => setSelectedType(null)}> {/* Reset filter on logo click */}
                <div className="pr-2 text-purple-600">
                    <BrainLogo/>
                </div>
                Brain2
            </div>
            <div className="pt-8 pl-4 font-semibold">
                {menuItems.map((item) => (
                    <SideBarItem 
                        key={item.text}
                        text={item.text} 
                        icon={item.icon} 
                        // Set active style if this is the selected type
                        active={selectedType === item.type}
                        onClick={() => setSelectedType(item.type)} 
                    />
                ))}
            </div>
        </div>
    );
}