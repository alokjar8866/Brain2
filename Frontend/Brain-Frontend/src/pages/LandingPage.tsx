import Footer from "../components/Footer"
import MidSection from "../components/MidSection"
import Navbar from "../components/Navbar"
import Section from "../components/Section"
import EndSection from "./EndSection"

function LandingPage() {
  return (
    <div style={{ background: "#07070b", minHeight: "100vh", position: "relative" }}>
      <Navbar />
      <main className="pt-16"> {/* pt-16 = 64px, match your navbar height */}
        <Section />
        <MidSection/>
        <EndSection/>
        <Footer/>
      </main>
    </div>
  )
}

export default LandingPage