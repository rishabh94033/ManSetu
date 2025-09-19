"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { UserX, Loader2 } from "lucide-react"

export function GuestLoginForm() {
  const [pseudoname, setPseudoname] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!pseudoname.trim()) {
      setError("Please enter a pseudoname")
      return
    }

    if (pseudoname.length < 2) {
      setError("Pseudoname must be at least 2 characters")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store guest user data
    const guestData = {
      id: `guest_${Date.now()}`,
      pseudoname: pseudoname.trim(),
      role: "guest",
      isGuest: true,
    }

    localStorage.setItem("user", JSON.stringify(guestData))

    toast({
      title: "Welcome!",
      description: `You're now browsing as ${pseudoname}. You have access to Chat and Resources.`,
    })

    router.push("/guest-dashboard")

    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="p-3 rounded-full bg-muted">
            <UserX className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Browse as Guest</h2>
        <p className="text-muted-foreground">
          Access Chat and Resources without creating an account. Your data won't be saved.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pseudoname">Choose a Pseudoname</Label>
          <Input
            id="pseudoname"
            placeholder="e.g., Anonymous123, Helper, Student..."
            value={pseudoname}
            onChange={(e) => setPseudoname(e.target.value)}
            className={error ? "border-destructive" : ""}
            maxLength={20}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <p className="text-xs text-muted-foreground">
            This name will be visible to others in chat. Choose something you're comfortable with.
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Entering...
            </>
          ) : (
            "Continue as Guest"
          )}
        </Button>
      </form>

      <div className="bg-muted/50 p-4 rounded-lg space-y-2">
        <h4 className="font-medium text-sm">Guest Access Includes:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• AI Chat support</li>
          <li>• Peer chat with other users</li>
          <li>• Browse mental health resources</li>
        </ul>
        <p className="text-xs text-muted-foreground mt-2">
          Note: Your conversations and data won't be saved. For full features, create an account.
        </p>
      </div>
    </div>
  )
}
