export function ShowcaseSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">See PropertyHub in Action</h2>

        <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-2xl">
          <div className="p-2 bg-zinc-800 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-zinc-800 p-4 rounded-md">
                  <h3 className="text-sm font-medium mb-2">Property Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/70">Address</span>
                      <span>123 Main Street</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Units</span>
                      <span>4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Monthly Revenue</span>
                      <span>$5,200</span>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-800 p-4 rounded-md">
                  <h3 className="text-sm font-medium mb-2">Property Underwriting</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-4 h-4 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                      </div>
                      <span>Cap Rate: 5.8%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                      </div>
                      <span>Cash on Cash: 8.2%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                      </div>
                      <span>ROI: 12.5%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-800 p-4 rounded-md">
                <h3 className="text-sm font-medium mb-4">Tenant Management</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-zinc-700 rounded">
                    <span>Unit #101 - John Smith</span>
                    <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">Paid</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-zinc-700 rounded">
                    <span>Unit #102 - Sarah Johnson</span>
                    <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded">Pending</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-zinc-700 rounded">
                    <span>Unit #103 - Michael Brown</span>
                    <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">Paid</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-zinc-700 rounded">
                    <span>Unit #104 - Jessica Davis</span>
                    <span className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded">Late</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between mb-2">
                    <span>Total Monthly Rent</span>
                    <span>$5,200.00</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Collected</span>
                    <span>$3,800.00</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Outstanding</span>
                    <span>$1,400.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
