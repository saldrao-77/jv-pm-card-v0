"use client"

import { CreditCard, Receipt, Settings, BarChart } from "lucide-react"

export function StepsSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-heading">HOW IT WORKS</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="bg-zinc-900 p-8 rounded-lg text-center relative">
            <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-4 font-heading">You issue cards</h3>
            <p className="text-white/70">
              From your central office, create virtual or physical cards for any PM, super, or team member.
            </p>
            <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
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
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
            <div className="lg:hidden mt-4 flex justify-center">
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
                className="text-blue-500"
              >
                <path d="M12 5v14"></path>
                <path d="m19 12-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          <div className="bg-zinc-900 p-8 rounded-lg text-center relative">
            <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Settings className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-4 font-heading">You set the rules</h3>
            <p className="text-white/70">
              Lock each card to specific vendors (like Home Depot), property tags, and spend limits.
            </p>
            <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
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
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
            <div className="lg:hidden mt-4 flex justify-center">
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
                className="text-blue-500"
              >
                <path d="M12 5v14"></path>
                <path d="m19 12-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          <div className="bg-zinc-900 p-8 rounded-lg text-center relative">
            <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Receipt className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-4 font-heading">They snap receipts</h3>
            <p className="text-white/70">
              At checkout, your team snaps a photo and sends it to us via text — our AI automatically matches receipts
              with each expense and reminds them about missing submissions so you don't have to chase receipts.
            </p>
            <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
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
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </div>
            </div>
            <div className="lg:hidden mt-4 flex justify-center">
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
                className="text-blue-500"
              >
                <path d="M12 5v14"></path>
                <path d="m19 12-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          <div className="bg-zinc-900 p-8 rounded-lg text-center">
            <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-4 font-heading">You see it all in one place</h3>
            <p className="text-white/70">
              Every charge shows up in your dashboard — who spent it, what it was for, and which property it ties to.
              Tag and reconcile automatically with owner trust accounts.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
