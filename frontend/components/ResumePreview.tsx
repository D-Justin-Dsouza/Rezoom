"use client"

import React from 'react';
import { Badge } from "@/components/ui/badge";
import cn from 'classnames';

// Interfaces for your resume data structure
interface PersonalInfo {
  firstName?: string; lastName?: string; email?: string; phone?: string; location?: string;
}
interface Experience {
  id: string; company?: string; position?: string; startDate?: string; endDate?: string; current?: boolean; description?: string;
}
interface Education {
  id: string; institution?: string; degree?: string; field?: string; startDate?: string; endDate?: string; gpa?: string;
}
interface Project {
  id: string; name?: string; description?: string; url?: string; github?: string;
}
interface ResumeData {
  personalInfo?: PersonalInfo;
  summary?: string;
  skills?: string[];
  experiences?: Experience[];
  education?: Education[];
  projects?: Project[];
}

interface ResumePreviewProps {
  resume?: ResumeData; // Making resume prop optional to prevent errors
  template: string;
}

const ResumePreview = React.forwardRef<HTMLDivElement, ResumePreviewProps>(({ resume = {}, template }, ref) => {
  // THE FIX: We destructure from the resume prop, providing default empty values for every field.
  // This ensures that even if `resume` is undefined, these variables will be empty arrays/objects
  // instead of causing a crash.
  const { personalInfo = {}, summary, skills = [], experiences = [], education = [], projects = [] } = resume;

  // Define base classes and template-specific classes
  const containerClasses = cn("bg-white p-6 min-h-[600px] aspect-[8.5/11] font-sans", {
      'font-serif': template === 'classic',
      'font-mono text-sm': template === 'creative',
  });

  const headerClasses = cn("text-center border-b pb-4", {
      'border-gray-500': template === 'classic',
      'border-blue-500': template === 'creative',
  });
  
  const sectionTitleClasses = cn("text-lg font-semibold mb-2 border-b", {
      'text-gray-700 tracking-wider uppercase': template === 'classic',
      'text-blue-600': template === 'creative',
  });

  return (
    <div ref={ref} className={containerClasses}>
      <div className="space-y-4">
        {/* Header */}
        <div className={headerClasses}>
          <h1 className="text-2xl font-bold">
            {personalInfo.firstName || "Your"} {personalInfo.lastName || "Name"}
          </h1>
          <div className="flex justify-center flex-wrap gap-x-3 text-xs text-gray-600">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div>
            <h2 className={sectionTitleClasses}>Professional Summary</h2>
            <p className="text-sm text-gray-700">{summary}</p>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className={sectionTitleClasses}>Skills</h2>
            <div className="flex flex-wrap gap-1">
              {skills.map((skill) => (
                <Badge key={skill} variant={template === 'creative' ? 'default' : 'outline'} className="text-xs">{skill}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
            <div>
                <h2 className={sectionTitleClasses}>Experience</h2>
                <div className="space-y-3">
                {experiences.map((exp) => (
                    <div key={exp.id} className="text-sm">
                    <div className="flex justify-between items-start">
                        <div>
                        <h3 className="font-medium">{exp.position || "Position"}</h3>
                        <p className="text-gray-600">{exp.company || "Company"}</p>
                        </div>
                        <p className="text-gray-500 text-xs text-right">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </p>
                      </div>
                      {exp.description && <p className="text-gray-700 mt-1 text-xs">{exp.description}</p>}
                    </div>
                ))}
                </div>
            </div>
        )}
        
        {/* Education */}
        {education.length > 0 && (
            <div>
                <h2 className={sectionTitleClasses}>Education</h2>
                <div className="space-y-2">
                {education.map((edu) => (
                    <div key={edu.id} className="text-sm">
                    <div className="flex justify-between items-start">
                        <div>
                        <h3 className="font-medium">
                            {edu.degree || "Degree"} in {edu.field || "Field"}
                        </h3>
                        <p className="text-gray-600">{edu.institution || "Institution"}</p>
                        </div>
                        <p className="text-gray-500 text-xs text-right">
                        {edu.startDate} - {edu.endDate}
                        </p>
                      </div>
                      {edu.gpa && <p className="text-gray-700 text-xs">GPA: {edu.gpa}</p>}
                    </div>
                ))}
                </div>
            </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
            <div>
                <h2 className={sectionTitleClasses}>Projects</h2>
                <div className="space-y-3">
                {projects.map((project) => (
                    <div key={project.id} className="text-sm">
                    <h3 className="font-medium">{project.name || "Project Name"}</h3>
                    {project.description && <p className="text-gray-700 mt-1 text-xs">{project.description}</p>}
                    <div className="flex space-x-4 mt-1">
                        {project.url && (
                        <a href={project.url} className="text-blue-600 text-xs hover:underline">Live Demo</a>
                        )}
                        {project.github && (
                        <a href={project.github} className="text-blue-600 text-xs hover:underline">GitHub</a>
                        )}
                      </div>
                    </div>
                ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;
