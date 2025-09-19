"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Flame, Target } from "lucide-react"
import { motion } from "framer-motion"

export function WellnessStreak() {
  // Mock data - in real app this would come from API
  const currentStreak = 7
  const longestStreak = 14
  const weeklyGoal = 7
  const weeklyProgress = 5

  const streakPercentage = (currentStreak / longestStreak) * 100
  const weeklyPercentage = (weeklyProgress / weeklyGoal) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Flame className="h-5 w-5 text-orange-500" />
            Wellness Streak
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Streak */}
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-orange-500">{currentStreak}</div>
            <div className="text-sm text-muted-foreground">Days in a row</div>
            <Badge variant="secondary" className="text-xs">
              Personal best: {longestStreak} days
            </Badge>
          </div>

          {/* Streak Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Streak Progress</span>
              <span>{Math.round(streakPercentage)}%</span>
            </div>
            <Progress value={streakPercentage} className="h-2" />
          </div>

          {/* Weekly Goal */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4" />
              <span>Weekly Goal</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>
                {weeklyProgress} / {weeklyGoal} check-ins
              </span>
              <span>{Math.round(weeklyPercentage)}%</span>
            </div>
            <Progress value={weeklyPercentage} className="h-2" />
          </div>

          {/* Motivation */}
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium">Keep it up! 🎉</p>
            <p className="text-xs text-muted-foreground mt-1">You're doing great with your daily check-ins</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
