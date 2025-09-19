"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Heart, Flag, Plus, Search, Filter, TrendingUp, Users, Shield, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for community posts
const mockPosts = [
  {
    id: 1,
    title: "Dealing with exam anxiety - tips that actually work",
    content:
      "I've been struggling with severe anxiety during exams. After working with counseling services, I found some techniques that really help...",
    author: "Anonymous Owl",
    category: "Anxiety",
    replies: 23,
    likes: 45,
    timeAgo: "2 hours ago",
    tags: ["anxiety", "exams", "coping-strategies"],
    isHelpful: true,
  },
  {
    id: 2,
    title: "Finding motivation when everything feels overwhelming",
    content:
      "Senior year has been incredibly tough. Between job applications, thesis work, and personal stuff, I feel like I'm drowning...",
    author: "Anonymous Bear",
    category: "Depression",
    replies: 18,
    likes: 32,
    timeAgo: "4 hours ago",
    tags: ["depression", "motivation", "senior-year"],
    isHelpful: false,
  },
  {
    id: 3,
    title: "Healthy sleep habits that changed my mental health",
    content:
      "I used to pull all-nighters constantly and my mental health was terrible. Here's what I learned about sleep hygiene...",
    author: "Anonymous Fox",
    category: "Wellness",
    replies: 41,
    likes: 78,
    timeAgo: "1 day ago",
    tags: ["sleep", "wellness", "habits"],
    isHelpful: true,
  },
]

const categories = ["All", "Anxiety", "Depression", "Wellness", "Relationships", "Academic Stress"]

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const { toast } = useToast()

  const handleLike = (postId: number) => {
    toast({
      title: "Post liked",
      description: "Your support has been shared anonymously.",
    })
  }

  const handleReport = (postId: number) => {
    toast({
      title: "Post reported",
      description: "Thank you for helping keep our community safe. Our moderation team will review this.",
    })
  }

  const handleCreatePost = () => {
    setIsCreatingPost(false)
    toast({
      title: "Post created",
      description: "Your post has been shared anonymously with the community.",
    })
  }

  const filteredPosts = mockPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Community Support</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with fellow students in a safe, anonymous space. Share experiences, find support, and help others on
            their wellness journey.
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">2,847</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">1,234</div>
              <div className="text-sm text-gray-600">Posts This Week</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">5,678</div>
              <div className="text-sm text-gray-600">Supportive Reactions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Anonymous & Safe</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search posts, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
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
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <TrendingUp className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="helpful">Most Helpful</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Dialog open={isCreatingPost} onOpenChange={setIsCreatingPost}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Share Your Experience</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Title</label>
                  <Input placeholder="What would you like to share?" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Content</label>
                  <Textarea
                    placeholder="Share your experience, ask for advice, or offer support to others..."
                    rows={6}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Tags (optional)</label>
                  <Input placeholder="anxiety, coping, study-tips (separate with commas)" />
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <Shield className="h-4 w-4 inline mr-2" />
                    Your post will be completely anonymous. Please avoid sharing personal identifying information.
                  </p>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsCreatingPost(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePost} className="bg-emerald-600 hover:bg-emerald-700">
                    Post Anonymously
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Posts */}
        <div className="space-y-4">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-emerald-100 text-emerald-700">
                          {post.author.split(" ")[1]?.[0] || "A"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{post.author}</span>
                          {post.isHelpful && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              Helpful
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          {post.timeAgo}
                          <Badge variant="outline">{post.category}</Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleReport(post.id)}>
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {post.replies} replies
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      View Discussion
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Community Guidelines */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                Community Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <h4 className="font-medium mb-2">Be Supportive</h4>
                  <p>Offer encouragement and understanding. We're all here to help each other.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Stay Anonymous</h4>
                  <p>Protect your privacy and others'. Avoid sharing identifying information.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Respect Boundaries</h4>
                  <p>Everyone's journey is different. Be respectful of diverse experiences.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Seek Professional Help</h4>
                  <p>This community supplements but doesn't replace professional mental health care.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
