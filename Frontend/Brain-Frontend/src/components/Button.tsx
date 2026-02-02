import type { ReactElement } from "react";

type Variants = "primary" | "secondary"
interface ButtonProps{
    variant: Variants;
    size : "sm"|"md"|"lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: ()=>void;
}

const variantStyles = {
    "primary": "bg-purple-600 text-black font-semibold border border-black",
    "secondary": "bg-gray-400 text-black font-semibold border border-black"
}

const sizeStyles = {
    "sm":"py-1 px-2",
    "md":"py-2 px-4",
    "lg":"py-4 px-6"
}


const defaultStyles = "h-8 w-38 rounded-md p-4 flex items-center justify-center"

export const Button = (props:ButtonProps) =>{
    return <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}` }>
        {props.startIcon ? <div>{props.startIcon}</div>: null}
        <div className="pl-2 pr-2">
            {props.text}
        </div>
        {props.endIcon}
    </button>
}


//<Button endIcon={"+"} size="md" variant="primary" text="submit" startIcon={"-"} onClick={()=>{}}/>