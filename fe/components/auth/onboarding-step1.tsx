"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Target, Heart, Users, BookOpen, TrendingUp, Shield } from "lucide-react"

const goals = [
  {
    id: "stress-management",
    label: "Manage stress and anxiety",
    description: "Learn coping strategies for academic and personal stress",
    icon: Heart,
  },
  {
    id: "mood-tracking",
    label: "Track my mood and emotions",
    description: "Monitor emotional patterns and identify triggers",
    icon: TrendingUp,
  },
  {
    id: "peer-support",
    label: "Connect with peer support",
    description: "Find community and support from fellow students",
    icon: Users,
  },
  {
    id: "self-improvement",
    label: "Personal growth and self-improvement",
    description: "Develop healthy habits and mindfulness practices",
    icon: Target,
  },
  {
    id: "academic-support",
    label: "Academic performance support",
    description: "Improve focus, motivation, and study habits",
    icon: BookOpen,
  },
  {
    id: "crisis-support",
    label: "Access to crisis support",
    description: "Have resources available during difficult times",
    icon: Shield,
  },
]

interface OnboardingStep1Props {
  data: any
  onUpdate: (data: any) => void
  onNext: () => void
}

export function OnboardingStep1({ data, onUpdate, onNext }: OnboardingStep1Props) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(data.goals || [])

  const handleGoalToggle = (goalId: string) => {
    const updatedGoals = selectedGoals.includes(goalId)
      ? selectedGoals.filter((id) => id !== goalId)
      : [...selectedGoals, goalId]

    setSelectedGoals(updatedGoals)
    onUpdate({ goals: updatedGoals })
  }

  const handleNext = () => {
    if (selectedGoals.length > 0) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">What are your goals?</h2>
        <p className="text-muted-foreground">Select all that apply. This helps us personalize your experience.</p>
      </div>

      <div className="grid gap-4">
        {goals.map((goal) => {
          const Icon = goal.icon
          const isSelected = selectedGoals.includes(goal.id)

          return (
            <div
              key={goal.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
              onClick={() => handleGoalToggle(goal.id)}
            >
              <div className="flex items-start gap-4">
                <Checkbox checked={isSelected} onChange={() => handleGoalToggle(goal.id)} className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`h-5 w-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    <Label className="text-base font-medium cursor-pointer">{goal.label}</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleNext} disabled={selectedGoals.length === 0} className="px-8">
          Continue
        </Button>
      </div>
    </div>
  )
}
