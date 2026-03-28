interface InputProps {
    placeholder: string;
    ref?: any;
    type?: string;
}

export function Input({ placeholder, ref, type }: InputProps) {
    return (
        <div className="w-full mb-2">
            <input
                ref={ref}
                type={type}
                placeholder={placeholder}
                className="w-full h-10 px-4 py-2 
                           bg-white/6 
                           border border-white/10 
                           rounded-xl 
                           text-white text-sm
                           placeholder:text-white/25
                           focus:outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20
                           transition-all duration-200 ease-in-out"
            />
        </div>
    );
}