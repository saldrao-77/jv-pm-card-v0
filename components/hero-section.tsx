"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building, CreditCard, Receipt } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [email, setEmail] = useState("")
  const router = useRouter()
  const [utmParams, setUtmParams] = useState({
    utmSource: null,
    utmMedium: null,
    utmCampaign: null,
  })

  // Get UTM parameters from URL on client side
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    setUtmParams({
      utmSource: searchParams.get("utm_source"),
      utmMedium: searchParams.get("utm_medium"),
      utmCampaign: searchParams.get("utm_campaign"),
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      try {
        // Get client IP address (this will be replaced by the server)
        const ipResponse = await fetch("https://api.ipify.org?format=json")
        const ipData = await ipResponse.json()

        // Detect if user is on mobile
        const isMobile = /mobile|android|iphone|ipad|ipod/i.test(window.navigator.userAgent.toLowerCase())

        // Create the submission data
        const formData = {
          email,
          source: "hero",
          submittedAt: new Date().toISOString(),
          url: window.location.href,
          userAgent: window.navigator.userAgent,
          ip: ipData.ip,
          utmSource: utmParams.utmSource,
          utmMedium: utmParams.utmMedium,
          utmCampaign: utmParams.utmCampaign,
          deviceType: isMobile ? "mobile" : "desktop",
        }

        // Send to our API route
        const response = await fetch("/api/webhook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error("Failed to submit form")
        }

        // Store the hero submission in sessionStorage to track the journey
        sessionStorage.setItem(
          "heroSubmission",
          JSON.stringify({
            ...formData,
            timestamp: Date.now(),
          }),
        )

        // Redirect to get-started page with email prefilled and source tracking
        router.push(`/get-started?email=${encodeURIComponent(email)}&from=hero`)
      } catch (error) {
        console.error("Error sending to API:", error)
        // Still redirect even if API call fails
        router.push(`/get-started?email=${encodeURIComponent(email)}&from=hero`)
      }
    }
  }

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-16">
      <div className="absolute inset-0 z-0 hidden md:block">
        <Image
          src="/images/PM.webp"
          alt="Property Management"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "center" }}
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>
      <div className="absolute inset-0 z-0 bg-black md:hidden"></div>

      <div className="container relative z-10 mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto font-heading tracking-tight">
          Bring order to property expenses
        </h1>

        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Give your PMs the tools to spend smarter. With trackable cards, instant receipt uploads, and AI-driven spend
          insights, you'll finally know who spent what, when—and why. And get 2% cash back while doing it.
        </p>

        <div className="max-w-md mx-auto mb-8">
          <form className="flex flex-col sm:flex-row gap-2" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="bg-white text-black hover:bg-white/90 whitespace-nowrap font-medium">
              Get started today
            </Button>
          </form>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="tel:+12625018982"
              className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-400"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Call Us
            </a>
            <a
              href="sms:+12625018982"
              className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-400"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Text Us
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <div className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
            <Building className="h-4 w-4 text-blue-400" />
            Saves PMs $50K+ annually
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-blue-400" />
            $1.2M+ spend tracked
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
            <Receipt className="h-4 w-4 text-blue-400" />
            4.9/5 satisfaction rating
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
    </section>
  )
}
