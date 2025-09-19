"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, MapPin } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// Mock appointment data
const appointments = [
  {
    id: 1,
    type: "Individual Counseling",
    counselor: "Dr. Sarah Johnson",
    date: "Tomorrow",
    time: "2:00 PM - 3:00 PM",
    format: "Video Call",
    status: "confirmed",
  },
  {
    id: 2,
    type: "Group Therapy",
    counselor: "Dr. Michael Chen",
    date: "Friday",
    time: "4:00 PM - 5:00 PM",
    format: "In-Person",
    location: "Student Health Center, Room 204",
    status: "confirmed",
  },
]

export function UpcomingAppointments() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5" />
            Upcoming Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map((appointment, index) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-3 border rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{appointment.type}</h4>
                    <Badge variant="outline" className="text-xs">
                      {appointment.status}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground">with {appointment.counselor}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {appointment.time}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {appointment.format === "Video Call" ? (
                      <>
                        <Video className="h-3 w-3" />
                        Video Call
                      </>
                    ) : (
                      <>
                        <MapPin className="h-3 w-3" />
                        {appointment.location}
                      </>
                    )}
                  </div>

                  {appointment.date === "Tomorrow" && (
                    <Button size="sm" className="w-full mt-2">
                      Join Session
                    </Button>
                  )}
                </motion.div>
              ))}

              <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                <Link href="/telehealth">View All Sessions</Link>
              </Button>
            </div>
          ) : (
            <div className="text-center py-6 space-y-3">
              <Calendar className="h-8 w-8 text-muted-foreground mx-auto" />
              <div>
                <p className="text-sm font-medium">No upcoming sessions</p>
                <p className="text-xs text-muted-foreground">Schedule a session when you need support</p>
              </div>
              <Button size="sm" asChild>
                <Link href="/telehealth">Book Session</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
