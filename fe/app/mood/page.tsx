"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"

const moodOptions = [
  { value: 1, emoji: "😢", label: "Very Sad", color: "text-red-500", bgColor: "bg-red-50 dark:bg-red-950" },
  { value: 2, emoji: "😔", label: "Sad", color: "text-orange-500", bgColor: "bg-orange-50 dark:bg-orange-950" },
  { value: 3, emoji: "😐", label: "Neutral", color: "text-yellow-500", bgColor: "bg-yellow-50 dark:bg-yellow-950" },
  { value: 4, emoji: "😊", label: "Happy", color: "text-green-500", bgColor: "bg-green-50 dark:bg-green-950" },
  {
    value: 5,
    emoji: "😄",
    label: "Very Happy",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950",
  },
]

const moodTriggers = [
  "Academic stress",
  "Social anxiety",
  "Financial concerns",
  "Family issues",
  "Relationship problems",
  "Health concerns",
  "Sleep issues",
  "Work pressure",
  "Loneliness",
  "Homesickness",
  "Future uncertainty",
  "Other",
]

const copingStrategies = [
  "Deep breathing",
  "Exercise",
  "Talking to friends",
  "Listening to music",
  "Journaling",
  "Meditation",
  "Taking a walk",
  "Watching something funny",
  "Creative activities",
  "Getting enough sleep",
  "Eating well",
  "Other",
]

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [moodNote, setMoodNote] = useState("")
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([])
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
    }
  }, [router])

  const handleMoodSelect = (moodValue: number) => {
    setSelectedMood(moodValue)
  }

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers((prev) => (prev.includes(trigger) ? prev.filter((t) => t !== trigger) : [...prev, trigger]))
  }

  const toggleStrategy = (strategy: string) => {
    setSelectedStrategies((prev) =>
      prev.includes(strategy) ? prev.filter((s) => s !== strategy) : [...prev, strategy],
    )
  }

  const handleSubmit = async () => {
    if (!selectedMood) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Save mood entry to localStorage (in real app, this would go to a database)
    const moodEntry = {
      id: Date.now(),
      mood: selectedMood,
      note: moodNote,
      triggers: selectedTriggers,
      strategies: selectedStrategies,
      timestamp: new Date().toISOString(),
    }

    const existingEntries = JSON.parse(localStorage.getItem("moodEntries") || "[]")
    existingEntries.push(moodEntry)
    localStorage.setItem("moodEntries", JSON.stringify(existingEntries))

    const selectedMoodData = moodOptions.find((m) => m.value === selectedMood)

    toast({
      title: "Mood logged successfully!",
      description: `Thanks for sharing that you're feeling ${selectedMoodData?.label.toLowerCase()}. Your entry has been saved.`,
    })

    setIsSubmitting(false)
    router.push("/dashboard")
  }

  const selectedMoodData = selectedMood ? moodOptions.find((m) => m.value === selectedMood) : null

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Daily Mood Check-in</h1>
              <p className="text-muted-foreground">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      How are you feeling today?
                    </CardTitle>
                    <CardDescription>Select the emoji that best represents your current mood</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-5 gap-4">
                      {moodOptions.map((mood) => (
                        <motion.button
                          key={mood.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleMoodSelect(mood.value)}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                            selectedMood === mood.value
                              ? `border-primary ${mood.bgColor}`
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="text-center space-y-2">
                            <div className="text-3xl">{mood.emoji}</div>
                            <div className="text-xs font-medium">{mood.label}</div>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {selectedMoodData && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center p-4 rounded-lg bg-muted/50"
                      >
                        <p className="text-lg">
                          You're feeling <strong>{selectedMoodData.label}</strong> {selectedMoodData.emoji}
                        </p>
                      </motion.div>
                    )}

                    <div className="space-y-3">
                      <Label htmlFor="mood-note">What's on your mind? (Optional)</Label>
                      <Textarea
                        id="mood-note"
                        placeholder="Share what's contributing to how you feel today..."
                        value={moodNote}
                        onChange={(e) => setMoodNote(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button onClick={() => setStep(2)} disabled={!selectedMood}>
                        Continue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>What might be influencing your mood?</CardTitle>
                    <CardDescription>
                      Select any factors that might be contributing to how you feel (optional)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {moodTriggers.map((trigger) => (
                        <Badge
                          key={trigger}
                          variant={selectedTriggers.includes(trigger) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-primary/80"
                          onClick={() => toggleTrigger(trigger)}
                        >
                          {trigger}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>How are you taking care of yourself?</CardTitle>
                    <CardDescription>Select any coping strategies you're using or planning to use</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {copingStrategies.map((strategy) => (
                        <Badge
                          key={strategy}
                          variant={selectedStrategies.includes(strategy) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-primary/80"
                          onClick={() => toggleStrategy(strategy)}
                        >
                          {strategy}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Mood Entry"}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
