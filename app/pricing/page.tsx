import { PricingSection } from "@/components/pricing-section"

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-36 pb-20">
      <div className="container mx-auto px-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 font-heading">PRICING PLANS</h1>
        <p className="text-center text-white/70 max-w-2xl mx-auto">
          JobVault offers flexible pricing options to fit the needs of property management businesses of all sizes.
          Choose the plan that works best for you.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <a
            href="tel:+12625018982"
            className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-full hover:bg-zinc-700 transition-colors"
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
            className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-full hover:bg-zinc-700 transition-colors"
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

      <PricingSection showHeader={false} />
    </main>
  )
}
