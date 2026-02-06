import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export function SignUp(){

    const fullnameRef = useRef<HTMLInputElement>();
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    const navigate = useNavigate();


   async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const fullName = fullnameRef.current?.value;
        
        await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password,
            fullName
        })

        alert("Account Created Successfully.....");
        navigate("/signin")
    }

    return <div className="h-screen w-screen flex justify-center items-center bg-gray-900">
        <div className="bg-gray-500 rounded-xl border min-w-48 p-4 bg gap-2 flex-col">
           <div className="justify-center items-center flex py-1 mb-3 rounded-md bg-blue-400">
            <label className="text-white font-semibold">SIGN UP</label>
           </div>
           <Input type="text" ref={fullnameRef} placeholder="Full Name" />
            <Input type="text" ref={usernameRef} placeholder="Username" />
            <Input type="password" ref={passwordRef} placeholder="Password" />

            <div className="flex justify-center pt-4">
                <Button onClick={signup} variant="primary" size="sm" text="Create Account" fullWidth={true}/>
            </div>
            
        </div>
    </div>
}