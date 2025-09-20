"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Phone, Mail, MapPin, MessageCircle, AlertTriangle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const contactMethods = [
  {
    icon: Phone,
    title: "Crisis Support",
    description: "24/7 immediate support",
    contact: "Call or text Sneha India Suicide Prevention Helpline on 044-2464005088",
    urgent: true,
  },
  {
    icon: MessageCircle,
    title: "General Support",
    description: "Questions about the platform",
    contact: "support@mindwell.edu",
    urgent: false,
  },
  {
    icon: Mail,
    title: "Partnerships",
    description: "University partnerships",
    contact: "partnerships@mindwell.edu",
    urgent: false,
  },
  {
    icon: MapPin,
    title: "Office",
    description: "Visit us in person",
    contact: "123 University Ave, Suite 100",
    urgent: false,
  },
]

const faqs = [
  {
    question: "Is MindWell really free for students?",
    answer:
      "Yes! MindWell is completely free for all students. We're funded through university partnerships and grants to ensure cost is never a barrier to mental health support.",
  },
  {
    question: "How do you protect my privacy?",
    answer:
      "We use end-to-end encryption for all communications and comply with HIPAA regulations. Your data is never shared without your explicit consent, and you can delete your account at any time.",
  },
  {
    question: "Can MindWell replace therapy?",
    answer:
      "MindWell is designed to complement, not replace, professional therapy. We provide tools and peer support, but for serious mental health concerns, we always recommend connecting with a licensed professional.",
  },
  {
    question: "What if I'm having a mental health crisis?",
    answer:
      "If you're in immediate danger, please call 911 or go to your nearest emergency room. For mental health crises, call or text 988 for the Suicide & Crisis Lifeline, available 24/7.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    subject: "",
    message: "",
    inquiryType: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    })

    setFormData({
      name: "",
      email: "",
      university: "",
      subject: "",
      message: "",
      inquiryType: "",
    })
    setIsLoading(false)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted/20">
        <div className="container max-w-4xl mx-auto space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              We're here to help. Whether you need support, have questions, or want to partner with us, we'd love to
              hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Crisis Alert */}
      <section className="py-8 px-4">
        <div className="container max-w-4xl mx-auto">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>In Crisis?</strong> If you're having thoughts of self-harm or suicide, please reach out
              immediately:
              <div className="mt-2 space-y-1">
                <div>
                  • Sneha India Suicide Prevention Helpline at <strong>044-24640050</strong> (Suicide & Crisis Lifeline)
                </div>
                <div>
                  • Text <strong>HOME</strong> to <strong>741741</strong> (Crisis Text Line)
                </div>
                <div>
                  • iCall at <strong>9152987821</strong> or visit your nearest emergency room
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">How to Reach Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the best way to connect based on your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Card
                    className={`h-full text-center p-6 hover:shadow-lg transition-shadow ${method.urgent ? "border-red-200 bg-red-50" : ""}`}
                  >
                    <CardContent className="p-0 space-y-4">
                      <div
                        className={`mx-auto w-12 h-12 rounded-lg flex items-center justify-center ${method.urgent ? "bg-red-100" : "bg-primary/10"}`}
                      >
                        <Icon className={`h-6 w-6 ${method.urgent ? "text-red-600" : "text-primary"}`} />
                      </div>
                      <h3 className="text-xl font-semibold">{method.title}</h3>
                      <p className="text-muted-foreground text-sm">{method.description}</p>
                      <p className={`font-medium ${method.urgent ? "text-red-700" : "text-primary"}`}>
                        {method.contact}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => updateFormData("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@university.edu"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="university">University</Label>
                      <Input
                        id="university"
                        placeholder="Your university"
                        value={formData.university}
                        onChange={(e) => updateFormData("university", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(value) => updateFormData("inquiryType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="support">General Support</SelectItem>
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="partnership">University Partnership</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Brief subject line"
                        value={formData.subject}
                        onChange={(e) => updateFormData("subject", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us how we can help..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => updateFormData("message", e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-2">{faq.question}</h4>
                      <p className="text-muted-foreground text-sm">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Response Time</h4>
                      <p className="text-sm text-muted-foreground">
                        We typically respond to all inquiries within 24 hours during business days. For urgent matters,
                        please use our crisis support resources listed above.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
