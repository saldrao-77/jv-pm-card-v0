"use client"

import { useState } from "react"
import { Brain, CreditCard, Receipt, BarChart, DollarSign } from "lucide-react"

const features = [
  {
    id: "ai",
    icon: <Brain className="h-8 w-8" />,
    emoji: "🤖",
    title: "Smarter Spend with JobVault's AI Expense Agent",
    description:
      "Our AI Expense Agent finds opportunities to reduce spend by 5-10% per year. By setting card controls and analyzing spending patterns, we help you save money and make smarter decisions about your property expenses.",
  },
  {
    id: "cards",
    icon: <CreditCard className="h-8 w-8" />,
    emoji: "💳",
    title: "Cards With Control",
    description:
      "Issue virtual or physical cards to supers, PMs, and techs. Set vendor locks, daily limits, and auto-tag expenses to properties — so charges don't float and spend stays on track.",
  },
  {
    id: "receipts",
    icon: <Receipt className="h-8 w-8" />,
    emoji: "🧾",
    title: "AI-powered Receipts Handling, Finally",
    description:
      'No more receipt folders or "send it later" reminders to your team. Snap-and-go receipt uploads. Our AI instantly matches spend to the right property, vendor, and PM — no manual reconciling.',
  },
  {
    id: "reimbursements",
    icon: <BarChart className="h-8 w-8" />,
    emoji: "📊",
    title: "Owner Reimbursements Made Easy",
    description:
      "Every expense is tagged to a specific property, making it simple to pass through costs to the right owner trust account. Bookkeepers stay sane. Owners get clarity.",
  },
  {
    id: "cashback",
    icon: <DollarSign className="h-8 w-8" />,
    emoji: "💰",
    title: "2% Cashback on All Purchases",
    description:
      "Earn 2% cashback on every dollar spent through JobVault cards. Stop letting employees earn rewards on their personal cards — centralize spend on JobVault cards and turn a cost center into a revenue stream.",
  },
]

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(features[0].id)

  return (
    <section className="py-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-heading">WHY CHOOSE JOBVAULT?</h2>
        <p className="text-center text-white/70 mb-16 max-w-2xl mx-auto">
          Our platform is designed specifically for property managers who want to streamline expense management and
          provide better financial clarity.
        </p>

        <div className="grid md:grid-cols-1 gap-6">
          {features.map((feature) => (
            <div key={feature.id} className="p-6 rounded-lg cursor-pointer feature-card bg-zinc-900 hover:bg-zinc-800">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{feature.emoji}</span>
                <h3 className="text-xl font-bold font-heading">{feature.title}</h3>
              </div>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
