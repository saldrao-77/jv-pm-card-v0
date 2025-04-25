"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { X } from "lucide-react"

export default function CalendarPage() {
  const searchParams = useSearchParams()
  const [showThankYou, setShowThankYou] = useState(false)
  const [isCalendlyLoading, setIsCalendlyLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [zapierTriggered, setZapierTriggered] = useState(false)

  useEffect(() => {
    // Check if the URL has the submitted parameter
    const isSubmitted = searchParams?.get("submitted") === "true"
    setShowThankYou(isSubmitted)

    // Trigger API webhook for calendar page visits with submitted=true
    if (isSubmitted && !zapierTriggered) {
      const triggerWebhook = async () => {
        try {
          // Check if we have a recent submission in sessionStorage
          const lastSubmission = sessionStorage.getItem("lastSubmission")
          let submissionData = {}

          if (lastSubmission) {
            try {
              const parsedSubmission = JSON.parse(lastSubmission)
              // Only use if it's recent (within last 5 minutes)
              if (Date.now() - parsedSubmission.timestamp < 5 * 60 * 1000) {
                submissionData = parsedSubmission
              }
            } catch (e) {
              console.error("Error parsing last submission:", e)
            }
          }

          // Prepare data for the webhook
          const data = {
            event: "calendar_visit",
            submittedAt: new Date().toISOString(),
            url: window.location.href,
            userAgent: window.navigator.userAgent,
            ...submissionData,
          }

          // Send to our API route instead of directly to Zapier
          await fetch("/api/webhook", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })

          setZapierTriggered(true)
        } catch (error) {
          console.error("Error triggering webhook:", error)
        }
      }

      triggerWebhook()
    }
  }, [searchParams, zapierTriggered])

  const handleClosePopup = () => {
    // Simply hide the popup
    setShowThankYou(false)

    // Update the URL without causing a page reload
    const newUrl = window.location.pathname
    window.history.pushState({}, "", newUrl)
  }

  const handleIframeLoad = () => {
    setIsCalendlyLoading(false)
  }

  // Add click outside handler
  const handlePopupBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the backdrop, not the popup content
    if (e.target === e.currentTarget) {
      handleClosePopup()
    }
  }

  // Add escape key handler
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showThankYou) {
        handleClosePopup()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [showThankYou])

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-16">
      {showThankYou && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={handlePopupBackdropClick}
        >
          <div className="bg-zinc-900 rounded-lg max-w-lg w-full p-6 relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
              aria-label="Close"
              type="button"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-400"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2 font-heading">Thank You!</h2>
            </div>

            <p className="text-white/80 mb-4 text-center">
              Thank you for your interest in JobVault. Our team will be reaching out to you shortly to discuss how we
              can help streamline your property expense management.
            </p>

            <p className="text-white/80 text-center">
              If you would like to set up time to chat now, feel free to book a demo with us directly on this page.
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 font-heading">BOOK A DEMO</h1>
        <p className="text-center text-white/70 mb-10 max-w-2xl mx-auto">
          Schedule a personalized demo with our team to see how JobVault can transform your property expense management.
        </p>

        <div className="max-w-5xl mx-auto">
          {isCalendlyLoading && (
            <div className="rounded-lg overflow-hidden bg-zinc-900 h-[900px] w-full flex flex-col items-center justify-center p-8">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
              <p className="text-white/70">Loading calendar...</p>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src="https://calendly.com/srao77/jobvault"
            width="100%"
            height="900"
            frameBorder="0"
            title="Schedule a demo with JobVault"
            className={`rounded-lg ${isCalendlyLoading ? "hidden" : "block"}`}
            onLoad={handleIframeLoad}
            loading="eager"
          ></iframe>
        </div>
      </div>
    </main>
  )
}
