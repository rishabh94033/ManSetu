"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { JournalEditor } from "@/components/journal/journal-editor"
import { JournalList } from "@/components/journal/journal-list"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { BookOpen, Plus, List, Shield } from "lucide-react"

export default function JournalPage() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("list")
  const [editingEntry, setEditingEntry] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (!parsedUser.onboardingComplete) {
      router.push("/auth/onboarding")
      return
    }

    setUser(parsedUser)
  }, [router])

  const handleNewEntry = () => {
    setEditingEntry(null)
    setActiveTab("editor")
  }

  const handleEditEntry = (entry: any) => {
    setEditingEntry(entry)
    setActiveTab("editor")
  }

  const handleSaveEntry = () => {
    setActiveTab("list")
    setEditingEntry(null)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <BookOpen className="h-8 w-8" />
                Personal Journal
              </h1>
              <p className="text-muted-foreground mt-1">A safe, private space for your thoughts and reflections</p>
            </div>

            <Button onClick={handleNewEntry} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Entry
            </Button>
          </div>

          {/* Privacy Notice */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-medium text-sm">Your privacy is protected</h3>
                  <p className="text-sm text-muted-foreground">
                    All journal entries are encrypted and stored securely. Only you can access your personal thoughts
                    and reflections.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Journal Interface */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                My Entries
              </TabsTrigger>
              <TabsTrigger value="editor" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Write
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="mt-6">
              <JournalList onEditEntry={handleEditEntry} />
            </TabsContent>

            <TabsContent value="editor" className="mt-6">
              <JournalEditor
                editingEntry={editingEntry}
                onSave={handleSaveEntry}
                onCancel={() => setActiveTab("list")}
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
