import type { ReactElement } from "react";

type Variants = "primary" | "secondary" | "danger"
interface ButtonProps {
    variant: Variants;
    size: "sm" | "md" | "lg" | "xsm";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    onError?: () => void;
    fullWidth?: boolean;
    isLoading?: boolean
}


    const variantStyles: Record<Variants, string> = {
    primary:
        "bg-blue-800 hover:bg-blue-700 active:bg-blue-700 text-white border border-blue-400/50 rounded-lg shadow-md shadow-blue-900/40 hover:shadow-blue-800/50 hover:-translate-y-[1px] active:translate-y-0 active:shadow-none",
    secondary:
        "bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-zinc-100 border border-zinc-600/60 rounded-lg shadow-md shadow-black/30 hover:-translate-y-[1px] active:translate-y-0 active:shadow-none",
    danger:
        "bg-red-700 hover:bg-red-700 active:bg-red-600 text-white text-bold border border-red-400/50 rounded-lg shadow-md shadow-red-900/40 hover:shadow-red-800/50 hover:-translate-y-[1px] active:translate-y-0 active:shadow-none",
};

const sizeStyles = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-6",
    "xsm": "py-1 px-1"
}


const defaultStyles = "flex inline-flex items-center justify-center"

export const Button = (props: ButtonProps) => {

    return <button
        onClick={props.onClick}
        className={`
    ${variantStyles[props.variant]} 
    ${defaultStyles} 
    ${sizeStyles[props.size]} 
    ${props.fullWidth ? " w-full" : ""}`}>

        {props.startIcon ? <div>{props.startIcon}</div> : null}

        <div className="pl-2 pr-2">
            {props.text}
        </div>

        {props.endIcon}
    </button>
} 