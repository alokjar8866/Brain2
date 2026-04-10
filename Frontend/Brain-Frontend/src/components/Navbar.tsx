
import { BrainLogo } from '../icons/BrainLogo';


function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-100 border-b-blue-800 border-2 border-white/6 backdrop-blur-xl bg-gray-800/80 px-[5vw] flex items-center justify-between h-16 ">
      <div className="flex items-center gap-2.5">
        <div className="w-12 h-12 rounded-lg bg-[#1549e6] flex items-center justify-center font-syne font-extrabold text-base text-[#07070b]">
          <BrainLogo />
        </div>
        <span className="font-sans font-extrabold text-xl text-[#e8e6f0]">Brain2</span>
      </div>
      <div className="flex gap-9 items-center">
        {["Features", "How it Works", "FAQ"].map(item => (
          <a key={item} href="#" className="text-[#9994b8] no-underline font-sans text-sm font-bold tracking-[0.02em] transition-colors duration-200 hover:text-[#0e5ef3]">{item}</a>
        ))}
       <button className="group relative bg-[#1549e6] hover:bg-[#275dff] text-white font-syne font-bold text-sm tracking-widest uppercase px-5 py-2 rounded-full hover:shadow-[#3088fc]/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer border-none">
    <span className="flex items-center gap-2">
        Get Started
    </span>
</button>
      </div>
    </nav>
  )
}

export default Navbar;