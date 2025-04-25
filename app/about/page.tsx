import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 font-heading">ABOUT US</h1>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6 font-heading">Why We Started This</h2>
          <div className="text-white/80 space-y-4">
            <p>
              We started this company because we've seen what happens when small businesses don't have financial
              control. <strong>Receipts get lost. Cards get passed around. Reimbursements drag on for months.</strong>{" "}
              And the result?{" "}
              <strong>Thousands in waste, frustrated teams, and strained relationships with owners.</strong>
            </p>
            <p>
              Our mission is to give small operators the kind of tools big companies take for granted —{" "}
              <strong>intuitive, AI-powered financial infrastructure</strong> that helps you control spend and grow your
              business. We're building modern fintech products for{" "}
              <strong>contractors, property managers, and other everyday builders</strong> — not Silicon Valley tech
              bros.
            </p>
            <p>
              This isn't just software. It's how you finally{" "}
              <strong>stop bleeding cash, cut back on chaos, and get back to building.</strong>
            </p>
          </div>
        </section>

        <section className="mb-20">
          <div className="bg-zinc-800 rounded-lg p-8 mb-12 border border-zinc-700">
            <h2 className="text-2xl font-bold mb-6 font-heading text-center">Stanford University-Backed</h2>
            <p className="text-white/80 text-center mb-8">
              JobVault is proud to be a Stanford University-backed team with a research grant focused on helping impact
              small businesses across America. Our work is supported by leading institutions committed to innovation and
              economic empowerment.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="relative w-64 h-20 bg-white rounded-lg p-2">
                <Image
                  src="/images/stanford-university-logo.png"
                  alt="Stanford University"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative w-64 h-20 bg-white rounded-lg p-2">
                <Image
                  src="/images/hasso-plattner-logo.png"
                  alt="Hasso Plattner Institute of Design at Stanford"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md h-[500px] overflow-hidden rounded-lg">
              <Image
                src="/images/sal-rao.jpeg"
                alt="Sal Rao, Founder & CEO"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[50%_35%]"
                style={{ objectPosition: "50% 35%" }}
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 font-heading">Meet the Founder</h2>
            <h3 className="text-xl font-bold mb-4">Sal Rao, Founder & CEO</h3>
            <div className="text-white/80 space-y-4">
              <p>
                Sal started this company to bring <strong>smart, intuitive financial tools</strong> to the people who
                need them most: small businesses trying to grow without drowning in back-office chaos.
              </p>
              <p>
                Before founding JobVault, Sal was <strong>Head of Commerce at GlossGenius</strong>, where she helped
                scale the platform from 20,000 to 80,000+ businesses and processed over{" "}
                <strong>$2 billion in payments</strong>. As the youngest Executive Team member in company history, she
                led the development of expense management features that saved millions for businesses across the US.
              </p>
              <p>
                Prior to that, Sal advised <strong>Fortune 500 companies at McKinsey & Company</strong>, where she
                focused on real estate, technology, and asset management. She previously{" "}
                <strong>worked at the White House and Senate</strong>.
              </p>
              <p>
                Her passion for serving small businesses comes from personal experience — watching family members build
                small businesses from the ground up, and spending her career bringing order to messy, manual problems.
                Today, she's on a mission to bring{" "}
                <strong>modern fintech and AI into the hands of people who need it most</strong>. The ones doing the
                real work.
              </p>
            </div>
          </div>
        </section>

        <div className="w-full mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-8 rounded-lg text-center h-full">
              <h3 className="text-xl font-bold mb-4 font-heading">Simplicity</h3>
              <p className="text-white/70">
                We believe powerful tools should be simple to use. Every feature is designed with the user in mind,
                making expense management intuitive for everyone on your team.
              </p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-lg text-center h-full">
              <h3 className="text-xl font-bold mb-4 font-heading">Transparency</h3>
              <p className="text-white/70">
                We're committed to providing complete visibility into your property expenses, with clear reporting and
                insights that help you make informed decisions.
              </p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-lg text-center h-full">
              <h3 className="text-xl font-bold mb-4 font-heading">Innovation</h3>
              <p className="text-white/70">
                We're constantly pushing the boundaries of what's possible in expense management, leveraging AI and
                automation to solve complex problems with elegant solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
