"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// Mock module data
const recommendedModules = [
  {
    id: 1,
    title: "Stress Management Basics",
    description: "Learn fundamental techniques for managing academic stress",
    duration: "15 min",
    difficulty: "Beginner",
    progress: 0,
    rating: 4.8,
    category: "Stress & Anxiety",
  },
  {
    id: 2,
    title: "Mindful Breathing Exercises",
    description: "Practice breathing techniques for immediate calm",
    duration: "10 min",
    difficulty: "Beginner",
    progress: 60,
    rating: 4.9,
    category: "Mindfulness",
  },
  {
    id: 3,
    title: "Sleep Hygiene for Students",
    description: "Improve your sleep quality and academic performance",
    duration: "20 min",
    difficulty: "Intermediate",
    progress: 0,
    rating: 4.7,
    category: "Sleep & Wellness",
  },
]

export function RecommendedModules() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5" />
            Recommended for You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendedModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-3 border rounded-lg space-y-3 hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-sm leading-tight">{module.title}</h4>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {module.category}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2">{module.description}</p>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {module.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {module.rating}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {module.difficulty}
                    </Badge>
                  </div>

                  {module.progress > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-1" />
                    </div>
                  )}
                </div>

                <Button size="sm" variant="outline" className="w-full bg-transparent" asChild>
                  <Link href={`/modules/${module.id}`}>{module.progress > 0 ? "Continue" : "Start Module"}</Link>
                </Button>
              </motion.div>
            ))}

            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/modules">Browse All Modules</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
