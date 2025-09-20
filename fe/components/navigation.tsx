"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Heart,
  Menu,
  Home,
  Library,
  Phone,
  Info,
  LayoutDashboard,
  MoonIcon as MoodIcon,
  BookOpen,
  ClipboardList,
  GraduationCap,
  MessageCircle,
  Users,
  Stethoscope,
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  Flower
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const publicNavigationItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/resources", label: "Resources", icon: Library },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/contact", label: "Contact", icon: Phone },
  { href: "/counsellorchatuser", label: "CChat with User", icon: Phone },

]

const counselorNavigationItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/resources", label: "Resources", icon: Library },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/contact", label: "Contact", icon: Phone },
  { href: "/counsellorchatuser", label: "Chat with User", icon: Phone },

]

const authenticatedNavigationItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/mood", label: "Mood Tracker", icon: MoodIcon },
  { href: "/journal", label: "Journal", icon: BookOpen },
  { href: "/assessments", label: "Assessments", icon: ClipboardList },
  // { href: "/modules", label: "Learning", icon: GraduationCap },
  { href: "/cbt", label: "CBT", icon: Stethoscope },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/community", label: "Community", icon: Users },
  { href: "/resources", label: "Resources", icon: Library },
  { href: "/telehealth", label: "Telehealth", icon: Stethoscope },
  { href: "/garden", label: "Garden", icon: Flower },

]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const isAuthenticated =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/mood") ||
    pathname.startsWith("/journal") ||
    pathname.startsWith("/assessments") ||
    pathname.startsWith("/modules") ||
    pathname.startsWith("/chat") ||
    pathname.startsWith("/community") ||
    pathname.startsWith("/telehealth") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/counselor") ||
    pathname.startsWith("/garden");

// Check if user is on counselor routes
const isCounselorPath = pathname.startsWith("/counselor");
  // const navigationItems = isAuthenticated ? authenticatedNavigationItems : publicNavigationItems
let navigationItems;
if (isAuthenticated) {
  navigationItems = isCounselorPath
    ? counselorNavigationItems
    : authenticatedNavigationItems;
} else {
  navigationItems = publicNavigationItems;
}

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navigationItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              mobile ? "w-full" : "",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
            )}
            onClick={() => mobile && setIsOpen(false)}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        )
      })}
    </>
  )

  return (
    <header className="ml-5 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Heart className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold text-foreground">ManSetu</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavItems />
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">John Doe</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">john.doe@university.edu</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              {/* <Button variant="ghost" asChild>
                <Link href="/auth">Sign In</Link>
              </Button> */}
              <Button asChild>
                <Link href="/auth">Get Started</Link>
              </Button>
            </div>
          )}

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-4 py-4">
                <div className="flex items-center gap-2 px-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Heart className="h-4 w-4" />
                  </div>
                  <span className="text-xl font-bold">MindWell</span>
                </div>
                <nav className="flex flex-col gap-1">
                  <NavItems mobile />
                </nav>
                <div className="flex flex-col gap-2 px-3 pt-4 border-t">
                  {isAuthenticated ? (
                    <>
                      <Button variant="ghost" asChild className="justify-start">
                        <Link href="/profile">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </Button>
                      <Button variant="ghost" asChild className="justify-start">
                        <Link href="/settings">
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </Button>
                      <Button variant="ghost" className="justify-start text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" asChild className="justify-start">
                        <Link href="/auth">Sign In</Link>
                      </Button>
                      <Button asChild className="justify-start">
                        <Link href="/auth">Get Started</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
