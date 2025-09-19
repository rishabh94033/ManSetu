"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Loader2, User, UserCheck } from "lucide-react"

export function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "", // Added role field
    university: "",
    yearOfStudy: "",
    department: "", // Added department field for counselors
    agreeToTerms: false,
    agreeToPrivacy: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const router = useRouter()
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.role) newErrors.role = "Please select your role" // Added role validation

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.university) newErrors.university = "University is required"

    if (formData.role === "student" && !formData.yearOfStudy) {
      newErrors.yearOfStudy = "Year of study is required"
    }

    if (formData.role === "counselor" && !formData.department) {
      newErrors.department = "Department is required"
    }

    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms"
    if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = "You must agree to the privacy policy"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock user creation
    const newUser = {
      id: Date.now().toString(),
      email: formData.email,
      name: `${formData.firstName} ${formData.lastName}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      university: formData.university,
      yearOfStudy: formData.yearOfStudy,
      department: formData.department, // Added department
      role: formData.role, // Added role
      onboardingComplete: false,
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem("user", JSON.stringify(newUser))

    toast({
      title: "Account created successfully!",
      description: `Welcome to MindWell. Let's complete your ${formData.role} profile setup.`,
    })

    router.push("/auth/onboarding")
    setIsLoading(false)
  }

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Create your account</h2>
        <p className="text-muted-foreground">Join the MindWell community</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="role">I am a...</Label>
          <Select value={formData.role} onValueChange={(value) => updateFormData("role", value)}>
            <SelectTrigger className={errors.role ? "border-destructive" : ""}>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Student
                </div>
              </SelectItem>
              <SelectItem value="counselor">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  Counselor / Mental Health Professional
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.role && <p className="text-sm text-destructive">{errors.role}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => updateFormData("firstName", e.target.value)}
              className={errors.firstName ? "border-destructive" : ""}
            />
            {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => updateFormData("lastName", e.target.value)}
              className={errors.lastName ? "border-destructive" : ""}
            />
            {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{formData.role === "counselor" ? "Professional Email" : "University Email"}</Label>
          <Input
            id="email"
            type="email"
            placeholder={formData.role === "counselor" ? "dr.doe@university.edu" : "john.doe@university.edu"}
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="university">University</Label>
          <Input
            id="university"
            placeholder="University of Example"
            value={formData.university}
            onChange={(e) => updateFormData("university", e.target.value)}
            className={errors.university ? "border-destructive" : ""}
          />
          {errors.university && <p className="text-sm text-destructive">{errors.university}</p>}
        </div>

        {formData.role === "student" && (
          <div className="space-y-2">
            <Label htmlFor="yearOfStudy">Year of Study</Label>
            <Select value={formData.yearOfStudy} onValueChange={(value) => updateFormData("yearOfStudy", value)}>
              <SelectTrigger className={errors.yearOfStudy ? "border-destructive" : ""}>
                <SelectValue placeholder="Select your year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freshman">Freshman</SelectItem>
                <SelectItem value="sophomore">Sophomore</SelectItem>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="graduate">Graduate Student</SelectItem>
                <SelectItem value="phd">PhD Student</SelectItem>
              </SelectContent>
            </Select>
            {errors.yearOfStudy && <p className="text-sm text-destructive">{errors.yearOfStudy}</p>}
          </div>
        )}

        {formData.role === "counselor" && (
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select value={formData.department} onValueChange={(value) => updateFormData("department", value)}>
              <SelectTrigger className={errors.department ? "border-destructive" : ""}>
                <SelectValue placeholder="Select your department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="counseling">Counseling & Psychological Services</SelectItem>
                <SelectItem value="psychology">Psychology Department</SelectItem>
                <SelectItem value="psychiatry">Psychiatry Department</SelectItem>
                <SelectItem value="student-health">Student Health Services</SelectItem>
                <SelectItem value="social-work">Social Work Department</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.department && <p className="text-sm text-destructive">{errors.department}</p>}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => updateFormData("password", e.target.value)}
              className={errors.password ? "border-destructive pr-10" : "pr-10"}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => updateFormData("confirmPassword", e.target.value)}
              className={errors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => updateFormData("agreeToTerms", checked as boolean)}
            />
            <Label htmlFor="agreeToTerms" className="text-sm leading-5">
              I agree to the{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>
            </Label>
          </div>
          {errors.agreeToTerms && <p className="text-sm text-destructive">{errors.agreeToTerms}</p>}

          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeToPrivacy"
              checked={formData.agreeToPrivacy}
              onCheckedChange={(checked) => updateFormData("agreeToPrivacy", checked as boolean)}
            />
            <Label htmlFor="agreeToPrivacy" className="text-sm leading-5">
              I agree to the{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </Label>
          </div>
          {errors.agreeToPrivacy && <p className="text-sm text-destructive">{errors.agreeToPrivacy}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </div>
  )
}
