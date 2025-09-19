"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { AssessmentCard } from "@/components/assessments/assessment-card"
import { AssessmentHistory } from "@/components/assessments/assessment-history"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { BarChart3, History, Shield, AlertTriangle } from "lucide-react"

const assessments = [
  {
    id: "phq9",
    title: "PHQ-9 Depression Screening",
    description: "A 9-question assessment to screen for depression symptoms over the past two weeks.",
    duration: "5-7 minutes",
    questions: 9,
    type: "depression",
    lastTaken: null,
    color: "blue",
  },
  {
    id: "gad7",
    title: "GAD-7 Anxiety Screening",
    description: "A 7-question assessment to screen for generalized anxiety disorder symptoms.",
    duration: "3-5 minutes",
    questions: 7,
    type: "anxiety",
    lastTaken: null,
    color: "green",
  },
]

export default function AssessmentsPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (!parsedUser.onboardingComplete) {
      router.push("/auth/onboarding")
      return
    }

    setUser(parsedUser)
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-64 bg-muted rounded"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BarChart3 className="h-8 w-8" />
              Mental Health Assessments
            </h1>
            <p className="text-muted-foreground mt-1">
              Validated screening tools to help understand your mental health
            </p>
          </div>

          {/* Important Notice */}
          <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-medium text-sm text-orange-800 dark:text-orange-200">Important Notice</h3>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    These assessments are screening tools and not diagnostic instruments. Results should be discussed
                    with a qualified mental health professional. If you're experiencing thoughts of self-harm, please
                    seek immediate help by calling 988.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Notice */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-medium text-sm">Your privacy is protected</h3>
                  <p className="text-sm text-muted-foreground">
                    Assessment results are confidential and encrypted. You control who has access to your information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assessment Interface */}
          <Tabs defaultValue="assessments" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="assessments" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Take Assessment
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                My Results
              </TabsTrigger>
            </TabsList>

            <TabsContent value="assessments">
              <div className="grid md:grid-cols-2 gap-6">
                {assessments.map((assessment, index) => (
                  <motion.div
                    key={assessment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <AssessmentCard assessment={assessment} />
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history">
              <AssessmentHistory />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
