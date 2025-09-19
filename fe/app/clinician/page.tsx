"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  Users,
  Calendar,
  FileText,
  AlertTriangle,
  TrendingUp,
  MessageSquare,
  Video,
  Phone,
  Plus,
  Search,
  Filter,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for students
const mockStudents = [
  {
    id: 1,
    name: "Anonymous Student A",
    riskLevel: "moderate",
    lastSession: "2 days ago",
    nextAppointment: "Tomorrow 2:00 PM",
    recentMood: [7, 6, 8, 5, 6, 7, 8],
    assessmentScores: { phq9: 8, gad7: 12 },
    notes: "Making good progress with anxiety management techniques",
    sessionCount: 6,
    status: "active",
  },
  {
    id: 2,
    name: "Anonymous Student B",
    riskLevel: "high",
    lastSession: "1 day ago",
    nextAppointment: "Today 4:00 PM",
    recentMood: [4, 3, 5, 4, 3, 4, 5],
    assessmentScores: { phq9: 15, gad7: 18 },
    notes: "Requires close monitoring. Implementing safety plan.",
    sessionCount: 12,
    status: "priority",
  },
  {
    id: 3,
    name: "Anonymous Student C",
    riskLevel: "low",
    lastSession: "1 week ago",
    nextAppointment: "Next week",
    recentMood: [8, 7, 8, 9, 8, 7, 8],
    assessmentScores: { phq9: 4, gad7: 6 },
    notes: "Stable progress. Transitioning to monthly check-ins.",
    sessionCount: 8,
    status: "stable",
  },
]

const mockAppointments = [
  {
    id: 1,
    student: "Anonymous Student B",
    time: "4:00 PM - 5:00 PM",
    type: "Video Session",
    status: "confirmed",
    priority: "high",
  },
  {
    id: 2,
    student: "Anonymous Student A",
    time: "Tomorrow 2:00 PM - 3:00 PM",
    type: "Phone Session",
    status: "confirmed",
    priority: "normal",
  },
  {
    id: 3,
    student: "Anonymous Student D",
    time: "Friday 10:00 AM - 11:00 AM",
    type: "Video Session",
    status: "pending",
    priority: "normal",
  },
]

export default function ClinicianPage() {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRisk, setFilterRisk] = useState("all")
  const [isAddingNote, setIsAddingNote] = useState(false)
  const { toast } = useToast()

  const handleAddNote = () => {
    toast({
      title: "Note added",
      description: "Clinical note has been saved to student record.",
    })
    setIsAddingNote(false)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200"
      case "moderate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRisk = filterRisk === "all" || student.riskLevel === filterRisk
    return matchesSearch && matchesRisk
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Clinician Dashboard</h1>
            <p className="text-lg text-gray-600">Manage your caseload and track student progress</p>
          </div>
          <div className="flex items-center gap-4">
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              New Session
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Cases</p>
                  <p className="text-3xl font-bold text-gray-900">24</p>
                </div>
                <Users className="h-12 w-12 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Sessions</p>
                  <p className="text-3xl font-bold text-gray-900">6</p>
                </div>
                <Calendar className="h-12 w-12 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">High Priority</p>
                  <p className="text-3xl font-bold text-red-600">3</p>
                </div>
                <AlertTriangle className="h-12 w-12 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                  <p className="text-3xl font-bold text-green-600">+15%</p>
                </div>
                <TrendingUp className="h-12 w-12 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="caseload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="caseload">My Caseload</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="resources">Clinical Resources</TabsTrigger>
          </TabsList>

          {/* Caseload Tab */}
          <TabsContent value="caseload" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Student Caseload</CardTitle>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search students..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Select value={filterRisk} onValueChange={setFilterRisk}>
                        <SelectTrigger className="w-48">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Risk Levels</SelectItem>
                          <SelectItem value="high">High Risk</SelectItem>
                          <SelectItem value="moderate">Moderate Risk</SelectItem>
                          <SelectItem value="low">Low Risk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredStudents.map((student) => (
                      <motion.div
                        key={student.id}
                        whileHover={{ scale: 1.01 }}
                        className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedStudent(student.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarFallback className="bg-emerald-100 text-emerald-700">
                                {student.name.split(" ")[2]?.[0] || "S"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{student.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>Last session: {student.lastSession}</span>
                                <span>•</span>
                                <span>{student.sessionCount} sessions</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getRiskColor(student.riskLevel)}>{student.riskLevel} risk</Badge>
                            <div className="text-right text-sm">
                              <p className="font-medium">Next: {student.nextAppointment}</p>
                              <p className="text-gray-500">
                                PHQ-9: {student.assessmentScores.phq9} | GAD-7: {student.assessmentScores.gad7}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Student Detail Modal */}
            {selectedStudent && (
              <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {mockStudents.find((s) => s.id === selectedStudent)?.name} - Clinical Profile
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Mood Chart */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Mood Trends</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart
                            data={mockStudents
                              .find((s) => s.id === selectedStudent)
                              ?.recentMood.map((mood, i) => ({ day: i + 1, mood }))}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis domain={[1, 10]} />
                            <Tooltip />
                            <Line type="monotone" dataKey="mood" stroke="#10B981" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* Clinical Notes */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Clinical Notes</CardTitle>
                          <Dialog open={isAddingNote} onOpenChange={setIsAddingNote}>
                            <DialogTrigger asChild>
                              <Button size="sm">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Note
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add Clinical Note</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Textarea
                                  placeholder="Enter clinical observations, progress notes, or treatment updates..."
                                  rows={6}
                                />
                                <div className="flex gap-2 justify-end">
                                  <Button variant="outline" onClick={() => setIsAddingNote(false)}>
                                    Cancel
                                  </Button>
                                  <Button onClick={handleAddNote} className="bg-emerald-600 hover:bg-emerald-700">
                                    Save Note
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Session Note</span>
                              <span className="text-xs text-gray-500">2 days ago</span>
                            </div>
                            <p className="text-sm text-gray-700">
                              {mockStudents.find((s) => s.id === selectedStudent)?.notes}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                            {appointment.type === "Video Session" ? (
                              <Video className="h-6 w-6 text-emerald-600" />
                            ) : (
                              <Phone className="h-6 w-6 text-emerald-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold">{appointment.student}</h3>
                            <p className="text-sm text-gray-600">{appointment.time}</p>
                            <Badge variant="outline" className="mt-1">
                              {appointment.type}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {appointment.priority === "high" && (
                            <Badge className="bg-red-100 text-red-700">High Priority</Badge>
                          )}
                          <Badge className="bg-green-100 text-green-700">{appointment.status}</Badge>
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            Start Session
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Caseload Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-emerald-600">78%</div>
                      <p className="text-sm text-gray-600">Treatment Adherence</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">6.8</div>
                      <p className="text-sm text-gray-600">Avg Mood Score</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-3xl font-bold text-green-600">85%</div>
                      <p className="text-sm text-gray-600">Session Attendance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Clinical Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Clinical Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                      <FileText className="h-8 w-8 text-emerald-600 mb-3" />
                      <h3 className="font-semibold mb-2">Assessment Tools</h3>
                      <p className="text-sm text-gray-600">PHQ-9, GAD-7, and other validated instruments</p>
                    </div>
                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                      <MessageSquare className="h-8 w-8 text-emerald-600 mb-3" />
                      <h3 className="font-semibold mb-2">Treatment Protocols</h3>
                      <p className="text-sm text-gray-600">Evidence-based intervention guidelines</p>
                    </div>
                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                      <AlertTriangle className="h-8 w-8 text-emerald-600 mb-3" />
                      <h3 className="font-semibold mb-2">Crisis Resources</h3>
                      <p className="text-sm text-gray-600">Emergency protocols and referral contacts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
