interface InputProps {
    placeholder:string;
    ref?:any
    type?:string
}

export function Input({placeholder,ref,type}:InputProps) {
    return <div>
        <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className="w-60 h-10 max-w-md px-4 py-2 bg-zinc-600 border-2 border-black rounded-md 
                   text-white placeholder-white
                   focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-gray-400 
                   transition-all duration-200 ease-in-out mb-2"
      />
    </div>
        
}