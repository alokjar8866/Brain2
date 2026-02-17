import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

//it is a controlled component
export function CreateContentModal({ open, onClose }) {
    
    const queryClient = useQueryClient();
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const response = await axios.post(`${BACKEND_URL}/api/v1/content`, {
                link: linkRef.current?.value,
                title: titleRef.current?.value,
                type
            }, 
            {
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            });
            return response.data;
        },

        onSuccess: () => {
            // This replaces your useEffect/refresh logic!
            queryClient.invalidateQueries({ queryKey: ['contents'] });
            onClose();
        },
        onError: () => {
            alert("Failed to add content");
        }
    });
    return <div>
        {open && <div className="w-screen h-screen bg-slate-800 fixed top-0 left-0 opacity-60 flex justify-center">
            <div className="flex flex-col justify-center ">
                <span className="bg-white opacity-100 p-4 rounded">
                    <div className="flex justify-end cursor-pointer">
                        <div onClick={onClose}>
                            <CrossIcon />
                        </div>
                    </div>
                    <div>
                        <Input ref={titleRef} placeholder={"Title"} />
                        <Input ref={linkRef} placeholder={"Link"} />
                    </div>

                    <div className="mt-4">
                       <h1 className="font-bold">Type</h1>
                        <div className="flex gap-1 justify-center pb-2">
                            <Button 
                            size="sm"
                            text="Youtube" 
                            variant={type === ContentType.Youtube ? "primary" : "secondary"} 
                            onClick={() => {
                                setType(ContentType.Youtube)
                            }}>
                            </Button>

                            <Button 
                            size="sm"
                            text="Twitter" 
                            variant={type === ContentType.Twitter ? "primary" : "secondary"} 
                            onClick={() => {
                                setType(ContentType.Twitter)
                            }}></Button>
                        </div>
                    </div>
                    <div className="flex justify-center mt-2">
                        <Button 
                        size="md"
                        onClick={() => mutate()} variant="primary" 
                        text={isPending ? "Submitting..." : "Submit"} 
                        />
                    </div>

                </span>

            </div>
        </div>}
    </div>
}


