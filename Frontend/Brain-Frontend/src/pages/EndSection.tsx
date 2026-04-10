import { Organize } from "../icons/Organize"
import  Recall from "../icons/Recall"
import { SaveIcon } from "../icons/SaveIcon"

function EndSection() {
    return (
        <div className="w-full max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">

                {/* Connecting line between cards */}
                <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-linear-to-r from-[#3088fc]/0 via-[#3088fc]/30 to-[#3088fc]/0 z-0" />

                {[
                    {
                        step: "01",
                        icon: <SaveIcon size={"xl"}/>,
                        title: "Save Anything",
                        desc: "Capture articles, links, PDFs, notes, images or any content you find across the web in one click.",
                        highlights: ["Articles", "Links", "PDFs", "Images"],
                        color: "from-[#3088fc]/10 to-transparent",
                        border: "hover:border-[#3088fc]/40",
                    },
                    {
                        step: "02",
                        icon: <Organize size={"xl"}/>,
                        title: "Auto Organize",
                        desc: "Brain2 intelligently tags and categorizes everything you save so you never deal with messy folders again.",
                        highlights: ["Auto-tagging", "Smart folders", "AI labels"],
                        color: "from-[#6366f1]/10 to-transparent",
                        border: "hover:border-[#6366f1]/40",
                    },
                    {
                        step: "03",
                        icon: <Recall size={"xl"}/>,
                        title: "Recall Instantly",
                        desc: "Search across your entire second brain in milliseconds. Find exactly what you saved, whenever you need it.",
                        highlights: ["<100ms search", "Full-text", "AI recall"],
                        color: "from-[#3088fc]/10 to-transparent",
                        border: "hover:border-[#3088fc]/40",
                    },
                ].map(({ step, icon, title, desc, highlights, color, border }) => (
                    <div
                        key={step}
                        className={`relative flex flex-col gap-5 bg-[#0e0e14] border border-white/[0.07] ${border} rounded-2xl p-8 shadow-xl shadow-black/40 hover:shadow-black/60 transition-all duration-300 group overflow-hidden z-10`}
                    >
                        {/* Background glow */}
                        <div className={`absolute inset-0 bg-linear-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`} />

                        {/* Step number */}
                        <div className="flex items-center justify-between">
                            <span className="font-sans text-blue-600 text-lg font-extrabold tracking-[0.2em]  uppercase">
                                Step {step}
                            </span>
                            <span className="text-2xl p-2 justify-center align-middle w-12 h-12 bg-[#1549e6] rounded-full">{icon}</span>
                        </div>

                        {/* Title */}
                        <div>
                            <h3 className="font-sans font-extrabold text-2xl text-[#e8e6f0] tracking-tight group-hover:text-white transition-colors duration-200">
                                {title}
                            </h3>
                        </div>

                        {/* Divider */}
                        <div className="w-10 h-px bg-[#3088fc]/30 group-hover:w-20 group-hover:bg-[#3088fc]/60 transition-all duration-500" />

                        {/* Description */}
                        <p className="text-sm text-white/35 leading-relaxed font-light group-hover:text-white/50 transition-colors duration-200">
                            {desc}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-auto pt-2">
                            {highlights.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[11px] font-semibold text-[#3088fc]/70 bg-[#3088fc]/10 border border-[#3088fc]/15 rounded-full px-3 py-1 tracking-wide"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EndSection