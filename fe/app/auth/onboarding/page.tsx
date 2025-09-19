"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { OnboardingStep1 } from "@/components/auth/onboarding-step1"
import { OnboardingStep2 } from "@/components/auth/onboarding-step2"
import { OnboardingStep3 } from "@/components/auth/onboarding-step3"
import { OnboardingStep4 } from "@/components/auth/onboarding-step4"
import { CounselorProfessionalStep } from "@/components/auth/counselor-professional-step"
import { useToast } from "@/hooks/use-toast"

const TOTAL_STEPS = 4

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState({
    goals: [] as string[],
    mentalHealthHistory: "",
    supportPreferences: [] as string[],
    privacySettings: {
      shareProgress: false,
      allowCommunityInteraction: true,
      receiveReminders: true,
    },
    professionalInfo: {
      yearsOfExperience: "",
      qualifications: [] as string[],
      specializations: [] as string[],
      licenseNumber: "",
      institution: "",
    },
  })
  const [user, setUser] = useState<any>(null)
  const [totalSteps, setTotalSteps] = useState(4)

  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.onboardingComplete) {
      const dashboardRoute =
        parsedUser.role === "counselor" ? "/counselor" : parsedUser.role === "guest" ? "/guest-dashboard" : "/dashboard"
      router.push(dashboardRoute)
      return
    }

    setUser(parsedUser)
    if (parsedUser.role === "counselor") {
      setTotalSteps(5)
    } else if (parsedUser.role === "guest") {
      setTotalSteps(2)
    }
  }, [router])

  const updateOnboardingData = (stepData: any) => {
    setOnboardingData((prev) => ({ ...prev, ...stepData }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleComplete = () => {
    const updatedUser = {
      ...user,
      onboardingComplete: true,
      onboardingData,
      completedAt: new Date().toISOString(),
    }

    localStorage.setItem("user", JSON.stringify(updatedUser))

    toast({
      title: "Welcome to MindWell!",
      description:
        user.role === "counselor"
          ? "Your professional profile has been set up successfully."
          : "Your profile has been set up successfully. Let's start your mental health journey.",
    })

    const dashboardRoute =
      user.role === "counselor" ? "/counselor" : user.role === "guest" ? "/guest-dashboard" : "/dashboard"
    router.push(dashboardRoute)
  }

  const progress = (currentStep / totalSteps) * 100

  if (!user) {
    return <div>Loading...</div>
  }

  const renderStep = () => {
    if (user.role === "guest") {
      switch (currentStep) {
        case 1:
          return (
            <OnboardingStep1
              data={onboardingData}
              onUpdate={updateOnboardingData}
              onNext={handleNext}
              userRole="guest"
            />
          )
        case 2:
          return (
            <OnboardingStep4
              data={onboardingData}
              onUpdate={updateOnboardingData}
              onComplete={handleComplete}
              onPrevious={handlePrevious}
              userRole="guest"
            />
          )
        default:
          return null
      }
    }

    if (user.role === "counselor") {
      switch (currentStep) {
        case 1:
          return (
            <OnboardingStep1
              data={onboardingData}
              onUpdate={updateOnboardingData}
              onNext={handleNext}
              userRole="counselor"
            />
          )
        case 2:
          return (
            <OnboardingStep2
              data={onboardingData}
              onUpdate={updateOnboardingData}
              onNext={handleNext}
              onPrevious={handlePrevious}
              userRole="counselor"
            />
          )
        case 3:
          return (
            <OnboardingStep3
              data={onboardingData}
              onUpdate={updateOnboardingData}
              onNext={handleNext}
              onPrevious={handlePrevious}
              userRole="counselor"
            />
          )
        case 4:
          return (
            <CounselorProfessionalStep
              data={onboardingData}
              onUpdate={updateOnboardingData}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )
        case 5:
          return (
            <OnboardingStep4
              data={onboardingData}
              onUpdate={updateOnboardingData}
              onComplete={handleComplete}
              onPrevious={handlePrevious}
              userRole="counselor"
            />
          )
        default:
          return null
      }
    }

    switch (currentStep) {
      case 1:
        return (
          <OnboardingStep1
            data={onboardingData}
            onUpdate={updateOnboardingData}
            onNext={handleNext}
            userRole="student"
          />
        )
      case 2:
        return (
          <OnboardingStep2
            data={onboardingData}
            onUpdate={updateOnboardingData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            userRole="student"
          />
        )
      case 3:
        return (
          <OnboardingStep3
            data={onboardingData}
            onUpdate={updateOnboardingData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            userRole="student"
          />
        )
      case 4:
        return (
          <OnboardingStep4
            data={onboardingData}
            onUpdate={updateOnboardingData}
            onComplete={handleComplete}
            onPrevious={handlePrevious}
            userRole="student"
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container max-w-2xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">
              {user?.role === "counselor"
                ? "Set up your professional profile"
                : user?.role === "guest"
                  ? "Quick setup to get started"
                  : "Let's personalize your experience"}
            </h1>
            <p className="text-muted-foreground">
              {user?.role === "counselor"
                ? "Help us verify your credentials and set up your counseling profile."
                : user?.role === "guest"
                  ? "Just a few quick questions to customize your experience."
                  : "Help us understand your needs so we can provide the best support for you."}
            </p>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  Step {currentStep} of {totalSteps}
                </span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
