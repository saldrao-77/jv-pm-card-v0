"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { CreditCard, Smartphone, Receipt, Activity, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


const carouselItems = [
  {
    id: "card-issuing",
    icon: <CreditCard className="h-6 w-6" />,
    emoji: "🪪",
    title: "Instant Card Issuing",
    description:
      "Issue virtual or physical cards in seconds — assign by person, vendor, or property. Eliminate reimbursements and earn 2% cashback on all expenses. No more shared cards or chasing approvals.",
    image: "/images/card-11.png",
  },
  {
    id: "tap-to-pay",
    icon: <Smartphone className="h-6 w-6" />,
    emoji: "📱",
    title: "Tap-to-Pay + Wallet Support",
    description:
      "Team members can add cards to Apple Wallet for seamless, controlled spend — without needing the owner's card.",
    image: "/images/card-1.png",
  },
  {
    id: "receipts",
    icon: <Receipt className="h-6 w-6" />,
    emoji: "🧾",
    title: "Snap Receipts Instantly",
    description:
      "Your team snaps a receipt right at checkout. JobVault matches it to the right charge, vendor, and building — no manual upload needed.",
    image: "/images/card-2.png",
  },
  {
    id: "expense-feed",
    icon: <Activity className="h-6 w-6" />,
    emoji: "📋",
    title: "Live Expense Feed",
    description:
      "Track every purchase in real time — who spent, where, how much, and what it was for. Filter by vendor, property, or cardholder. Export clean, tagged expense reports that make it easy to reconcile to owner trust accounts.",
    image: "/images/analytics.png",
  },
]

export function CarouselSection() {
  const [activeItem, setActiveItem] = useState(carouselItems[0].id)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  // Log initial component state
  console.log("🏁 COMPONENT LOADED: CarouselSection initialized")
  console.log("🏁 COMPONENT LOADED: Initial phoneNumber:", phoneNumber)
  console.log("🏁 COMPONENT LOADED: Initial isLoading:", isLoading)

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItem((current) => {
        const currentIndex = carouselItems.findIndex((item) => item.id === current)
        const nextIndex = (currentIndex + 1) % carouselItems.length
        return carouselItems[nextIndex].id
      })
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Handle phone number input - only allow numbers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const value = rawValue.replace(/\D/g, '') // Remove non-digits
    console.log("📱 PHONE INPUT: Raw value:", rawValue)
    console.log("📱 PHONE INPUT: Cleaned value:", value)
    console.log("📱 PHONE INPUT: Length:", value.length)
    setPhoneNumber(value)
    setMessage("") // Clear any previous messages
  }

  // Format phone number for display
  const formatPhoneNumber = (phone: string) => {
    if (phone.length <= 3) return phone
    if (phone.length <= 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`
  }

  const handleGetDemo = async () => {
    console.log("🚀 STEP 1: Button clicked! Phone number:", phoneNumber)
    console.log("🚀 STEP 1: Phone number length:", phoneNumber.length)
    console.log("🚀 STEP 1: Phone number type:", typeof phoneNumber)
    
    if (!phoneNumber || phoneNumber.length < 10) {
      console.log("❌ STEP 2: Phone number validation failed:", {
        phoneNumber,
        length: phoneNumber.length,
        isEmpty: !phoneNumber
      })
      setMessage("Please enter a valid 10-digit phone number")
      return
    }

    console.log("✅ STEP 2: Phone number validation passed")
    console.log("📱 STEP 3: Setting loading state to true")
    setIsLoading(true)
    setMessage("")

    try {
      console.log("📡 STEP 4: Making API call to /api/send-sms")
      console.log("📡 STEP 4: Request payload:", { phoneNumber })
      
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber
        }),
      })

      console.log("📨 STEP 5: API response received")
      console.log("📨 STEP 5: Response status:", response.status)
      console.log("📨 STEP 5: Response ok:", response.ok)
      
      const data = await response.json()
      console.log("📨 STEP 6: Response data parsed:", data)

      if (response.ok) {
        console.log("✅ STEP 7: Success! Setting success message")
        setMessage("✅ Demo request sent! Check your phone for details.")
        setPhoneNumber("") // Clear the input
      } else {
        console.log("❌ STEP 7: API error, setting error message")
        setMessage(`❌ Failed to send: ${data.error}`)
      }
    } catch (error: any) {
      console.error('❌ STEP 7: Exception caught:', error)
      console.error('❌ STEP 7: Error message:', error.message)
      console.error('❌ STEP 7: Error stack:', error.stack)
      setMessage("❌ Something went wrong. Please try again.")
    } finally {
      console.log("🔄 STEP 8: Setting loading state to false")
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-heading">SEE IT IN ACTION</h2>
        
        {/* Demo Request Section */}
        <div className="flex flex-col items-center justify-center mb-16">
          <p className="text-center text-white/70 mb-8 max-w-2xl mx-auto">
            Enter your phone number to get a demo via text and see how JobVault works.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-lg mx-auto">
            <div className="relative w-full sm:w-auto flex-shrink-0">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50 z-10" />
              <Input
                type="tel"
                placeholder="(555) 123-4567"
                value={formatPhoneNumber(phoneNumber)}
                onChange={handlePhoneChange}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 w-full sm:w-48 text-center"
                maxLength={14}
                disabled={isLoading}
              />
            </div>
            <Button 
              onClick={() => {
                console.log("🔴 BUTTON WRAPPER: Button clicked!")
                console.log("🔴 BUTTON WRAPPER: Current phone number:", phoneNumber)
                console.log("🔴 BUTTON WRAPPER: Is loading:", isLoading)
                console.log("🔴 BUTTON WRAPPER: About to call handleGetDemo()")
                handleGetDemo()
              }}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium px-8 py-2 whitespace-nowrap w-full sm:w-auto flex-shrink-0"
            >
              {isLoading ? "Sending..." : "Get Free Demo"}
            </Button>
          </div>
          
          {message && (
            <div className="mt-4 text-center">
              <p className={`text-sm ${message.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            </div>
          )}
        </div>

        <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-2xl">
          <div className="p-2 bg-zinc-800 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2 space-y-4">
                {carouselItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-md cursor-pointer transition-all ${
                      activeItem === item.id
                        ? "bg-blue-900/20 border border-blue-800/50"
                        : "bg-zinc-800 hover:bg-zinc-700"
                    }`}
                    onClick={() => setActiveItem(item.id)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{item.emoji}</span>
                      <h3 className="font-medium font-heading">{item.title}</h3>
                    </div>
                    <p className="text-sm text-white/70">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="md:col-span-3 bg-zinc-800 rounded-md p-4 flex items-center justify-center">
                <div className="relative w-full h-[550px] flex items-center justify-center">
                  {carouselItems.map((item) => (
                    <div
                      key={item.id}
                      className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${
                        activeItem === item.id ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      {item.id === "receipts" ? (
                        <div className="h-full w-full flex items-center justify-center">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={300}
                            height={550}
                            className="h-full w-auto max-h-[550px] rounded-lg object-contain"
                            priority
                          />
                        </div>
                      ) : (
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={600}
                          height={400}
                          className="max-w-full max-h-[550px] rounded-lg object-contain"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
