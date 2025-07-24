import BackgroundStripes from "@/components/background-stripes"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import HowWeWork from "@/components/how-we-work"
import InnovativeServices from "@/components/innovative-services"
import ROICalculatorHome from "@/components/roi-calculator-home"
import AnimatedFooter from "@/components/animated-footer"
import BackgroundPaths from "@/components/background-paths"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      <BackgroundPaths />
      <AnimatedBackground />
      <BackgroundStripes />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <HowWeWork />
        <InnovativeServices />
        <ROICalculatorHome />
        <AnimatedFooter />
      </div>
    </div>
  )
}
