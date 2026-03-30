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
            console.log(error.response.data.errors[0].message);
        }
    });


    return <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-900">
        <div className="signin-card bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-10">
            {/* Header */}
            <div className="text-center mb-6">

                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    CREATE ACCOUNT
                </h1>
            </div>

            <div className="space-y-4">
                {/* full name input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Full Name</label>
                    <Input ref={usernameRef} type="text" placeholder="Full Name" />
                </div>
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
                    text={isPending ? "Creating..." : "Create Account"}
                    fullWidth={true} />
            </div>
            </div>
            {/* Footer */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Already have an account ? Please{' '}
                    <a href="./signin" className="text-gray-900 dark:text-gray-100 font-medium hover:underline">Sign in</a>
                </p>
            </div>
        </div>
    </div>
}