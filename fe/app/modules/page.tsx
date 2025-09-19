"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Play, CheckCircle, Clock, Star, Users, Award, Lock } from "lucide-react"

// Mock data for learning modules
const mockModules = [
  {
    id: 1,
    title: "Mindfulness Fundamentals",
    description: "Learn the basics of mindfulness meditation and how to incorporate it into your daily routine.",
    category: "Mindfulness",
    difficulty: "Beginner",
    duration: "2 weeks",
    lessons: 8,
    progress: 75,
    rating: 4.8,
    enrolled: 1247,
    completed: false,
    locked: false,
    image: "/mindfulness-meditation.png",
  },
  {
    id: 2,
    title: "Cognitive Behavioral Therapy Basics",
    description: "Understand how thoughts, feelings, and behaviors are connected and learn practical CBT techniques.",
    category: "CBT",
    difficulty: "Intermediate",
    duration: "3 weeks",
    lessons: 12,
    progress: 30,
    rating: 4.9,
    enrolled: 892,
    completed: false,
    locked: false,
    image: "/cognitive-therapy-brain.jpg",
  },
  {
    id: 3,
    title: "Stress Management for Students",
    description:
      "Practical strategies for managing academic stress, time management, and maintaining work-life balance.",
    category: "Stress Management",
    difficulty: "Beginner",
    duration: "2 weeks",
    lessons: 10,
    progress: 100,
    rating: 4.7,
    enrolled: 2156,
    completed: true,
    locked: false,
    image: "/student-stress-management.jpg",
  },
  {
    id: 4,
    title: "Advanced Anxiety Management",
    description: "Deep dive into anxiety disorders and advanced coping strategies for severe anxiety symptoms.",
    category: "Anxiety",
    difficulty: "Advanced",
    duration: "4 weeks",
    lessons: 16,
    progress: 0,
    rating: 4.9,
    enrolled: 543,
    completed: false,
    locked: true,
    image: "/anxiety-management-calm.jpg",
  },
]

const categories = ["All", "Mindfulness", "CBT", "Stress Management", "Anxiety", "Depression", "Sleep"]
const difficulties = ["All Levels", "Beginner", "Intermediate", "Advanced"]

export default function ModulesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels")

  const filteredModules = mockModules.filter((module) => {
    const matchesCategory = selectedCategory === "All" || module.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "All Levels" || module.difficulty === selectedDifficulty
    return matchesCategory && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700"
      case "Advanced":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Learning Modules</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Evidence-based mental health education modules designed specifically for students. Learn at your own pace
            with interactive content and practical exercises.
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-600">Modules Enrolled</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">1</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">24</div>
              <div className="text-sm text-gray-600">Hours Learned</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">2</div>
              <div className="text-sm text-gray-600">Certificates Earned</div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="enrolled" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="enrolled">My Modules</TabsTrigger>
            <TabsTrigger value="available">Available Modules</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          {/* My Modules Tab */}
          <TabsContent value="enrolled" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules
                .filter((m) => m.progress > 0 && !m.completed)
                .map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                        <img
                          src={module.image || "/placeholder.svg"}
                          alt={module.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{module.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress</span>
                              <span>{module.progress}%</span>
                            </div>
                            <Progress value={module.progress} className="h-2" />
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {module.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              {module.lessons} lessons
                            </span>
                          </div>
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                            <Play className="h-4 w-4 mr-2" />
                            Continue Learning
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>

          {/* Available Modules Tab */}
          <TabsContent value="available" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules
                .filter((m) => m.progress === 0)
                .map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`h-full transition-shadow ${module.locked ? "opacity-75" : "hover:shadow-lg"}`}>
                      <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden relative">
                        <img
                          src={module.image || "/placeholder.svg"}
                          alt={module.title}
                          className="w-full h-full object-cover"
                        />
                        {module.locked && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <Lock className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{module.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {module.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              {module.lessons} lessons
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {module.enrolled.toLocaleString()} enrolled
                            </span>
                          </div>
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={module.locked}>
                            {module.locked ? (
                              <>
                                <Lock className="h-4 w-4 mr-2" />
                                Complete Prerequisites
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Start Module
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>

          {/* Completed Tab */}
          <TabsContent value="completed" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules
                .filter((m) => m.completed)
                .map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow border-green-200">
                      <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden relative">
                        <img
                          src={module.image || "/placeholder.svg"}
                          alt={module.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-600 text-white">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{module.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {module.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              {module.lessons} lessons
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1 bg-transparent">
                              Review
                            </Button>
                            <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                              <Award className="h-4 w-4 mr-2" />
                              Certificate
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
