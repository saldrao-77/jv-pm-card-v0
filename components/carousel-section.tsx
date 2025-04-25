"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { CreditCard, Smartphone, Receipt, Activity } from "lucide-react"

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

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-heading">SEE IT IN ACTION</h2>

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
