import type { ReactElement } from "react";

type Variants = "primary" | "secondary"
interface ButtonProps{
    variant: Variants;
    size : "sm"|"md"|"lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: ()=>void;
    onError?: ()=>void;
    fullWidth?:boolean;
    isLoading?:boolean
}

const variantStyles = {
    "primary": "bg-blue-900 rounded-lg border-2 border-white text-white font-semibold hover:bg-blue-700",
    "secondary": "bg-gray-900 rounded-lg border-2 border-white text-white font-semibold hover:bg-gray-700"
}

const sizeStyles = {
    "sm":"py-1 px-2",
    "md":"py-2 px-4",
    "lg":"py-4 px-6"
}

     
const defaultStyles = "flex inline-flex items-center justify-center"

export const Button = (props:ButtonProps) =>{

     return <button 
    onClick={props.onClick} 
    className={`
    ${variantStyles[props.variant]} 
    ${defaultStyles} 
    ${sizeStyles[props.size]} 
    ${props.fullWidth?" w-full":""}` }>

        {props.startIcon ? <div>{props.startIcon}</div>: null}
        
        <div className="pl-2 pr-2">
            {props.text}
        </div>
        {props.endIcon}
    </button> 
}


