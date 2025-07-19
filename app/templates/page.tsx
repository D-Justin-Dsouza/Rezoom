"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Eye, ArrowLeft } from "lucide-react"

interface Template {
  id: string
  name: string
  description: string
  category: string
  preview: string
  features: string[]
}

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const templates: Template[] = [
    {
      id: "modern-professional",
      name: "Modern Professional",
      description: "Clean and contemporary design perfect for tech and business roles",
      category: "professional",
      preview: "modern-preview",
      features: ["ATS-Friendly", "Clean Layout", "Professional Colors"],
    },
    {
      id: "creative-portfolio",
      name: "Creative Portfolio",
      description: "Showcase your creativity with this design-focused template",
      category: "creative",
      preview: "creative-preview",
      features: ["Visual Appeal", "Project Showcase", "Creative Layout"],
    },
    {
      id: "executive-classic",
      name: "Executive Classic",
      description: "Traditional and elegant design for senior-level positions",
      category: "executive",
      preview: "executive-preview",
      features: ["Traditional Layout", "Executive Style", "Formal Design"],
    },
    {
      id: "tech-minimal",
      name: "Tech Minimal",
      description: "Minimalist design focused on technical skills and experience",
      category: "tech",
      preview: "tech-preview",
      features: ["Minimal Design", "Tech-Focused", "Skills Highlight"],
    },
    {
      id: "academic-research",
      name: "Academic Research",
      description: "Perfect for academic positions and research roles",
      category: "academic",
      preview: "academic-preview",
      features: ["Publication Focus", "Research Oriented", "Academic Format"],
    },
    {
      id: "startup-dynamic",
      name: "Startup Dynamic",
      description: "Modern and energetic design for startup environments",
      category: "startup",
      preview: "startup-preview",
      features: ["Dynamic Layout", "Modern Colors", "Startup Culture"],
    },
  ]

  const categories = [
    { id: "all", name: "All Templates" },
    { id: "professional", name: "Professional" },
    { id: "creative", name: "Creative" },
    { id: "tech", name: "Technology" },
    { id: "executive", name: "Executive" },
    { id: "academic", name: "Academic" },
    { id: "startup", name: "Startup" },
  ]

  const filteredTemplates = templates.filter(
    (template) => selectedCategory === "all" || template.category === selectedCategory,
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center">
                <FileText className="h-6 w-6 mr-2" />
                <span className="text-lg font-semibold">Choose Template</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Resume Templates</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Choose from our collection of professionally designed templates
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Template Preview */}
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6">
                <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-600 rounded w-1/2"></div>
                  <div className="space-y-1 pt-2">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                  </div>
                  <div className="pt-2 space-y-1">
                    <div className="h-2 bg-gray-100 dark:bg-gray-600 rounded w-2/3"></div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-600 rounded w-3/4"></div>
                  </div>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="mt-1">{template.description}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Features */}
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1" asChild>
                      <Link href={`/builder?template=${template.id}`}>Use Template</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No templates found for the selected category.</p>
          </div>
        )}
      </main>
    </div>
  )
}
