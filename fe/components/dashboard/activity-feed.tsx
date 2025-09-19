"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, BookOpen, MessageCircle, Award, TrendingUp, Calendar, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

// Mock activity data
const activities = [
  {
    id: 1,
    type: "mood_logged",
    title: "Mood check-in completed",
    description: "You logged feeling 'Good' today",
    timestamp: "2 hours ago",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
  {
    id: 2,
    type: "module_completed",
    title: "Completed 'Managing Anxiety' module",
    description: "Great job finishing the breathing exercises!",
    timestamp: "1 day ago",
    icon: BookOpen,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    badge: "+10 points",
  },
  {
    id: 3,
    type: "community_interaction",
    title: "Received support in community",
    description: "3 people responded to your post about exam stress",
    timestamp: "2 days ago",
    icon: MessageCircle,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    id: 4,
    type: "streak_milestone",
    title: "7-day mood tracking streak!",
    description: "You've been consistent with daily check-ins",
    timestamp: "3 days ago",
    icon: Award,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950",
    badge: "Achievement",
  },
  {
    id: 5,
    type: "appointment_scheduled",
    title: "Counseling session scheduled",
    description: "Your next session is tomorrow at 2:00 PM",
    timestamp: "4 days ago",
    icon: Calendar,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
  {
    id: 6,
    type: "goal_progress",
    title: "Weekly wellness goal achieved",
    description: "You completed 5 mindfulness exercises this week",
    timestamp: "1 week ago",
    icon: CheckCircle,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950",
    badge: "+25 points",
  },
]

export function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Your mental wellness journey highlights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const Icon = activity.icon
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`p-2 rounded-full ${activity.bgColor}`}>
                    <Icon className={`h-4 w-4 ${activity.color}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{activity.title}</h4>
                      {activity.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {activity.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" size="sm">
              View All Activity
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
