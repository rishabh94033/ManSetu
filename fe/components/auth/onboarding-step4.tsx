"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Shield, Bell } from "lucide-react"

interface OnboardingStep4Props {
  data: any
  onUpdate: (data: any) => void
  onComplete: () => void
  onPrevious: () => void
}

export function OnboardingStep4({ data, onUpdate, onComplete, onPrevious }: OnboardingStep4Props) {
  const [privacySettings, setPrivacySettings] = useState({
    shareProgress: data.privacySettings?.shareProgress || false,
    allowCommunityInteraction: data.privacySettings?.allowCommunityInteraction ?? true,
    receiveReminders: data.privacySettings?.receiveReminders ?? true,
    ...data.privacySettings,
  })

  const updatePrivacySetting = (key: string, value: boolean) => {
    const updated = { ...privacySettings, [key]: value }
    setPrivacySettings(updated)
    onUpdate({ privacySettings: updated })
  }

  const handleComplete = () => {
    onComplete()
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Privacy & Communication Settings</h2>
        <p className="text-muted-foreground">Customize how you interact with the platform and other users.</p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Privacy Settings</CardTitle>
            </div>
            <CardDescription>Control what information you share and how you appear to others.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="share-progress">Share progress with community</Label>
                <p className="text-sm text-muted-foreground">
                  Allow others to see your achievements and milestones (anonymously)
                </p>
              </div>
              <Switch
                id="share-progress"
                checked={privacySettings.shareProgress}
                onCheckedChange={(checked) => updatePrivacySetting("shareProgress", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="community-interaction">Community interaction</Label>
                <p className="text-sm text-muted-foreground">
                  Participate in forums, group chats, and peer support features
                </p>
              </div>
              <Switch
                id="community-interaction"
                checked={privacySettings.allowCommunityInteraction}
                onCheckedChange={(checked) => updatePrivacySetting("allowCommunityInteraction", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Notifications</CardTitle>
            </div>
            <CardDescription>Choose how and when you'd like to receive reminders and updates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="receive-reminders">Daily wellness reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get gentle reminders for mood check-ins and self-care activities
                </p>
              </div>
              <Switch
                id="receive-reminders"
                checked={privacySettings.receiveReminders}
                onCheckedChange={(checked) => updatePrivacySetting("receiveReminders", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-1" />
              <div className="space-y-2">
                <h4 className="font-medium">Your privacy is protected</h4>
                <p className="text-sm text-muted-foreground">
                  All your data is encrypted and secure. You can change these settings anytime in your account
                  preferences. We never share personal information without your explicit consent.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button onClick={handleComplete} className="px-8">
          Complete Setup
        </Button>
      </div>
    </div>
  )
}
