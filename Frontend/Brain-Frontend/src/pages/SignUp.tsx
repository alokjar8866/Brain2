import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignUp(){
    return <div className="h-screen w-screen bg-graay-200 flex justify-center items-center bg-gray-400">
        <div className="bg-gray-300 rounded-xl border min-w-48 p-4">
            <Input placeholder="Username" />
            <Input placeholder="Password" />
            
            <div className="flex justify-center pt-4">
                <Button variant="primary" text="Signup" fullWidth={"true"}/>
            </div>
            
        </div>
    </div>
}