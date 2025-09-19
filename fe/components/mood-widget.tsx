"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

const moodEmojis = [
  { emoji: "😢", label: "Very Sad", value: 1, color: "text-red-500" },
  { emoji: "😔", label: "Sad", value: 2, color: "text-orange-500" },
  { emoji: "😐", label: "Neutral", value: 3, color: "text-yellow-500" },
  { emoji: "😊", label: "Happy", value: 4, color: "text-green-500" },
  { emoji: "😄", label: "Very Happy", value: 5, color: "text-emerald-500" },
]

export function MoodWidget() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const { toast } = useToast()

  const handleMoodSubmit = () => {
    if (selectedMood) {
      const mood = moodEmojis.find((m) => m.value === selectedMood)
      toast({
        title: "Mood recorded!",
        description: `Thanks for sharing that you're feeling ${mood?.label.toLowerCase()}. Your mood has been saved.`,
      })
      // In a real app, this would save to a database
      localStorage.setItem(
        "lastMood",
        JSON.stringify({
          value: selectedMood,
          timestamp: new Date().toISOString(),
        }),
      )
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-lg">How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center gap-2">
          {moodEmojis.map((mood) => (
            <motion.button
              key={mood.value}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(mood.value)}
              className={`p-3 rounded-full text-3xl transition-all duration-200 ${
                selectedMood === mood.value ? "bg-primary/20 ring-2 ring-primary" : "hover:bg-accent/50"
              }`}
              title={mood.label}
            >
              {mood.emoji}
            </motion.button>
          ))}
        </div>

        {selectedMood && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              You selected: {moodEmojis.find((m) => m.value === selectedMood)?.label}
            </p>
            <Button onClick={handleMoodSubmit} className="w-full">
              Record Mood
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
