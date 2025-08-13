import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, User, TestTube, Database } from 'lucide-react'
import Navbar from '@/components/navbar'
import AnimatedFooter from '@/components/animated-footer'
import BackgroundPaths from '@/components/background-paths'
import AnimatedBackground from '@/components/animated-background'
import BackgroundStripes from '@/components/background-stripes'

export const metadata: Metadata = {
  title: 'Profile Testing - Cyber Physical Lab',
  description: 'Test profile creation and management system.',
}

export default function ProfileTestPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <BackgroundPaths />
      <AnimatedBackground />
      <BackgroundStripes />

      <div className="relative z-10">
        <Navbar />
        
        <section className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/profiles"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profiles
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Profile <span className="text-blue-400">Testing</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Test the profile creation and management system.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Test Profile Creation */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-6">
                  <TestTube className="w-8 h-8 text-blue-400" />
                  <h2 className="text-2xl font-bold text-white">Test Creation</h2>
                </div>
                <p className="text-gray-300 mb-6">
                  Create a test profile using our API endpoint to verify the system is working.
                </p>
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch('/api/profiles/test', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      })
                      const result = await response.json()
                      if (response.ok) {
                        alert('Test profile created successfully! Check the profiles page.')
                      } else {
                        alert('Error: ' + result.error)
                      }
                    } catch (error) {
                      alert('Error creating test profile: ' + error)
                    }
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <User className="w-5 h-5" />
                  Create Test Profile
                </button>
              </div>

              {/* Admin Panel Access */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <div className="flex items-center gap-3 mb-6">
                  <Database className="w-8 h-8 text-green-400" />
                  <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
                </div>
                <p className="text-gray-300 mb-6">
                  Access the PayloadCMS admin panel to create and manage profiles manually.
                </p>
                <Link
                  href="/admin"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Database className="w-5 h-5" />
                  Open Admin Panel
                </Link>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-12 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">How to Create Profiles</h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex gap-4">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Admin Panel Method</h3>
                    <p>Go to <code className="bg-gray-700 px-2 py-1 rounded">/admin</code> → Collections → Profiles → Add New</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Test Profile Method</h3>
                    <p>Use the "Create Test Profile" button above to generate a sample profile</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Required Fields</h3>
                    <p>Make sure to fill: Display Name, Position, User (link to existing user), and set "Is Public" to true</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">View Profile</h3>
                    <p>Once created, view profiles at <code className="bg-gray-700 px-2 py-1 rounded">/profiles</code> or directly via <code className="bg-gray-700 px-2 py-1 rounded">/profile/[slug]</code></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Status */}
            <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
              <h3 className="text-yellow-300 font-semibold mb-2">Current Status:</h3>
              <p className="text-yellow-100 text-sm">
                The profile system is set up and ready to use. If you encounter any JSON parsing errors, 
                try using the test profile creation above first to verify the API is working correctly.
              </p>
            </div>
          </div>
        </section>

        <AnimatedFooter />
      </div>
    </div>
  )
}
