import BackgroundStripes from "@/components/background-stripes"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import BackgroundPaths from "@/components/background-paths"
import Link from "next/link"

export default function NewsNotFound() {
  return (
    <div className="relative min-h-screen bg-black">
      <BackgroundPaths />
      <AnimatedBackground />
      <BackgroundStripes />

      <div className="relative z-10">
        <Navbar />
        
        <section className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                News Article Not Found
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                The news article you're looking for doesn't exist or has been removed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/news"
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Browse All News
                </Link>
                <Link
                  href="/"
                  className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        </section>

        <AnimatedFooter />
      </div>
    </div>
  )
}
