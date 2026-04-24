interface InputProps {
    label?: string;
    placeholder: string;
    ref?: React.Ref<HTMLInputElement>;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string; 
}

export function Input({ label, placeholder, ref, type = "text", value, onChange, className }: InputProps) {
    return (
        <div className="w-full mb-4">
            {label && (
                <label className="block text-white text-sm font-medium mb-1.5 tracking-wide">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`
                        w-full h-10 px-4 py-3
                        bg-[#2b2b2b]
                        border border-[#3d3d3d]
                        rounded-md
                        text-white text-sm font-normal
                        placeholder:text-[#8c8c8c]
                        focus:outline-none
                        focus:border-[#555]
                        focus:bg-[#333]
                        transition-all duration-150 ease-in-out
                        pr-11 ${className}
                        `}
                    
                />
            </div>
        </div>
    );
}