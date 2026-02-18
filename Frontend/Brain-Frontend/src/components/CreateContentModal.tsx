import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter",
    Instagram = "instagram",
    Facebook = "facebook",
    LinkedIn = "Linkedin"
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
        {open && <div className="w-screen h-screen bg-slate-900 fixed top-0 left-0 opacity-90 flex justify-center">
            <div className="flex flex-col justify-center ">
                <span className="bg-slate-300 opacity-100 p-4 rounded">
                    <div className="flex justify-end cursor-pointer mb-2 p-1">

                        <div onClick={onClose}>
                            <CrossIcon />
                        </div>
                    </div>
                    <div>
                        <Input ref={titleRef} placeholder={"Title"} />
                        <Input ref={linkRef} placeholder={"Link"} />
                    </div>

                    <div className="mt-4">
                        <h1 className="font-bold mb-2">Select Type</h1>
                        <div className="relative">
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value as ContentType)}
                                className="w-full p-1 px-2 bg-white border-2 border-black rounded-md text-black outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer transition-all"
                            >
                                {Object.values(ContentType).map((option) => (
                                    <option key={option} value={option}>
                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
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


