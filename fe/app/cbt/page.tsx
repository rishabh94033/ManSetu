"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Mic,
  MicOff,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Save,
  Lightbulb,
  Target,
  Eye,
  Zap,
  AlertTriangle,
  Users,
  Clock,
  TrendingDown,
  Filter,
  CheckCircle,
  Star,
  Calendar,
  BarChart3,
  Trophy,
  Flame,
} from "lucide-react"
import { cn } from "@/lib/utils"

const cognitiveDistortions = [
  {
    id: "catastrophizing",
    name: "Catastrophizing",
    description: "Expecting the worst possible outcome",
    icon: AlertTriangle,
    color: "bg-red-100 text-red-700 border-red-200",
    example: "If I fail this test, I'll never graduate",
  },
  {
    id: "mind-reading",
    name: "Mind Reading",
    description: "Assuming you know what others are thinking",
    icon: Brain,
    color: "bg-purple-100 text-purple-700 border-purple-200",
    example: "They think I'm stupid",
  },
  {
    id: "fortune-telling",
    name: "Fortune Telling",
    description: "Predicting negative future events",
    icon: Eye,
    color: "bg-blue-100 text-blue-700 border-blue-200",
    example: "I'll never find a job",
  },
  {
    id: "all-or-nothing",
    name: "All-or-Nothing",
    description: "Seeing things in black and white",
    icon: Target,
    color: "bg-gray-100 text-gray-700 border-gray-200",
    example: "I'm either perfect or a failure",
  },
  {
    id: "overgeneralization",
    name: "Overgeneralization",
    description: "Drawing broad conclusions from single events",
    icon: TrendingDown,
    color: "bg-orange-100 text-orange-700 border-orange-200",
    example: "I always mess things up",
  },
  {
    id: "mental-filter",
    name: "Mental Filter",
    description: "Focusing only on negative details",
    icon: Filter,
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    example: "Only seeing what went wrong",
  },
  {
    id: "emotional-reasoning",
    name: "Emotional Reasoning",
    description: "Believing feelings reflect reality",
    icon: Zap,
    color: "bg-pink-100 text-pink-700 border-pink-200",
    example: "I feel stupid, so I must be stupid",
  },
  {
    id: "personalization",
    name: "Personalization",
    description: "Blaming yourself for things outside your control",
    icon: Users,
    color: "bg-green-100 text-green-700 border-green-200",
    example: "It's my fault they're upset",
  },
  {
    id: "should-statements",
    name: "Should Statements",
    description: "Using rigid rules about how things should be",
    icon: Clock,
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
    example: "I should always be productive",
  },
]

const reframePrompts = [
  "What evidence supports or contradicts this thought?",
  "What would you say to a friend thinking this way?",
  "Is there a more balanced way to look at this situation?",
  "What are some alternative explanations?",
  "How might you view this in 5 years?",
  "What would be a more helpful way to think about this?",
]

export default function CBTPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [automaticThought, setAutomaticThought] = useState("")
  const [selectedDistortions, setSelectedDistortions] = useState<string[]>([])
  const [reframedThought, setReframedThought] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [sessions, setSessions] = useState<any[]>([])
  const [streak, setStreak] = useState(7)
  const [totalSessions, setTotalSessions] = useState(23)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const progress = (currentStep / 4) * 100

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [automaticThought])

  const handleDistortionToggle = (distortionId: string) => {
    setSelectedDistortions((prev) =>
      prev.includes(distortionId) ? prev.filter((id) => id !== distortionId) : [...prev, distortionId],
    )
  }

  const handleSaveSession = () => {
    const session = {
      id: Date.now(),
      date: new Date().toISOString(),
      automaticThought,
      selectedDistortions,
      reframedThought,
    }
    setSessions((prev) => [session, ...prev])
    setTotalSessions((prev) => prev + 1)

    // Reset for new session
    setCurrentStep(1)
    setAutomaticThought("")
    setSelectedDistortions([])
    setReframedThought("")
  }

  const handleVoiceInput = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onstart = () => setIsRecording(true)
      recognition.onend = () => setIsRecording(false)
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setAutomaticThought((prev) => prev + " " + transcript)
      }

      recognition.start()
    }
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
              currentStep >= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
            )}
          >
            {step}
          </div>
          {step < 4 && (
            <div className={cn("w-12 h-0.5 mx-2 transition-all", currentStep > step ? "bg-primary" : "bg-muted")} />
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">CBT Thought Challenger</h1>
        </div>
        <p className="text-muted-foreground text-lg">Transform negative thoughts into balanced perspectives</p>
      </motion.div>

      {/* Progress and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Flame className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold">{streak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
                <p className="text-2xl font-bold">{totalSessions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <Progress value={progress} className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <StepIndicator />

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Step 1: Capture Your Automatic Thought
                </CardTitle>
                <CardDescription>Write down the negative or distressing thought that came to mind</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Textarea
                    ref={textareaRef}
                    placeholder="What thought is bothering you? (e.g., 'I'm going to fail this presentation and everyone will think I'm incompetent')"
                    value={automaticThought}
                    onChange={(e) => setAutomaticThought(e.target.value)}
                    className="min-h-[120px] resize-none pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleVoiceInput}
                    disabled={isRecording}
                  >
                    {isRecording ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setCurrentStep(2)} disabled={!automaticThought.trim()} className="gap-2">
                    Next Step
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Step 2: Identify Cognitive Distortions
                </CardTitle>
                <CardDescription>Select the thinking patterns that apply to your thought</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-medium mb-2">Your thought:</p>
                  <p className="text-sm italic">"{automaticThought}"</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cognitiveDistortions.map((distortion) => {
                    const Icon = distortion.icon
                    const isSelected = selectedDistortions.includes(distortion.id)

                    return (
                      <motion.div key={distortion.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Card
                          className={cn(
                            "cursor-pointer transition-all border-2",
                            isSelected
                              ? "border-primary bg-primary/5 shadow-md"
                              : "border-border hover:border-primary/50",
                          )}
                          onClick={() => handleDistortionToggle(distortion.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className={cn("p-2 rounded-lg", distortion.color)}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-sm mb-1">{distortion.name}</h3>
                                <p className="text-xs text-muted-foreground mb-2">{distortion.description}</p>
                                <p className="text-xs italic text-muted-foreground">"{distortion.example}"</p>
                              </div>
                              {isSelected && <CheckCircle className="h-4 w-4 text-primary" />}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)} className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    disabled={selectedDistortions.length === 0}
                    className="gap-2"
                  >
                    Next Step
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5" />
                  Step 3: Reframe Your Thought
                </CardTitle>
                <CardDescription>Create a more balanced and realistic perspective</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-medium mb-2">Your original thought:</p>
                    <p className="text-sm italic mb-3">"{automaticThought}"</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDistortions.map((id) => {
                        const distortion = cognitiveDistortions.find((d) => d.id === id)
                        return (
                          <Badge key={id} variant="secondary" className="text-xs">
                            {distortion?.name}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="font-medium">Consider these questions:</p>
                    <div className="grid gap-2">
                      {reframePrompts.map((prompt, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary">•</span>
                          <span>{prompt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Textarea
                    placeholder="Write a more balanced, realistic thought here..."
                    value={reframedThought}
                    onChange={(e) => setReframedThought(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)} className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button onClick={() => setCurrentStep(4)} disabled={!reframedThought.trim()} className="gap-2">
                    Review & Save
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Step 4: Session Summary
                </CardTitle>
                <CardDescription>Review your progress and save this session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-red-600 mb-2">Original Thought:</h4>
                    <p className="text-sm italic">"{automaticThought}"</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-orange-600 mb-2">Identified Distortions:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDistortions.map((id) => {
                        const distortion = cognitiveDistortions.find((d) => d.id === id)
                        return (
                          <Badge key={id} variant="outline" className="text-xs">
                            {distortion?.name}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-green-600 mb-2">Reframed Thought:</h4>
                    <p className="text-sm italic">"{reframedThought}"</p>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-green-600" />
                    <p className="font-medium text-green-800 dark:text-green-200">Great work!</p>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    You've successfully challenged a negative thought pattern. Regular practice will help you develop
                    more balanced thinking habits.
                  </p>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(3)} className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCurrentStep(1)
                        setAutomaticThought("")
                        setSelectedDistortions([])
                        setReframedThought("")
                      }}
                      className="gap-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      New Session
                    </Button>
                    <Button onClick={handleSaveSession} className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Session
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Sessions */}
      {sessions.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessions.slice(0, 3).map((session) => (
                  <div key={session.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm text-muted-foreground">{new Date(session.date).toLocaleDateString()}</p>
                      <Badge variant="outline" className="text-xs">
                        {session.selectedDistortions.length} distortions
                      </Badge>
                    </div>
                    <p className="text-sm font-medium mb-1">Original:</p>
                    <p className="text-sm text-muted-foreground mb-2 italic">
                      "{session.automaticThought.substring(0, 100)}..."
                    </p>
                    <p className="text-sm font-medium mb-1">Reframed:</p>
                    <p className="text-sm text-green-600 italic">"{session.reframedThought.substring(0, 100)}..."</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}