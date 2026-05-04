import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { BrainLogo } from "../icons/BrainLogo";
import { toast } from "sonner";


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
            //alert("Account Created Successfully.....");
            toast.success("Account Created Successfully.....")
            navigate("/signin");
        },
        onError: (error: any) => {
            const message = error.response?.data?.errors[0].message || "Login failed. Please try again.";
            //alert(message);
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
                    <h1 className="text-2xl font-syne font-bold text-white tracking-tight">Create Your Account</h1>
                    <p className="text-sm text-white/40 mt-1">Sign up to your account</p>
                </div>

                <div className="space-y-4">
                    {/* Fullname */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-widest text-white/40">Name</label>
                        <Input ref={fullnameRef} type="text" placeholder="Enter Name " />
                    </div>

                    {/* Username */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-widest text-white/40">Username</label>
                        <Input ref={usernameRef} type="text" placeholder="Enter Username" />
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-widest text-white/40">Password</label>
                        <Input ref={passwordRef} type="password" placeholder="Enter Password" />
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                        <Button
                            onClick={() => mutate()}
                            variant="primary"
                            size="sm"
                            text={isPending ? "Creating..." : "Create Account"}
                            fullWidth={true} />
                    </div>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-white/30">
                     Already have an account ? Please{' '}
                    <a href="./signin" className="text-[#3088fc] hover:text-[#4a98ff] font-medium transition-colors">
                       Sign in
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