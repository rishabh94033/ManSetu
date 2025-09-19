"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Calendar, TrendingUp, FileText, Eye } from "lucide-react"
import { motion } from "framer-motion"

export function AssessmentHistory() {
  const [assessmentHistory, setAssessmentHistory] = useState<any[]>([])

  useEffect(() => {
    // Load assessment history from localStorage
    const history = JSON.parse(localStorage.getItem("assessmentHistory") || "[]")
    setAssessmentHistory(history)
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "minimal":
      case "none":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "mild":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "moderate":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "severe":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  if (assessmentHistory.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No assessment history yet</h3>
        <p className="text-muted-foreground mb-6">
          Your completed assessments will appear here. Regular screening can help track your mental health over time.
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>📊 Track your progress over time</p>
          <p>📈 Identify patterns and trends</p>
          <p>🎯 Share results with your healthcare provider</p>
        </div>
      </motion.div>
    )
  }

  // Group assessments by type for trend analysis
  const phq9Results = assessmentHistory.filter((a) => a.type === "phq9").slice(-6)
  const gad7Results = assessmentHistory.filter((a) => a.type === "gad7").slice(-6)

  return (
    <div className="space-y-6">
      {/* Trend Charts */}
      {(phq9Results.length > 1 || gad7Results.length > 1) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Score Trends
            </CardTitle>
            <CardDescription>Track your assessment scores over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {phq9Results.length > 1 && (
                <div className="space-y-3">
                  <h4 className="font-medium">PHQ-9 Depression Scores</h4>
                  <div className="h-48">
                    <ChartContainer
                      config={{
                        score: {
                          label: "Score",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={phq9Results}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) =>
                              new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                            }
                          />
                          <YAxis domain={[0, 27]} tick={{ fontSize: 12 }} />
                          <ChartTooltip />
                          <Line
                            type="monotone"
                            dataKey="score"
                            stroke="var(--color-chart-1)"
                            strokeWidth={2}
                            dot={{ fill: "var(--color-chart-1)" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </div>
              )}

              {gad7Results.length > 1 && (
                <div className="space-y-3">
                  <h4 className="font-medium">GAD-7 Anxiety Scores</h4>
                  <div className="h-48">
                    <ChartContainer
                      config={{
                        score: {
                          label: "Score",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={gad7Results}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) =>
                              new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                            }
                          />
                          <YAxis domain={[0, 21]} tick={{ fontSize: 12 }} />
                          <ChartTooltip />
                          <Line
                            type="monotone"
                            dataKey="score"
                            stroke="var(--color-chart-2)"
                            strokeWidth={2}
                            dot={{ fill: "var(--color-chart-2)" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assessment History List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Assessment History
          </CardTitle>
          <CardDescription>Your completed mental health screenings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessmentHistory.map((assessment, index) => (
              <motion.div
                key={assessment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">
                      {assessment.type === "phq9" ? "PHQ-9 Depression" : "GAD-7 Anxiety"} Screening
                    </h4>
                    <Badge className={getSeverityColor(assessment.severity)}>{assessment.severity}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>
                      Score: {assessment.score}/{assessment.maxScore}
                    </span>
                    <span>{formatDate(assessment.date)}</span>
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
