"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function GetStartedPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [properties, setProperties] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFromHero, setIsFromHero] = useState(false)
  const router = useRouter()
  const [utmParams, setUtmParams] = useState({
    utmSource: null,
    utmMedium: null,
    utmCampaign: null,
  })

  // Get UTM parameters and email from URL on client side
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(emailParam)
    }

    // Check if user came from hero section
    const fromParam = searchParams.get("from")
    setIsFromHero(fromParam === "hero")

    setUtmParams({
      utmSource: searchParams.get("utm_source"),
      utmMedium: searchParams.get("utm_medium"),
      utmCampaign: searchParams.get("utm_campaign"),
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Get client IP address (this will be replaced by the server)
      const ipResponse = await fetch("https://api.ipify.org?format=json")
      const ipData = await ipResponse.json()

      // Detect if user is on mobile
      const isMobile = /mobile|android|iphone|ipad|ipod/i.test(window.navigator.userAgent.toLowerCase())

      // Get hero submission data if available
      let heroData = null
      try {
        const heroSubmissionStr = sessionStorage.getItem("heroSubmission")
        if (heroSubmissionStr) {
          heroData = JSON.parse(heroSubmissionStr)
        }
      } catch (e) {
        console.error("Error parsing hero submission:", e)
      }

      // Create the submission data
      const formData = {
        name,
        email,
        company,
        properties,
        source: "get-started",
        submittedAt: new Date().toISOString(),
        url: window.location.href,
        userAgent: window.navigator.userAgent,
        ip: ipData.ip,
        utmSource: utmParams.utmSource,
        utmMedium: utmParams.utmMedium,
        utmCampaign: utmParams.utmCampaign,
        deviceType: isMobile ? "mobile" : "desktop",
        isFromHero: isFromHero || !!heroData,
        heroSubmissionTime: heroData?.timestamp ? new Date(heroData.timestamp).toISOString() : null,
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

      // Store submission in sessionStorage to check on calendar page
      sessionStorage.setItem(
        "lastSubmission",
        JSON.stringify({
          ...formData,
          timestamp: Date.now(),
        }),
      )

      // Clear hero submission data after successful get-started submission
      sessionStorage.removeItem("heroSubmission")

      // Redirect to the calendar page with the submitted parameter
      router.push("/calendar?submitted=true")
    } catch (error) {
      console.error("Error processing submission:", error)
      // Still redirect even if notification fails
      router.push("/calendar?submitted=true")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 font-heading">GET STARTED WITH JOBVAULT</h1>
        <p className="text-center text-white/70 mb-16 max-w-2xl mx-auto">
          Fill out the form below to get started with JobVault and take control of your property expenses.
        </p>

        <div className="max-w-md mx-auto bg-zinc-900 p-8 rounded-lg">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name *
              </label>
              <Input
                id="name"
                placeholder="John Smith"
                className="bg-zinc-800 border-zinc-700"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address *
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="bg-zinc-800 border-zinc-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-1">
                Company Name *
              </label>
              <Input
                id="company"
                placeholder="Your Property Management Company"
                className="bg-zinc-800 border-zinc-700"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="properties" className="block text-sm font-medium mb-1">
                How many properties do you manage? *
              </label>
              <select
                id="properties"
                className="w-full rounded-md bg-zinc-800 border-zinc-700 p-2"
                value={properties}
                onChange={(e) => setProperties(e.target.value)}
                required
              >
                <option value="">Select an option</option>
                <option value="1-10">1-10 properties</option>
                <option value="11-50">11-50 properties</option>
                <option value="51-200">51-200 properties</option>
                <option value="200+">200+ properties</option>
              </select>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Get Started Today"}
            </Button>

            <p className="text-center text-white/60 text-sm mt-2">We'll reach out to you shortly after submission.</p>

            <div className="text-center mt-4">
              <p className="text-white/60 text-sm">Or</p>
              <Link
                href="/calendar"
                className="text-blue-400 hover:text-blue-300 inline-block mt-2 bg-transparent border border-blue-400 rounded-md px-4 py-2 text-sm transition-colors hover:bg-blue-400/10"
              >
                Book a demo with our team now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
