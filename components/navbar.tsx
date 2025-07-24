"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import AnimatedButton from "./animated-button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-4 left-2 right-2 sm:left-4 sm:right-4 z-50 mx-auto max-w-7xl">
      <motion.nav
        className="relative bg-gray-900/60 backdrop-blur-md border rounded-2xl shadow-lg overflow-hidden"
        animate={{
          borderColor: [
            "rgba(59, 130, 246, 0.3)",
            "rgba(147, 51, 234, 0.3)",
            "rgba(236, 72, 153, 0.3)",
            "rgba(34, 197, 94, 0.3)",
            "rgba(59, 130, 246, 0.3)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: [
              "0 0 20px rgba(59, 130, 246, 0.2)",
              "0 0 20px rgba(147, 51, 234, 0.2)",
              "0 0 20px rgba(236, 72, 153, 0.2)",
              "0 0 20px rgba(34, 197, 94, 0.2)",
              "0 0 20px rgba(59, 130, 246, 0.2)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="text-white text-lg sm:text-xl font-bold">
                  <span className="hidden sm:inline">Cyber Physical Lab</span>
                  <span className="sm:hidden">CPLab</span>
                </div>
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <Link href="/research" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">
                  Research
                </Link>
                <Link href="/team" className="text-sm text-gray-300 hover:text-purple-400 transition-colors">
                  Team
                </Link>
                <Link href="/publications" className="text-sm text-gray-300 hover:text-green-400 transition-colors">
                  Publications
                </Link>
                <Link href="/news" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  News
                </Link>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-pink-400 transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/admin"
                className="text-sm text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Admin Login
              </Link>
              <Link href="/research">
                <AnimatedButton size="sm" className="bg-white text-black hover:bg-gray-100">
                  Join Research
                </AnimatedButton>
              </Link>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5 text-gray-300" /> : <Menu className="h-5 w-5 text-gray-300" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-700/50 bg-gray-900/80 backdrop-blur-md rounded-b-2xl">
            <div className="px-4 sm:px-6 py-4 space-y-3">
              <Link 
                href="/research" 
                className="block text-gray-300 hover:text-blue-400 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Research
              </Link>
              <Link 
                href="/team" 
                className="block text-gray-300 hover:text-purple-400 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Team
              </Link>
              <Link 
                href="/publications" 
                className="block text-gray-300 hover:text-green-400 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Publications
              </Link>
              <Link 
                href="/news" 
                className="block text-gray-300 hover:text-orange-400 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                News
              </Link>
              <Link 
                href="/contact" 
                className="block text-gray-300 hover:text-pink-400 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-3 border-t border-gray-700">
                <Link 
                  href="/admin" 
                  className="block text-gray-300 hover:text-white py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Login
                </Link>
                <Link href="/research" className="block mt-2" onClick={() => setIsMenuOpen(false)}>
                  <AnimatedButton className="w-full bg-white text-black hover:bg-gray-100">Join Research</AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        )}
      </motion.nav>
    </header>
  )
}
