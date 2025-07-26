import BackgroundStripes from "@/components/background-stripes"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import HowWeWork from "@/components/how-we-work"
import InnovativeServices from "@/components/innovative-services"
import ResearchImpactCalculator from "@/components/roi-calculator-home"
import AnimatedFooter from "@/components/animated-footer"
import BackgroundPaths from "@/components/background-paths"
import { generateMetadata as generateSEOMetadata, generateStructuredData } from "@/lib/seo"
import { Metadata } from "next"

export const metadata: Metadata = generateSEOMetadata({
  title: "Home - Advanced Research in Cyber Physical Systems",
  description: "Leading research laboratory specializing in cyber-physical systems, IoT, machine learning, and advanced computing technologies. Discover innovative solutions and cutting-edge research.",
  url: "/",
  type: "website",
})

export default function Home() {
  // Generate structured data for homepage
  const organizationStructuredData = generateStructuredData({
    type: 'Organization',
  })

  const researchProjectStructuredData = {
    "@context": "https://schema.org",
    "@type": "ResearchOrganization",
    "name": "Cyber Physical Lab",
    "description": "Leading research laboratory specializing in cyber-physical systems, IoT, machine learning, and advanced computing technologies.",
    "knowsAbout": [
      "Cyber-Physical Systems",
      "Internet of Things (IoT)",
      "Machine Learning",
      "Computer Vision", 
      "Robotics",
      "Data Science",
      "Software Engineering"
    ],
    "department": {
      "@type": "Organization",
      "name": "Department of Computer Science"
    }
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(researchProjectStructuredData),
        }}
      />
      
      <BackgroundPaths />
      <AnimatedBackground />
      <BackgroundStripes />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <HowWeWork />
        <InnovativeServices />
        <ResearchImpactCalculator />
        <AnimatedFooter />
      </div>
    </div>
  )
}
