"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  BookOpen,
  Video,
  Headphones,
  FileText,
  Download,
  ExternalLink,
  Clock,
  Star,
  Users,
} from "lucide-react"

// Mock data for resources
const mockResources = [
  {
    id: 1,
    title: "Mindfulness for Students: A Complete Guide",
    description:
      "Learn evidence-based mindfulness techniques specifically designed for academic stress and student life challenges.",
    type: "guide",
    category: "Mindfulness",
    format: "PDF",
    duration: "45 min read",
    rating: 4.8,
    downloads: 2847,
    tags: ["mindfulness", "stress-relief", "meditation", "academic"],
    featured: true,
    author: "Dr. Sarah Chen, Clinical Psychologist",
    link: "https://www.udemy.com/share/102lYe/", // <-- Add this

  },
  {
    id: 2,
    title: "Cognitive Behavioral Therapy Workbook",
    description: "Interactive exercises and worksheets to help identify and change negative thought patterns.",
    type: "workbook",
    category: "CBT",
    format: "Interactive PDF",
    duration: "Self-paced",
    rating: 4.9,
    downloads: 1923,
    tags: ["cbt", "anxiety", "depression", "worksheets"],
    featured: true,
    author: "MindWell Clinical Team",
        link: "https://cogbtherapy.com/free-online-cbt-workbook", // <-- Add this

  },
  {
    id: 3,
    title: "Sleep Hygiene for Better Mental Health",
    description: "Comprehensive guide to improving sleep quality and its impact on mental wellbeing.",
    type: "video",
    category: "Sleep",
    format: "Video Series",
    duration: "3 hours",
    rating: 4.7,
    downloads: 3421,
    tags: ["sleep", "wellness", "habits", "mental-health"],
    featured: false,
    author: "Dr. Michael Torres, Sleep Specialist",
        link: "https://findahelpline.com/countries/in", // <-- Add this

  },
  {
    id: 4,
    title: "Guided Meditation: Exam Anxiety Relief",
    description: "20-minute guided meditation specifically designed to calm pre-exam nerves and improve focus.",
    type: "audio",
    category: "Meditation",
    format: "Audio",
    duration: "20 minutes",
    rating: 4.6,
    downloads: 5632,
    tags: ["meditation", "anxiety", "exams", "focus"],
    featured: false,
    author: "Mindful Campus Initiative",
        link: "https://teachers.institute/higher-education-the-psycho-social-context/building-healthy-relationships-college-guide/", // <-- Add this

  },
  {
    id: 5,
    title: "Crisis Support Resource Directory",
    description: "Comprehensive list of crisis hotlines, emergency contacts, and immediate support resources.",
    type: "directory",
    category: "Crisis Support",
    format: "Web Resource",
    duration: "Quick reference",
    rating: 5.0,
    downloads: 892,
    tags: ["crisis", "emergency", "support", "hotlines"],
    featured: true,
    author: "Campus Counseling Services",
        link: "https://www.youtube.com/watch?v=5nm7WwS80Xs", // <-- Add this

  },
  {
    id: 6,
    title: "Building Healthy Relationships in College",
    description: "Navigate friendships, romantic relationships, and social connections during your college years.",
    type: "guide",
    category: "Relationships",
    format: "PDF",
    duration: "30 min read",
    rating: 4.5,
    downloads: 1456,
    tags: ["relationships", "social", "communication", "college"],
    featured: false,
    author: "Dr. Lisa Park, Relationship Counselor",
        link: "https://www.youtube.com/watch?v=hvPGfcAgk9Y&pp=ygUNU2xlZXAgSHlnaWVuZQ%3D%3D", // <-- Add this

  },
]

const categories = ["All", "Mindfulness", "CBT", "Sleep", "Meditation", "Crisis Support", "Relationships", "Academic"]
const formats = ["All Formats", "PDF", "Video Series", "Audio", "Interactive PDF", "Web Resource"]
const types = ["All Types", "guide", "workbook", "video", "audio", "directory"]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedFormat, setSelectedFormat] = useState("All Formats")
  const [selectedType, setSelectedType] = useState("All Types")
  const [sortBy, setSortBy] = useState("featured")

  const filteredResources = mockResources
    .filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory
      const matchesFormat = selectedFormat === "All Formats" || resource.format === selectedFormat
      const matchesType = selectedType === "All Types" || resource.type === selectedType

      return matchesSearch && matchesCategory && matchesFormat && matchesType
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "featured":
          return b.featured ? 1 : -1
        case "popular":
          return b.downloads - a.downloads
        case "rating":
          return b.rating - a.rating
        case "recent":
          return b.id - a.id
        default:
          return 0
      }
    })

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "guide":
        return <BookOpen className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "audio":
        return <Headphones className="h-5 w-5" />
      case "workbook":
        return <FileText className="h-5 w-5" />
      default:
        return <BookOpen className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Resource Library</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access evidence-based mental health resources, guides, and tools curated by our clinical team and trusted
            partners.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search resources, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {formats.map((format) => (
                  <SelectItem key={format} value={format}>
                    {format}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Featured Resources */}
        {filteredResources.some((r) => r.featured) && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources
                .filter((r) => r.featured)
                .map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow border-emerald-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {getResourceIcon(resource.type)}
                            <Badge className="bg-emerald-100 text-emerald-700">Featured</Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{resource.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {resource.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {resource.downloads.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {resource.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">By {resource.author}</p>
                          <div className="flex gap-2">
                            <Button
  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
  onClick={() => window.open(resource.link, "_blank")}
>
  <Download className="h-4 w-4 mr-2" />
  Access
</Button>
<Button
  variant="outline"
  size="sm"
  onClick={() => window.open(resource.link, "_blank")}
>
  <ExternalLink className="h-4 w-4" />
</Button>

                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* All Resources */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">All Resources</h2>
            <span className="text-sm text-gray-500">{filteredResources.length} resources found</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getResourceIcon(resource.type)}
                        <Badge variant="outline">{resource.category}</Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{resource.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {resource.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {resource.downloads.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">By {resource.author}</p>
                      <div className="flex gap-2">
                       <Button
  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
  onClick={() => window.open(resource.link, "_blank")}
>
  <Download className="h-4 w-4 mr-2" />
  Access
</Button>

<Button
  variant="outline"
  size="sm"
  onClick={() => window.open(resource.link, "_blank")}
>
  <ExternalLink className="h-4 w-4" />
</Button>

                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Access Categories */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <BookOpen className="h-6 w-6" />
                  <span className="text-sm">Study Guides</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Headphones className="h-6 w-6" />
                  <span className="text-sm">Meditations</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Video className="h-6 w-6" />
                  <span className="text-sm">Video Series</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">Worksheets</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}