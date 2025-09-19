"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Award, Users, FileText, Building } from "lucide-react"

const qualifications = [
  { id: "phd-psychology", label: "PhD in Psychology" },
  { id: "masters-counseling", label: "Master's in Counseling" },
  { id: "masters-social-work", label: "Master's in Social Work" },
  { id: "licensed-therapist", label: "Licensed Therapist" },
  { id: "certified-counselor", label: "Certified Professional Counselor" },
  { id: "marriage-family", label: "Marriage & Family Therapist" },
  { id: "substance-abuse", label: "Substance Abuse Counselor" },
  { id: "other", label: "Other Professional Certification" },
]

const specializations = [
  { id: "anxiety-depression", label: "Anxiety & Depression" },
  { id: "trauma-ptsd", label: "Trauma & PTSD" },
  { id: "student-counseling", label: "Student Counseling" },
  { id: "crisis-intervention", label: "Crisis Intervention" },
  { id: "group-therapy", label: "Group Therapy" },
  { id: "cognitive-behavioral", label: "Cognitive Behavioral Therapy" },
  { id: "mindfulness", label: "Mindfulness-Based Therapy" },
  { id: "eating-disorders", label: "Eating Disorders" },
  { id: "substance-abuse", label: "Substance Abuse" },
  { id: "relationship-counseling", label: "Relationship Counseling" },
]

interface CounselorProfessionalStepProps {
  data: any
  onUpdate: (data: any) => void
  onNext: () => void
  onPrevious: () => void
}

export function CounselorProfessionalStep({ data, onUpdate, onNext, onPrevious }: CounselorProfessionalStepProps) {
  const [professionalInfo, setProfessionalInfo] = useState({
    yearsOfExperience: data.professionalInfo?.yearsOfExperience || "",
    qualifications: data.professionalInfo?.qualifications || [],
    specializations: data.professionalInfo?.specializations || [],
    licenseNumber: data.professionalInfo?.licenseNumber || "",
    institution: data.professionalInfo?.institution || "",
    bio: data.professionalInfo?.bio || "",
  })

  const handleQualificationToggle = (qualificationId: string) => {
    const updatedQualifications = professionalInfo.qualifications.includes(qualificationId)
      ? professionalInfo.qualifications.filter((id: string) => id !== qualificationId)
      : [...professionalInfo.qualifications, qualificationId]

    const updated = { ...professionalInfo, qualifications: updatedQualifications }
    setProfessionalInfo(updated)
    onUpdate({ professionalInfo: updated })
  }

  const handleSpecializationToggle = (specializationId: string) => {
    const updatedSpecializations = professionalInfo.specializations.includes(specializationId)
      ? professionalInfo.specializations.filter((id: string) => id !== specializationId)
      : [...professionalInfo.specializations, specializationId]

    const updated = { ...professionalInfo, specializations: updatedSpecializations }
    setProfessionalInfo(updated)
    onUpdate({ professionalInfo: updated })
  }

  const handleInputChange = (field: string, value: string) => {
    const updated = { ...professionalInfo, [field]: value }
    setProfessionalInfo(updated)
    onUpdate({ professionalInfo: updated })
  }

  const canProceed =
    professionalInfo.yearsOfExperience &&
    professionalInfo.qualifications.length > 0 &&
    professionalInfo.specializations.length > 0 &&
    professionalInfo.institution

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-emerald-100 rounded-full">
            <GraduationCap className="h-6 w-6 text-emerald-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Professional Information</h2>
        <p className="text-muted-foreground">Help us verify your credentials and set up your counseling profile.</p>
      </div>

      <div className="space-y-6">
        {/* Years of Experience */}
        <div className="space-y-2">
          <Label htmlFor="experience" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Years of Experience *
          </Label>
          <Input
            id="experience"
            type="number"
            placeholder="e.g., 5"
            value={professionalInfo.yearsOfExperience}
            onChange={(e) => handleInputChange("yearsOfExperience", e.target.value)}
          />
        </div>

        {/* Institution */}
        <div className="space-y-2">
          <Label htmlFor="institution" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Current Institution/Practice *
          </Label>
          <Input
            id="institution"
            placeholder="e.g., University Counseling Center, Private Practice"
            value={professionalInfo.institution}
            onChange={(e) => handleInputChange("institution", e.target.value)}
          />
        </div>

        {/* License Number */}
        <div className="space-y-2">
          <Label htmlFor="license" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            License Number (Optional)
          </Label>
          <Input
            id="license"
            placeholder="Professional license number"
            value={professionalInfo.licenseNumber}
            onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
          />
        </div>

        {/* Qualifications */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Qualifications & Certifications *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {qualifications.map((qualification) => (
              <Card
                key={qualification.id}
                className={`cursor-pointer transition-all duration-200 ${
                  professionalInfo.qualifications.includes(qualification.id)
                    ? "border-emerald-500 bg-emerald-50"
                    : "hover:border-emerald-300"
                }`}
                onClick={() => handleQualificationToggle(qualification.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={professionalInfo.qualifications.includes(qualification.id)}
                      onChange={() => handleQualificationToggle(qualification.id)}
                    />
                    <Label className="cursor-pointer text-sm">{qualification.label}</Label>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Specializations */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Areas of Specialization *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {specializations.map((specialization) => (
              <Card
                key={specialization.id}
                className={`cursor-pointer transition-all duration-200 ${
                  professionalInfo.specializations.includes(specialization.id)
                    ? "border-emerald-500 bg-emerald-50"
                    : "hover:border-emerald-300"
                }`}
                onClick={() => handleSpecializationToggle(specialization.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={professionalInfo.specializations.includes(specialization.id)}
                      onChange={() => handleSpecializationToggle(specialization.id)}
                    />
                    <Label className="cursor-pointer text-sm">{specialization.label}</Label>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Professional Bio (Optional)
          </Label>
          <Textarea
            id="bio"
            placeholder="Brief description of your approach and experience working with students..."
            value={professionalInfo.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={onNext} disabled={!canProceed}>
          Continue
        </Button>
      </div>
    </div>
  )
}
