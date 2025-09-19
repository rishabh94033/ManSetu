"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"
import { CheckCircle, AlertTriangle, Phone, RotateCcw } from "lucide-react"
import Link from "next/link"

interface AssessmentResultsProps {
  results: {
    score: number
    maxScore: number
    severity: string
    interpretation: string
    recommendations: string[]
    date: string
  }
  onRestart: () => void
  assessmentType: string
}

export function AssessmentResults({ results, onRestart, assessmentType }: AssessmentResultsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "minimal":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "mild":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "moderate":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "moderately severe":
      case "severe":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const showCrisisAlert = results.severity.toLowerCase().includes("severe")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Crisis Alert */}
      {showCrisisAlert && (
        <Alert className="border-red-200 bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Important:</strong> Your responses indicate you may be experiencing significant distress. Please
            consider reaching out for immediate support. If you're having thoughts of self-harm, call 988 (Suicide &
            Crisis Lifeline) or go to your nearest emergency room.
          </AlertDescription>
        </Alert>
      )}

      {/* Results Header */}
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Assessment Complete</CardTitle>
          <CardDescription>
            {assessmentType} completed on {new Date(results.date).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <div className="text-4xl font-bold">
              {results.score}/{results.maxScore}
            </div>
            <Badge className={`text-lg px-4 py-1 ${getSeverityColor(results.severity)}`}>{results.severity}</Badge>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">{results.interpretation}</p>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Next Steps</CardTitle>
          <CardDescription>Based on your responses, here are some suggestions for your wellbeing</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {results.recommendations.map((recommendation, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>{recommendation}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Get Support</CardTitle>
          <CardDescription>Connect with resources and support when you need it</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button asChild className="h-auto p-4">
              <Link href="/chat">
                <div className="text-center">
                  <div className="font-medium">Talk to a Counselor</div>
                  <div className="text-sm opacity-90">Get professional support</div>
                </div>
              </Link>
            </Button>

            <Button variant="outline" asChild className="h-auto p-4 bg-transparent">
              <Link href="/telehealth">
                <div className="text-center">
                  <div className="font-medium">Book a Session</div>
                  <div className="text-sm opacity-70">Schedule with a therapist</div>
                </div>
              </Link>
            </Button>

            <Button variant="outline" asChild className="h-auto p-4 bg-transparent">
              <Link href="/resources">
                <div className="text-center">
                  <div className="font-medium">Browse Resources</div>
                  <div className="text-sm opacity-70">Self-help materials</div>
                </div>
              </Link>
            </Button>

            <Button variant="outline" asChild className="h-auto p-4 bg-transparent">
              <a href="tel:988">
                <div className="text-center">
                  <Phone className="h-5 w-5 mx-auto mb-1" />
                  <div className="font-medium">Crisis Support</div>
                  <div className="text-sm opacity-70">Call 988</div>
                </div>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onRestart} variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" />
          Take Again
        </Button>

        <Button asChild>
          <Link href="/assessments">View All Assessments</Link>
        </Button>
      </div>
    </motion.div>
  )
}
