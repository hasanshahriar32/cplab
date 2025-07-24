import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Mail, ExternalLink, BookOpen, GraduationCap } from 'lucide-react'
import Navbar from '@/components/navbar'
import AnimatedFooter from '@/components/animated-footer'
import BackgroundPaths from '@/components/background-paths'
import AnimatedBackground from '@/components/animated-background'
import BackgroundStripes from '@/components/background-stripes'

interface ProfilePageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  // In real implementation, fetch user data from Payload CMS
  return {
    title: `Profile - Cyber Physical Lab`,
    description: 'Team member profile at Cyber Physical Lab',
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  // Mock data - in real implementation, fetch from Payload CMS based on params.id
  const profile = {
    id: params.id,
    name: "Dr. John Smith",
    role: "admin",
    position: "Director & Principal Investigator",
    image: "/placeholder-user.jpg",
    bio: "Dr. Smith leads the Cyber Physical Systems research with over 15 years of experience in IoT and machine learning. His work focuses on the integration of physical and computational processes, with applications in smart cities, autonomous systems, and industrial IoT.",
    researchAreas: ["Cyber-Physical Systems", "IoT", "Machine Learning", "Smart Cities"],
    education: [
      { degree: "Ph.D. Computer Science", institution: "MIT", year: 2010 },
      { degree: "M.S. Electrical Engineering", institution: "Stanford", year: 2006 },
      { degree: "B.S. Electrical Engineering", institution: "UC Berkeley", year: 2004 },
    ],
    email: "john.smith@university.edu",
    googleScholar: "#",
    orcid: "#",
    linkedIn: "#",
    recentPublications: [
      {
        title: "Secure Communication Protocols for IoT Networks in Smart Cities",
        year: 2024,
        journal: "IEEE Transactions on Smart Cities",
        coAuthors: ["Alex Johnson", "Dr. Jane Doe"]
      },
      {
        title: "Machine Learning Approaches for Cyber-Physical System Security",
        year: 2023,
        conference: "International Conference on CPS",
        coAuthors: ["Sarah Wilson", "Michael Chen"]
      }
    ],
    students: [
      { name: "Alex Johnson", level: "Ph.D. Student", year: "3rd Year" },
      { name: "Michael Chen", level: "Undergraduate", year: "Senior" }
    ]
  }

  return (
    <div className="relative min-h-screen bg-black">
      <BackgroundPaths />
      <AnimatedBackground />
      <BackgroundStripes />

      <div className="relative z-10">
        <Navbar />
        
        {/* Header */}
        <section className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/team"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Team
            </Link>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-shrink-0">
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    width={200}
                    height={200}
                    className="rounded-2xl object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-white mb-2">{profile.name}</h1>
                  <p className="text-xl text-blue-400 font-semibold mb-4">{profile.position}</p>
                  <p className="text-gray-300 leading-relaxed mb-6">{profile.bio}</p>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <a
                      href={`mailto:${profile.email}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </a>
                    <a
                      href={profile.googleScholar}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500/20 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Google Scholar
                    </a>
                    <a
                      href={profile.orcid}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500/20 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      ORCID
                    </a>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-3">Research Areas:</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.researchAreas.map((area, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6" />
                Education
              </h2>
              <div className="space-y-4">
                {profile.education.map((edu, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-semibold">{edu.degree}</h3>
                      <p className="text-gray-300">{edu.institution}</p>
                    </div>
                    <span className="text-blue-400 font-semibold">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Publications */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Recent Publications
              </h2>
              <div className="space-y-6">
                {profile.recentPublications.map((pub, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-white font-semibold mb-2">{pub.title}</h3>
                    <p className="text-gray-300 mb-2">
                      Co-authors: {pub.coAuthors.join(", ")}
                    </p>
                    <p className="text-blue-400 text-sm">
                      {pub.journal && `${pub.journal}, ${pub.year}`}
                      {pub.conference && `${pub.conference}, ${pub.year}`}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href="/publications"
                  className="text-blue-400 hover:text-blue-300 font-semibold"
                >
                  View All Publications →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Students (for professors) */}
        {profile.role === 'admin' && profile.students && (
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-6">Supervised Students</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {profile.students.map((student, index) => (
                    <div key={index} className="bg-gray-700/30 rounded-lg p-4">
                      <h3 className="text-white font-semibold">{student.name}</h3>
                      <p className="text-gray-300 text-sm">{student.level}</p>
                      <p className="text-blue-400 text-sm">{student.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <AnimatedFooter />
      </div>
    </div>
  )
}
