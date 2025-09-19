"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronLeft } from "lucide-react"
import { MessageCircle, Users, BookOpen, Video, Bell, Calendar } from "lucide-react"

const supportPreferences = [
  {
    id: "peer-chat",
    label: "Peer support chat",
    description: "Connect with other students in group discussions",
    icon: MessageCircle,
  },
  {
    id: "community-forums",
    label: "Community forums",
    description: "Participate in topic-based discussions and support groups",
    icon: Users,
  },
  {
    id: "self-guided-modules",
    label: "Self-guided learning modules",
    description: "Work through CBT and mindfulness exercises at your own pace",
    icon: BookOpen,
  },
  {
    id: "video-sessions",
    label: "Video counseling sessions",
    description: "Schedule one-on-one sessions with licensed counselors",
    icon: Video,
  },
  {
    id: "daily-reminders",
    label: "Daily check-in reminders",
    description: "Get gentle reminders to track your mood and practice self-care",
    icon: Bell,
  },
  {
    id: "scheduled-activities",
    label: "Scheduled wellness activities",
    description: "Join group meditation, workshops, and wellness events",
    icon: Calendar,
  },
]

interface OnboardingStep3Props {
  data: any
  onUpdate: (data: any) => void
  onNext: () => void
  onPrevious: () => void
}

export function OnboardingStep3({ data, onUpdate, onNext, onPrevious }: OnboardingStep3Props) {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(data.supportPreferences || [])

  const handlePreferenceToggle = (preferenceId: string) => {
    const updatedPreferences = selectedPreferences.includes(preferenceId)
      ? selectedPreferences.filter((id) => id !== preferenceId)
      : [...selectedPreferences, preferenceId]

    setSelectedPreferences(updatedPreferences)
    onUpdate({ supportPreferences: updatedPreferences })
  }

  const handleNext = () => {
    if (selectedPreferences.length > 0) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">How would you like to receive support?</h2>
        <p className="text-muted-foreground">Choose the types of support that feel most comfortable for you.</p>
      </div>

      <div className="grid gap-4">
        {supportPreferences.map((preference) => {
          const Icon = preference.icon
          const isSelected = selectedPreferences.includes(preference.id)

          return (
            <div
              key={preference.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
              onClick={() => handlePreferenceToggle(preference.id)}
            >
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={isSelected}
                  onChange={() => handlePreferenceToggle(preference.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`h-5 w-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    <Label className="text-base font-medium cursor-pointer">{preference.label}</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">{preference.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button onClick={handleNext} disabled={selectedPreferences.length === 0} className="px-8">
          Continue
        </Button>
      </div>
    </div>
  )
}
