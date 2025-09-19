"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MoodChart } from "@/components/dashboard/mood-chart"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { RecommendedModules } from "@/components/dashboard/recommended-modules"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { WellnessStreak } from "@/components/dashboard/wellness-streak"
import { UpcomingAppointments } from "@/components/dashboard/upcoming-appointments"
import { motion } from "framer-motion"

export default function DashboardPage() {
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
    if (!parsedUser.onboardingComplete) {
      router.push("/auth/onboarding")
      return
    }

    setUser(parsedUser)
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-muted rounded"></div>
                <div className="h-96 bg-muted rounded"></div>
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-muted rounded"></div>
                <div className="h-48 bg-muted rounded"></div>
              </div>
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

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <DashboardHeader user={user} />

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <MoodChart />
              <ActivityFeed />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <QuickActions />
              <WellnessStreak />
              <UpcomingAppointments />
              <RecommendedModules />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
