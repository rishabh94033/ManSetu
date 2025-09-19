"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Bot, Users, BookOpen, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function GuestDashboard() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "guest") {
      router.push("/dashboard")
      return
    }

    setUser(parsedUser)
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-48 bg-muted rounded"></div>
              <div className="h-48 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Welcome Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-emerald-100 rounded-full">
                <Sparkles className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold">Welcome to MindWell</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              You're exploring as a guest. Get instant support through AI chat, connect with peers, and access mental
              health resources.
            </p>
          </div>

          {/* Main Features */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* AI Chat */}
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Card className="h-full border-2 hover:border-emerald-300 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Bot className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>AI Mental Health Assistant</CardTitle>
                      <p className="text-sm text-muted-foreground">24/7 support and guidance</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Get instant support from our AI assistant trained in mental health support. Available anytime you
                    need someone to talk to.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      Crisis detection and professional referrals
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      Coping strategies and mindfulness techniques
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      Anonymous and confidential
                    </div>
                  </div>
                  <Link href="/chat">
                    <Button className="w-full">
                      Start AI Chat
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Peer Chat */}
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Card className="h-full border-2 hover:border-emerald-300 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Users className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <CardTitle>Peer Support Community</CardTitle>
                      <p className="text-sm text-muted-foreground">Connect with others</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Join anonymous support groups and connect with other students facing similar challenges.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      Anonymous group discussions
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      Moderated by trained counselors
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      Safe and supportive environment
                    </div>
                  </div>
                  <Link href="/chat">
                    <Button variant="outline" className="w-full bg-transparent">
                      Join Peer Chat
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Resources */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle>Mental Health Resources</CardTitle>
                  <p className="text-sm text-muted-foreground">Free access to helpful resources</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Crisis Resources</h3>
                  <p className="text-sm text-muted-foreground mb-3">Immediate help and emergency contacts</p>
                  <Link href="/resources">
                    <Button variant="outline" size="sm">
                      View Resources
                    </Button>
                  </Link>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Self-Help Guides</h3>
                  <p className="text-sm text-muted-foreground mb-3">Articles and guides for common challenges</p>
                  <Link href="/resources">
                    <Button variant="outline" size="sm">
                      Browse Guides
                    </Button>
                  </Link>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Mindfulness Tools</h3>
                  <p className="text-sm text-muted-foreground mb-3">Meditation and relaxation exercises</p>
                  <Link href="/resources">
                    <Button variant="outline" size="sm">
                      Try Tools
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upgrade Prompt */}
          <Card className="border-emerald-200 bg-emerald-50">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Want the full MindWell experience?</h3>
              <p className="text-muted-foreground mb-4">
                Create a full account to access mood tracking, personalized assessments, professional counseling, and
                more.
              </p>
              <Link href="/auth">
                <Button>
                  Create Full Account
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
