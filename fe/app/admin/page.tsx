"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Users,
  AlertTriangle,
  Shield,
  Activity,
  MessageSquare,
  BookOpen,
  Download,
  Settings,
  UserCheck,
  Target,
} from "lucide-react"

// Mock data for admin analytics
const usageData = [
  { month: "Jan", activeUsers: 1200, sessions: 3400, assessments: 890 },
  { month: "Feb", activeUsers: 1350, sessions: 3800, assessments: 950 },
  { month: "Mar", activeUsers: 1500, sessions: 4200, assessments: 1100 },
  { month: "Apr", activeUsers: 1650, sessions: 4600, assessments: 1250 },
  { month: "May", activeUsers: 1800, sessions: 5000, assessments: 1400 },
  { month: "Jun", activeUsers: 1950, sessions: 5400, assessments: 1550 },
]

const wellnessData = [
  { week: "Week 1", avgMood: 6.2, journalEntries: 450, moduleCompletions: 120 },
  { week: "Week 2", avgMood: 6.5, journalEntries: 520, moduleCompletions: 140 },
  { week: "Week 3", avgMood: 6.8, journalEntries: 480, moduleCompletions: 160 },
  { week: "Week 4", avgMood: 7.1, journalEntries: 550, moduleCompletions: 180 },
]

const riskDistribution = [
  { name: "Low Risk", value: 65, color: "#10B981" },
  { name: "Moderate Risk", value: 25, color: "#F59E0B" },
  { name: "High Risk", value: 10, color: "#EF4444" },
]

const mockAlerts = [
  {
    id: 1,
    type: "high-risk",
    message: "Student flagged for high-risk assessment scores",
    timestamp: "2 hours ago",
    severity: "urgent",
  },
  {
    id: 2,
    type: "system",
    message: "Scheduled maintenance window approaching",
    timestamp: "4 hours ago",
    severity: "info",
  },
  {
    id: 3,
    type: "usage",
    message: "Unusual spike in crisis resource access",
    timestamp: "6 hours ago",
    severity: "warning",
  },
]

export default function AdminPage() {
  const [timeRange, setTimeRange] = useState("6months")

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
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-lg text-gray-600">System overview and analytics for MindWell platform</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">2,847</p>
                  <p className="text-sm text-green-600">+12% from last month</p>
                </div>
                <Users className="h-12 w-12 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                  <p className="text-3xl font-bold text-gray-900">5,400</p>
                  <p className="text-sm text-green-600">+8% from last month</p>
                </div>
                <Activity className="h-12 w-12 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Assessments Taken</p>
                  <p className="text-3xl font-bold text-gray-900">1,550</p>
                  <p className="text-sm text-green-600">+15% from last month</p>
                </div>
                <Target className="h-12 w-12 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Crisis Interventions</p>
                  <p className="text-3xl font-bold text-gray-900">23</p>
                  <p className="text-sm text-red-600">+2 from last month</p>
                </div>
                <AlertTriangle className="h-12 w-12 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="system">System Health</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Usage Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={usageData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="activeUsers" stroke="#10B981" strokeWidth={2} />
                        <Line type="monotone" dataKey="sessions" stroke="#3B82F6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Assessment Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={riskDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {riskDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Wellness Metrics Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={wellnessData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="avgMood"
                        stackId="1"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="journalEntries"
                        stackId="2"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Recent User Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                              <p className="font-medium">Anonymous User #{1000 + i}</p>
                              <p className="text-sm text-gray-500">Last active: {i} hours ago</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Active</Badge>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>System Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockAlerts.map((alert) => (
                        <div key={alert.id} className="p-3 border rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertTriangle
                              className={`h-4 w-4 mt-0.5 ${
                                alert.severity === "urgent"
                                  ? "text-red-600"
                                  : alert.severity === "warning"
                                    ? "text-yellow-600"
                                    : "text-blue-600"
                              }`}
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{alert.message}</p>
                              <p className="text-xs text-gray-500">{alert.timestamp}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Content Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <BookOpen className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-sm text-gray-600">Learning Modules</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <MessageSquare className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold">1,234</p>
                      <p className="text-sm text-gray-600">Community Posts</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Shield className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold">89</p>
                      <p className="text-sm text-gray-600">Resources</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <UserCheck className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-gray-600">Counselors</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* System Health Tab */}
          <TabsContent value="system" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">99.9%</div>
                      <p className="text-sm text-gray-600">Uptime</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">1.2s</div>
                      <p className="text-sm text-gray-600">Avg Response Time</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-600">0</div>
                      <p className="text-sm text-gray-600">Critical Issues</p>
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
