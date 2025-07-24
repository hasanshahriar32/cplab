import BackgroundStripes from "@/components/background-stripes"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import BackgroundPaths from "@/components/background-paths"
import Link from "next/link"

export default function NewsPage() {
  // This would be fetched from Payload CMS LabNews collection
  const news = [
    {
      id: 1,
      title: "Cyber Physical Lab Receives $2M NSF Grant for Smart City Research",
      excerpt: "Our lab has been awarded a significant grant to advance research in IoT infrastructure for smart cities.",
      content: "The National Science Foundation has awarded our Cyber Physical Lab a $2 million grant to conduct groundbreaking research in smart city infrastructure. This three-year project will focus on developing secure, scalable IoT networks for urban environments.",
      category: "lab-update",
      author: "Dr. John Smith",
      publishedDate: "2024-12-15",
      featuredImage: "/placeholder.jpg",
      tags: ["NSF Grant", "Smart Cities", "IoT", "Research Funding"],
      isFeatured: true,
    },
    {
      id: 2,
      title: "Research Paper Accepted at IEEE ICCV 2024",
      excerpt: "Our work on real-time object detection for autonomous systems has been accepted at a top-tier conference.",
      content: "We're excited to announce that our paper 'Deep Learning Approaches for Real-time Object Detection in Autonomous Systems' has been accepted at the International Conference on Computer Vision (ICCV) 2024.",
      category: "research-achievement",
      author: "Dr. Jane Doe",
      publishedDate: "2024-11-28",
      featuredImage: "/placeholder.jpg",
      tags: ["Publication", "ICCV", "Computer Vision", "Deep Learning"],
      isFeatured: true,
    },
    {
      id: 3,
      title: "Student Alex Johnson Wins Best Paper Award",
      excerpt: "PhD student Alex Johnson received recognition for outstanding research in IoT security.",
      content: "Alex Johnson, a third-year PhD student in our lab, has won the Best Paper Award at the International Workshop on IoT Security for his work on blockchain-based trust management in distributed IoT networks.",
      category: "award",
      author: "Dr. John Smith",
      publishedDate: "2024-11-10",
      featuredImage: "/placeholder.jpg",
      tags: ["Student Achievement", "Best Paper Award", "IoT Security", "Blockchain"],
      isFeatured: false,
    },
    {
      id: 4,
      title: "New Industry Partnership with Tech Corp",
      excerpt: "We've established a strategic partnership to advance research in industrial IoT applications.",
      content: "The Cyber Physical Lab is pleased to announce a new partnership with Tech Corp, a leading technology company. This collaboration will focus on developing next-generation industrial IoT solutions with applications in manufacturing and logistics.",
      category: "collaboration",
      author: "Dr. Jane Doe",
      publishedDate: "2024-10-22",
      featuredImage: "/placeholder.jpg",
      tags: ["Industry Partnership", "Industrial IoT", "Manufacturing", "Collaboration"],
      isFeatured: false,
    },
    {
      id: 5,
      title: "Lab Hosts International Workshop on Cyber-Physical Systems",
      excerpt: "Researchers from around the world gathered to discuss the latest advances in CPS technology.",
      content: "Our lab successfully hosted the International Workshop on Cyber-Physical Systems, bringing together over 100 researchers from academia and industry to share insights and collaborate on future research directions.",
      category: "event",
      author: "Dr. John Smith",
      publishedDate: "2024-09-15",
      featuredImage: "/placeholder.jpg",
      tags: ["Workshop", "CPS", "International Event", "Research Community"],
      isFeatured: false,
    },
    {
      id: 6,
      title: "New Master's Student Sarah Wilson Joins the Team",
      excerpt: "We welcome Sarah Wilson, who will be working on computer vision for autonomous robotics.",
      content: "We're excited to welcome Sarah Wilson as a new Master's student in our lab. Sarah will be working under Dr. Jane Doe's supervision on computer vision algorithms for autonomous robotic systems.",
      category: "lab-update",
      author: "Dr. Jane Doe",
      publishedDate: "2024-08-28",
      featuredImage: "/placeholder.jpg",
      tags: ["New Student", "Computer Vision", "Robotics", "Team Update"],
      isFeatured: false,
    },
  ]

  const categories = [
    { value: "all", label: "All News", icon: "📰" },
    { value: "lab-update", label: "Lab Updates", icon: "🔬" },
    { value: "research-achievement", label: "Research", icon: "🎓" },
    { value: "publication", label: "Publications", icon: "📄" },
    { value: "event", label: "Events", icon: "🎪" },
    { value: "award", label: "Awards", icon: "🏆" },
    { value: "collaboration", label: "Partnerships", icon: "🤝" },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "lab-update":
        return "bg-blue-500/20 text-blue-300"
      case "research-achievement":
        return "bg-green-500/20 text-green-300"
      case "publication":
        return "bg-purple-500/20 text-purple-300"
      case "event":
        return "bg-yellow-500/20 text-yellow-300"
      case "award":
        return "bg-orange-500/20 text-orange-300"
      case "collaboration":
        return "bg-pink-500/20 text-pink-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const featuredNews = news.filter(item => item.isFeatured)
  const regularNews = news.filter(item => !item.isFeatured)

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
                Lab News & Updates
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Stay informed about our latest research breakthroughs, achievements, 
                collaborations, and lab activities.
              </p>
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
                  className="flex items-center space-x-2 px-6 py-2 bg-gray-800/50 border border-gray-700/50 rounded-full text-gray-300 hover:text-white hover:border-blue-500/50 transition-all duration-300"
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">
                Featured News
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                {featuredNews.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <div className="aspect-video bg-gray-700 relative">
                      <img
                        src={item.featuredImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)}`}>
                          {item.category.replace("-", " ").toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <span>By {item.author}</span>
                        <span>{formatDate(item.publishedDate)}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 hover:text-blue-400 transition-colors">
                        <Link href={`/news/${item.id}`}>
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-gray-300 mb-6">{item.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/news/${item.id}`}
                        className="text-blue-400 hover:text-blue-300 font-semibold"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Regular News */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Latest Updates
            </h2>
            <div className="space-y-8">
              {regularNews.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                    <div className="lg:w-1/4 mb-6 lg:mb-0">
                      <img
                        src={item.featuredImage}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    </div>
                    <div className="lg:w-3/4">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)}`}>
                          {item.category.replace("-", " ").toUpperCase()}
                        </span>
                        <div className="text-sm text-gray-400">
                          {formatDate(item.publishedDate)}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3 hover:text-blue-400 transition-colors">
                        <Link href={`/news/${item.id}`}>
                          {item.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4">By {item.author}</p>
                      <p className="text-gray-300 mb-6">{item.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <Link
                        href={`/news/${item.id}`}
                        className="text-blue-400 hover:text-blue-300 font-semibold"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl p-12 border border-gray-700/50">
              <h2 className="text-3xl font-bold text-white mb-6">
                Stay Updated
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Subscribe to our newsletter to receive the latest updates about our research, 
                publications, and lab activities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>

        <AnimatedFooter />
      </div>
    </div>
  )
}
