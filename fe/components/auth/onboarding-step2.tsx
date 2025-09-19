"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft } from "lucide-react"

const mentalHealthOptions = [
  {
    value: "no-history",
    label: "No previous mental health support",
    description: "This is my first time seeking mental health resources",
  },
  {
    value: "some-experience",
    label: "Some experience with mental health support",
    description: "I've used counseling services or apps before",
  },
  {
    value: "ongoing-support",
    label: "Currently receiving mental health support",
    description: "I'm working with a therapist or taking medication",
  },
  {
    value: "prefer-not-say",
    label: "Prefer not to say",
    description: "I'd rather not share this information",
  },
]

interface OnboardingStep2Props {
  data: any
  onUpdate: (data: any) => void
  onNext: () => void
  onPrevious: () => void
}

export function OnboardingStep2({ data, onUpdate, onNext, onPrevious }: OnboardingStep2Props) {
  const [mentalHealthHistory, setMentalHealthHistory] = useState(data.mentalHealthHistory || "")
  const [additionalInfo, setAdditionalInfo] = useState(data.additionalInfo || "")

  const handleNext = () => {
    onUpdate({
      mentalHealthHistory,
      additionalInfo,
    })
    onNext()
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Tell us about your background</h2>
        <p className="text-muted-foreground">This information helps us provide appropriate resources and support.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-base font-medium">What's your experience with mental health support?</Label>

          <RadioGroup value={mentalHealthHistory} onValueChange={setMentalHealthHistory} className="space-y-3">
            {mentalHealthOptions.map((option) => (
              <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-accent/50">
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={option.value} className="font-medium cursor-pointer">
                    {option.label}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label htmlFor="additional-info" className="text-base font-medium">
            Anything else you'd like us to know? (Optional)
          </Label>
          <Textarea
            id="additional-info"
            placeholder="Share any specific concerns, goals, or preferences that might help us support you better..."
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground">
            This information is confidential and helps us personalize your experience.
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button onClick={handleNext} disabled={!mentalHealthHistory} className="px-8">
          Continue
        </Button>
      </div>
    </div>
  )
}
