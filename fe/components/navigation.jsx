"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import {
  Home,
  BookOpen,
  MessageCircle,
  Users,
  FileText,
  BarChart3,
  GraduationCap,
  Video,
  LayoutDashboard,
  Smile,
} from "lucide-react"

const publicNavItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Resources", href: "/resources", icon: FileText },
  { name: "About Us", href: "/about", icon: Users },
  { name: "Contact", href: "/contact", icon: MessageCircle },
]

const authenticatedNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Mood Tracker", href: "/mood", icon: Smile },
  { name: "Journal", href: "/journal", icon: BookOpen },
  { name: "Assessments", href: "/assessments", icon: BarChart3 },
  { name: "Learning", href: "/modules", icon: GraduationCap },
  { name: "Chat", href: "/chat", icon: MessageCircle },
  { name: "Community", href: "/community", icon: Users },
  { name: "Resources", href: "/resources", icon: FileText },
  { name: "Telehealth", href: "/telehealth", icon: Video },
]

export function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState("student")
  const [userName, setUserName] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
}
