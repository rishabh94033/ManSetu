"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, TrendingUp } from "lucide-react"
import Link from "next/link"

interface AssessmentCardProps {
  assessment: {
    id: string
    title: string
    description: string
    duration: string
    questions: number
    type: string
    lastTaken: string | null
    color: string
  }
}

export function AssessmentCard({ assessment }: AssessmentCardProps) {
  const colorClasses = {
    blue: "border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800",
    green: "border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800",
    purple: "border-purple-200 bg-purple-50 dark:bg-purple-950 dark:border-purple-800",
  }

  return (
    <Card
      className={`hover:shadow-lg transition-all duration-300 ${colorClasses[assessment.color as keyof typeof colorClasses] || ""}`}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl">{assessment.title}</CardTitle>
            <CardDescription className="text-base">{assessment.description}</CardDescription>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {assessment.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {assessment.duration}
          </div>
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            {assessment.questions} questions
          </div>
        </div>

        {assessment.lastTaken && (
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span>Last taken: {assessment.lastTaken}</span>
          </div>
        )}

        <div className="pt-2">
          <Button asChild className="w-full">
            <Link href={`/assessments/${assessment.id}`}>
              {assessment.lastTaken ? "Retake Assessment" : "Start Assessment"}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
