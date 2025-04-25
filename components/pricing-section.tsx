import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PricingSection({ showHeader = true }) {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {showHeader && (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-heading">PRICING PLANS</h2>
            <p className="text-center text-white/70 mb-16 max-w-2xl mx-auto">
              Choose the plan that works best for your property management business.
            </p>
          </>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-zinc-900 rounded-lg overflow-hidden">
            <div className="p-8 border-b border-zinc-800">
              <h3 className="text-xl font-bold mb-2 font-heading">Free Plan</h3>
              <p className="text-white/70 mb-4">Perfect for getting started</p>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-white/70 ml-2">/month</span>
              </div>
              <Link href="/get-started">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
            <div className="p-8">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>1 card included</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>2% cashback on all purchases</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Basic spending controls</span>
                </li>
              </ul>
              <p className="text-sm text-white/60 mt-8 text-center italic">No credit card required to start</p>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-zinc-900 rounded-lg overflow-hidden border border-blue-600 transform md:-translate-y-6 md:pb-6">
            <div className="bg-blue-600 text-center py-2">
              <span className="text-sm font-medium">MOST POPULAR</span>
            </div>
            <div className="p-8 border-b border-zinc-800">
              <h3 className="text-xl font-bold mb-2 font-heading">Pro Plan</h3>
              <p className="text-white/70 mb-4">For growing property management firms</p>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold">$299</span>
                <span className="text-white/70 ml-2">/month</span>
              </div>
              <Link href="/get-started">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </Link>
            </div>
            <div className="p-8">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Unlimited virtual/physical cards</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>2%+ cashback on all purchases</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Advanced controls (e.g., vendor/geolocation limits)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Export features (tag by job, property, owner, etc.)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Integrations (e.g., QuickBooks, AppFolio)</span>
                </li>
              </ul>
              <p className="text-sm text-white/60 mt-8 text-center italic">No credit card required to start</p>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-zinc-900 rounded-lg overflow-hidden">
            <div className="p-8 border-b border-zinc-800">
              <h3 className="text-xl font-bold mb-2 font-heading">Enterprise</h3>
              <p className="text-white/70 mb-4">Custom-built for teams like yours</p>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold">Custom</span>
              </div>
              <Link href="/get-started">
                <Button className="w-full" variant="outline">
                  Book a Custom Consult
                </Button>
              </Link>
            </div>
            <div className="p-8">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>For PM firms managing multiple owners</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>2%+ cashback on all purchases</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Dedicated SLAs</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>White-glove onboarding</span>
                </li>
              </ul>
              <p className="text-sm text-white/60 mt-8 text-center italic">No credit card required to start</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
