import type React from "react"
import { Space_Grotesk, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata = {
  title: "JobVault for property managers",
  description: "Give your PMs the tools to spend smarter with trackable cards, instant receipt uploads, and AI-driven spend insights.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>JobVault for property managers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Give your PMs the tools to spend smarter with trackable cards, instant receipt uploads, and AI-driven spend insights."
        />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="JobVault for property managers" />
        <meta
          property="og:description"
          content="Give your PMs the tools to spend smarter with trackable cards, instant receipt uploads, and AI-driven spend insights."
        />
        <meta property="og:image" content="https://jobvault-pm.vercel.app/images/og-image.jpg" />
        <meta property="og:url" content="https://jobvault-pm.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="JobVault" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="JobVault for property managers" />
        <meta
          name="twitter:description"
          content="Give your PMs the tools to spend smarter with trackable cards, instant receipt uploads, and AI-driven spend insights."
        />
        <meta name="twitter:image" content="https://jobvault-pm.vercel.app/images/og-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}


