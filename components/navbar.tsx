"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-sm py-3" : "bg-zinc-900/50 backdrop-blur-[2px] py-5"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/jobvault-logo.png" alt="JobVault" width={150} height={40} />
        </Link>

        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="text-sm text-white/90 hover:text-white">
            Home
          </Link>
          <Link href="/faq" className="text-sm text-white/90 hover:text-white">
            FAQ
          </Link>
          <Link href="/pricing" className="text-sm text-white/90 hover:text-white">
            Pricing
          </Link>
          <Link href="/about" className="text-sm text-white/90 hover:text-white">
            About Us
          </Link>
          <Link href="/get-started" className="text-sm text-white/90 hover:text-white">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              Get Started
            </Button>
          </Link>
        </div>

        <Button className="md:hidden" variant="ghost" size="icon" onClick={toggleMobileMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm py-4 px-4 absolute w-full">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-white py-2 px-4 hover:bg-zinc-800 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/faq"
              className="text-white py-2 px-4 hover:bg-zinc-800 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/pricing"
              className="text-white py-2 px-4 hover:bg-zinc-800 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-white py-2 px-4 hover:bg-zinc-800 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/get-started"
              className="text-white py-2 px-4 hover:bg-zinc-800 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
