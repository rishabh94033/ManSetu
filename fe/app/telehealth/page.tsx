"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Video, Phone, MessageSquare, Star, GraduationCap, Shield, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for counselors
const mockCounselors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    title: "Licensed Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "Academic Stress"],
    rating: 4.9,
    reviews: 127,
    experience: "8 years",
    education: "PhD Clinical Psychology, Stanford University",
    languages: ["English", "Mandarin"],
    availability: "Available today",
    nextSlot: "2:00 PM",
    image: "/professional-therapist-woman.png",
  },
  {
    id: 2,
    name: "Dr. Michael Torres",
    title: "Licensed Professional Counselor",
    specialties: ["ADHD", "Sleep Disorders", "Life Transitions"],
    rating: 4.8,
    reviews: 89,
    experience: "6 years",
    education: "MA Counseling Psychology, UCLA",
    languages: ["English", "Spanish"],
    availability: "Available tomorrow",
    nextSlot: "10:00 AM",
    image: "/professional-therapist-man.jpg",
  },
  {
    id: 3,
    name: "Dr. Lisa Park",
    title: "Licensed Marriage & Family Therapist",
    specialties: ["Relationships", "Family Issues", "Cultural Identity"],
    rating: 4.9,
    reviews: 156,
    experience: "10 years",
    education: "PhD Marriage & Family Therapy, USC",
    languages: ["English", "Korean"],
    availability: "Available today",
    nextSlot: "4:30 PM",
    image: "/placeholder-aannu.png",
  },
]

// Mock upcoming appointments
const mockAppointments = [
  {
    id: 1,
    counselor: "Dr. Sarah Chen",
    date: "Today",
    time: "2:00 PM - 3:00 PM",
    type: "Video Session",
    status: "confirmed",
  },
  {
    id: 2,
    counselor: "Dr. Michael Torres",
    date: "Tomorrow",
    time: "10:00 AM - 11:00 AM",
    type: "Phone Session",
    status: "confirmed",
  },
]

export default function TelehealthPage() {
  const [selectedCounselor, setSelectedCounselor] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [sessionType, setSessionType] = useState("video")
  const [isBooking, setIsBooking] = useState(false)
  const { toast } = useToast()

  const handleBookAppointment = () => {
    toast({
      title: "Appointment booked",
      description: "Your session has been scheduled. You'll receive a confirmation email shortly.",
    })
    setIsBooking(false)
    setSelectedCounselor(null)
  }

  const handleJoinSession = () => {
    toast({
      title: "Joining session",
      description: "Connecting you to your video session...",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Telehealth Services</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with licensed mental health professionals from the comfort of your dorm or home. Secure,
            confidential, and convenient.
          </p>
        </motion.div>

        <Tabs defaultValue="book" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="book">Book Session</TabsTrigger>
            <TabsTrigger value="appointments">My Appointments</TabsTrigger>
            <TabsTrigger value="session">Join Session</TabsTrigger>
          </TabsList>

          {/* Book Session Tab */}
          <TabsContent value="book" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Counselor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockCounselors.map((counselor) => (
                      <motion.div key={counselor.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Card
                          className={`cursor-pointer transition-all ${
                            selectedCounselor === counselor.id
                              ? "ring-2 ring-emerald-500 bg-emerald-50"
                              : "hover:shadow-lg"
                          }`}
                          onClick={() => setSelectedCounselor(counselor.id)}
                        >
                          <CardHeader>
                            <div className="flex items-center gap-4">
                              <Avatar className="w-16 h-16">
                                <AvatarImage src={counselor.image || "/placeholder.svg"} alt={counselor.name} />
                                <AvatarFallback>
                                  {counselor.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg">{counselor.name}</h3>
                                <p className="text-sm text-gray-600">{counselor.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                    <span className="text-sm font-medium">{counselor.rating}</span>
                                  </div>
                                  <span className="text-sm text-gray-500">({counselor.reviews} reviews)</span>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <h4 className="font-medium text-sm mb-2">Specialties</h4>
                                <div className="flex flex-wrap gap-1">
                                  {counselor.specialties.map((specialty) => (
                                    <Badge key={specialty} variant="secondary" className="text-xs">
                                      {specialty}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="text-sm text-gray-600">
                                <div className="flex items-center gap-2 mb-1">
                                  <GraduationCap className="h-3 w-3" />
                                  <span>{counselor.experience} experience</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-600" />
                                  <span className="text-green-600">{counselor.availability}</span>
                                </div>
                              </div>
                              <div className="text-sm font-medium text-emerald-600">
                                Next available: {counselor.nextSlot}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Booking Form */}
            {selectedCounselor && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Schedule Your Session</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Session Type</label>
                          <Select value={sessionType} onValueChange={setSessionType}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="video">
                                <div className="flex items-center gap-2">
                                  <Video className="h-4 w-4" />
                                  Video Session
                                </div>
                              </SelectItem>
                              <SelectItem value="phone">
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4" />
                                  Phone Session
                                </div>
                              </SelectItem>
                              <SelectItem value="chat">
                                <div className="flex items-center gap-2">
                                  <MessageSquare className="h-4 w-4" />
                                  Text Chat
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Preferred Date</label>
                          <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">Preferred Time</label>
                          <Select value={selectedTime} onValueChange={setSelectedTime}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="09:00">9:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="11:00">11:00 AM</SelectItem>
                              <SelectItem value="14:00">2:00 PM</SelectItem>
                              <SelectItem value="15:00">3:00 PM</SelectItem>
                              <SelectItem value="16:00">4:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Reason for Visit (Optional)
                          </label>
                          <Textarea placeholder="Briefly describe what you'd like to discuss..." rows={4} />
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div className="text-sm text-blue-800">
                              <p className="font-medium mb-1">Your Privacy is Protected</p>
                              <p>
                                All sessions are HIPAA compliant and completely confidential. Your information is secure
                                and never shared without your consent.
                              </p>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={handleBookAppointment}
                          className="w-full bg-emerald-600 hover:bg-emerald-700"
                          disabled={!selectedDate || !selectedTime}
                        >
                          Book Appointment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          {/* My Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
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
                            <h3 className="font-semibold">{appointment.counselor}</h3>
                            <p className="text-sm text-gray-600">
                              {appointment.date} • {appointment.time}
                            </p>
                            <Badge variant="outline" className="mt-1">
                              {appointment.type}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-700">Confirmed</Badge>
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            Join Session
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Join Session Tab */}
          <TabsContent value="session" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Video Session</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden mb-4">
                    {/* Placeholder video area */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">Session will start here</p>
                        <p className="text-sm opacity-75">Your video session with Dr. Sarah Chen</p>
                      </div>
                    </div>

                    {/* Video controls */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                      <Button size="sm" variant="secondary" className="rounded-full w-12 h-12">
                        <Video className="h-5 w-5" />
                      </Button>
                      <Button size="sm" variant="secondary" className="rounded-full w-12 h-12">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button size="sm" variant="destructive" className="rounded-full w-12 h-12">
                        <Phone className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button onClick={handleJoinSession} className="bg-emerald-600 hover:bg-emerald-700">
                      Join Session Now
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">Session starts in 5 minutes with Dr. Sarah Chen</p>
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
