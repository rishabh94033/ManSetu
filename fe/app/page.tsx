"use client"

import { Navigation } from "@/components/navigation"
import { MoodWidget } from "@/components/mood-widget"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Users, BookOpen, BarChart3, Star, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Heart,
    title: "Mood Tracking",
    description: "Monitor your emotional wellbeing with daily mood check-ins and personalized insights.",
    href: "/mood",
  },
  {
    icon: BookOpen,
    title: "Digital Journal",
    description: "Express your thoughts in a secure, private space with guided prompts and reflection tools.",
    href: "/journal",
  },
  {
    icon: BarChart3,
    title: "Mental Health Assessments",
    description: "Take validated assessments like PHQ-9 and GAD-7 to understand your mental health better.",
    href: "/assessments",
  },
  {
    icon: Users,
    title: "Peer Community",
    description: "Connect with fellow students in a safe, moderated environment for mutual support.",
    href: "/community",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data is encrypted and secure. We prioritize your privacy and confidentiality.",
    href: "/settings",
  },
]

const testimonials = [
  {
    name: "Sarah M.",
    role: "Psychology Major, Junior",
    content:
      "MindWell helped me recognize patterns in my anxiety and gave me tools to manage stress during finals week.",
    rating: 5,
  },
  {
    name: "Alex K.",
    role: "Engineering Student, Senior",
    content:
      "The peer community feature made me realize I wasn't alone in my struggles. It's been incredibly supportive.",
    rating: 5,
  },
  {
    name: "Maya P.",
    role: "Pre-Med Student, Sophomore",
    content: "The mood tracking and journal features have become part of my daily routine. They help me stay grounded.",
    rating: 5,
  },
]

const trustPartners = [
  "University Health Services",
  "National Suicide Prevention Lifeline",
  "Crisis Text Line",
  "Mental Health America",
  "NAMI (National Alliance on Mental Illness)",
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-b from-background to-muted/20">
        <div className="container max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <Badge variant="secondary" className="mb-4">
              Trusted by 50,000+ Students
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
              Your Mental Health
              <span className="text-primary"> Matters</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Comprehensive digital mental health support designed specifically for students in higher education. Get
              the help you deserve, when you need it.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="text-lg px-8">
              <Link href="/auth">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg px-8 bg-transparent">
              <Link href="/resources">Browse Resources</Link>
            </Button>
          </div>

          {/* Mood Widget */}
          <div className="flex justify-center pt-8">
            <MoodWidget />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Everything you need for mental wellness</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform provides comprehensive tools and support to help you thrive academically and personally.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">{feature.description}</CardDescription>
                    <Button variant="ghost" asChild className="p-0 h-auto text-primary hover:text-primary/80">
                      <Link href={feature.href}>Learn more →</Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">What students are saying</h2>
            <p className="text-xl text-muted-foreground">
              Real stories from students who found support through MindWell
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-background">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">"{testimonial.content}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-16 px-4 border-t">
        <div className="container max-w-4xl mx-auto text-center space-y-8">
          <h3 className="text-2xl font-semibold">Trusted Partners & Resources</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
            {trustPartners.map((partner, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">Ready to prioritize your mental health?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto text-balance">
            Join thousands of students who are taking control of their mental wellness. Start your journey today - it's
            free and confidential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8">
              <Link href="/auth">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <Link href="/resources">Explore Resources</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-muted/20">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Heart className="h-4 w-4" />
                </div>
                <span className="text-xl font-bold">MindWell</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Supporting student mental health with compassionate, evidence-based digital tools.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Platform</h4>
              <div className="space-y-2 text-sm">
                <Link href="/dashboard" className="block text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
                <Link href="/assessments" className="block text-muted-foreground hover:text-foreground">
                  Assessments
                </Link>
                <Link href="/modules" className="block text-muted-foreground hover:text-foreground">
                  Learning Modules
                </Link>
                <Link href="/community" className="block text-muted-foreground hover:text-foreground">
                  Community
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2 text-sm">
                <Link href="/resources" className="block text-muted-foreground hover:text-foreground">
                  Resources
                </Link>
                <a href="tel:04424640050" className="block text-muted-foreground hover:text-foreground">
                  Crisis Line: 044-24640050
                </a>
                <a href="mailto:support@mindwell.edu" className="block text-muted-foreground hover:text-foreground">
                  Email: support@mindwell.edu
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <div className="space-y-2 text-sm">
                <Link href="/privacy" className="block text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
                <Link href="/accessibility" className="block text-muted-foreground hover:text-foreground">
                  Accessibility
                </Link>
                <Link href="/contact" className="block text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 MindWell. All rights reserved. | If you're in crisis, call 988 or text "HELLO" to 741741</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
