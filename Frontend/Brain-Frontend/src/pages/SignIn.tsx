import { Input } from "../components/Input"
import { Button } from "../components/Button"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function SignIn(){

    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
     const navigate = useNavigate();

    async function signin(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
       
       
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
            username,
            password
        })
        const jwt = response.data.token;

        localStorage.setItem("token",jwt);
        navigate("/dashboard")
        alert("Logged In Successfully.....")
    }


    return <div className="h-screen w-screen flex justify-center items-center bg-gray-900">
        
        <div className="bg-gray-500 rounded-xl border min-w-48 p-4 bg gap-2 flex-col">
           <div className="justify-center items-center flex py-1 mb-3 rounded-md bg-blue-400">
            <label className="text-white font-semibold">LOG IN</label>
           </div>
            <Input ref={usernameRef} type="text" placeholder="Username" />
            <Input ref={passwordRef} type="password" placeholder="Password" />

            <div className="flex justify-center pt-4">
                <Button onClick={signin} variant="primary" size="sm" text="Login" fullWidth={true}/>
            </div>
            
        </div>
    </div>
}