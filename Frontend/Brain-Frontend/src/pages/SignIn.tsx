import { Input } from "../components/Input"
import { Button } from "../components/Button"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export function SignIn() {

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

        //const username = usernameRef.current?.value;
        //const password = passwordRef.current?.value;

        // 1. Define the Mutation
        const { mutate, isPending } = useMutation({
            mutationFn: async () => {
                const username = usernameRef.current?.value;
                const password = passwordRef.current?.value;

                const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                    username,
                    password
                });
                return response.data;
            },
            onSuccess: (data) => {
                // This 'data' is what the mutationFn returns (response.data)
                const jwt = data.token;

                if (jwt) {
                    localStorage.setItem("token", jwt);
                    navigate("/dashboard");
                    alert("Logged In Successfully!");
                } else {
                    console.error("Token missing in response:", data);
                    alert("Error: Token not received from server.");
                }
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
                    <label className="text-white font-semibold">LOG IN</label>
                </div>
                <Input ref={usernameRef} type="text" placeholder="Username" />
                <Input ref={passwordRef} type="password" placeholder="Password" />

                <div className="flex justify-center pt-4">
                    <Button 
                            onClick={() => mutate()} 
                            variant="primary" 
                            size="sm" 
                            text={isPending ? "Logging in..." : "Login"} 
                            fullWidth={true} 
                            isLoading={isPending}
                    />
                </div>

            </div>
        </div>
    }