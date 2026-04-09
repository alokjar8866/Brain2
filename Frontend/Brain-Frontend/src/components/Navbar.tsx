
import { BrainLogo } from '../icons/BrainLogo';


function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-100 border-b border-white/6 backdrop-blur-xl bg-gray-800/80 px-[5vw] flex items-center justify-between h-16">
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-lg bg-[#3088fc] flex items-center justify-center font-syne font-extrabold text-base text-[#07070b]">
          <BrainLogo />
        </div>
        <span className="font-syne font-extrabold text-lg text-[#e8e6f0]">Brain2</span>
      </div>
      <div className="flex gap-9 items-center">
        {["Features", "How it Works", "FAQ"].map(item => (
          <a key={item} href="#" className="text-[#9994b8] no-underline text-sm font-['Syne',sans-serif]  font-bold tracking-[0.02em] transition-colors duration-200 hover:text-[#1a69fc]">{item}</a>
        ))}
        <button className="bg-[#4583f5] text-[#07070b] font-syne font-bold text-[12px] tracking-[0.04em] border-none cursor-pointer py-2 px-7 rounded-full transition-all duration-200 hover:bg-[#4583f5] hover:-translate-y-px hover:shadow-[0_0_30px_rgba(200,245,69,0.3)]">
          Get Started Here!
        </button>
      </div>
    </nav>
  )
}

export default Navbar;