"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Save, X, Lightbulb, Heart } from "lucide-react"

const moodOptions = [
  { value: "very-sad", label: "Very Sad", emoji: "😢" },
  { value: "sad", label: "Sad", emoji: "😔" },
  { value: "neutral", label: "Neutral", emoji: "😐" },
  { value: "happy", label: "Happy", emoji: "😊" },
  { value: "very-happy", label: "Very Happy", emoji: "😄" },
]

const journalPrompts = [
  "What am I grateful for today?",
  "What challenged me today and how did I handle it?",
  "What emotions am I experiencing right now?",
  "What would I tell a friend going through this?",
  "What small win can I celebrate today?",
  "What do I need to let go of?",
  "How can I be kinder to myself?",
  "What am I looking forward to?",
  "What did I learn about myself today?",
  "How do I want to feel tomorrow?",
]

const entryTags = [
  "Gratitude",
  "Anxiety",
  "Stress",
  "Goals",
  "Relationships",
  "Self-care",
  "Academic",
  "Growth",
  "Challenges",
  "Achievements",
  "Reflection",
  "Dreams",
]

interface JournalEditorProps {
  editingEntry?: any
  onSave: () => void
  onCancel: () => void
}

export function JournalEditor({ editingEntry, onSave, onCancel }: JournalEditorProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isPrivate, setIsPrivate] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showPrompts, setShowPrompts] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    if (editingEntry) {
      setTitle(editingEntry.title || "")
      setContent(editingEntry.content || "")
      setMood(editingEntry.mood || "")
      setSelectedTags(editingEntry.tags || [])
      setIsPrivate(editingEntry.isPrivate ?? true)
    } else {
      // Reset form for new entry
      setTitle("")
      setContent("")
      setMood("")
      setSelectedTags([])
      setIsPrivate(true)
    }
  }, [editingEntry])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const insertPrompt = (prompt: string) => {
    const newContent = content ? `${content}\n\n${prompt}\n` : `${prompt}\n`
    setContent(newContent)
    setShowPrompts(false)
  }

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing information",
        description: "Please add both a title and content to your journal entry.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const entry = {
      id: editingEntry?.id || Date.now(),
      title: title.trim(),
      content: content.trim(),
      mood,
      tags: selectedTags,
      isPrivate,
      createdAt: editingEntry?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      wordCount: content.trim().split(/\s+/).length,
    }

    // Save to localStorage (in real app, this would be encrypted and sent to API)
    const existingEntries = JSON.parse(localStorage.getItem("journalEntries") || "[]")

    if (editingEntry) {
      const index = existingEntries.findIndex((e: any) => e.id === editingEntry.id)
      if (index !== -1) {
        existingEntries[index] = entry
      }
    } else {
      existingEntries.unshift(entry)
    }

    localStorage.setItem("journalEntries", JSON.stringify(existingEntries))

    toast({
      title: editingEntry ? "Entry updated!" : "Entry saved!",
      description: "Your journal entry has been saved securely.",
    })

    setIsSaving(false)
    onSave()
  }

  const wordCount = content
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{editingEntry ? "Edit Entry" : "New Journal Entry"}</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPrompts(!showPrompts)}
                className="flex items-center gap-2"
              >
                <Lightbulb className="h-4 w-4" />
                Prompts
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Writing Prompts */}
          {showPrompts && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-muted/50 rounded-lg space-y-3"
            >
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Writing Prompts
              </h4>
              <div className="grid gap-2">
                {journalPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => insertPrompt(prompt)}
                    className="text-left text-sm p-2 rounded hover:bg-background transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="What's on your mind today?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="content">Your thoughts</Label>
              <span className="text-xs text-muted-foreground">{wordCount} words</span>
            </div>
            <Textarea
              id="content"
              placeholder="Start writing your thoughts, feelings, or reflections..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] resize-none"
            />
          </div>

          {/* Mood */}
          <div className="space-y-2">
            <Label>How are you feeling? (Optional)</Label>
            <Select value={mood} onValueChange={setMood}>
              <SelectTrigger>
                <SelectValue placeholder="Select your mood" />
              </SelectTrigger>
              <SelectContent>
                {moodOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <span className="flex items-center gap-2">
                      {option.emoji} {option.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <Label>Tags (Optional)</Label>
            <div className="flex flex-wrap gap-2">
              {entryTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4" />
              <span>Your entries are private and secure</span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Entry"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
