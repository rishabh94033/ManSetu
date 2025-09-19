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

interface LoginFormProps {
  onForgotPassword: () => void
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("") // Added role selection
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; role?: string }>({})

  const router = useRouter()
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; role?: string } = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!role) {
      newErrors.role = "Please select your role"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (email === "demo@student.edu" && password === "password") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "1",
          email,
          name: role === "student" ? "Demo Student" : "Dr. Demo Counselor",
          role,
          onboardingComplete: true,
        }),
      )

      toast({
        title: "Welcome back!",
        description: `You've been successfully signed in as a ${role}.`,
      })

      router.push(role === "student" ? "/dashboard" : "/clinician")
    } else if (email === "counselor@university.edu" && password === "password") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "2",
          email,
          name: "Dr. Sarah Wilson",
          role: "counselor",
          onboardingComplete: true,
        }),
      )

      toast({
        title: "Welcome back!",
        description: "You've been successfully signed in as a counselor.",
      })

      router.push("/clinician")
    } else {
      toast({
        title: "Sign in failed",
        description: "Invalid credentials. Try demo@student.edu / password or counselor@university.edu / password",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Welcome back</h2>
        <p className="text-muted-foreground">Sign in to your MindWell account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="role">I am a...</Label>
          <Select value={role} onValueChange={setRole}>
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
                  Counselor
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.role && <p className="text-sm text-destructive">{errors.role}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label htmlFor="remember" className="text-sm">
              Remember me
            </Label>
          </div>

          <Button type="button" variant="link" className="px-0 text-sm" onClick={onForgotPassword}>
            Forgot password?
          </Button>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground space-y-1">
        <p>
          <strong>Demo Student:</strong> demo@student.edu / password
        </p>
        <p>
          <strong>Demo Counselor:</strong> counselor@university.edu / password
        </p>
      </div>
    </div>
  )
}
