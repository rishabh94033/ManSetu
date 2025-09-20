"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Volume2, VolumeX, Sparkles, Calendar, TrendingUp, Heart, Flower, Sun, Cloud } from "lucide-react"
import Link from "next/link"

interface MoodEntry {
  id: number
  mood: number
  note: string
  triggers: string[]
  strategies: string[]
  timestamp: string
}

const flowerTypes = {
  1: {
    // Very Sad
    emoji: "🥀",
    name: "Wilted Rose",
    color: "text-gray-600",
    bgColor: "bg-gray-100 dark:bg-gray-800",
    description: "Even in darkness, beauty persists",
  },
  2: {
    // Sad
    emoji: "🌾",
    name: "Autumn Wheat",
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    description: "Seasons of change bring wisdom",
  },
  3: {
    // Neutral
    emoji: "🌿",
    name: "Gentle Fern",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    description: "Steady growth in quiet moments",
  },
  4: {
    // Happy
    emoji: "🌻",
    name: "Bright Sunflower",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    description: "Radiating warmth and joy",
  },
  5: {
    // Very Happy
    emoji: "🌺",
    name: "Vibrant Hibiscus",
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    description: "Blooming with pure happiness",
  },
}

const weatherMood = {
  1: { icon: Cloud, weather: "Cloudy" },
  2: { icon: Cloud, weather: "Overcast" },
  3: { icon: Sun, weather: "Partly Cloudy" },
  4: { icon: Sun, weather: "Sunny" },
  5: { icon: Sun, weather: "Brilliant Sunshine" },
}

export default function GardenPage() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedFlower, setSelectedFlower] = useState<number | null>(null)
  const [gardenStats, setGardenStats] = useState({
    totalFlowers: 0,
    averageMood: 0,
    streak: 0,
    lastEntry: null as Date | null,
  })

  const audioRef = useRef<HTMLAudioElement>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
      return
    }

    // Load mood entries from localStorage
    const entries = JSON.parse(localStorage.getItem("moodEntries") || "[]")
    setMoodEntries(entries)

    // Calculate garden stats
    if (entries.length > 0) {
      const totalMood = entries.reduce((sum: number, entry: MoodEntry) => sum + entry.mood, 0)
      const avgMood = totalMood / entries.length

      // Calculate streak (consecutive days with entries)
      const today = new Date()
      let streak = 0
      for (let i = 0; i < 30; i++) {
        const checkDate = new Date(today)
        checkDate.setDate(checkDate.getDate() - i)
        const hasEntry = entries.some((entry: MoodEntry) => {
          const entryDate = new Date(entry.timestamp)
          return entryDate.toDateString() === checkDate.toDateString()
        })
        if (hasEntry) {
          streak++
        } else if (i > 0) {
          break
        }
      }

      setGardenStats({
        totalFlowers: entries.length,
        averageMood: avgMood,
        streak,
        lastEntry: entries.length > 0 ? new Date(entries[entries.length - 1].timestamp) : null,
      })
    }

    // Initialize background music
    if (audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.loop = true
    }
  }, [router])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(console.error)
      }
      setIsPlaying(!isPlaying)
    }
  }

  const getGardenLayout = () => {
    const flowers = moodEntries.slice(-20) // Show last 20 entries
    const rows = 4
    const cols = 5
    const layout = []

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const index = row * cols + col
        const flower = flowers[index]
        layout.push({
          row,
          col,
          flower,
          isEmpty: !flower,
        })
      }
    }

    return layout
  }

  const getCurrentWeather = () => {
    if (moodEntries.length === 0) return weatherMood[3]
    const recentMoods = moodEntries.slice(-5)
    const avgMood = recentMoods.reduce((sum, entry) => sum + entry.mood, 0) / recentMoods.length
    const moodLevel = Math.round(avgMood) as keyof typeof weatherMood
    return weatherMood[moodLevel] || weatherMood[3]
  }

  const weather = getCurrentWeather()
  const WeatherIcon = weather.icon

  return (
    <div className="min-h-screen garden-background">
      <Navigation />

      {/* Background Music */}
      <audio ref={audioRef} src="/placeholder.mp3?query=calm nature sounds garden ambience" preload="auto" />

      <div className="container max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-4xl font-bold text-balance">Your Emotional Garden</h1>
                <p className="text-muted-foreground text-pretty">Every feeling blooms into something beautiful</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <WeatherIcon className="h-4 w-4" />
                {weather.weather}
              </div>
              <Button variant="outline" size="icon" onClick={toggleMusic} className="relative bg-transparent">
                {isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Garden Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/70 backdrop-blur-sm border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{gardenStats.totalFlowers}</div>
                <div className="text-sm text-muted-foreground">Flowers Grown</div>
                <Flower className="h-4 w-4 mx-auto mt-1 text-green-500" />
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{gardenStats.averageMood.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">Garden Health</div>
                <Heart className="h-4 w-4 mx-auto mt-1 text-blue-500" />
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{gardenStats.streak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
                <TrendingUp className="h-4 w-4 mx-auto mt-1 text-purple-500" />
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-amber-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {gardenStats.lastEntry ? gardenStats.lastEntry.toLocaleDateString() : "Never"}
                </div>
                <div className="text-sm text-muted-foreground">Last Bloom</div>
                <Calendar className="h-4 w-4 mx-auto mt-1 text-amber-500" />
              </CardContent>
            </Card>
          </div>

          {/* Main Garden */}
          <Card className="bg-white/80 backdrop-blur-sm border-green-200 overflow-hidden">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                Your Mood Garden
              </CardTitle>
              <CardDescription>Each flower represents a day you checked in with your emotions</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              {moodEntries.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🌱</div>
                  <h3 className="text-xl font-semibold mb-2">Your garden is waiting to bloom</h3>
                  <p className="text-muted-foreground mb-6">Start tracking your moods to grow your first flower</p>
                  <Button asChild>
                    <Link href="/mood">
                      <Heart className="h-4 w-4 mr-2" />
                      Log Your First Mood
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Garden Path */}
                  <div className="garden-path h-4 w-full mb-8"></div>

                  {/* Flower Garden Grid */}
                  <div className="grid grid-cols-5 gap-6 max-w-2xl mx-auto">
                    {getGardenLayout().map((spot, index) => (
                      <motion.div
                        key={index}
                        className="aspect-square flex items-center justify-center relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {spot.flower ? (
                          <motion.button
                            className={`w-full h-full rounded-full ${flowerTypes[spot.flower.mood as keyof typeof flowerTypes].bgColor} 
                              border-2 border-green-200 hover:border-green-400 transition-all duration-300
                              flex items-center justify-center flower-sway hover:scale-110`}
                            onClick={() => setSelectedFlower(selectedFlower === spot.flower.id ? null : spot.flower.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="text-3xl flower-animation">
                              {flowerTypes[spot.flower.mood as keyof typeof flowerTypes].emoji}
                            </span>
                          </motion.button>
                        ) : (
                          <div
                            className="w-full h-full rounded-full bg-green-50 dark:bg-green-900/10 
                            border-2 border-dashed border-green-200 flex items-center justify-center"
                          >
                            <span className="text-green-300 text-2xl">🌱</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Flower Details */}
                  <AnimatePresence>
                    {selectedFlower && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-8"
                      >
                        {(() => {
                          const flower = moodEntries.find((entry) => entry.id === selectedFlower)
                          if (!flower) return null

                          const flowerType = flowerTypes[flower.mood as keyof typeof flowerTypes]
                          return (
                            <Card className="bg-white/90 backdrop-blur-sm">
                              <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                  <div className="text-4xl">{flowerType.emoji}</div>
                                  <div className="flex-1">
                                    <h3 className="text-lg font-semibold">{flowerType.name}</h3>
                                    <p className="text-sm text-muted-foreground italic mb-2">
                                      {flowerType.description}
                                    </p>
                                    <p className="text-sm text-muted-foreground mb-3">
                                      Bloomed on{" "}
                                      {new Date(flower.timestamp).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}
                                    </p>

                                    {flower.note && (
                                      <div className="mb-3">
                                        <p className="text-sm font-medium mb-1">Your thoughts:</p>
                                        <p className="text-sm bg-muted/50 p-2 rounded">{flower.note}</p>
                                      </div>
                                    )}

                                    {flower.triggers.length > 0 && (
                                      <div className="mb-3">
                                        <p className="text-sm font-medium mb-2">What influenced this bloom:</p>
                                        <div className="flex flex-wrap gap-1">
                                          {flower.triggers.map((trigger) => (
                                            <Badge key={trigger} variant="outline" className="text-xs">
                                              {trigger}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {flower.strategies.length > 0 && (
                                      <div>
                                        <p className="text-sm font-medium mb-2">How you nurtured yourself:</p>
                                        <div className="flex flex-wrap gap-1">
                                          {flower.strategies.map((strategy) => (
                                            <Badge key={strategy} variant="secondary" className="text-xs">
                                              {strategy}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )
                        })()}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Call to Action */}
                  <div className="text-center pt-8">
                    <Button asChild size="lg">
                      <Link href="/mood">
                        <Heart className="h-4 w-4 mr-2" />
                        Grow Another Flower
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Garden Philosophy */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Every Emotion Has Its Beauty</h3>
              <p className="text-muted-foreground text-pretty">
                In nature, there's beauty in every season. Your emotional garden celebrates all feelings - from the
                vibrant blooms of joy to the quiet strength of difficult days. Each flower tells part of your story.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}