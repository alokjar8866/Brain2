export function Input({onChange, placeholder}:{placeholder:string; onChange:()=>void}){
    return <div>
        <input placeholder={placeholder} type="text" className="m-2 border-2 border-black rounded px-4 py-2" onChange={onChange} />
    </div>
}