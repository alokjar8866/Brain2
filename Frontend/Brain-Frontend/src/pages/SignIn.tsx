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
        <div className="signin-card bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-10">
            {/* Header */}
            <div className="text-center mb-6">

                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    LOG IN
                </h1>
            </div>

            <div className="space-y-4">
                {/* Email Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Username</label>
                    <Input ref={usernameRef} type="text" placeholder="Username" />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Password</label>
                    <div className="relative">
                        <Input ref={passwordRef} type="password" placeholder="Password" />
                    </div>
                </div>


                {/* Submit Button */}
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
            {/* Footer */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    New User? Let's create your account{' '}
                    <a href="./signup" className="text-gray-900 dark:text-gray-100 font-medium hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    </div>
}