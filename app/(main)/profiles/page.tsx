import { Metadata } from 'next'
import Link from 'next/link'
import { Users, Plus, Search } from 'lucide-react'
import Navbar from '@/components/navbar'
import AnimatedFooter from '@/components/animated-footer'
import BackgroundPaths from '@/components/background-paths'
import AnimatedBackground from '@/components/animated-background'
import BackgroundStripes from '@/components/background-stripes'
import { getPayload } from 'payload'
import configPromise from '../../../payload-config'

export const metadata: Metadata = {
  title: 'Profiles - Cyber Physical Lab',
  description: 'Browse profiles of our lab members, researchers, and students.',
  openGraph: {
    title: 'Profiles - Cyber Physical Lab',
    description: 'Browse profiles of our lab members, researchers, and students.',
  },
}

async function getProfiles() {
  const payload = await getPayload({ config: configPromise })
  
  try {
    const profiles = await payload.find({
      collection: 'profiles',
      where: {
        isPublic: {
          equals: true,
        },
      },
      depth: 2,
      limit: 50,
      sort: '-createdAt',
    })

    return profiles.docs
  } catch (error) {
    console.error('Error fetching profiles:', error)
    return []
  }
}

export default async function ProfilesPage() {
  const profiles = await getProfiles()

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
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Lab <span className="text-blue-400">Profiles</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Meet our talented team members, researchers, and students who drive innovation in cyber-physical systems.
              </p>
            </div>

            {profiles.length > 0 ? (
              <>
                {/* Profiles Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {profiles.map((profile: any) => (
                    <div key={profile.id} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group">
                      {/* Profile Image */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                          {profile.profileImage?.url ? (
                            <img
                              src={profile.profileImage.url}
                              alt={profile.displayName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Users className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">
                            {profile.displayName}
                          </h3>
                          <p className="text-blue-400">{profile.position}</p>
                          {profile.department && (
                            <p className="text-gray-400 text-sm">{profile.department}</p>
                          )}
                        </div>
                      </div>

                      {/* Bio Preview */}
                      {profile.bio && (
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                          {profile.bio.length > 120 ? `${profile.bio.substring(0, 120)}...` : profile.bio}
                        </p>
                      )}

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <div className="flex gap-4">
                          {profile.stats?.totalProjects > 0 && (
                            <span>{profile.stats.totalProjects} Projects</span>
                          )}
                          {profile.stats?.totalPublications > 0 && (
                            <span>{profile.stats.totalPublications} Papers</span>
                          )}
                        </div>
                      </div>

                      {/* View Profile Button */}
                      <Link
                        href={`/profile/${profile.slug || profile.id}`}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-center transition-colors flex items-center justify-center gap-2"
                      >
                        View Profile
                        <Search className="w-4 h-4" />
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                    <h2 className="text-2xl font-bold text-white mb-4">Join Our Team</h2>
                    <p className="text-gray-300 mb-6">
                      Interested in being part of our innovative research community? We're always looking for talented individuals.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      Get in Touch
                      <Plus className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              // Empty State
              <div className="text-center">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50">
                  <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-12 h-12 text-gray-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">No Profiles Yet</h2>
                  <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                    We're building our team profiles! Check back soon to meet our talented researchers, students, and faculty members.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Link
                      href="/team"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      View Current Team
                    </Link>
                    <Link
                      href="/admin"
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      Admin Login
                    </Link>
                  </div>
                  
                  {/* Instructions for Admins */}
                  <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                    <h3 className="text-blue-300 font-semibold mb-2">For Administrators:</h3>
                    <p className="text-blue-100 text-sm">
                      To create profiles, log in to the admin panel at <code className="bg-blue-800/30 px-2 py-1 rounded">/admin</code> and navigate to the Profiles collection.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <AnimatedFooter />
      </div>
    </div>
  )
}
