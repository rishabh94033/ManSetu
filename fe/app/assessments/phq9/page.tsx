"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { AssessmentQuestion } from "@/components/assessments/assessment-question"
import { AssessmentResults } from "@/components/assessments/assessment-results"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

const phq9Questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself in some way",
]

const responseOptions = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" },
]

export default function PHQ9AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(phq9Questions.length).fill(-1))
  const [isComplete, setIsComplete] = useState(false)
  const [results, setResults] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
    }
  }, [router])

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < phq9Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResults()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateResults = () => {
    const totalScore = answers.reduce((sum, answer) => sum + answer, 0)

    let severity = ""
    let interpretation = ""
    let recommendations: string[] = []

    if (totalScore <= 4) {
      severity = "Minimal"
      interpretation = "Your responses suggest minimal depression symptoms."
      recommendations = [
        "Continue with healthy lifestyle habits",
        "Stay connected with friends and family",
        "Consider mindfulness or stress management techniques",
      ]
    } else if (totalScore <= 9) {
      severity = "Mild"
      interpretation = "Your responses suggest mild depression symptoms."
      recommendations = [
        "Consider speaking with a counselor or therapist",
        "Engage in regular physical activity",
        "Practice stress management techniques",
        "Maintain social connections",
      ]
    } else if (totalScore <= 14) {
      severity = "Moderate"
      interpretation = "Your responses suggest moderate depression symptoms."
      recommendations = [
        "Strongly consider professional mental health support",
        "Speak with your healthcare provider",
        "Consider therapy or counseling services",
        "Reach out to trusted friends or family members",
      ]
    } else if (totalScore <= 19) {
      severity = "Moderately Severe"
      interpretation = "Your responses suggest moderately severe depression symptoms."
      recommendations = [
        "Seek professional mental health treatment",
        "Contact your healthcare provider soon",
        "Consider both therapy and medication evaluation",
        "Ensure you have support from friends or family",
      ]
    } else {
      severity = "Severe"
      interpretation = "Your responses suggest severe depression symptoms."
      recommendations = [
        "Seek immediate professional mental health treatment",
        "Contact your healthcare provider right away",
        "Consider emergency services if you have thoughts of self-harm",
        "Reach out to crisis support services: 988 Suicide & Crisis Lifeline",
      ]
    }

    const assessmentResult = {
      id: Date.now(),
      type: "phq9",
      score: totalScore,
      maxScore: 27,
      severity,
      interpretation,
      recommendations,
      answers,
      date: new Date().toISOString(),
      questions: phq9Questions,
    }

    // Save to localStorage
    const existingHistory = JSON.parse(localStorage.getItem("assessmentHistory") || "[]")
    existingHistory.unshift(assessmentResult)
    localStorage.setItem("assessmentHistory", JSON.stringify(existingHistory))

    setResults(assessmentResult)
    setIsComplete(true)
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers(new Array(phq9Questions.length).fill(-1))
    setIsComplete(false)
    setResults(null)
  }

  const progress = ((currentQuestion + 1) / phq9Questions.length) * 100

  if (isComplete && results) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container max-w-3xl mx-auto px-4 py-8">
          <AssessmentResults results={results} onRestart={handleRestart} assessmentType="PHQ-9 Depression Screening" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/assessments">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">PHQ-9 Depression Screening</h1>
              <p className="text-muted-foreground">
                Over the last 2 weeks, how often have you been bothered by any of the following problems?
              </p>
            </div>
          </div>

          {/* Progress */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    Question {currentQuestion + 1} of {phq9Questions.length}
                  </span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AssessmentQuestion
                question={phq9Questions[currentQuestion]}
                options={responseOptions}
                selectedValue={answers[currentQuestion]}
                onSelect={handleAnswer}
                questionNumber={currentQuestion + 1}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <Button onClick={handleNext} disabled={answers[currentQuestion] === -1}>
              {currentQuestion === phq9Questions.length - 1 ? "Complete Assessment" : "Next"}
              {currentQuestion < phq9Questions.length - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
