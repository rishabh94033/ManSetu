"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Send,
  Bot,
  Users,
  UserCheck,
  Smile,
  Paperclip,
  Heart,
  ThumbsUp,
  AlertTriangle,
  Shield,
  Plus,
  ArrowLeft,
  MoreVertical,
  UserPlus,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockMessages = [
  {
    id: 1,
    sender: "MindWell AI",
    content: "Hello! I'm here to provide mental health support and guidance. How are you feeling today?",
    time: "10:30 AM",
    isOwn: false,
    isAI: true,
  },
  {
    id: 2,
    sender: "You",
    content:
      "I've been feeling really overwhelmed with everything lately. Sometimes I wonder if things will ever get better.",
    time: "10:32 AM",
    isOwn: true,
    isAI: false,
  },
]

const mockPeerChats = [
  {
    id: 1,
    name: "Study Support Group",
    lastMessage: "Thanks for the encouragement!",
    participants: 8,
    time: "2m ago",
    messages: [
      {
        id: 1,
        sender: "Alex",
        content: "Hey everyone! How's everyone doing with finals prep?",
        time: "2:30 PM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "Sam",
        content: "Struggling a bit with time management. Any tips?",
        time: "2:32 PM",
        isOwn: false,
      },
      {
        id: 3,
        sender: "You",
        content: "I use the Pomodoro technique - 25 min study, 5 min break!",
        time: "2:35 PM",
        isOwn: true,
      },
      { id: 4, sender: "Jordan", content: "Thanks for the encouragement!", time: "2:40 PM", isOwn: false },
    ],
  },
  {
    id: 2,
    name: "Anxiety Circle",
    lastMessage: "I found this breathing technique helpful...",
    participants: 12,
    time: "15m ago",
    messages: [
      {
        id: 1,
        sender: "Riley",
        content: "Having a tough day with anxiety. Anyone else?",
        time: "1:15 PM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "Casey",
        content: "I found this breathing technique helpful - 4-7-8 breathing",
        time: "1:20 PM",
        isOwn: false,
      },
      {
        id: 3,
        sender: "You",
        content: "That sounds great! Could you share more details?",
        time: "1:22 PM",
        isOwn: true,
      },
    ],
  },
  {
    id: 3,
    name: "Graduate Students",
    lastMessage: "Anyone else struggling with thesis stress?",
    participants: 6,
    time: "1h ago",
    messages: [
      {
        id: 1,
        sender: "Morgan",
        content: "Anyone else struggling with thesis stress?",
        time: "12:30 PM",
        isOwn: false,
      },
      { id: 2, sender: "Taylor", content: "The pressure is real", time: "12:35 PM", isOwn: false },
    ],
  },
]

const mockCounselorChats = [
  {
    id: 1,
    name: "Counselor X",
    lastMessage: "I am here to help you.",
    isOnline: true,
    time: "5m ago",
    messages: [
      {
        id: 1,
        sender: "Dr. Sara",
        content: "Hi! How are you feeling after our last session?",
        time: "2:00 PM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        content: "Much better, thank you. I tried the techniques we discussed.",
        time: "2:05 PM",
        isOwn: true,
      },
      {
        id: 3,
        sender: "Dr. Sarah Johnson",
        content: "That's wonderful to hear! How did your presentation go?",
        time: "2:10 PM",
        isOwn: false,
      },
    ],
  },
  
]

const emojiCategories = {
  Smileys: ["😊", "😂", "🥰", "😍", "🤗", "😌", "😔", "😢", "😰", "😤"],
  Hearts: ["❤️", "💙", "💚", "💛", "🧡", "💜", "🖤", "🤍", "💕", "💖"],
  Thumbs: ["👍", "👎", "👌", "✌️", "🤞", "🙏", "👏", "💪", "🤝", "🫶"],
}

const crisisKeywords = ["suicide", "kill myself", "end it all", "not worth living", "hurt myself", "hopeless"]

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState<"ai" | "peer" | "counselor">("ai")
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [showCrisisAlert, setShowCrisisAlert] = useState(false)
  const [selectedChat, setSelectedChat] = useState<any>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollToBottom()
    })
  }, [messages, selectedChat?.messages])

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        sender: isAnonymous ? "Anonymous" : "You",
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
        isAI: false,
      }

      if (selectedChat && activeTab !== "ai") {
        setSelectedChat((prev) => ({
          ...prev,
          messages: [...(prev.messages || []), userMessage],
        }))
      } else {
        setMessages((prev) => [...prev, userMessage])
      }

      const messageText = newMessage.toLowerCase()
      const containsCrisisKeywords = crisisKeywords.some((keyword) => messageText.includes(keyword.toLowerCase()))

      if (containsCrisisKeywords) {
        setShowCrisisAlert(true)
      }

      try {
        const res = await fetch("http://localhost:5000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: messageText }),
        })

        const data = await res.json()

        if (data.reply) {
          setMessages((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              sender: "AI",
              content: data.reply,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              isOwn: false,
              isAI: true,
            },
          ])
        }
      } catch (error) {
        console.error("AI chat error:", error)
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "AI",
            content: "Sorry, I'm having trouble responding right now.",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isOwn: false,
            isAI: true,
          },
        ])
      } finally {
        setIsTyping(false)
      }

      setNewMessage("")
      setShowEmojiPicker(false)
    }
  }

  const insertEmoji = (emoji: string) => {
    setNewMessage((prev) => prev + emoji)
    setShowEmojiPicker(false)
  }

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      const newGroup = {
        id: Date.now(),
        name: newGroupName,
        lastMessage: "Group created",
        participants: 1,
        time: "now",
        messages: [
          {
            id: 1,
            sender: "System",
            content: `Welcome to ${newGroupName}! This is a safe space for peer support.`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isOwn: false,
          },
        ],
      }

      mockPeerChats.unshift(newGroup)
      setNewGroupName("")
      setNewGroupDescription("")
      setShowCreateGroup(false)
      toast({
        title: "Group Created",
        description: `${newGroupName} has been created successfully!`,
      })
    }
  }

  const handleChatSelect = (chat: any) => {
    setSelectedChat(chat)
    if (chat.messages) {
      setMessages(chat.messages)
    }
  }

  const renderChatContent = () => {
    if (activeTab === "ai") {
      return (
        <div className="flex flex-col h-full">
          <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-blue-100 text-blue-700">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900">MindWell AI Assistant</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Always available</span>
                  <Badge className="bg-blue-100 text-blue-700 text-xs">Calm</Badge>
                </div>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 300px)" }}>
            <div className="space-y-4 min-h-full">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] ${message.isOwn ? "" : "flex items-start gap-2"}`}>
                    {!message.isOwn && (
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.isOwn
                            ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-br-md"
                            : "bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-900 border border-blue-100 rounded-bl-md"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <p className={`text-xs text-gray-500 mt-1 ${message.isOwn ? "text-right" : "text-left"}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>
      )
    }

    if (activeTab === "peer") {
      if (selectedChat) {
        return (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b bg-gradient-to-r from-emerald-50 to-teal-50">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => setSelectedChat(null)}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-emerald-100 text-emerald-700">
                    <Users className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{selectedChat.name}</h3>
                  <p className="text-sm text-gray-600">{selectedChat.participants} participants</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Checkbox id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                <Label htmlFor="anonymous" className="text-sm text-gray-600">
                  Chat anonymously
                </Label>
                {isAnonymous && <Badge className="bg-orange-100 text-orange-700 text-xs">Anonymous</Badge>}
              </div>
            </div>

            <ScrollArea className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 300px)" }}>
              <div className="space-y-4 min-h-full">
                {selectedChat.messages?.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] ${message.isOwn ? "" : "flex items-start gap-2"}`}>
                      {!message.isOwn && (
                        <Avatar className="w-8 h-8 mt-1">
                          <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                            {message.sender.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        {!message.isOwn && <p className="text-xs text-gray-500 mb-1 ml-1">{message.sender}</p>}
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            message.isOwn
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-br-md"
                              : "bg-gradient-to-r from-emerald-50 to-teal-50 text-gray-900 border border-emerald-100 rounded-bl-md"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                        <p className={`text-xs text-gray-500 mt-1 ${message.isOwn ? "text-right" : "text-left"}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>
        )
      }

      return (
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Peer Support Groups</h3>
                <p className="text-sm text-gray-600">Connect with fellow students</p>
              </div>
              <Dialog open={showCreateGroup} onOpenChange={setShowCreateGroup}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Group
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Support Group</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="groupName">Group Name</Label>
                      <Input
                        id="groupName"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        placeholder="e.g., Study Stress Support"
                      />
                    </div>
                    <div>
                      <Label htmlFor="groupDescription">Description (Optional)</Label>
                      <Textarea
                        id="groupDescription"
                        value={newGroupDescription}
                        onChange={(e) => setNewGroupDescription(e.target.value)}
                        placeholder="Brief description of the group's purpose..."
                      />
                    </div>
                    <Button onClick={handleCreateGroup} className="w-full">
                      Create Group
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <ScrollArea className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
            <div className="space-y-3 min-h-full">
              {mockPeerChats.map((chat) => (
                <motion.div
                  key={chat.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 cursor-pointer hover:shadow-md transition-all"
                  onClick={() => handleChatSelect(chat)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-emerald-100 text-emerald-700">
                        <Users className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{chat.name}</h4>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                      <p className="text-xs text-gray-500">{chat.participants} participants</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )
    }

    if (activeTab === "counselor") {
      if (selectedChat) {
        return (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => setSelectedChat(null)}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-purple-100 text-purple-700">
                      <UserCheck className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  {selectedChat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{selectedChat.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-100 text-purple-700 text-xs">Licensed</Badge>
                    {selectedChat.isOnline && <Badge className="bg-green-100 text-green-700 text-xs">Online</Badge>}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 300px)" }}>
              <div className="space-y-4 min-h-full">
                {selectedChat.messages?.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] ${message.isOwn ? "" : "flex items-start gap-2"}`}>
                      {!message.isOwn && (
                        <Avatar className="w-8 h-8 mt-1">
                          <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">
                            <UserCheck className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            message.isOwn
                              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-br-md"
                              : "bg-gradient-to-r from-purple-50 to-pink-50 text-gray-900 border border-purple-100 rounded-bl-md"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                        <p className={`text-xs text-gray-500 mt-1 ${message.isOwn ? "text-right" : "text-left"}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>
        )
      }

      return (
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-900">Professional Counselors</h3>
            <p className="text-sm text-gray-600">Direct communication with licensed professionals</p>
          </div>
          <ScrollArea className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
            <div onClick={() => router.push(`/counsellorchat`)} className="space-y-4 min-h-full">
              {mockCounselorChats.map((chat) => (
                <motion.div
                  key={chat.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 cursor-pointer hover:shadow-md transition-all"
                  onClick={() => router.push(`/counsellorchat`)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-purple-100 text-purple-700">
                          <UserCheck className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      {chat.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{chat.name}</h4>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-purple-100 text-purple-700 text-xs">Licensed</Badge>
                        {chat.isOnline && <Badge className="bg-green-100 text-green-700 text-xs">Online</Badge>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2 mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-900">Mental Health Chat</h1>
          <p className="text-gray-600">Connect with AI, peers, or professional counselors</p>
        </motion.div>

        <AnimatePresence>
          {showCrisisAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Crisis Support Available:</strong> If you're having thoughts of self-harm, please reach out
                  immediately:
                  <div className="mt-2 space-y-1 text-sm">
                    <div>
                      • Call or text <strong>988</strong> (Suicide & Crisis Lifeline)
                    </div>
                    <div>
                      • Text <strong>HOME</strong> to <strong>741741</strong> (Crisis Text Line)
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="mt-3 bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => setShowCrisisAlert(false)}
                  >
                    Connect with Specialist
                  </Button>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Card className="h-[600px] overflow-hidden shadow-xl">
          <div className="flex border-b bg-white">
            {[
              { key: "ai", label: "AI Support", icon: Bot, color: "blue" },
              { key: "peer", label: "Peer Chat", icon: Users, color: "emerald" },
              { key: "counselor", label: "Counselor", icon: UserCheck, color: "purple" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key as any)
                  setSelectedChat(null)
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-all ${
                  activeTab === tab.key
                    ? `text-${tab.color}-700 border-b-2 border-${tab.color}-500 bg-${tab.color}-50`
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="h-[calc(100%-60px)] flex flex-col">
            <div className="flex-1 overflow-hidden">{renderChatContent()}</div>

            {(activeTab === "ai" || selectedChat) && (
              <div className="p-4 border-t bg-white">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder={
                      activeTab === "ai"
                        ? "Ask the AI assistant anything..."
                        : activeTab === "peer"
                          ? "Message the group..."
                          : "Message your counselor..."
                    }
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 border-0 bg-gray-100 rounded-full px-4 focus-visible:ring-0"
                  />
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                    {showEmojiPicker && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-12 right-0 bg-white border rounded-lg shadow-lg p-3 w-64 z-50"
                      >
                        {Object.entries(emojiCategories).map(([category, emojis]) => (
                          <div key={category} className="mb-3">
                            <p className="text-xs font-medium text-gray-500 mb-2">{category}</p>
                            <div className="grid grid-cols-5 gap-1">
                              {emojis.map((emoji) => (
                                <button
                                  key={emoji}
                                  onClick={() => insertEmoji(emoji)}
                                  className="p-2 hover:bg-gray-100 rounded text-lg"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 rounded-full w-10 h-10 p-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Shield className="h-3 w-3" />
                    <span>Secure & confidential</span>
                  </div>
                  {activeTab === "ai" && (
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <Heart className="h-3 w-3 mr-1" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
