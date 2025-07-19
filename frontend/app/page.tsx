import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Globe, Download, Users, Zap, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <FileText className="h-6 w-6 mr-2" />
          <span className="font-bold">Rezoom</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#templates">
            Templates
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Login
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/register">
            Sign Up
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Build Your Perfect Resume & Portfolio
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Create stunning, professional resumes in minutes. Choose from modern templates, get
                  real-time previews, and share with a download as PDF.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/register">Get Started Free</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#templates">View Templates</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to create professional resumes and portfolios that stand out.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                <Card className="lg:col-span-1">
                <CardHeader>
                  <Zap className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Real-time Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                  See your resume update instantly as you type. No more guessing how it will look.
                  </CardDescription>
                </CardContent>
                </Card>
                <Card className="lg:col-span-1">
                <CardHeader>
                  <Download className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>PDF Download</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                  Export your resume as a high-quality PDF with one click. Print-ready and ATS-friendly.
                  </CardDescription>
                </CardContent>
                </Card>
                <Card className="lg:col-span-1">
                <CardHeader>
                  <FileText className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Modern Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                  Choose from professionally designed templates that make your resume stand out.
                  </CardDescription>
                </CardContent>
                </Card>
                <div className="lg:col-span-2 flex justify-center space-x-6 px-4">
                  <Card className="w-full max-w-md">
                  <CardHeader>
                  <Users className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Multiple Portfolios</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <CardDescription>
                  Create and manage multiple versions of your resume for different job applications.
                  </CardDescription>
                  </CardContent>
                  </Card>
                  <Card className="w-full max-w-md">
                  <CardHeader>
                  <Shield className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Secure & Private</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <CardDescription>
                  Your data is encrypted and secure. Control who can see your portfolio with privacy settings.
                  </CardDescription>
                  </CardContent>
                  </Card>
                </div>
            </div>
          </div>
        </section>

        {/* Templates Preview */}
        <section id="templates" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Professional Templates</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Choose from our collection of modern, ATS-friendly resume templates.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="overflow-hidden">
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-6">
                  <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-600 rounded w-1/2"></div>
                    <div className="space-y-1 pt-2">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Modern Professional</CardTitle>
                  <CardDescription>Clean and contemporary design perfect for tech and business roles.</CardDescription>
                </CardHeader>
              </Card>
              <Card className="overflow-hidden">
                <div className="aspect-[3/4] bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-6">
                  <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-600 rounded w-1/3"></div>
                    <div className="space-y-1 pt-2">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Creative Portfolio</CardTitle>
                  <CardDescription>Showcase your creativity with this design-focused template.</CardDescription>
                </CardHeader>
              </Card>
              <Card className="overflow-hidden">
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-6">
                  <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-600 rounded w-2/5"></div>
                    <div className="space-y-1 pt-2">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Executive Classic</CardTitle>
                  <CardDescription>Traditional and elegant design for senior-level positions.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of professionals who have already created their perfect resume.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" asChild>
                  <Link href="/register">Create Your Resume</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Rezoom. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
