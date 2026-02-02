import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";

enum ConentType {
    Youtube = "youtube",
    Twitter = "twitter"
}
//it is a controlled component
export function CreateContentModal({ open, onClose }) {



    return <div>
        {open && <div className="w-screen h-screen bg-slate-800 fixed top-0 left-0 opacity-60 flex justify-center">
                <div className="flex flex-col justify-center ">
                    <span className="bg-white opacity-100 p-4 rounded">
                        <div className="flex justify-end">
                            <div onClick = {onClose}>
                                 <CrossIcon/>
                            </div>
                        </div>
                        <div>
                            <Input placeholder={"Title"}/>
                            <Input placeholder={"Link"}/>
                        </div>
                        <div className="flex justify-center mt-2">
                            <Button variant="primary" text="Submit"/>
                        </div>
                        
                    </span>

                </div>
        </div>}
    </div>
}


function Input({onChange, placeholder}:{onChange:()=>void}){
    return <div>
        <input placeholder={placeholder} type="text" className="m-2 border-2 border-black rounded px-4 py-2" onChange={onChange} />
    </div>
}