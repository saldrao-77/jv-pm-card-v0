import { Suspense } from "react"
import { HeroSection } from "@/components/hero-section"
import { StepsSection } from "@/components/steps-section"
import { FeaturesSection } from "@/components/features-section"
import { CarouselSection } from "@/components/carousel-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { CtaSection } from "@/components/cta-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Suspense fallback={<HeroSectionFallback />}>
        <HeroSection />
      </Suspense>
      <StepsSection />
      <FeaturesSection />
      <CarouselSection />
      <TestimonialsSection />
      <PricingSection />
      <Suspense fallback={<CtaSectionFallback />}>
        <CtaSection />
      </Suspense>
    </main>
  )
}

function HeroSectionFallback() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-16">
      <div className="absolute inset-0 z-0 bg-black"></div>
      <div className="container relative z-10 mx-auto px-4 py-16 text-center">
        <div className="h-12 w-3/4 bg-zinc-800 animate-pulse rounded-lg mx-auto mb-6"></div>
        <div className="h-6 w-2/4 bg-zinc-800 animate-pulse rounded-lg mx-auto mb-8"></div>
        <div className="max-w-md mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="h-10 bg-zinc-800 animate-pulse rounded-lg flex-grow"></div>
            <div className="h-10 w-40 bg-zinc-800 animate-pulse rounded-lg"></div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="h-8 w-40 bg-zinc-800 animate-pulse rounded-full"></div>
          <div className="h-8 w-40 bg-zinc-800 animate-pulse rounded-full"></div>
          <div className="h-8 w-40 bg-zinc-800 animate-pulse rounded-full"></div>
        </div>
      </div>
    </section>
  )
}

function CtaSectionFallback() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="h-96 bg-zinc-800 animate-pulse rounded-lg"></div>
          <div className="bg-zinc-900 p-8 rounded-lg">
            <div className="h-8 w-3/4 bg-zinc-800 animate-pulse rounded-lg mb-6"></div>
            <div className="h-24 bg-zinc-800 animate-pulse rounded-lg mb-6"></div>
            <div className="space-y-4">
              <div className="h-12 bg-zinc-800 animate-pulse rounded-lg"></div>
              <div className="h-12 bg-zinc-800 animate-pulse rounded-lg"></div>
              <div className="h-12 bg-zinc-800 animate-pulse rounded-lg"></div>
              <div className="h-12 bg-zinc-800 animate-pulse rounded-lg"></div>
              <div className="h-12 bg-zinc-800 animate-pulse rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
