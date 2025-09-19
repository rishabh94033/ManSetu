"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import {
  Users,
  MessageCircle,
  TrendingUp,
  AlertTriangle,
  Calendar,
  FileText,
  Search,
  Filter,
  MoreVertical,
  Clock,
  User,
} from "lucide-react"

const mockStudents = [
  {
    id: 1,
    name: "Anonymous Student A",
    status: "active",
    riskLevel: "low",
    lastContact: "2 hours ago",
    moodTrend: "improving",
    unreadMessages: 2,
    nextAppointment: "Tomorrow 2:00 PM",
  },
  {
    id: 2,
    name: "Anonymous Student B",
    status: "flagged",
    riskLevel: "high",
    lastContact: "30 minutes ago",
    moodTrend: "declining",
    unreadMessages: 5,
    nextAppointment: "Today 4:00 PM",
  },
  {
    id: 3,
    name: "Anonymous Student C",
    status: "active",
    riskLevel: "medium",
    lastContact: "1 day ago",
    moodTrend: "stable",
    unreadMessages: 0,
    nextAppointment: "Friday 10:00 AM",
  },
]

export default function CounselorDashboard() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [caseNotes, setCaseNotes] = useState("")
  const [showChatModal, setShowChatModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "counselor") {
      router.push("/dashboard")
      return
    }

    if (!parsedUser.onboardingComplete) {
      router.push("/auth/onboarding")
      return
    }

    setUser(parsedUser)
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="h-32 bg-muted rounded"></div>
              <div className="h-32 bg-muted rounded"></div>
              <div className="h-32 bg-muted rounded"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) return null

  const activeStudents = mockStudents.filter((s) => s.status === "active").length
  const flaggedCases = mockStudents.filter((s) => s.riskLevel === "high").length
  const totalMessages = mockStudents.reduce((sum, s) => sum + s.unreadMessages, 0)

  const handleStartChat = () => {
    setShowChatModal(true)
    toast({
      title: "Chat Started",
      description: "Opening secure chat interface...",
    })
  }

  const handleScheduleAppointment = () => {
    setShowScheduleModal(true)
    toast({
      title: "Schedule Appointment",
      description: "Opening appointment scheduler...",
    })
  }

  const handleGenerateReport = () => {
    setShowReportModal(true)
    toast({
      title: "Generating Report",
      description: "Preparing student progress report...",
    })
  }

  const handleViewAnalytics = () => {
    setShowAnalyticsModal(true)
    toast({
      title: "Analytics Dashboard",
      description: "Loading comprehensive analytics...",
    })
  }

  const handleSaveCaseNotes = () => {
    if (selectedStudent && caseNotes.trim()) {
      toast({
        title: "Case Notes Saved",
        description: `Notes for ${selectedStudent.name} have been saved securely.`,
      })
      setCaseNotes("")
    }
  }

  const handleViewHistory = () => {
    if (selectedStudent) {
      toast({
        title: "Case History",
        description: `Loading complete history for ${selectedStudent.name}...`,
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Counselor Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, Dr. {user.name}. Here's your student caseload overview.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 rounded-full">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{activeStudents}</p>
                    <p className="text-sm text-muted-foreground">Active Students</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{flaggedCases}</p>
                    <p className="text-sm text-muted-foreground">Flagged Cases</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <MessageCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalMessages}</p>
                    <p className="text-sm text-muted-foreground">Unread Messages</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-sm text-muted-foreground">This Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Student Caseload */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Student Caseload</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockStudents.map((student) => (
                      <motion.div
                        key={student.id}
                        whileHover={{ scale: 1.01 }}
                        className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarFallback>
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{student.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant={
                                    student.riskLevel === "high"
                                      ? "destructive"
                                      : student.riskLevel === "medium"
                                        ? "default"
                                        : "secondary"
                                  }
                                >
                                  {student.riskLevel} risk
                                </Badge>
                                <Badge
                                  variant={
                                    student.moodTrend === "improving"
                                      ? "default"
                                      : student.moodTrend === "declining"
                                        ? "destructive"
                                        : "secondary"
                                  }
                                >
                                  {student.moodTrend}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              {student.unreadMessages > 0 && (
                                <Badge className="bg-emerald-600">{student.unreadMessages} new</Badge>
                              )}
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Last contact: {student.lastContact}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Case Notes & Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" onClick={handleStartChat}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Start New Chat
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={handleScheduleAppointment}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Appointment
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={handleGenerateReport}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={handleViewAnalytics}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              {selectedStudent && (
                <Card>
                  <CardHeader>
                    <CardTitle>Case Notes - {selectedStudent.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Add case notes..."
                      value={caseNotes}
                      onChange={(e) => setCaseNotes(e.target.value)}
                      rows={6}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSaveCaseNotes}>
                        Save Notes
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleViewHistory}>
                        View History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-muted rounded">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">2:00 PM - Student B</p>
                        <p className="text-xs text-muted-foreground">Crisis follow-up</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-muted rounded">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">4:00 PM - Student D</p>
                        <p className="text-xs text-muted-foreground">Regular check-in</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
