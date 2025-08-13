import { Metadata } from 'next'
import { Shield, Search, HelpCircle, CheckCircle } from 'lucide-react'
import Navbar from '@/components/navbar'
import AnimatedFooter from '@/components/animated-footer'
import BackgroundPaths from '@/components/background-paths'
import AnimatedBackground from '@/components/animated-background'
import BackgroundStripes from '@/components/background-stripes'

export const metadata: Metadata = {
  title: 'Certificate Verification - Cyber Physical Lab',
  description: 'Verify the authenticity of certificates issued by the Cyber Physical Lab',
}

export default function VerificationPage() {
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
                Verify the authenticity of certificates issued by the Cyber Physical Lab using the certificate ID and verification code
              </p>
            </div>
          </div>
        </section>

        {/* Verification Form */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Verify Certificate</h2>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Certificate ID <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="certificateId"
                      placeholder="e.g., cert-001"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                      required
                    />
                    <p className="text-gray-400 text-sm mt-1">
                      Find this on the certificate document
                    </p>
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Verification Code <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="verificationCode"
                      placeholder="e.g., CPL-2024-RC-001"
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                      required
                    />
                    <p className="text-gray-400 text-sm mt-1">
                      Usually found at the bottom of the certificate
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Recipient Name (Optional)
                  </label>
                  <input
                    type="text"
                    name="recipientName"
                    placeholder="e.g., Dr. John Smith"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                  />
                  <p className="text-gray-400 text-sm mt-1">
                    This helps us verify the certificate more accurately
                  </p>
                </div>
                
                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  <Search className="w-5 h-5" />
                  Verify Certificate
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* How to Find Information */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">How to Find Certificate Information</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-400" />
                    Certificate ID
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Usually found in the top-right corner</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Format: cert-XXX (e.g., cert-001)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>May be labeled as "Certificate ID" or "ID"</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-green-400" />
                    Verification Code
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Located at the bottom of the certificate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Format: CPL-YYYY-XX-XXX</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>May include QR code for quick verification</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 text-center">
                <CheckCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Instant Verification</h3>
                <p className="text-gray-300 text-sm">
                  Get immediate results on certificate authenticity and validity status
                </p>
              </div>
              
              <div className="bg-green-900/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 text-center">
                <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Secure Verification</h3>
                <p className="text-gray-300 text-sm">
                  Our verification system uses secure protocols to ensure data integrity
                </p>
              </div>
              
              <div className="bg-purple-900/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 text-center">
                <Search className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Detailed Results</h3>
                <p className="text-gray-300 text-sm">
                  View comprehensive certificate details including recipient and issue date
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/50 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Need Help?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                If you're having trouble finding the certificate information or verifying a certificate, 
                our support team is here to help.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Contact Support
                </a>
                <a
                  href="/lab-certificates"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Browse Certificates
                </a>
              </div>
            </div>
          </div>
        </section>

        <AnimatedFooter />
      </div>
    </div>
  )
}
