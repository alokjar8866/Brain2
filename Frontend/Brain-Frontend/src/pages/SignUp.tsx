import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";


export function SignUp() {

    const fullnameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {

            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            const fullName = fullnameRef.current?.value;

            const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                fullName,
                username,
                password
            });
            return response.data;
        },
        onSuccess: () => {
            alert("Account Created Successfully.....");
            navigate("/signin");
        },
        onError: (error: any) => {
            const message = error.response?.data?.msg || "Login failed. Please try again.";
            alert(message);
        }
    });


    return <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-900">
        <div className="mb-30 p-4 bg-gray-800 border border-black font-semibold text-white rounded-2xl">
            <h3 className="text-4xl">Welcome To Brain2 - Your Second Brain</h3>
        </div>
        <div className="bg-gray-500 rounded-xl border min-w-48 p-4 bg gap-2 flex-col">
            <div className="justify-center items-center flex py-1 mb-3 rounded-md bg-blue-400">
                <label className="text-white font-semibold">SIGN UP</label>
            </div>
            <Input type="text" ref={fullnameRef} placeholder="Full Name" />
            <Input type="text" ref={usernameRef} placeholder="Username" />
            <Input type="password" ref={passwordRef} placeholder="Password" />

            <div className="flex justify-center pt-4">
                <Button
                    onClick={() => mutate()}
                    variant="primary"
                    size="sm"
                    text={isPending ? "Creating..." : "Create Account"}
                    fullWidth={true} />
            </div>

        </div>
    </div>
}