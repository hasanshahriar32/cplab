import BackgroundStripes from "@/components/background-stripes"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import BackgroundPaths from "@/components/background-paths"
import Link from "next/link"

export default function PublicationsPage() {
  // This would be fetched from Payload CMS ResearchWorks collection
  const publications = [
    {
      id: 1,
      title: "Secure Communication Protocols for IoT Networks in Smart Cities",
      authors: ["Dr. John Smith", "Alex Johnson", "Dr. Jane Doe"],
      type: "journal",
      journal: "IEEE Transactions on Smart Cities",
      year: 2024,
      category: "iot",
      abstract: "This paper presents novel security protocols for IoT communication in urban environments, addressing scalability and privacy concerns.",
      doi: "10.1109/TSC.2024.123456",
      url: "#",
      tags: ["IoT", "Security", "Smart Cities", "Communication Protocols"],
      status: "published",
    },
    {
      id: 2,
      title: "Deep Learning Approaches for Real-time Object Detection in Autonomous Systems",
      authors: ["Dr. Jane Doe", "Sarah Wilson", "Emily Davis"],
      type: "conference",
      conference: "International Conference on Computer Vision (ICCV)",
      year: 2024,
      category: "ml",
      abstract: "We propose a lightweight deep learning architecture optimized for real-time object detection in resource-constrained autonomous systems.",
      doi: "10.1109/ICCV.2024.789012",
      url: "#",
      tags: ["Deep Learning", "Computer Vision", "Autonomous Systems", "Real-time Processing"],
      status: "published",
    },
    {
      id: 3,
      title: "Edge Computing Framework for Industrial IoT Monitoring",
      authors: ["Dr. John Smith", "Michael Chen", "Alex Johnson"],
      type: "journal",
      journal: "Journal of Industrial Internet of Things",
      year: 2024,
      category: "iot",
      abstract: "An efficient edge computing framework designed for low-latency industrial monitoring applications with fault tolerance capabilities.",
      doi: "10.1016/j.iiot.2024.345678",
      url: "#",
      tags: ["Edge Computing", "Industrial IoT", "Monitoring", "Fault Tolerance"],
      status: "published",
    },
    {
      id: 4,
      title: "Machine Learning for Predictive Maintenance in Cyber-Physical Systems",
      authors: ["Emily Davis", "Dr. John Smith", "Dr. Jane Doe"],
      type: "conference",
      conference: "ACM International Conference on Cyber-Physical Systems",
      year: 2023,
      category: "ml",
      abstract: "A comprehensive study on applying ML techniques for predictive maintenance in complex cyber-physical systems.",
      doi: "10.1145/CPS.2023.901234",
      url: "#",
      tags: ["Machine Learning", "Predictive Maintenance", "Cyber-Physical Systems"],
      status: "published",
    },
    {
      id: 5,
      title: "Blockchain-based Trust Management for Distributed IoT Networks",
      authors: ["Alex Johnson", "Dr. John Smith"],
      type: "paper",
      conference: "International Workshop on IoT Security",
      year: 2023,
      category: "iot",
      abstract: "Novel blockchain-based approach for establishing and maintaining trust in large-scale distributed IoT networks.",
      doi: "10.1109/IoTSec.2023.567890",
      url: "#",
      tags: ["Blockchain", "Trust Management", "IoT Networks", "Security"],
      status: "published",
    },
    {
      id: 6,
      title: "Reinforcement Learning for Adaptive Resource Management in Smart Grids",
      authors: ["Sarah Wilson", "Dr. Jane Doe", "Michael Chen"],
      type: "journal",
      journal: "IEEE Transactions on Smart Grid",
      year: 2025,
      category: "ml",
      abstract: "Application of reinforcement learning algorithms for dynamic resource allocation and optimization in smart grid systems.",
      doi: "Pending",
      url: "#",
      tags: ["Reinforcement Learning", "Smart Grid", "Resource Management", "Optimization"],
      status: "review",
    },
  ]

  const categories = [
    { value: "all", label: "All Publications", count: publications.length },
    { value: "journal", label: "Journal Articles", count: publications.filter(p => p.type === "journal").length },
    { value: "conference", label: "Conference Papers", count: publications.filter(p => p.type === "conference").length },
    { value: "iot", label: "IoT Research", count: publications.filter(p => p.category === "iot").length },
    { value: "ml", label: "Machine Learning", count: publications.filter(p => p.category === "ml").length },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/20 text-green-300"
      case "review":
        return "bg-yellow-500/20 text-yellow-300"
      case "draft":
        return "bg-gray-500/20 text-gray-300"
      default:
        return "bg-blue-500/20 text-blue-300"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "journal":
        return "📄"
      case "conference":
        return "🎤"
      case "paper":
        return "📋"
      default:
        return "📚"
    }
  }

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
                Publications
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Discover our latest research contributions, peer-reviewed publications, 
                and innovative findings in cyber-physical systems and emerging technologies.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {publications.filter(p => p.status === "published").length}
                </div>
                <div className="text-gray-300">Published</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {publications.filter(p => p.status === "review").length}
                </div>
                <div className="text-gray-300">Under Review</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {publications.filter(p => p.type === "journal").length}
                </div>
                <div className="text-gray-300">Journal Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {publications.filter(p => p.type === "conference").length}
                </div>
                <div className="text-gray-300">Conference Papers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category.value}
                  className="px-6 py-2 bg-gray-800/50 border border-gray-700/50 rounded-full text-gray-300 hover:text-white hover:border-blue-500/50 transition-all duration-300"
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Publications List */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {publications.map((publication) => (
                <div
                  key={publication.id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getTypeIcon(publication.type)}</span>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(publication.status)}`}>
                          {publication.status.charAt(0).toUpperCase() + publication.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      {publication.year}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 hover:text-blue-400 transition-colors">
                    <Link href={publication.url}>
                      {publication.title}
                    </Link>
                  </h3>

                  <div className="mb-4">
                    <p className="text-blue-300 mb-2">
                      {publication.authors.join(", ")}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {publication.journal && `${publication.journal}, ${publication.year}`}
                      {publication.conference && `${publication.conference}, ${publication.year}`}
                      {publication.doi !== "Pending" && ` • DOI: ${publication.doi}`}
                    </p>
                  </div>

                  <p className="text-gray-300 mb-6">{publication.abstract}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {publication.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4">
                    <Link
                      href={publication.url}
                      className="text-blue-400 hover:text-blue-300 text-sm font-semibold"
                    >
                      View Publication →
                    </Link>
                    {publication.doi !== "Pending" && (
                      <Link
                        href={`https://doi.org/${publication.doi}`}
                        className="text-gray-400 hover:text-gray-300 text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        DOI Link
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Metrics */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl p-12 border border-gray-700/50">
              <h2 className="text-3xl font-bold text-white mb-6">
                Research Impact
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold text-blue-400 mb-2">250+</div>
                  <div className="text-gray-300">Citations</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-400 mb-2">15</div>
                  <div className="text-gray-300">h-index</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-400 mb-2">8</div>
                  <div className="text-gray-300">Collaborations</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AnimatedFooter />
      </div>
    </div>
  )
}
