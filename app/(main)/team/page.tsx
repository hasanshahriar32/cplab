import BackgroundStripes from "@/components/background-stripes"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import BackgroundPaths from "@/components/background-paths"

export default function TeamPage() {
  // This would be fetched from Payload CMS in a real implementation
  const professors = [
    {
      id: 1,
      name: "Dr. John Smith",
      position: "Director & Principal Investigator",
      image: "/placeholder-user.jpg",
      bio: "Dr. Smith leads the Cyber Physical Systems research with over 15 years of experience in IoT and machine learning.",
      researchAreas: ["Cyber-Physical Systems", "IoT", "Machine Learning"],
      education: [
        { degree: "Ph.D. Computer Science", institution: "MIT", year: 2010 },
        { degree: "M.S. Electrical Engineering", institution: "Stanford", year: 2006 },
      ],
      email: "john.smith@university.edu",
      googleScholar: "#",
      orcid: "#",
    },
    {
      id: 2,
      name: "Dr. Jane Doe",
      position: "Co-Principal Investigator",
      image: "/placeholder-user.jpg",
      bio: "Dr. Doe specializes in computer vision and robotics with extensive industry collaboration experience.",
      researchAreas: ["Computer Vision", "Robotics", "AI"],
      education: [
        { degree: "Ph.D. Computer Vision", institution: "Carnegie Mellon", year: 2012 },
        { degree: "M.S. Robotics", institution: "Georgia Tech", year: 2008 },
      ],
      email: "jane.doe@university.edu",
      googleScholar: "#",
      orcid: "#",
    },
  ]

  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      position: "Ph.D. Student",
      year: "3rd Year",
      image: "/placeholder-user.jpg",
      bio: "Working on IoT security and privacy-preserving machine learning algorithms.",
      researchAreas: ["IoT Security", "Privacy-Preserving ML"],
      supervisor: "Dr. John Smith",
      email: "alex.johnson@student.university.edu",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      position: "Master's Student",
      year: "2nd Year",
      image: "/placeholder-user.jpg",
      bio: "Developing computer vision solutions for autonomous robotic systems.",
      researchAreas: ["Computer Vision", "Autonomous Systems"],
      supervisor: "Dr. Jane Doe",
      email: "sarah.wilson@student.university.edu",
    },
    {
      id: 3,
      name: "Michael Chen",
      position: "Undergraduate Researcher",
      year: "Senior",
      image: "/placeholder-user.jpg",
      bio: "Building IoT sensor networks for environmental monitoring applications.",
      researchAreas: ["IoT", "Environmental Sensing"],
      supervisor: "Dr. John Smith",
      email: "michael.chen@student.university.edu",
    },
    {
      id: 4,
      name: "Emily Davis",
      position: "Ph.D. Student",
      year: "1st Year",
      image: "/placeholder-user.jpg",
      bio: "Exploring the intersection of machine learning and cyber-physical systems.",
      researchAreas: ["Machine Learning", "CPS"],
      supervisor: "Dr. Jane Doe",
      email: "emily.davis@student.university.edu",
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
                Our Research Team
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Meet the brilliant minds driving innovation in cyber-physical systems, 
                IoT, machine learning, and cutting-edge technology research.
              </p>
            </div>
          </div>
        </section>

        {/* Professors Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Faculty & Principal Investigators
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {professors.map((professor) => (
                <div
                  key={professor.id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
                >
                  <div className="flex items-start space-x-6">
                    <img
                      src={professor.image}
                      alt={professor.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {professor.name}
                      </h3>
                      <p className="text-blue-400 font-semibold mb-4">
                        {professor.position}
                      </p>
                      <p className="text-gray-300 mb-4">{professor.bio}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-white font-semibold mb-2">Research Areas:</h4>
                        <div className="flex flex-wrap gap-2">
                          {professor.researchAreas.map((area, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-gray-300">
                          <span className="font-semibold">Email:</span> {professor.email}
                        </p>
                        <div className="flex space-x-4">
                          <a
                            href={professor.googleScholar}
                            className="text-blue-400 hover:text-blue-300 text-sm"
                          >
                            Google Scholar
                          </a>
                          <a
                            href={professor.orcid}
                            className="text-blue-400 hover:text-blue-300 text-sm"
                          >
                            ORCID
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Students Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Research Students
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
                >
                  <div className="text-center mb-4">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-white mb-1">
                      {student.name}
                    </h3>
                    <p className="text-purple-400 font-semibold text-sm mb-1">
                      {student.position}
                    </p>
                    <p className="text-gray-400 text-sm mb-2">{student.year}</p>
                    <p className="text-gray-300 text-sm mb-4">{student.bio}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2 text-sm">Research Areas:</h4>
                    <div className="flex flex-wrap gap-1">
                      {student.researchAreas.map((area, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <p className="text-gray-300">
                      <span className="font-semibold">Supervisor:</span> {student.supervisor}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold">Email:</span> {student.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AnimatedFooter />
      </div>
    </div>
  )
}
