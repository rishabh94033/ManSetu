"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

interface AssessmentQuestionProps {
  question: string
  options: { value: number; label: string }[]
  selectedValue: number
  onSelect: (value: number) => void
  questionNumber: number
}

export function AssessmentQuestion({
  question,
  options,
  selectedValue,
  onSelect,
  questionNumber,
}: AssessmentQuestionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {questionNumber}. {question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedValue.toString()}
          onValueChange={(value) => onSelect(Number.parseInt(value))}
          className="space-y-3"
        >
          {options.map((option, index) => (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
            >
              <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
              <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer font-medium">
                {option.label}
              </Label>
            </motion.div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
