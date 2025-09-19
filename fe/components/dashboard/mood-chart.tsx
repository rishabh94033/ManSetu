"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { TrendingUp, Calendar } from "lucide-react"
import { motion } from "framer-motion"

// Mock mood data - in real app this would come from API
const generateMoodData = (days: number) => {
  const data = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Generate realistic mood data with some patterns
    let mood = 3 + Math.random() * 2 // Base mood between 3-5

    // Add some weekly patterns (weekends slightly better)
    if (date.getDay() === 0 || date.getDay() === 6) {
      mood += 0.3
    }

    // Add some random variation
    mood += (Math.random() - 0.5) * 0.8
    mood = Math.max(1, Math.min(5, mood)) // Clamp between 1-5

    data.push({
      date: date.toISOString().split("T")[0],
      mood: Math.round(mood * 10) / 10,
      dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      fullDate: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    })
  }

  return data
}

export function MoodChart() {
  const [timeRange, setTimeRange] = useState("7")
  const [moodData, setMoodData] = useState<any[]>([])

  useEffect(() => {
    const data = generateMoodData(Number.parseInt(timeRange))
    setMoodData(data)
  }, [timeRange])

  const averageMood =
    moodData.length > 0 ? (moodData.reduce((sum, item) => sum + item.mood, 0) / moodData.length).toFixed(1) : "0"

  const moodTrend = moodData.length > 1 ? moodData[moodData.length - 1].mood - moodData[0].mood : 0

  const getMoodEmoji = (mood: number) => {
    if (mood <= 1.5) return "😢"
    if (mood <= 2.5) return "😔"
    if (mood <= 3.5) return "😐"
    if (mood <= 4.5) return "😊"
    return "😄"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Mood Trends
              </CardTitle>
              <CardDescription>Track your emotional wellbeing over time</CardDescription>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">14 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-primary">{averageMood}</div>
                <div className="text-sm text-muted-foreground">Average Mood</div>
                <div className="text-lg mt-1">{getMoodEmoji(Number.parseFloat(averageMood))}</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className={`text-2xl font-bold ${moodTrend >= 0 ? "text-green-600" : "text-orange-600"}`}>
                  {moodTrend >= 0 ? "+" : ""}
                  {moodTrend.toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">Trend</div>
                <div className="text-lg mt-1">{moodTrend >= 0 ? "📈" : "📉"}</div>
              </div>
            </div>

            {/* Chart */}
            <div className="h-64">
              <ChartContainer
                config={{
                  mood: {
                    label: "Mood",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="dayName" className="text-xs" tick={{ fontSize: 12 }} />
                    <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} className="text-xs" tick={{ fontSize: 12 }} />
                    <ChartTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-background border rounded-lg p-3 shadow-lg">
                              <p className="font-medium">{data.fullDate}</p>
                              <p className="text-sm text-muted-foreground">
                                Mood: {data.mood} {getMoodEmoji(data.mood)}
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="mood"
                      stroke="var(--color-chart-1)"
                      strokeWidth={3}
                      dot={{ fill: "var(--color-chart-1)", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "var(--color-chart-1)", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" asChild>
                <a href="/mood">
                  <Calendar className="h-4 w-4 mr-2" />
                  Log Today's Mood
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
