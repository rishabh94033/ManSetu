"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Bell, Shield, Accessibility, Download, Trash2, Eye, EyeOff, Moon, Sun } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [fontSize, setFontSize] = useState([16])
  const [highContrast, setHighContrast] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  const handleExportData = () => {
    toast({
      title: "Data export initiated",
      description: "Your data export will be ready for download shortly.",
    })
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "Please check your email for confirmation instructions.",
      variant: "destructive",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
          <p className="text-lg text-gray-600">
            Customize your MindWell experience and manage your account preferences
          </p>
        </motion.div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="w-20 h-20">
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-2xl">JD</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline">Change Avatar</Button>
                      <p className="text-sm text-gray-500">
                        Your avatar helps personalize your experience while maintaining anonymity
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input id="displayName" placeholder="Anonymous User" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your.email@university.edu" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="university">University</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your university" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stanford">Stanford University</SelectItem>
                          <SelectItem value="berkeley">UC Berkeley</SelectItem>
                          <SelectItem value="ucla">UCLA</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Academic Year</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="freshman">Freshman</SelectItem>
                          <SelectItem value="sophomore">Sophomore</SelectItem>
                          <SelectItem value="junior">Junior</SelectItem>
                          <SelectItem value="senior">Senior</SelectItem>
                          <SelectItem value="graduate">Graduate Student</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Change Password</Label>
                    <div className="relative">
                      <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter new password" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button onClick={handleSaveSettings} className="bg-emerald-600 hover:bg-emerald-700">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Push Notifications</h3>
                        <p className="text-sm text-gray-500">Receive notifications on your device</p>
                      </div>
                      <Switch checked={notifications} onCheckedChange={setNotifications} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Sound Effects</h3>
                        <p className="text-sm text-gray-500">Play sounds for notifications and interactions</p>
                      </div>
                      <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Appointment Reminders</h3>
                        <p className="text-sm text-gray-500">Get reminded about upcoming sessions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Daily Check-in Reminders</h3>
                        <p className="text-sm text-gray-500">Gentle reminders to log your mood</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Community Updates</h3>
                        <p className="text-sm text-gray-500">Notifications about community posts and replies</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Wellness Tips</h3>
                        <p className="text-sm text-gray-500">Receive helpful mental health tips and resources</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Quiet Hours</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="quietStart" className="text-sm">
                          Start Time
                        </Label>
                        <Input id="quietStart" type="time" defaultValue="22:00" />
                      </div>
                      <div>
                        <Label htmlFor="quietEnd" className="text-sm">
                          End Time
                        </Label>
                        <Input id="quietEnd" type="time" defaultValue="08:00" />
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleSaveSettings} className="bg-emerald-600 hover:bg-emerald-700">
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Accessibility Tab */}
          <TabsContent value="accessibility" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Accessibility className="h-5 w-5" />
                    Accessibility Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Dark Mode</h3>
                      <p className="text-sm text-gray-500">Use dark theme to reduce eye strain</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                      <Moon className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">High Contrast</h3>
                      <p className="text-sm text-gray-500">Increase contrast for better visibility</p>
                    </div>
                    <Switch checked={highContrast} onCheckedChange={setHighContrast} />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="font-medium">Font Size</h3>
                      <p className="text-sm text-gray-500">Adjust text size for comfortable reading</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Small</span>
                        <span className="text-sm">Large</span>
                      </div>
                      <Slider
                        value={fontSize}
                        onValueChange={setFontSize}
                        max={24}
                        min={12}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-sm text-gray-500">Current size: {fontSize[0]}px</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Reduce Motion</h3>
                      <p className="text-sm text-gray-500">Minimize animations and transitions</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Screen Reader Support</h3>
                      <p className="text-sm text-gray-500">Enhanced compatibility with screen readers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Keyboard Navigation</h3>
                      <p className="text-sm text-gray-500">Navigate using keyboard shortcuts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Button onClick={handleSaveSettings} className="bg-emerald-600 hover:bg-emerald-700">
                    Save Accessibility Settings
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Anonymous Mode</h3>
                      <p className="text-sm text-gray-500">Hide your identity in community features</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Data Analytics</h3>
                      <p className="text-sm text-gray-500">Allow anonymous usage data to improve the platform</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Research Participation</h3>
                      <p className="text-sm text-gray-500">Participate in anonymous mental health research</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Data Sharing Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Share mood data with counselors</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Share assessment results with counselors</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Share journal entries with counselors</span>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>

                  <Button onClick={handleSaveSettings} className="bg-emerald-600 hover:bg-emerald-700">
                    Save Privacy Settings
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Account Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Export Your Data</h3>
                      <p className="text-sm text-gray-500 mb-3">
                        Download a copy of all your data including mood logs, journal entries, and assessment results.
                      </p>
                      <Button onClick={handleExportData} variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Request Data Export
                      </Button>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Account Status</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Account created:</span>
                          <span>January 15, 2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last login:</span>
                          <span>Today at 2:30 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Data retention:</span>
                          <span>Active</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Subscription</h3>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Student Plan</p>
                            <p className="text-sm text-gray-500">Full access to all features</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">Free</p>
                            <p className="text-sm text-gray-500">University sponsored</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          These actions are permanent and cannot be undone. Please proceed with caution.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Clear All Data
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                          onClick={handleDeleteAccount}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
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
