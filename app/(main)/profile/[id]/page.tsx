import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Mail, ExternalLink, BookOpen, GraduationCap, Trophy, Calendar, Award, Globe, Github, Linkedin, MapPin, Users } from 'lucide-react'
import Navbar from '@/components/navbar'
import AnimatedFooter from '@/components/animated-footer'
import BackgroundPaths from '@/components/background-paths'
import AnimatedBackground from '@/components/animated-background'
import BackgroundStripes from '@/components/background-stripes'

interface ProfilePageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { id } = await params
  // In real implementation, fetch user data from Payload CMS
  return {
    title: `Profile - Cyber Physical Lab`,
    description: 'Team member profile at Cyber Physical Lab',
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params
  
  // Mock data - in real implementation, fetch from Payload CMS based on id
  const profile = {
    id: id,
    name: "Dr. John Smith",
    role: "admin",
    position: "Director & Principal Investigator",
    image: "/placeholder-user.jpg",
    bio: "Dr. Smith leads the Cyber Physical Systems research with over 15 years of experience in IoT and machine learning. His work focuses on the integration of physical and computational processes, with applications in smart cities, autonomous systems, and industrial IoT.",
    location: "San Francisco, CA",
    joinedDate: "2018-09-01",
    researchAreas: ["Cyber-Physical Systems", "IoT", "Machine Learning", "Smart Cities"],
    education: [
      { degree: "Ph.D. Computer Science", institution: "MIT", year: 2010 },
      { degree: "M.S. Electrical Engineering", institution: "Stanford", year: 2006 },
      { degree: "B.S. Electrical Engineering", institution: "UC Berkeley", year: 2004 },
    ],
    contact: {
      email: "john.smith@university.edu",
      phone: "+1 (555) 123-4567",
      office: "Engineering Building, Room 301"
    },
    socialLinks: {
      website: "https://johnsmith.dev",
      googleScholar: "https://scholar.google.com/citations?user=abcd1234",
      orcid: "https://orcid.org/0000-0000-0000-0000",
      linkedIn: "https://linkedin.com/in/drjohnsmith",
      github: "https://github.com/drjohnsmith",
      twitter: "https://twitter.com/drjohnsmith",
      researchGate: "https://researchgate.net/profile/John-Smith"
    },
    achievements: [
      {
        title: "IEEE Fellow",
        year: 2023,
        description: "Recognized for outstanding contributions to cyber-physical systems research",
        icon: "🏆"
      },
      {
        title: "NSF CAREER Award",
        year: 2020,
        description: "Early career development program award for excellence in research and education",
        icon: "🎖️"
      },
      {
        title: "Best Paper Award",
        year: 2022,
        description: "International Conference on Cyber-Physical Systems",
        icon: "📄"
      },
      {
        title: "Technology Innovation Award",
        year: 2021,
        description: "University Technology Transfer Office recognition",
        icon: "💡"
      }
    ],
    recentPublications: [
      {
        title: "Secure Communication Protocols for IoT Networks in Smart Cities",
        year: 2024,
        journal: "IEEE Transactions on Smart Cities",
        coAuthors: ["Alex Johnson", "Dr. Jane Doe"],
        doi: "10.1109/TSC.2024.1234567"
      },
      {
        title: "Machine Learning Approaches for Cyber-Physical System Security",
        year: 2023,
        conference: "International Conference on CPS",
        coAuthors: ["Sarah Wilson", "Michael Chen"],
        doi: "10.1109/CPS.2023.7654321"
      },
      {
        title: "Edge Computing for Real-time IoT Applications",
        year: 2023,
        journal: "ACM Transactions on IoT",
        coAuthors: ["Lisa Brown", "Robert Davis"],
        doi: "10.1145/3512345.6789012"
      }
    ],
    newsArticles: [
      {
        id: "1",
        title: "Breakthrough in Smart City Security Protocols",
        date: "2024-03-15",
        excerpt: "Our latest research on secure communication protocols for IoT networks has been published in IEEE Transactions.",
        slug: "smart-city-security-breakthrough"
      },
      {
        id: "2", 
        title: "New Partnership with Tech Industry Leaders",
        date: "2024-02-28",
        excerpt: "Announcing our collaboration with leading tech companies to advance cyber-physical systems research.",
        slug: "industry-partnership-announcement"
      },
      {
        id: "3",
        title: "Student Team Wins National Competition",
        date: "2024-01-20",
        excerpt: "Our undergraduate research team secured first place in the National CPS Competition.",
        slug: "student-team-victory"
      }
    ],
    certificates: [
      {
        id: "cert-001",
        title: "Outstanding Research Contribution Award",
        issuedBy: "Cyber Physical Lab",
        issuedDate: "2024-06-15",
        description: "Awarded for exceptional contributions to the field of cyber-physical systems and mentorship excellence.",
        image: "/certificate-template.png",
        verificationCode: "CPL-2024-RC-001"
      },
      {
        id: "cert-002", 
        title: "Excellence in Teaching and Mentorship",
        issuedBy: "University Excellence Committee",
        issuedDate: "2023-12-10",
        description: "Recognition for outstanding teaching methods and student mentorship in advanced computing courses.",
        image: "/certificate-template.png",
        verificationCode: "UEC-2023-TM-002"
      },
      {
        id: "cert-003",
        title: "Innovation in Research Methodology",
        issuedBy: "IEEE Computer Society",
        issuedDate: "2023-09-22",
        description: "Certified for developing novel research methodologies in cyber-physical systems security.",
        image: "/certificate-template.png",
        verificationCode: "IEEE-2023-RM-003"
      }
    ],
    students: [
      { 
        name: "Alex Johnson", 
        level: "Ph.D. Student", 
        year: "3rd Year",
        focus: "IoT Security"
      },
      { 
        name: "Michael Chen", 
        level: "Undergraduate", 
        year: "Senior",
        focus: "Machine Learning"
      },
      {
        name: "Sarah Wilson",
        level: "M.S. Student", 
        year: "2nd Year",
        focus: "Smart Cities"
      },
      {
        name: "Emily Davis",
        level: "Ph.D. Student",
        year: "1st Year", 
        focus: "Edge Computing"
      }
    ],
    stats: {
      publications: 45,
      citations: 1250,
      hIndex: 18,
      studentsSupervised: 25,
      yearsExperience: 15
    }
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/team"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Team
            </Link>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 mb-8">
              <div className="flex flex-col lg:flex-row items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <Image
                      src={profile.image}
                      alt={profile.name}
                      width={200}
                      height={200}
                      className="rounded-2xl object-cover border-4 border-blue-500/20"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-gray-800"></div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div>
                      <h1 className="text-4xl font-bold text-white mb-2">{profile.name}</h1>
                      <p className="text-xl text-blue-400 font-semibold mb-2">{profile.position}</p>
                      <div className="flex items-center text-gray-400 mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{profile.location}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Joined {new Date(profile.joinedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:text-right">
                      <div className="bg-blue-500/10 rounded-lg p-3">
                        <div className="text-2xl font-bold text-blue-400">{profile.stats.publications}</div>
                        <div className="text-sm text-gray-400">Publications</div>
                      </div>
                      <div className="bg-purple-500/10 rounded-lg p-3">
                        <div className="text-2xl font-bold text-purple-400">{profile.stats.citations}</div>
                        <div className="text-sm text-gray-400">Citations</div>
                      </div>
                      <div className="bg-green-500/10 rounded-lg p-3">
                        <div className="text-2xl font-bold text-green-400">{profile.stats.hIndex}</div>
                        <div className="text-sm text-gray-400">H-Index</div>
                      </div>
                      <div className="bg-orange-500/10 rounded-lg p-3">
                        <div className="text-2xl font-bold text-orange-400">{profile.stats.studentsSupervised}</div>
                        <div className="text-sm text-gray-400">Students</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6">{profile.bio}</p>

                  {/* Contact & Social Links */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-white font-semibold mb-3">Contact Information:</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${profile.contact.email}`} className="hover:text-blue-400 transition-colors">
                            {profile.contact.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPin className="w-4 h-4" />
                          <span>{profile.contact.office}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-semibold mb-3">Connect:</h3>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={profile.socialLinks.website}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-gray-500/20 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="w-4 h-4" />
                          Website
                        </a>
                        <a
                          href={profile.socialLinks.linkedIn}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="w-4 h-4" />
                          LinkedIn
                        </a>
                        <a
                          href={profile.socialLinks.github}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-gray-500/20 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                        <a
                          href={profile.socialLinks.googleScholar}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-yellow-500/20 text-yellow-300 rounded-lg hover:bg-yellow-500/30 transition-colors text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Scholar
                        </a>
                        <a
                          href={profile.socialLinks.orcid}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          ORCID
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-3">Research Areas:</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.researchAreas.map((area, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
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

        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Achievements */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  Achievements & Awards
                </h2>
                <div className="grid gap-4">
                  {profile.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-white font-semibold">{achievement.title}</h3>
                          <span className="text-blue-400 font-semibold text-sm">{achievement.year}</span>
                        </div>
                        <p className="text-gray-300 text-sm">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent News */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-blue-400" />
                  Recent News & Updates
                </h2>
                <div className="space-y-4">
                  {profile.newsArticles.map((article, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-6 py-3">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-semibold hover:text-blue-400 transition-colors">
                          <Link href={`/news/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h3>
                        <span className="text-gray-400 text-sm">
                          {new Date(article.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{article.excerpt}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    href="/news"
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    View All News →
                  </Link>
                </div>
              </div>

              {/* Recent Publications */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-green-400" />
                  Recent Publications
                </h2>
                <div className="space-y-6">
                  {profile.recentPublications.map((pub, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-6 py-3">
                      <h3 className="text-white font-semibold mb-2">{pub.title}</h3>
                      <p className="text-gray-300 mb-2 text-sm">
                        Co-authors: {pub.coAuthors.join(", ")}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-green-400 text-sm">
                          {pub.journal && `${pub.journal}, ${pub.year}`}
                          {pub.conference && `${pub.conference}, ${pub.year}`}
                        </p>
                        {pub.doi && (
                          <a
                            href={`https://doi.org/${pub.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            DOI
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    href="/publications"
                    className="text-green-400 hover:text-green-300 font-semibold"
                  >
                    View All Publications →
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Education */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-400" />
                  Education
                </h2>
                <div className="space-y-4">
                  {profile.education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="text-white font-semibold text-sm">{edu.degree}</h3>
                      <p className="text-gray-300 text-sm">{edu.institution}</p>
                      <span className="text-blue-400 font-semibold text-xs">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificates */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Certificates
                </h2>
                <div className="space-y-4">
                  {profile.certificates.map((cert, index) => (
                    <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                      <h3 className="text-white font-semibold text-sm mb-1">
                        <Link 
                          href={`/lab-certificates/${cert.id}`}
                          className="hover:text-blue-400 transition-colors"
                        >
                          {cert.title}
                        </Link>
                      </h3>
                      <p className="text-gray-400 text-xs mb-2">{cert.issuedBy}</p>
                      <p className="text-blue-400 text-xs">
                        {new Date(cert.issuedDate).toLocaleDateString()}
                      </p>
                      <p className="text-gray-300 text-xs mt-2">{cert.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link
                    href="/lab-certificates"
                    className="text-yellow-400 hover:text-yellow-300 font-semibold text-sm"
                  >
                    View All Certificates →
                  </Link>
                </div>
              </div>

              {/* Students */}
              {profile.role === 'admin' && profile.students && (
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-orange-400" />
                    Supervised Students
                  </h2>
                  <div className="space-y-3">
                    {profile.students.map((student, index) => (
                      <div key={index} className="bg-gray-700/30 rounded-lg p-3">
                        <h3 className="text-white font-semibold text-sm">{student.name}</h3>
                        <p className="text-gray-300 text-xs">{student.level} • {student.year}</p>
                        <p className="text-blue-400 text-xs">Focus: {student.focus}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-gray-400 text-xs">
                      Total students supervised: {profile.stats.studentsSupervised}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <AnimatedFooter />
      </div>
    </div>
  )
}
