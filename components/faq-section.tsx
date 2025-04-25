"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  return (
    <section className="py-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-heading">Frequently Asked Questions</h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-zinc-900 rounded-lg px-6">
              <AccordionTrigger className="text-left py-4">How does JobVault's pricing model work?</AccordionTrigger>
              <AccordionContent className="text-white/70 pb-4">
                Our pricing is based on the number of properties you manage. We offer tiered plans starting at $99/month
                for up to 10 properties, with custom enterprise plans available for large property management companies.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-zinc-900 rounded-lg px-6">
              <AccordionTrigger className="text-left py-4">How quickly can we get started?</AccordionTrigger>
              <AccordionContent className="text-white/70 pb-4">
                Most customers are up and running within 48 hours. We'll help you set up your account, create your first
                cards, and train your team on receipt capture. Our onboarding specialists will guide you through the
                entire process.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-zinc-900 rounded-lg px-6">
              <AccordionTrigger className="text-left py-4">How secure is my financial data?</AccordionTrigger>
              <AccordionContent className="text-white/70 pb-4">
                We take security seriously. JobVault uses bank-level encryption, is SOC 2 compliant, and never stores
                sensitive payment information on our servers. All transactions are processed through our secure payment
                partners.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-zinc-900 rounded-lg px-6">
              <AccordionTrigger className="text-left py-4">
                Can I integrate with my accounting software?
              </AccordionTrigger>
              <AccordionContent className="text-white/70 pb-4">
                Absolutely. JobVault integrates seamlessly with popular accounting software like QuickBooks, Xero, and
                AppFolio, allowing for automatic syncing of financial data and simplified bookkeeping.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-zinc-900 rounded-lg px-6">
              <AccordionTrigger className="text-left py-4">Is there a mobile app available?</AccordionTrigger>
              <AccordionContent className="text-white/70 pb-4">
                Yes, JobVault offers mobile apps for both iOS and Android devices. Property managers can issue cards,
                approve transactions, and view spending analytics on the go. Team members can capture receipts directly
                through the app.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
