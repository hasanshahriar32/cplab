import { Metadata } from 'next'
import { Shield, CheckCircle, XCircle, Search } from 'lucide-react'
import Navbar from '@/components/navbar'
import AnimatedFooter from '@/components/animated-footer'
import BackgroundPaths from '@/components/background-paths'
import AnimatedBackground from '@/components/animated-background'
import BackgroundStripes from '@/components/background-stripes'

interface VerifyPageProps {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    code?: string
  }>
}

export async function generateMetadata({ params }: VerifyPageProps): Promise<Metadata> {
  return {
    title: `Certificate Verification - Cyber Physical Lab`,
    description: 'Verify the authenticity of certificates issued by Cyber Physical Lab',
  }
}

export default async function VerifyPage({ params, searchParams }: VerifyPageProps) {
  const { id } = await params
  const { code } = await searchParams
  
  // Mock verification logic - in real implementation, check against database
  const isValidCertificate = id && (code === 'CPL-2024-RC-001' || !code)
  
  const certificateData = isValidCertificate ? {
    id: id,
    title: "Outstanding Research Contribution Award",
    recipient: "Dr. John Smith",
    issuedDate: "2024-06-15",
    verificationCode: "CPL-2024-RC-001",
    status: "Valid",
    issuer: "Cyber Physical Lab",
    authorizedBy: "Dr. Sarah Johnson"
  } : null

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
            <div className="text-center mb-12">
              <Shield className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">Certificate Verification</h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Verify the authenticity of certificates issued by the Cyber Physical Lab
              </p>
            </div>

            {/* Verification Form */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Verification Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-white font-semibold mb-2">Certificate ID</label>
                  <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-gray-300">
                    {id || 'Not provided'}
                  </div>
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Verification Code</label>
                  <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-gray-300">
                    {code || 'Not provided'}
                  </div>
                </div>
              </div>

              {/* Verification Result */}
              {isValidCertificate && certificateData ? (
                <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                    <div>
                      <h3 className="text-xl font-bold text-green-400">Certificate Verified</h3>
                      <p className="text-green-300">This certificate is authentic and valid</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-3">
                      <div>
                        <span className="text-green-200 font-semibold">Certificate Title:</span>
                        <div className="text-white">{certificateData.title}</div>
                      </div>
                      <div>
                        <span className="text-green-200 font-semibold">Recipient:</span>
                        <div className="text-white">{certificateData.recipient}</div>
                      </div>
                      <div>
                        <span className="text-green-200 font-semibold">Issue Date:</span>
                        <div className="text-white">{new Date(certificateData.issuedDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-green-200 font-semibold">Issued By:</span>
                        <div className="text-white">{certificateData.issuer}</div>
                      </div>
                      <div>
                        <span className="text-green-200 font-semibold">Authorized By:</span>
                        <div className="text-white">{certificateData.authorizedBy}</div>
                      </div>
                      <div>
                        <span className="text-green-200 font-semibold">Status:</span>
                        <div className="text-green-400 font-semibold">{certificateData.status}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-green-500/30">
                    <a
                      href={`/lab-certificates/${id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      View Full Certificate
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle className="w-8 h-8 text-red-400" />
                    <div>
                      <h3 className="text-xl font-bold text-red-400">Verification Failed</h3>
                      <p className="text-red-300">
                        {!id ? 'No certificate ID provided' : 
                         !code ? 'No verification code provided' : 
                         'Certificate could not be verified'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-red-200">
                    <p>Please ensure you have:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>The correct certificate ID</li>
                      <li>The correct verification code</li>
                      <li>The certificate is still valid</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Manual Verification */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Manual Verification</h2>
              <p className="text-gray-300 mb-6">
                If you need to verify a certificate manually, please enter the certificate details below:
              </p>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Certificate ID</label>
                    <input
                      type="text"
                      placeholder="Enter certificate ID"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Verification Code</label>
                    <input
                      type="text"
                      placeholder="Enter verification code"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Verify Certificate
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Verification Guidelines */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
              <h2 className="text-2xl font-bold text-white mb-6">Verification Guidelines</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">What You Need</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Valid certificate ID</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Verification code from the certificate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Certificate must be within validity period</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Contact Support</h3>
                  <div className="space-y-2 text-gray-300">
                    <p>If you're having trouble verifying a certificate:</p>
                    <div className="mt-4">
                      <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                      >
                        Contact Us
                      </a>
                    </div>
                  </div>
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
