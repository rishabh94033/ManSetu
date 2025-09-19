"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, BookOpen, MessageCircle, BarChart3, Calendar, Phone } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const quickActions = [
  {
    title: "Log Mood",
    description: "Quick daily check-in",
    href: "/mood",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
  {
    title: "Journal Entry",
    description: "Write your thoughts",
    href: "/journal",
    icon: BookOpen,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  {
    title: "Get Support",
    description: "Chat with counselors",
    href: "/chat",
    icon: MessageCircle,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
  {
    title: "Take Assessment",
    description: "PHQ-9 or GAD-7",
    href: "/assessments",
    icon: BarChart3,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
  {
    title: "Book Session",
    description: "Schedule counseling",
    href: "/telehealth",
    icon: Calendar,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950",
  },
  {
    title: "Crisis Support",
    description: "Immediate help",
    href: "tel:988",
    icon: Phone,
    color: "text-red-600",
    bgColor: "bg-red-100 dark:bg-red-900",
    external: true,
  },
]

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              const Component = action.external ? "a" : Link

              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Component
                    href={action.href}
                    className="block p-3 rounded-lg border hover:bg-accent/50 transition-colors group"
                  >
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className={`p-2 rounded-full ${action.bgColor} group-hover:scale-110 transition-transform`}>
                        <Icon className={`h-4 w-4 ${action.color}`} />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{action.title}</div>
                        <div className="text-xs text-muted-foreground">{action.description}</div>
                      </div>
                    </div>
                  </Component>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
