import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Download, Shield, Calendar, User, Award, ExternalLink } from 'lucide-react'
import Navbar from '@/components/navbar'
import AnimatedFooter from '@/components/animated-footer'
import BackgroundPaths from '@/components/background-paths'
import AnimatedBackground from '@/components/animated-background'
import BackgroundStripes from '@/components/background-stripes'

interface CertificatePageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: CertificatePageProps): Promise<Metadata> {
  const { id } = await params
  // In real implementation, fetch certificate data from Payload CMS
  return {
    title: `Certificate Details - Cyber Physical Lab`,
    description: 'Official certificate issued by Cyber Physical Lab',
  }
}

export default async function CertificatePage({ params }: CertificatePageProps) {
  const { id } = await params
  
  // Mock data - in real implementation, fetch from Payload CMS based on id
  const certificate = {
    id: id,
    title: "Outstanding Research Contribution Award",
    recipient: {
      name: "Dr. John Smith",
      id: "user-123",
      position: "Director & Principal Investigator"
    },
    issuedBy: "Cyber Physical Lab",
    issuer: {
      name: "Dr. Sarah Johnson",
      position: "Lab Director",
      signature: "/signature-placeholder.png"
    },
    issuedDate: "2024-06-15",
    description: "This certificate is awarded to Dr. John Smith in recognition of exceptional contributions to the field of cyber-physical systems research and outstanding mentorship excellence in guiding students and advancing scientific knowledge.",
    verificationCode: "CPL-2024-RC-001",
    certificateType: "Research Excellence",
    validUntil: "2025-06-15",
    criteria: [
      "Published significant research in top-tier journals",
      "Demonstrated excellence in mentoring students",
      "Contributed to advancing the field of cyber-physical systems",
      "Exhibited leadership in collaborative research projects"
    ],
    achievements: [
      "Lead author on 15+ peer-reviewed publications",
      "Mentored 8 PhD students to completion",
      "Secured $2.5M in research funding",
      "Keynote speaker at 5 international conferences"
    ],
    image: "/certificate-template.png",
    downloadUrl: `/certificates/${id}/download`,
    verificationUrl: `/certificates/${id}/verify`
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
              href={`/profile/${certificate.recipient.id}`}
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Link>

            {/* Certificate Header */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 mb-8">
              <div className="flex flex-col lg:flex-row items-start gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-8 h-8 text-yellow-400" />
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-medium">
                      {certificate.certificateType}
                    </span>
                  </div>
                  
                  <h1 className="text-4xl font-bold text-white mb-4">{certificate.title}</h1>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-white font-semibold mb-2">Certificate Details:</h3>
                      <div className="space-y-2 text-gray-300">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>Awarded to: {certificate.recipient.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Issued: {new Date(certificate.issuedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          <span>Verification: {certificate.verificationCode}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-semibold mb-2">Issued By:</h3>
                      <div className="space-y-2 text-gray-300">
                        <div>{certificate.issuedBy}</div>
                        <div className="text-sm text-gray-400">
                          Authorized by: {certificate.issuer.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {certificate.issuer.position}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href={certificate.downloadUrl}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download Certificate
                    </a>
                    <a
                      href={certificate.verificationUrl}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      Verify Authenticity
                    </a>
                    <a
                      href={`/profile/${certificate.recipient.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certificate Preview */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Certificate Preview</h2>
              <div className="bg-white rounded-lg p-8 border-4 border-gray-300">
                <div className="text-center mb-8">
                  <div className="text-3xl font-bold text-gray-800 mb-2">CYBER PHYSICAL LAB</div>
                  <div className="text-lg text-gray-600">Certificate of Excellence</div>
                </div>
                
                <div className="text-center mb-8">
                  <div className="text-xl text-gray-700 mb-4">This is to certify that</div>
                  <div className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
                    {certificate.recipient.name}
                  </div>
                  <div className="text-lg text-gray-600 mb-6">{certificate.recipient.position}</div>
                </div>
                
                <div className="text-center mb-8">
                  <div className="text-xl text-gray-700 mb-4">has been awarded the</div>
                  <div className="text-2xl font-bold text-gray-800 mb-6">
                    {certificate.title}
                  </div>
                  <div className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    {certificate.description}
                  </div>
                </div>
                
                <div className="flex justify-between items-end mt-12">
                  <div className="text-center">
                    <div className="border-t border-gray-400 pt-2 mb-2">
                      <div className="text-gray-700 font-semibold">{certificate.issuer.name}</div>
                      <div className="text-gray-600 text-sm">{certificate.issuer.position}</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-gray-600">
                      <div>Date: {new Date(certificate.issuedDate).toLocaleDateString()}</div>
                      <div className="text-sm mt-2">Verification: {certificate.verificationCode}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certificate Details */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Criteria */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-4">Award Criteria</h3>
                <ul className="space-y-3">
                  {certificate.criteria.map((criterion, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{criterion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-4">Notable Achievements</h3>
                <ul className="space-y-3">
                  {certificate.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Verification Info */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
              <div className="text-center">
                <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Certificate Verification</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  This certificate can be verified using the verification code: <strong>{certificate.verificationCode}</strong>
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-white font-semibold">Valid Until</div>
                    <div className="text-blue-400">{new Date(certificate.validUntil).toLocaleDateString()}</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-white font-semibold">Certificate ID</div>
                    <div className="text-blue-400">{certificate.id}</div>
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
