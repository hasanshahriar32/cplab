"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { BookOpen, TrendingUp, Users, Award, Brain, Lightbulb, BarChart3 } from "lucide-react"

const researchAreas = [
  {
    id: "iot",
    name: "IoT Systems",
    icon: <Lightbulb className="w-6 h-6" />,
    multiplier: 2.8,
    description: "Internet of Things & Smart Systems",
  },
  {
    id: "ml",
    name: "Machine Learning",
    icon: <Brain className="w-6 h-6" />,
    multiplier: 3.5,
    description: "AI & Intelligent Systems",
  },
  {
    id: "cps",
    name: "Cyber-Physical Systems",
    icon: <Award className="w-6 h-6" />,
    multiplier: 3.2,
    description: "Integrated Physical-Digital Systems",
  },
  {
    id: "robotics",
    name: "Robotics",
    icon: <Users className="w-6 h-6" />,
    multiplier: 4.1,
    description: "Autonomous & Collaborative Robots",
  },
]

export default function ResearchImpactCalculator() {
  const [selectedDuration, setSelectedDuration] = useState(12)
  const [selectedArea, setSelectedArea] = useState("iot")

  const selectedResearchArea = researchAreas.find((r) => r.id === selectedArea)
  const multiplier = selectedResearchArea?.multiplier || 2.8

  const calculateImpact = (months: number) => {
    const baseImpact = months * multiplier
    const scaleFactor = months / 24
    return Math.round(baseImpact * (1 + scaleFactor * 0.4))
  }

  const calculatePublications = (months: number) => {
    return Math.round(calculateImpact(months) / 12)
  }

  return (
    <section className="py-24 bg-black relative backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">Research Impact Calculator</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Estimate the potential research output and impact from collaboration with our lab
          </p>
        </motion.div>

        <div className="bg-gray-900/40 border border-gray-700/30 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
          {/* Subtle animated background */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(147,51,234,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 80%, rgba(34,197,94,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(249,115,22,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Controls */}
            <div className="space-y-8">
              {/* Research Area Selection */}
              <div>
                <label className="block text-lg font-medium text-white mb-4">Select Research Area</label>
                <div className="grid grid-cols-2 gap-3">
                  {researchAreas.map((area) => (
                    <motion.button
                      key={area.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedArea(area.id)}
                      className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                        selectedArea === area.id
                          ? "bg-blue-500/20 border-blue-500/50 text-white"
                          : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className={`p-2 rounded-lg ${
                            selectedArea === area.id ? "bg-blue-500/30" : "bg-gray-700/50"
                          }`}
                        >
                          {area.icon}
                        </div>
                        <div>
                          <div className="font-medium">{area.name}</div>
                          <div className="text-xs opacity-70">{area.description}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Duration Slider */}
              <div>
                <label className="block text-lg font-medium text-white mb-4">Research Duration (Months)</label>
                <div className="relative">
                  <input
                    type="range"
                    min="6"
                    max="36"
                    step="3"
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(Number(e.target.value))}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((selectedDuration - 6) / (36 - 6)) * 100}%, #374151 ${((selectedDuration - 6) / (36 - 6)) * 100}%, #374151 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>6 months</span>
                    <span>36 months</span>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <span className="text-3xl font-bold text-white">{selectedDuration}</span>
                  <span className="text-gray-400 ml-2">months</span>
                </div>
              </div>

              {/* Data Disclaimer */}
              <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium text-white">Based on Research Metrics</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  These projections are based on historical research output data from our lab and similar research 
                  institutions. Actual outcomes may vary based on project complexity and resources.
                </p>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-8">
              {/* Impact Circle */}
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-gray-700"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 219.8" }}
                    animate={{
                      strokeDasharray: `${Math.min((calculateImpact(selectedDuration) / (selectedDuration * 8)) * 219.8, 219.8)} 219.8`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06d6a0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      key={`${selectedDuration}-${selectedArea}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-bold text-white"
                    >
                      {Math.round((calculateImpact(selectedDuration) / selectedDuration) * 10)}
                    </motion.div>
                    <div className="text-gray-400 text-sm">Impact Score</div>
                  </div>
                </div>
              </div>

              {/* Research Output Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 text-center">
                  <BookOpen className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <motion.div
                    key={`publications-${selectedDuration}-${selectedArea}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-white mb-1"
                  >
                    {calculatePublications(selectedDuration)}
                  </motion.div>
                  <div className="text-gray-400 text-sm">Publications</div>
                </div>

                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 text-center">
                  <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <motion.div
                    key={`total-${selectedDuration}-${selectedArea}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-white mb-1"
                  >
                    {calculateImpact(selectedDuration)}
                  </motion.div>
                  <div className="text-gray-400 text-sm">Total Impact Points</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
