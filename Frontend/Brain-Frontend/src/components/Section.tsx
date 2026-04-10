import { useTypewriter } from "../hooks/useTypewriter";


function Section() {
  const typedText = useTypewriter();

  return <div className="flex flex-col md:flex-row gap-1">
    <div className="w-full md:basis-[55%] bg-zinc-950">
      <div className="p-12 flex flex-col">
        <div className="px-6 ml-2 w-fit inline-block text-lg text-blue-800 font-bold border-2 bg-black border-blue-900 rounded-2xl">Your Second Brain - Online</div>
        { /* <div className="p-10 text-5xl text-wrap text-white font-medium">
          All-in-one bookmark manager
        </div> */}

        <div className="p-6 text-5xl text-wrap text-white font-medium">
          <h1 className="animate-floatUp-d1 p-1 text-6xl  text-white font-bold opacity-0">
            Save -it -once,
          </h1>
          <h1 className="animate-floatUp-d2 p-1 text-5xl font-semibold opacity-0"
            style={{ color: "#1549e6", minHeight: "1.2em" }}>
            {typedText}<span className="cursor-blink">|</span>
          </h1>
        </div>

        <div className="px-6 font-medium">
          <span className="font-normal text-white text-xl">Brain2 is your personal library for the internet. Capture articles, videos, links, and posts — then share or revisit them anytime</span>
        </div>
        <div className="px-6 py-5 flex flex-row gap-4">
          <button className="bg-blue-700 text-white font-bold w-12vw py-2 px-4 rounded-xl hover:bg-blue-800 hover:border-white hover:border-2">
            Login
          </button>
          <button className="bg-white border-2 border-amber-100 text-black font-bold py-2 px-4 rounded-xl hover:text-white hover:bg-blue-800">
            Sign Up
          </button>
        </div>
      </div>
    </div>
    <div className="w-full md:basis-[45%] bg-zinc-900 text-white">
      video
    </div>
  </div>
}

export default Section