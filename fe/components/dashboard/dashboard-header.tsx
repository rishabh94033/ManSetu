"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, TrendingUp, Users, Calendar } from "lucide-react"
import Link from "next/link"

interface DashboardHeaderProps {
  user: any
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening"

  // Mock data - in real app this would come from API
  const stats = {
    moodStreak: 7,
    completedModules: 3,
    communityPoints: 150,
    nextAppointment: "Tomorrow at 2:00 PM",
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            {greeting}, {user.firstName || user.name}!
          </h1>
          <p className="text-muted-foreground mt-1">Here's how you're doing on your mental wellness journey.</p>
        </div>

        <div className="flex gap-2">
          <Button asChild>
            <Link href="/mood">Quick Mood Check</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/chat">Get Support</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Heart className="h-4 w-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.moodStreak}</p>
                <p className="text-xs text-muted-foreground">Day streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10 text-accent">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.completedModules}</p>
                <p className="text-xs text-muted-foreground">Modules done</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.communityPoints}</p>
                <p className="text-xs text-muted-foreground">Community pts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Next session</p>
                <p className="text-xs text-muted-foreground">{stats.nextAppointment}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
