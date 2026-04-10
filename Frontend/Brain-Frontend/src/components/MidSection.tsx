
function MidSection() {
    return (
        <div className="w-full bg-zinc-950 py-1 border-t-2 border-t-blue-700">
            <div className="w-full overflow-hidden py-2 space-y-4 border-2 border-b-amber-300">

                {/* Row 1 — scrolls left */}
                <div className="flex gap-6 animate-marquee-right w-max">
                    {[...Array(2)].flatMap(() => [
                        ["10K+", "Saved items daily", "📦"],
                        ["5K+", "Active users", "👥"],
                        ["99.9%", "Uptime", "⚡"],
                        ["4.9★", "Average rating", "⭐"],
                        ["120+", "Countries reached", "🌍"],
                        ["85%", "User retention", "📈"],
                    ]).map(([num, label, icon], i) => (
                        <div
                            key={i}
                            className="flex flex-row items-center justify-center gap-2 bg-[#0e0e14] border border-white/[0.07] rounded-xl px-4 py-2 shadow-xl shadow-black/40 hover:border-[#3088fc]/30 hover:shadow-[#3088fc]/10 transition-all duration-300 group min-w-50"
                        >
                            <span className="text-3xl">{icon}</span>
                            <span className="font-syne text-4xl font-extrabold text-[#e8e6f0] group-hover:text-[#3088fc] transition-colors duration-300">{num}</span>
                            <span className="text-sm font-normal text-[#6662a0] tracking-wide text-center">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/*===================================================================== */}
            <div className="w-full flex flex-col items-center text-center px-4 py-8 max-w-4xl mx-auto">
                {/* Badge */}
                <div className="flex items-center gap-2 bg-[#3088fc]/10 border border-[#3088fc]/20 rounded-full px-4 py-1.5 mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3088fc] animate-pulse" />
                    <span className="text-xs font-semibold text-[#3088fc] tracking-widest uppercase">Your second brain, reimagined</span>
                </div>

                {/* Headline */}
                <h1 className="font-syne font-extrabold text-6xl md:text-7xl leading-[1.05] tracking-tight text-white mb-6">
                    Designed for{" "}
                    <span className="relative inline-block p-1">
                        <span className="text-[#1549e6]">✐ creatives</span>
                    </span>
                    <br />
                    built for{" "}
                    <span className="relative">
                        <span className="text-white">everyone !!!</span>
                        <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 6 Q50 0 100 4 Q150 8 200 2" stroke="#3088fc" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
                        </svg>
                    </span>
                </h1>

                {/* Subtext */}
                <p className="text-lg md:text-xl text-white/40 max-w-2xl leading-relaxed font-normal">
                    Brain2 is the best place to keep all your favorite{" "}
                    <span className="text-white/70">books</span>,{" "}
                    <span className="text-white/70">songs</span>,{" "}
                    <span className="text-white/70">articles</span>{" "}
                    or whatever else you come across while browsing.
                </p>

                {/* CTA Row */}
                <div className="flex items-center gap-4 mt-10">
                    <button className="bg-[#1549e6] hover:bg-[#4a98ff] text-white font-semibold text-md px-7 py-3 rounded-xl transition-all duration-200 active:scale-95">
                        Get started free →
                    </button>
                    <button className="text-md text-white/40 hover:text-white/70 transition-colors duration-200 font-medium">
                        See how it works ↓
                    </button>
                </div>

                {/* Social proof under CTA 
                <div className="flex items-center gap-2 mt-6">
                    <div className="flex -space-x-2">
                        {["A", "B", "C", "D"].map((l) => (
                            <div key={l} className="w-7 h-7 rounded-full bg-[#1a1a2e] border-2 border-[#07070b] flex items-center justify-center text-[10px] font-bold text-[#3088fc]">
                                {l}
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-white/30">
                        Joined by <span className="text-white/60 font-medium">5,000+</span> users this month
                    </p>
                </div> */}

            </div>
            {/*==================================================================== */}
            <div className="w-full px-8 py-2">
                <div className="grid grid-cols-4 gap-6 w-full">
                    {[
                        ["10K+", "Saved items daily"],
                        ["5K+", "Active users"],
                        ["10+", "Files uploaded"],
                        ["99.9%", "Uptime"],
                    ].map(([num, label]) => (
                        <div
                            key={num}
                            className="flex flex-col items-center justify-center gap-3 bg-[#0e0e14] border border-white/[0.07] rounded-2xl px-6 py-4 shadow-xl shadow-black/40 hover:border-[#3088fc]/30 hover:shadow-[#3088fc]/10 transition-all duration-300 group"
                        >
                            <span className="font-syne text-4xl font-extrabold text-[#e8e6f0] group-hover:text-[#3088fc] transition-colors duration-300">
                                {num}
                            </span>
                            <span className="text-base font-normal text-[#6662a0] tracking-wide">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/*=========================================================================*/}
            <div className="w-full flex flex-col items-center text-center px-4 py-10  mx-auto">
                <span className="text-xs font-semibold text-[#3088fc] tracking-widest uppercase">Simple Workflow</span>
                <div className="flex flex-col items-center text-center mb-2">

                    {/* Headline */}
                    <h2 className="font-sans font-bold text-5xl md:text-6xl leading-[1.08] tracking-tight text-[#f0eeff] max-w-2xl mb-4">
                        Three steps to a <br />
                        <span className="relative inline-block">
                            <span className="text-[#1549e6]">smarter second brain</span>
                        </span>
                    </h2>

                    {/* Subtext */}
                    <p className="text-lg text-white/30 max-w-md leading-relaxed font-light">
                        No complicated setup. No learning curve. Just{" "}
                        <span className="text-white/60">save</span>,{" "}
                        <span className="text-white/60">organize</span>, and{" "}
                        <span className="text-white/60">recall</span>.
                    </p>

                </div>
            </div>
        </div>
    )
}

export default MidSection