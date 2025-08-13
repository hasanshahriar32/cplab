import { Metadata } from 'next'
import Link from 'next/link'
import { Award, Calendar, User, Shield, Search, Filter } from 'lucide-react'
import Navbar from '@/components/navbar'
import AnimatedFooter from '@/components/animated-footer'
import BackgroundPaths from '@/components/background-paths'
import AnimatedBackground from '@/components/animated-background'
import BackgroundStripes from '@/components/background-stripes'

export const metadata: Metadata = {
  title: 'Lab Certificates - Cyber Physical Lab',
  description: 'Browse and verify official certificates issued by the Cyber Physical Lab',
}

export default function CertificatesPage() {
  // Mock data - in real implementation, fetch from Payload CMS
  const certificates = [
    {
      id: 'cert-001',
      title: 'Outstanding Research Contribution Award',
      recipient: {
        name: 'Dr. John Smith',
        id: 'user-123',
        position: 'Director & Principal Investigator'
      },
      type: 'Research Excellence',
      issuedDate: '2024-06-15',
      verificationCode: 'CPL-2024-RC-001',
      description: 'Awarded for exceptional contributions to cyber-physical systems research',
      status: 'Active'
    },
    {
      id: 'cert-002',
      title: 'Innovation in Smart Systems',
      recipient: {
        name: 'Dr. Maria Garcia',
        id: 'user-124',
        position: 'Senior Research Scientist'
      },
      type: 'Innovation Award',
      issuedDate: '2024-05-20',
      verificationCode: 'CPL-2024-IN-002',
      description: 'Recognition for groundbreaking work in smart system integration',
      status: 'Active'
    },
    {
      id: 'cert-003',
      title: 'Excellence in Student Mentorship',
      recipient: {
        name: 'Prof. David Chen',
        id: 'user-125',
        position: 'Associate Professor'
      },
      type: 'Teaching Excellence',
      issuedDate: '2024-04-10',
      verificationCode: 'CPL-2024-TE-003',
      description: 'Outstanding dedication to student guidance and academic development',
      status: 'Active'
    },
    {
      id: 'cert-004',
      title: 'Industry Collaboration Award',
      recipient: {
        name: 'Dr. Sarah Johnson',
        id: 'user-126',
        position: 'Industry Liaison Director'
      },
      type: 'Partnership Excellence',
      issuedDate: '2024-03-15',
      verificationCode: 'CPL-2024-PE-004',
      description: 'Excellence in fostering industry-academia partnerships',
      status: 'Active'
    }
  ]

  const certificateTypes = [
    'All Types',
    'Research Excellence',
    'Innovation Award',
    'Teaching Excellence',
    'Partnership Excellence'
  ]

  return (
    <div className="relative min-h-screen bg-black">
      <BackgroundPaths />
      <AnimatedBackground />
      <BackgroundStripes />

      <div className="relative z-10">
        <Navbar />
        
        {/* Header */}
        <section className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Award className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">Lab Certificates</h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Official certificates and awards issued by the Cyber Physical Lab to recognize excellence and achievement
              </p>
            </div>

            {/* Search and Filter */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search certificates by recipient, title, or verification code..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>
                <div className="lg:w-64">
                  <div className="relative">
                    <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <select className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400 appearance-none">
                      {certificateTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certificates Grid */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
                >
                  {/* Certificate Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Award className="w-8 h-8 text-yellow-400" />
                      <div>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                          {certificate.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-400 text-sm font-medium">{certificate.status}</span>
                    </div>
                  </div>

                  {/* Certificate Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {certificate.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{certificate.description}</p>

                  {/* Recipient Info */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-gray-300">
                      <User className="w-4 h-4" />
                      <span>
                        <Link
                          href={`/profile/${certificate.recipient.id}`}
                          className="text-blue-400 hover:text-blue-300 font-medium"
                        >
                          {certificate.recipient.name}
                        </Link>
                        <span className="text-gray-400 ml-2">• {certificate.recipient.position}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>Issued: {new Date(certificate.issuedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Shield className="w-4 h-4" />
                      <span>Verification: {certificate.verificationCode}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/lab-certificates/${certificate.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
                    >
                      View Certificate
                    </Link>
                    <Link
                      href={`/lab-certificates/${certificate.id}/verify?code=${certificate.verificationCode}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-sm"
                    >
                      <Shield className="w-4 h-4" />
                      Verify
                    </Link>
                    <Link
                      href={`/profile/${certificate.recipient.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors text-sm"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Certificate Statistics</h2>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">4</div>
                  <div className="text-gray-300">Total Certificates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">4</div>
                  <div className="text-gray-300">Active Certificates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">4</div>
                  <div className="text-gray-300">Unique Recipients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">4</div>
                  <div className="text-gray-300">Certificate Types</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Verification Info */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="text-center mb-8">
                <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-4">Certificate Verification</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  All certificates issued by the Cyber Physical Lab can be verified using their unique verification codes.
                  Click on any certificate to view full details or verify its authenticity.
                </p>
              </div>
              
              <div className="text-center">
                <Link
                  href="/lab-certificates/verify"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  Verify a Certificate
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
