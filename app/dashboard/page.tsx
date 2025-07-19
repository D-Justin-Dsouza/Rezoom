"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, Plus, MoreHorizontal, Eye, Download, Share, Edit, Trash2, Globe } from "lucide-react"

interface Portfolio {
  id: string
  title: string
  template: string
  lastModified: string
  status: "draft" | "published"
  url?: string
}

export default function DashboardPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([
    {
      id: "1",
      title: "Software Developer Resume",
      template: "Modern Professional",
      lastModified: "2 hours ago",
      status: "published",
      url: "https://resume.example.com/john-doe",
    },
    {
      id: "2",
      title: "Creative Portfolio",
      template: "Creative Portfolio",
      lastModified: "1 day ago",
      status: "draft",
    },
    {
      id: "3",
      title: "Executive Resume",
      template: "Executive Classic",
      lastModified: "3 days ago",
      status: "published",
      url: "https://resume.example.com/john-doe-exec",
    },
  ])

  const handleDelete = (id: string) => {
    setPortfolios(portfolios.filter((p) => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <FileText className="h-8 w-8 mr-2" />
                <span className="text-xl font-bold">Rezoom</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild>
                <Link href="/builder">
                  <Plus className="h-4 w-4 mr-2" />
                  New Resume
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                      JD
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                  <DropdownMenuItem>Account</DropdownMenuItem>
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Resumes</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your resumes and portfolios</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolios.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolios.filter((p) => p.status === "published").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolios.filter((p) => p.status === "draft").length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
            <Card key={portfolio.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{portfolio.title}</CardTitle>
                    <CardDescription>{portfolio.template}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/builder/${portfolio.id}`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </DropdownMenuItem>
                      {portfolio.url && (
                        <DropdownMenuItem>
                          <Share className="h-4 w-4 mr-2" />
                          Share URL
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(portfolio.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant={portfolio.status === "published" ? "default" : "secondary"}>
                      {portfolio.status}
                    </Badge>
                    <span className="text-sm text-gray-500">{portfolio.lastModified}</span>
                  </div>
                  {portfolio.url && (
                    <div className="text-sm text-blue-600 dark:text-blue-400 truncate">{portfolio.url}</div>
                  )}
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
                      <Link href={`/builder/${portfolio.id}`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Create New Card */}
          <Card className="border-dashed border-2 hover:border-primary transition-colors">
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
              <Plus className="h-12 w-12 text-gray-400 mb-4" />
              <CardTitle className="text-lg mb-2">Create New Resume</CardTitle>
              <CardDescription className="mb-4">Start building your next professional resume</CardDescription>
              <Button asChild>
                <Link href="/builder">Get Started</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
