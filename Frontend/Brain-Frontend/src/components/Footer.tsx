import { BrainLogo } from "../icons/BrainLogo"

function Footer() {
    return <footer className="w-full bg-[#07070b] border-t border-white/6 relative overflow-hidden">

        {/* Background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-70 bg-[#3088fc]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-8 pt-12 pb-4">

            {/* Top grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">

                {/* Brand col */}
                <div className="col-span-2 flex flex-col gap-5">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#1549e6] flex items-center justify-center">
                            <BrainLogo className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-syne font-extrabold text-xl text-white tracking-tight">Brain2</span>
                    </div>

                    {/* Tagline */}
                    <p className="text-sm text-white/30 leading-relaxed max-w-xs font-light">
                        Your second brain for everything you find on the internet. Save, organize, and recall — instantly.
                    </p>

                    {/* Social icons */}
                    <div className="flex items-center gap-3">
                        {[
                            { label: "X", href: "#" },
                            { label: "GH", href: "#" },
                            { label: "DC", href: "#" },
                            { label: "LI", href: "#" },
                        ].map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                className="w-8 h-8 rounded-lg bg-white/4 border border-white/[0.07] flex items-center justify-center text-[10px] font-bold text-white/30 hover:text-[#3088fc] hover:border-[#3088fc]/30 hover:bg-[#3088fc]/10 transition-all duration-200"
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Links */}
                {[
                    {
                        heading: "Product",
                        links: ["Features", "Pricing", "Roadmap", "Beta"],
                    },
                    {
                        heading: "Company",
                        links: ["About", "Blog", "Careers", "Press Kit", "Contact"],
                    },
                    {
                        heading: "Legal",
                        links: ["Privacy", "Terms", "Cookies", "Security"],
                    },
                ].map(({ heading, links }) => (
                    <div key={heading} className="flex flex-col gap-4">
                        <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-white/20 font-syne">
                            {heading}
                        </span>
                        <ul className="flex flex-col gap-2.5">
                            {links.map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="text-sm text-white/35 hover:text-white transition-colors duration-200 font-light"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Newsletter bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0e0e14] border border-white/[0.07] rounded-2xl px-8 py-4 mb-8">
                <div>
                    <p className="font-syne font-bold text-white text-base tracking-tight">Stay in the loop</p>
                    <p className="text-xs text-white/30 mt-0.5">Get product updates and tips straight to your inbox.</p>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <input
                        type="email"
                        placeholder="you@email.com"
                        className="bg-white/4 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#3088fc]/50 focus:ring-1 focus:ring-[#3088fc]/20 outline-none transition-all w-full md:w-64"
                    />
                    <button className="bg-[#1549e6] hover:bg-[#2b5ae7] text-white font-syne font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 active:scale-95 whitespace-nowrap">
                        Subscribe
                    </button>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-linear-to-r from-transparent via-white/6 to-transparent mb-8" />

            {/* Bottom bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-1">
                <p className="text-sm text-white font-normal">
                    © {new Date().getFullYear()} Brain2. All rights reserved.
                </p>

                <p className="text-sm text-white font-normal">
                    Built with ❤️ for curious minds by{" "}
                    <a href="https://github.com/alokjar8866"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3088fc] hover:text-[#4a98ff] hover:underline underline-offset-2 transition-colors duration-200">alokjar8866
                    </a>
                </p>
            </div>

        </div>
    </footer>
}

export default Footer