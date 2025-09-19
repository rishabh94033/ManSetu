"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, UserCheck, Shield, MessageCircle, Library } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface GuestLoginFormProps {
  onBack: () => void
}

export function GuestLoginForm({ onBack }: GuestLoginFormProps) {
  const [pseudonym, setPseudonym] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!pseudonym.trim()) {
      toast({
        title: "Pseudonym required",
        description: "Please enter a pseudonym to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate guest login
    setTimeout(() => {
      toast({
        title: "Welcome!",
        description: `Logged in as ${pseudonym}. You now have access to Chat and Resources.`,
      })

      // Store guest session
      localStorage.setItem(
        "guestSession",
        JSON.stringify({
          pseudonym,
          loginTime: new Date().toISOString(),
          accessLevel: "guest",
        }),
      )

      router.push("/chat")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Guest Access</h2>
            <p className="text-muted-foreground">Quick access with just a pseudonym</p>
          </div>
        </div>

        <Alert className="border-blue-200 bg-blue-50">
          <Shield className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Guest Access Includes:</strong>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• Anonymous chat with AI assistant and peer support</li>
              <li>• Full access to mental health resources library</li>
              <li>• No email or personal information required</li>
            </ul>
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pseudonym">Choose a Pseudonym</Label>
            <Input
              id="pseudonym"
              type="text"
              placeholder="e.g., Anonymous Owl, Study Buddy, etc."
              value={pseudonym}
              onChange={(e) => setPseudonym(e.target.value)}
              maxLength={30}
              required
            />
            <p className="text-xs text-muted-foreground">
              This will be your display name in chats. Choose something you're comfortable with.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Setting up guest access...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Continue as Guest
              </div>
            )}
          </Button>
        </form>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground text-center">Guest access is limited to:</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageCircle className="h-4 w-4 text-green-600" />
              Chat & Support
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Library className="h-4 w-4 text-green-600" />
              Resource Library
            </div>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            For full features like mood tracking and assessments, please create an account.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
