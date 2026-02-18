import { Twitter } from "../icons/Twitter";
import { SideBarItem } from "./SideBarItem";
import { Youtube } from "../icons/Youtube";
import { BrainLogo } from "../icons/BrainLogo";
import { Linkedin } from "../icons/Linkedin";
import { Instagram } from "../icons/Instagram";
import Facebook from "../icons/Facebook";

export function Sidebar(){
    return <div className="pl-6 h-screen bg-white border-r w-72 fixed left-0 top-0">
       <div className="flex text-2xl pt-4 items-center font-semibold">
        <div className="pr-2 text-purple-600">
            <BrainLogo/>
        </div>
        Brain2
       </div>
       <div className="pt-8 pl-4 font-semibold">
            <SideBarItem text="Twitter" icon={<Twitter/>}/>
            <SideBarItem text="Youtube" icon={<Youtube/>}/>
            <SideBarItem text="LinkedIn" icon={<Linkedin/>}/>
            <SideBarItem text="Instagram" icon={<Instagram/>}/>
            <SideBarItem text="Facebook" icon={<Facebook/>}/>
       </div>
    </div>
}