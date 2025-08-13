import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Mail, ExternalLink, BookOpen, GraduationCap, Trophy, Calendar, Award, Globe, Github, Linkedin, MapPin, Users, Phone, Clock } from 'lucide-react'
import Navbar from '@/components/navbar'
import AnimatedFooter from '@/components/animated-footer'
import BackgroundPaths from '@/components/background-paths'
import AnimatedBackground from '@/components/animated-background'
import BackgroundStripes from '@/components/background-stripes'
import { getPayload } from 'payload'
import configPromise from '../../../../payload-config'

interface ProfilePageProps {
  params: Promise<{
    id: string
  }>
}

async function getProfile(id: string) {
  const payload = await getPayload({ config: configPromise })
  
  try {
    // First try to find by slug
    const profileBySlug = await payload.find({
      collection: 'profiles',
      where: {
        slug: {
          equals: id,
        },
      },
      depth: 3,
    })

    if (profileBySlug.docs.length > 0) {
      return profileBySlug.docs[0]
    }

    // Then try to find by ID (only if it looks like a valid ObjectId)
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const profile = await payload.findByID({
        collection: 'profiles',
        id: id,
        depth: 3,
      })
      return profile
    }

    // If not a valid ObjectId and not found by slug, return null
    return null
  } catch (error) {
    console.error('Error fetching profile:', error)
    return null
  }
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  try {
    const { id } = await params
    const profile = await getProfile(id)

    if (!profile) {
      return {
        title: 'Profile Not Found - Cyber Physical Lab',
        description: 'The requested profile could not be found.',
        openGraph: {
          title: 'Profile Not Found - Cyber Physical Lab',
          description: 'The requested profile could not be found.',
        },
      }
    }

    return {
      title: `${profile.displayName} - Cyber Physical Lab`,
      description: profile.bio || `Profile of ${profile.displayName} at Cyber Physical Lab`,
      openGraph: {
        title: `${profile.displayName} - Cyber Physical Lab`,
        description: profile.bio || `Profile of ${profile.displayName} at Cyber Physical Lab`,
        images: profile.profileImage?.url ? [profile.profileImage.url] : [],
      },
    }
  } catch (error) {
    // If there's any error in metadata generation, return default metadata
    return {
      title: 'Profile - Cyber Physical Lab',
      description: 'Lab member profile at Cyber Physical Lab',
      openGraph: {
        title: 'Profile - Cyber Physical Lab',
        description: 'Lab member profile at Cyber Physical Lab',
      },
    }
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params
  const profile = await getProfile(id)

  if (!profile) {
    return (
      <div className="relative min-h-screen bg-black">
        <BackgroundPaths />
        <AnimatedBackground />
        <BackgroundStripes />

        <div className="relative z-10">
          <Navbar />
          
          {/* Profile Not Found */}
          <section className="pt-32 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Link
                href="/team"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Team
              </Link>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50">
                <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">Profile Not Found</h1>
                <p className="text-gray-300 mb-8">
                  The profile you're looking for doesn't exist or hasn't been created yet.
                </p>
                <div className="flex justify-center gap-4">
                  <Link
                    href="/team"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    View Team
                  </Link>
                  <Link
                    href="/"
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
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

  if (!profile.isPublic) {
    return (
      <div className="relative min-h-screen bg-black">
        <BackgroundPaths />
        <AnimatedBackground />
        <BackgroundStripes />

        <div className="relative z-10">
          <Navbar />
          
          {/* Private Profile */}
          <section className="pt-32 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Link
                href="/team"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Team
              </Link>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50">
                <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">Profile Private</h1>
                <p className="text-gray-300 mb-8">
                  This profile is set to private and cannot be viewed publicly.
                </p>
                <Link
                  href="/team"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  View Team
                </Link>
              </div>
            </div>
          </section>

          <AnimatedFooter />
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-black">
      <BackgroundPaths />
      <AnimatedBackground />
      <BackgroundStripes />

      <div className="relative z-10">
        <Navbar />
        
        {/* Cover Image */}
        {profile.coverImage && (
          <div className="relative h-64 md:h-80 overflow-hidden">
            <Image
              src={profile.coverImage.url}
              alt={`${profile.displayName} cover`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        {/* Profile Header */}
        <section className={`${profile.coverImage ? 'pt-8' : 'pt-32'} pb-16`}>
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
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700">
                      {profile.profileImage?.url ? (
                        <Image
                          src={profile.profileImage.url}
                          alt={profile.displayName}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Users className="w-16 h-16" />
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-gray-800"></div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-grow">
                  <h1 className="text-4xl font-bold text-white mb-2">{profile.displayName}</h1>
                  <p className="text-xl text-blue-400 mb-4">{profile.position}</p>
                  {profile.department && (
                    <p className="text-gray-300 mb-4">{profile.department}</p>
                  )}
                  
                  {profile.bio && (
                    <p className="text-gray-300 mb-6 leading-relaxed">{profile.bio}</p>
                  )}

                  {/* Contact Information */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    {profile.socialLinks?.email && (
                      <a
                        href={`mailto:${profile.socialLinks.email}`}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </a>
                    )}
                    {profile.contactInfo?.phone && (
                      <a
                        href={`tel:${profile.contactInfo.phone}`}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Call
                      </a>
                    )}
                    {profile.socialLinks?.website && (
                      <a
                        href={profile.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        Website
                      </a>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="flex flex-wrap gap-3">
                    {profile.socialLinks?.linkedIn && (
                      <a
                        href={profile.socialLinks.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-[#0077B5] hover:bg-[#005885] rounded-lg transition-colors"
                      >
                        <Linkedin className="w-5 h-5 text-white" />
                      </a>
                    )}
                    {profile.socialLinks?.github && (
                      <a
                        href={profile.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800 hover:bg-gray-900 rounded-lg transition-colors"
                      >
                        <Github className="w-5 h-5 text-white" />
                      </a>
                    )}
                    {profile.socialLinks?.googleScholar && (
                      <a
                        href={profile.socialLinks.googleScholar}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        <BookOpen className="w-5 h-5 text-white" />
                      </a>
                    )}
                    {profile.socialLinks?.orcid && (
                      <a
                        href={`https://orcid.org/${profile.socialLinks.orcid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                      >
                        <Award className="w-5 h-5 text-white" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex lg:flex-col gap-6 lg:gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{profile.stats?.totalProjects || 0}</div>
                    <div className="text-gray-300 text-sm">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{profile.stats?.totalPublications || 0}</div>
                    <div className="text-gray-300 text-sm">Publications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{profile.stats?.totalCertificates || 0}</div>
                    <div className="text-gray-300 text-sm">Certificates</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{profile.stats?.yearsOfExperience || 0}</div>
                    <div className="text-gray-300 text-sm">Years Exp.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Research Interests */}
                {profile.researchInterests && profile.researchInterests.length > 0 && (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <BookOpen className="w-6 h-6" />
                      Research Interests
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {profile.researchInterests.map((interest: any, index: number) => (
                        <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                          <h3 className="text-white font-semibold mb-2">{interest.interest}</h3>
                          {interest.description && (
                            <p className="text-gray-300 text-sm">{interest.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {profile.achievements && profile.achievements.length > 0 && (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <Trophy className="w-6 h-6" />
                      Achievements & Awards
                    </h2>
                    <div className="space-y-4">
                      {profile.achievements.map((achievement: any, index: number) => (
                        <div key={index} className="flex items-start gap-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                              <Trophy className="w-6 h-6 text-yellow-400" />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-white font-semibold mb-1">{achievement.title}</h3>
                            {achievement.description && (
                              <p className="text-gray-300 mb-2">{achievement.description}</p>
                            )}
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              {achievement.date && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(achievement.date).getFullYear()}
                                </span>
                              )}
                              {achievement.category && (
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded">
                                  {achievement.category}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Publications */}
                {profile.publications && profile.publications.length > 0 && (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <BookOpen className="w-6 h-6" />
                      Publications
                    </h2>
                    <div className="space-y-4">
                      {profile.publications.map((publication: any, index: number) => (
                        <div key={index} className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                          <h3 className="text-white font-semibold mb-2">{publication.title}</h3>
                          <p className="text-gray-300 mb-2">{publication.authors}</p>
                          <div className="flex flex-wrap gap-2 text-sm text-gray-400 mb-2">
                            {publication.journal && (
                              <span>{publication.journal}</span>
                            )}
                            {publication.conference && (
                              <span>{publication.conference}</span>
                            )}
                            {publication.year && (
                              <span>• {publication.year}</span>
                            )}
                            {publication.type && (
                              <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded">
                                {publication.type}
                              </span>
                            )}
                          </div>
                          {publication.abstract && (
                            <p className="text-gray-300 text-sm mb-3">{publication.abstract}</p>
                          )}
                          {(publication.doi || publication.link) && (
                            <div className="flex gap-2">
                              {publication.doi && (
                                <a
                                  href={`https://doi.org/${publication.doi}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  DOI
                                </a>
                              )}
                              {publication.link && (
                                <a
                                  href={publication.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  View
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {profile.projects && profile.projects.length > 0 && (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <Globe className="w-6 h-6" />
                      Projects
                    </h2>
                    <div className="grid gap-6">
                      {profile.projects.map((project: any, index: number) => (
                        <div key={index} className="p-6 bg-gray-700/30 rounded-lg border border-gray-600/30">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              project.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                              project.status === 'in-progress' ? 'bg-blue-500/20 text-blue-300' :
                              'bg-yellow-500/20 text-yellow-300'
                            }`}>
                              {project.status?.replace('-', ' ')}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-4">{project.description}</p>
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.technologies.map((tech: any, techIndex: number) => (
                                <span key={techIndex} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">
                                  {tech.technology}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              {project.startDate && (
                                <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
                              )}
                              {project.endDate && (
                                <span>Ended: {new Date(project.endDate).toLocaleDateString()}</span>
                              )}
                            </div>
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                              >
                                <ExternalLink className="w-4 h-4" />
                                View Project
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* News Articles */}
                {profile.newsArticles && profile.newsArticles.length > 0 && (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <h2 className="text-2xl font-bold text-white mb-6">Recent News</h2>
                    <div className="space-y-4">
                      {profile.newsArticles.slice(0, 3).map((article: any, index: number) => (
                        <div key={article.id || index} className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                          <h3 className="text-white font-semibold mb-2">{article.title}</h3>
                          <p className="text-gray-300 mb-3">{article.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ''}</span>
                            <Link
                              href={`/news/${article.slug}`}
                              className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                            >
                              Read More
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Contact Information */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
                  <div className="space-y-3">
                    {profile.socialLinks?.email && profile.preferences?.showEmail !== false && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${profile.socialLinks.email}`} className="hover:text-blue-400">
                          {profile.socialLinks.email}
                        </a>
                      </div>
                    )}
                    {profile.contactInfo?.phone && profile.preferences?.showPhone && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${profile.contactInfo.phone}`} className="hover:text-blue-400">
                          {profile.contactInfo.phone}
                        </a>
                      </div>
                    )}
                    {profile.contactInfo?.office && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <MapPin className="w-4 h-4" />
                        <span>{profile.contactInfo.office}</span>
                      </div>
                    )}
                    {profile.contactInfo?.officeHours && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <Clock className="w-4 h-4" />
                        <span>{profile.contactInfo.officeHours}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Education */}
                {profile.education && profile.education.length > 0 && (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      Education
                    </h2>
                    <div className="space-y-4">
                      {profile.education.map((edu: any, index: number) => (
                        <div key={index} className="border-l-2 border-blue-500 pl-4">
                          <h3 className="text-white font-semibold">{edu.degree}</h3>
                          <p className="text-blue-400">{edu.institution}</p>
                          {edu.fieldOfStudy && (
                            <p className="text-gray-300 text-sm">{edu.fieldOfStudy}</p>
                          )}
                          <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                            {edu.startYear && edu.endYear ? (
                              <span>{edu.startYear} - {edu.endYear}</span>
                            ) : edu.isCurrentlyEnrolled ? (
                              <span>{edu.startYear} - Present</span>
                            ) : null}
                            {edu.gpa && (
                              <span>• GPA: {edu.gpa}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {profile.skills && profile.skills.length > 0 && (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <h2 className="text-xl font-bold text-white mb-4">Skills</h2>
                    <div className="space-y-4">
                      {['programming', 'research', 'technical', 'soft', 'other'].map((category) => {
                        const categorySkills = profile.skills.filter((skill: any) => skill.category === category)
                        if (categorySkills.length === 0) return null
                        
                        return (
                          <div key={category}>
                            <h3 className="text-white font-semibold mb-2 capitalize">
                              {category === 'soft' ? 'Soft Skills' : category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {categorySkills.map((skill: any, index: number) => (
                                <span
                                  key={index}
                                  className={`px-2 py-1 rounded text-sm ${
                                    skill.level === 'expert' ? 'bg-red-500/20 text-red-300' :
                                    skill.level === 'advanced' ? 'bg-orange-500/20 text-orange-300' :
                                    skill.level === 'intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                                    'bg-green-500/20 text-green-300'
                                  }`}
                                >
                                  {skill.skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Certificates */}
                {profile.certificates && profile.certificates.length > 0 && (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Certificates
                    </h2>
                    <div className="space-y-3">
                      {profile.certificates.slice(0, 5).map((certificate: any, index: number) => (
                        <div key={certificate.id || index} className="p-3 bg-gray-700/30 rounded-lg">
                          <h3 className="text-white font-medium">{certificate.title}</h3>
                          <p className="text-gray-400 text-sm">{certificate.issuer || certificate.issuedBy}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-gray-400 text-xs">
                              {certificate.issuedDate ? new Date(certificate.issuedDate).getFullYear() : ''}
                            </span>
                            <Link
                              href={`/lab-certificates/${certificate.id}`}
                              className="text-blue-400 hover:text-blue-300 text-xs"
                            >
                              View Certificate
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Work Experience */}
                {profile.workExperience && profile.workExperience.length > 0 && (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <h2 className="text-xl font-bold text-white mb-4">Work Experience</h2>
                    <div className="space-y-4">
                      {profile.workExperience.map((work: any, index: number) => (
                        <div key={index} className="border-l-2 border-green-500 pl-4">
                          <h3 className="text-white font-semibold">{work.title}</h3>
                          <p className="text-green-400">{work.company}</p>
                          {work.location && (
                            <p className="text-gray-300 text-sm">{work.location}</p>
                          )}
                          <div className="text-gray-400 text-sm mt-1">
                            {work.startDate && (
                              <span>
                                {new Date(work.startDate).getFullYear()} - 
                                {work.isCurrentPosition ? ' Present' : 
                                 work.endDate ? ` ${new Date(work.endDate).getFullYear()}` : ' Present'}
                              </span>
                            )}
                          </div>
                          {work.description && (
                            <p className="text-gray-300 text-sm mt-2">{work.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <AnimatedFooter />
      </div>
    </div>
  )
}
