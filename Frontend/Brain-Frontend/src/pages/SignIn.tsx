import { Input } from "../components/Input"
import { Button } from "../components/Button"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { BrainLogo } from "../icons/BrainLogo";
import { toast } from "sonner";

export function SignIn() {

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

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
                toast.success("Logged In Successfully");
                navigate("/dashboard");
            } else {
                console.error("Token missing in response:", data);
                toast.error("Error: Token not received from server.");
            }
        },
        onError: (error: any) => {
            const message = error.response?.data?.errors[0].message || "Login failed. Please try again.";
            toast.error(message);
            console.log(error.response.data.errors[0].message);
        }
    });

    return <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#07070b] relative overflow-hidden">

        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#3088fc]/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 left-1/4 w-75 h-75 bg-[#3088fc]/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative w-full max-w-sm mx-auto px-4">
            {/* Card */}
            <div className="bg-[#0e0e14] border border-white/[0.07] rounded-2xl shadow-2xl shadow-black/60 p-8">

                {/* Header */}
                <div className="flex flex-col items-center mb-8">

                    {/* Logo mark */}
                    <div className="flex items-center justify-center gap-2.5 mb-6">
                        <div className="w-9 h-9 rounded-xl bg-[#3088fc] flex items-center justify-center shadow-lg shadow-[#3088fc]/30">
                            <BrainLogo className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-extrabold tracking-normal text-white/90">
                            Brain<span className="text-pink-500">2</span>
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-syne font-bold text-white tracking-tight">Welcome back</h1>
                    <p className="text-sm text-white/40 mt-1">Sign in to your account</p>
                </div>

                <div className="space-y-4">
                    {/* Username */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-widest text-white/40">Username</label>
                        <Input ref={usernameRef} type="text" placeholder="Username" />
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-widest text-white/40">Password</label>
                        <Input ref={passwordRef} type="password" placeholder="Password" />
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
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
                <p className="mt-6 text-center text-xs text-white/30">
                    New here?{' '}
                    <a href="./signup" className="text-[#3088fc] hover:text-[#4a98ff] font-medium transition-colors">
                        Create an account →
                    </a>
                </p>
            </div>

            {/* Bottom hint */}
            <p className="text-center text-xs text-white/15 mt-4">
                Secured by Brain2 · End-to-end encrypted
            </p>
        </div>
    </div>
}