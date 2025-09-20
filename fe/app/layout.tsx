import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "ManSetu - Digital Mental Health Support for Students",
  description:
    "Comprehensive mental health and psychological support platform designed specifically for students in higher education.",
  generator: "v0.app",
  keywords: ["mental health", "student support", "psychology", "wellbeing", "higher education"],
  authors: [{ name: "MindWell Team" }],
  openGraph: {
    title: "ManSetu - Digital Mental Health Support for Students",
    description:
      "Comprehensive mental health and psychological support platform designed specifically for students in higher education.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ManSetu - Digital Mental Health Support for Students",
    description:
      "Comprehensive mental health and psychological support platform designed specifically for students in higher education.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
