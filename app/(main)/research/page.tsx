import BackgroundStripes from "@/components/background-stripes"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import BackgroundPaths from "@/components/background-paths"
import Link from "next/link"

export default function ResearchPage() {
  const researchAreas = [
    {
      title: "Cyber-Physical Systems",
      description: "Integration of computation, networking, and physical processes to create intelligent systems.",
      icon: "🔗",
      projects: ["Smart Grid Optimization", "Industrial IoT Monitoring", "Autonomous Vehicle Systems"],
      technologies: ["Real-time Systems", "Embedded Computing", "Network Protocols"],
    },
    {
      title: "Internet of Things (IoT)",
      description: "Connected devices and smart sensor networks for environmental and industrial applications.",
      icon: "🌐",
      projects: ["Smart City Infrastructure", "Agricultural Monitoring", "Health IoT Systems"],
      technologies: ["Sensor Networks", "Edge Computing", "Wireless Communication"],
    },
    {
      title: "Machine Learning",
      description: "Advanced AI algorithms for pattern recognition, prediction, and intelligent decision making.",
      icon: "🧠",
      projects: ["Predictive Maintenance", "Computer Vision", "Natural Language Processing"],
      technologies: ["Deep Learning", "Neural Networks", "Data Mining"],
    },
    {
      title: "Computer Vision",
      description: "Visual recognition and analysis systems for robotics and automated inspection.",
      icon: "👁️",
      projects: ["Autonomous Navigation", "Quality Control", "Medical Imaging"],
      technologies: ["Image Processing", "Pattern Recognition", "3D Vision"],
    },
    {
      title: "Robotics",
      description: "Autonomous robotic systems for manufacturing, service, and exploration applications.",
      icon: "🤖",
      projects: ["Collaborative Robots", "Service Robotics", "Swarm Intelligence"],
      technologies: ["Motion Planning", "Robot Control", "Human-Robot Interaction"],
    },
    {
      title: "Data Science",
      description: "Big data analytics and visualization for research insights and decision support.",
      icon: "📊",
      projects: ["Research Analytics", "Performance Optimization", "Trend Analysis"],
      technologies: ["Big Data", "Statistical Analysis", "Data Visualization"],
    },
  ]

  const currentProjects = [
    {
      title: "Smart Campus IoT Network",
      description: "Developing a comprehensive IoT infrastructure for campus-wide environmental monitoring and energy optimization.",
      status: "In Progress",
      funding: "NSF Grant",
      team: ["Dr. John Smith", "Alex Johnson", "Michael Chen"],
      duration: "2024-2026",
    },
    {
      title: "AI-Powered Robotic Vision",
      description: "Creating advanced computer vision algorithms for autonomous robotic systems in industrial environments.",
      status: "In Progress",
      funding: "Industry Partnership",
      team: ["Dr. Jane Doe", "Sarah Wilson", "Emily Davis"],
      duration: "2024-2025",
    },
    {
      title: "Cybersecurity for CPS",
      description: "Researching security vulnerabilities and developing protection mechanisms for cyber-physical systems.",
      status: "Planning",
      funding: "Department of Defense",
      team: ["Dr. John Smith", "Alex Johnson"],
      duration: "2025-2027",
    },
  ]

  return (
    <div className="relative min-h-screen bg-black">
      <BackgroundPaths />
      <AnimatedBackground />
      <BackgroundStripes />

      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Research Areas
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Exploring the frontiers of technology through interdisciplinary research 
                in cyber-physical systems, AI, and intelligent technologies.
              </p>
            </div>
          </div>
        </section>

        {/* Research Areas Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {researchAreas.map((area, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{area.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{area.title}</h3>
                  <p className="text-gray-300 mb-6">{area.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Current Projects:</h4>
                    <ul className="space-y-2">
                      {area.projects.map((project, idx) => (
                        <li key={idx} className="text-blue-300 text-sm">
                          • {project}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {area.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Projects Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Current Research Projects
            </h2>
            <div className="space-y-8">
              {currentProjects.map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={`px-3 py-1 rounded-full ${
                          project.status === 'In Progress' 
                            ? 'bg-green-500/20 text-green-300' 
                            : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {project.status}
                        </span>
                        <span className="text-gray-400">
                          Duration: {project.duration}
                        </span>
                        <span className="text-blue-400">
                          Funding: {project.funding}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{project.description}</p>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-3">Research Team:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.team.map((member, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                        >
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl p-12 border border-gray-700/50">
              <h2 className="text-3xl font-bold text-white mb-6">
                Join Our Research Community
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Interested in collaborating or pursuing research with us? 
                We welcome students, researchers, and industry partners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/publications"
                  className="px-8 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  View Publications
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
