"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { GuestLoginForm } from "@/components/auth/guest-login-form"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Heart, Shield, Users, UserCheck } from "lucide-react"

type AuthMode = "login" | "signup" | "forgot-password" | "guest"

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<AuthMode>("login")

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-balance">
                Join thousands of students prioritizing their mental health
              </h1>
              <p className="text-xl text-muted-foreground text-balance">
                Get personalized support, track your progress, and connect with a caring community.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">100% Confidential & Secure</h3>
                  <p className="text-muted-foreground">
                    Your privacy is our priority. All data is encrypted and HIPAA-compliant.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Evidence-Based Tools</h3>
                  <p className="text-muted-foreground">
                    Access validated assessments, CBT modules, and mindfulness exercises.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Peer Support Community</h3>
                  <p className="text-muted-foreground">Connect with fellow students who understand your journey.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Guest Access Available</h3>
                  <p className="text-muted-foreground">
                    Try our chat and resources with just a pseudonym - no email required.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Auth Forms */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="w-full max-w-md mx-auto">
              <CardContent className="p-6">
                <AnimatePresence mode="wait">
                  {authMode === "forgot-password" ? (
                    <motion.div
                      key="forgot-password"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ForgotPasswordForm onBack={() => setAuthMode("login")} />
                    </motion.div>
                  ) : authMode === "guest" ? (
                    <motion.div
                      key="guest"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <GuestLoginForm onBack={() => setAuthMode("login")} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="auth-tabs"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as AuthMode)}>
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="login">Sign In</TabsTrigger>
                          <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login" className="mt-6">
                          <LoginForm onForgotPassword={() => setAuthMode("forgot-password")} />
                        </TabsContent>

                        <TabsContent value="signup" className="mt-6">
                          <SignupForm />
                        </TabsContent>
                      </Tabs>

                      <div className="mt-6 pt-6 border-t text-center">
                        <p className="text-sm text-muted-foreground mb-3">Want to try without creating an account?</p>
                        <Button variant="outline" onClick={() => setAuthMode("guest")} className="w-full">
                          <UserCheck className="h-4 w-4 mr-2" />
                          Continue as Guest
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
