"use client"

import { useState } from "react"
import { Smile, Meh, Frown } from "lucide-react"

const moods = [
  { icon: Smile, label: "Great", value: 5, color: "text-green-500", bgColor: "bg-green-50 hover:bg-green-100" },
  { icon: Smile, label: "Good", value: 4, color: "text-blue-500", bgColor: "bg-blue-50 hover:bg-blue-100" },
  { icon: Meh, label: "Okay", value: 3, color: "text-yellow-500", bgColor: "bg-yellow-50 hover:bg-yellow-100" },
  { icon: Frown, label: "Low", value: 2, color: "text-orange-500", bgColor: "bg-orange-50 hover:bg-orange-100" },
  { icon: Frown, label: "Struggling", value: 1, color: "text-red-500", bgColor: "bg-red-50 hover:bg-red-100" },
]

export function MoodWidget() {
  const [selectedMood, setSelectedMood] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
}
