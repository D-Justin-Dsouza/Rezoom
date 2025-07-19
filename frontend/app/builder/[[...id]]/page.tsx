"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation" 
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Save, Eye, Download, Plus, X, ArrowLeft } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import ResumePreview from "@/components/ResumePreview" 

// Interfaces for your resume data structure
interface PersonalInfo {
  firstName: string; lastName: string; email: string; phone: string; location: string; website: string; linkedin: string; github: string;
}
interface Experience {
  id: string; company: string; position: string; startDate: string; endDate: string; current: boolean; description: string;
}
interface Education {
  id: string; institution: string; degree: string; field: string; startDate: string; endDate: string; gpa?: string;
}
interface Project {
  id: string; name: string; description: string; technologies: string[]; url?: string; github?: string;
}

export default function BuilderPage() {
  const router = useRouter();
  const params = useParams();
  const resumeId = params.id ? params.id[0] : null;
  const previewRef = useRef<HTMLDivElement>(null);

  // All your state hooks
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "", lastName: "", email: "", phone: "", location: "", website: "", linkedin: "", github: "",
  });
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // NEW: State for template selection
  const [template, setTemplate] = useState('modern');

  // This useEffect fetches data if we are in "edit" mode
  useEffect(() => {
    if (resumeId) {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      
      const fetchResumeData = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:8080/api/resumes/${resumeId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!response.ok) throw new Error("Failed to fetch resume data.");
          
          const data = await response.json();
          const resumeContent = JSON.parse(data.resume.content || '{}');
          
          setPersonalInfo(resumeContent.personalInfo || {});
          setSummary(resumeContent.summary || "");
          setSkills(resumeContent.skills || []);
          setExperiences(resumeContent.experiences || []);
          setEducation(resumeContent.education || []);
          setProjects(resumeContent.projects || []);
          setTemplate(resumeContent.template || 'modern'); // Load the template
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchResumeData();
    }
  }, [resumeId, router]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    setLoading(true);
    setError('');

    const resumeData = {
      personalInfo, summary, skills, experiences, education, projects, template, // Save the template
    };
    const contentJSON = JSON.stringify(resumeData);
    const title = `${personalInfo.firstName} ${personalInfo.lastName}'s Resume`.trim() === "'s Resume" ? "Untitled Resume" : `${personalInfo.firstName} ${personalInfo.lastName}'s Resume`;

    const isEditing = !!resumeId;
    const url = isEditing ? `http://localhost:8080/api/resumes/${resumeId}` : 'http://localhost:8080/api/resumes';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title, content: contentJSON }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save resume.');
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    const input = previewRef.current;
    if (!input) return;

    setLoading(true);
    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${personalInfo.firstName || "resume"}.pdf`);
        setLoading(false);
      });
  };

  const resumeDataForPreview = {
    personalInfo, summary, skills, experiences, education, projects,
  };

  const addSkill = () => { if (newSkill.trim() && !skills.includes(newSkill.trim())) { setSkills([...skills, newSkill.trim()]); setNewSkill(""); } };
  const removeSkill = (skill: string) => { setSkills(skills.filter((s) => s !== skill)); };
  const addExperience = () => { setExperiences([...experiences, { id: Date.now().toString(), company: "", position: "", startDate: "", endDate: "", current: false, description: "" }]); };
  const updateExperience = (id: string, field: keyof Experience, value: any) => { setExperiences(experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))); };
  const removeExperience = (id: string) => { setExperiences(experiences.filter((exp) => exp.id !== id)); };
  const addEducation = () => { setEducation([...education, { id: Date.now().toString(), institution: "", degree: "", field: "", startDate: "", endDate: "" }]); };
  const updateEducation = (id: string, field: keyof Education, value: any) => { setEducation(education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))); };
  const removeEducation = (id: string) => { setEducation(education.filter((edu) => edu.id !== id)); };
  const addProject = () => { setProjects([...projects, { id: Date.now().toString(), name: "", description: "", technologies: [] }]); };
  const updateProject = (id: string, field: keyof Project, value: any) => { setProjects(projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj))); };
  const removeProject = (id: string) => { setProjects(projects.filter((proj) => proj.id !== id)); };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
            {/* NEW: Template Selector */}
            <div className="flex items-center space-x-2">
                <Button variant={template === 'modern' ? 'default' : 'outline'} size="sm" onClick={() => setTemplate('modern')}>Modern</Button>
                <Button variant={template === 'classic' ? 'default' : 'outline'} size="sm" onClick={() => setTemplate('classic')}>Classic</Button>
                <Button variant={template === 'creative' ? 'default' : 'outline'} size="sm" onClick={() => setTemplate('creative')}>Creative</Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleDownloadPdf} disabled={loading}>
                <Download className="h-4 w-4 mr-2" />
                {loading ? 'Downloading...' : 'Download PDF'}
              </Button>
              <Button size="sm" onClick={handleSave} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>
              
              {/* All your form TabsContent sections go here, unchanged */}
              <TabsContent value="personal" className="space-y-4">
                <Card>
                  <CardHeader><CardTitle>Personal Information</CardTitle><CardDescription>Basic information for your resume</CardDescription></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2"><Label htmlFor="firstName">First Name</Label><Input id="firstName" value={personalInfo.firstName} onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })} placeholder="John"/></div>
                      <div className="space-y-2"><Label htmlFor="lastName">Last Name</Label><Input id="lastName" value={personalInfo.lastName} onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })} placeholder="Doe"/></div>
                    </div>
                    <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={personalInfo.email} onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} placeholder="john@example.com"/></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" value={personalInfo.phone} onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} placeholder="+1 (555) 123-4567"/></div>
                      <div className="space-y-2"><Label htmlFor="location">Location</Label><Input id="location" value={personalInfo.location} onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })} placeholder="New York, NY"/></div>
                    </div>
                    <div className="space-y-2"><Label htmlFor="website">Website</Label><Input id="website" value={personalInfo.website} onChange={(e) => setPersonalInfo({ ...personalInfo, website: e.target.value })} placeholder="https://johndoe.com"/></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2"><Label htmlFor="linkedin">LinkedIn</Label><Input id="linkedin" value={personalInfo.linkedin} onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })} placeholder="linkedin.com/in/johndoe"/></div>
                      <div className="space-y-2"><Label htmlFor="github">GitHub</Label><Input id="github" value={personalInfo.github} onChange={(e) => setPersonalInfo({ ...personalInfo, github: e.target.value })} placeholder="github.com/johndoe"/></div>
                    </div>
                    <div className="space-y-2"><Label htmlFor="summary">Professional Summary</Label><Textarea id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="A brief summary..." rows={4}/></div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="experience" className="space-y-4">
                <Card>
                  <CardHeader><div className="flex items-center justify-between"><div><CardTitle>Work Experience</CardTitle><CardDescription>Your work history</CardDescription></div><Button onClick={addExperience} size="sm"><Plus className="h-4 w-4 mr-2"/>Add</Button></div></CardHeader>
                  <CardContent className="space-y-6">{experiences.map((exp) => (<div key={exp.id} className="border rounded-lg p-4 space-y-4"><div className="flex items-center justify-between"><h4 className="font-medium">Experience Entry</h4><Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)}><X className="h-4 w-4"/></Button></div><div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Company</Label><Input value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} placeholder="Company Name"/></div><div className="space-y-2"><Label>Position</Label><Input value={exp.position} onChange={(e) => updateExperience(exp.id, "position", e.target.value)} placeholder="Job Title"/></div></div><div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Start Date</Label><Input type="month" value={exp.startDate} onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}/></div><div className="space-y-2"><Label>End Date</Label><Input type="month" value={exp.endDate} onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)} disabled={exp.current}/></div></div><div className="flex items-center space-x-2"><input type="checkbox" id={`current-${exp.id}`} checked={exp.current} onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}/><Label htmlFor={`current-${exp.id}`}>I currently work here</Label></div><div className="space-y-2"><Label>Description</Label><Textarea value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} placeholder="Achievements..." rows={3}/></div></div>))}</CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="education" className="space-y-4">
                <Card>
                  <CardHeader><div className="flex items-center justify-between"><div><CardTitle>Education</CardTitle><CardDescription>Your educational background</CardDescription></div><Button onClick={addEducation} size="sm"><Plus className="h-4 w-4 mr-2"/>Add</Button></div></CardHeader>
                  <CardContent className="space-y-6">{education.map((edu) => (<div key={edu.id} className="border rounded-lg p-4 space-y-4"><div className="flex items-center justify-between"><h4 className="font-medium">Education Entry</h4><Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)}><X className="h-4 w-4"/></Button></div><div className="space-y-2"><Label>Institution</Label><Input value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} placeholder="University Name"/></div><div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Degree</Label><Input value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} placeholder="B.S."/></div><div className="space-y-2"><Label>Field of Study</Label><Input value={edu.field} onChange={(e) => updateEducation(edu.id, "field", e.target.value)} placeholder="Computer Science"/></div></div><div className="grid grid-cols-3 gap-4"><div className="space-y-2"><Label>Start Date</Label><Input type="month" value={edu.startDate} onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}/></div><div className="space-y-2"><Label>End Date</Label><Input type="month" value={edu.endDate} onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}/></div><div className="space-y-2"><Label>GPA</Label><Input value={edu.gpa || ""} onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)} placeholder="3.8"/></div></div></div>))}</CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="skills" className="space-y-4">
                <Card>
                  <CardHeader><CardTitle>Skills</CardTitle><CardDescription>Your technical and professional skills</CardDescription></CardHeader>
                  <CardContent className="space-y-4"><div className="flex space-x-2"><Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add a skill..." onKeyPress={(e) => e.key === "Enter" && addSkill()}/><Button onClick={addSkill}>Add</Button></div><div className="flex flex-wrap gap-2">{skills.map((skill) => (<Badge key={skill} variant="secondary" className="text-sm">{skill}<button onClick={() => removeSkill(skill)} className="ml-2 hover:text-red-500"><X className="h-3 w-3"/></button></Badge>))}</div></CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="projects" className="space-y-4">
                <Card>
                  <CardHeader><div className="flex items-center justify-between"><div><CardTitle>Projects</CardTitle><CardDescription>Showcase your work</CardDescription></div><Button onClick={addProject} size="sm"><Plus className="h-4 w-4 mr-2"/>Add</Button></div></CardHeader>
                  <CardContent className="space-y-6">{projects.map((project) => (<div key={project.id} className="border rounded-lg p-4 space-y-4"><div className="flex items-center justify-between"><h4 className="font-medium">Project Entry</h4><Button variant="ghost" size="sm" onClick={() => removeProject(project.id)}><X className="h-4 w-4"/></Button></div><div className="space-y-2"><Label>Project Name</Label><Input value={project.name} onChange={(e) => updateProject(project.id, "name", e.target.value)} placeholder="My Awesome Project"/></div><div className="space-y-2"><Label>Description</Label><Textarea value={project.description} onChange={(e) => updateProject(project.id, "description", e.target.value)} placeholder="A short description..." rows={3}/></div><div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Project URL</Label><Input value={project.url || ""} onChange={(e) => updateProject(project.id, "url", e.target.value)} placeholder="https://myproject.com"/></div><div className="space-y-2"><Label>GitHub URL</Label><Input value={project.github || ""} onChange={(e) => updateProject(project.id, "github", e.target.value)} placeholder="https://github.com/user/repo"/></div></div></div>))}</CardContent>
                </Card>
              </TabsContent>

            </Tabs>
          </div>

          <div className="lg:sticky lg:top-24">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>See how your resume looks in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResumePreview ref={previewRef} resume={resumeDataForPreview} template={template} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
