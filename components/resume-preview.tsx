"use client"

import { Button } from "@/components/ui/button"
import { useRef } from "react"

interface ResumeData {
  fullName: string
  email: string
  phone: string
  location: string
  photo: string
  portfolioLink: string
  summary: string
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    id: string
    school: string
    degree: string
    field: string
    graduationDate: string
  }>
  skills: string[]
  certifications: string[]
}

interface ResumePreviewProps {
  data: ResumeData
  template: "modern" | "classic" | "minimal"
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null)

  const downloadPDF = () => {
    if (resumeRef.current) {
      const printWindow = window.open("", "", "width=800,height=600")
      if (printWindow) {
        printWindow.document.write(resumeRef.current.innerHTML)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  const renderTemplate = () => {
    if (template === "modern") {
      return <ModernTemplate data={data} />
    } else if (template === "classic") {
      return <ClassicTemplate data={data} />
    } else {
      return <MinimalTemplate data={data} />
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={downloadPDF} className="w-full bg-blue-600 hover:bg-blue-700 gap-2">
        ⬇️ Download PDF
      </Button>
      <div
        ref={resumeRef}
        className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm"
        style={{ width: "210mm", minHeight: "297mm" }}
      >
        {renderTemplate()}
      </div>
    </div>
  )
}

function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="space-y-6 text-sm">
      <div className="border-b-2 border-blue-600 pb-4">
        <div className="flex gap-4 items-start">
          {data.photo && (
            <img
              src={data.photo || "/placeholder.svg"}
              alt="Profile"
              className="w-24 h-24 rounded-lg object-cover border border-slate-300"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">{data.fullName}</h1>
            <div className="flex gap-4 text-slate-600 mt-2 flex-wrap">
              {data.email && <span>{data.email}</span>}
              {data.phone && <span>{data.phone}</span>}
              {data.location && <span>{data.location}</span>}
            </div>
            {data.portfolioLink && (
              <div className="mt-2">
                <a
                  href={data.portfolioLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Portfolio: {data.portfolioLink}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {data.summary && (
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Professional Summary</h2>
          <p className="text-slate-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-3">Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900">{exp.position}</h3>
                    <p className="text-slate-600">{exp.company}</p>
                  </div>
                  <span className="text-slate-600">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-slate-700 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-3">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-slate-600">{edu.school}</p>
                    <p className="text-slate-600">{edu.field}</p>
                  </div>
                  <span className="text-slate-600">{edu.graduationDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map(
              (skill, index) =>
                skill && (
                  <span key={index} className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-medium">
                    {skill}
                  </span>
                ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ClassicTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="space-y-4 text-sm font-serif">
      <div className="text-center border-b border-slate-400 pb-3">
        {data.photo && (
          <div className="flex justify-center mb-3">
            <img
              src={data.photo || "/placeholder.svg"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border border-slate-300"
            />
          </div>
        )}
        <h1 className="text-2xl font-bold text-slate-900">{data.fullName}</h1>
        <div className="flex justify-center gap-4 text-slate-700 text-xs mt-1 flex-wrap">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>|</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>|</span>}
          {data.location && <span>{data.location}</span>}
        </div>
        {data.portfolioLink && (
          <div className="mt-2 text-xs">
            <a
              href={data.portfolioLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {data.portfolioLink}
            </a>
          </div>
        )}
      </div>

      {data.summary && (
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Professional Summary</h2>
          <p className="text-slate-700 mt-1">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Experience</h2>
          <div className="space-y-2 mt-1">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">{exp.position}</span>
                  <span className="text-slate-700">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-slate-700 italic">{exp.company}</p>
                <p className="text-slate-700 text-xs mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Education</h2>
          <div className="space-y-2 mt-1">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">{edu.degree}</span>
                  <span className="text-slate-700">{edu.graduationDate}</span>
                </div>
                <p className="text-slate-700 italic">{edu.school}</p>
                <p className="text-slate-700 text-xs">{edu.field}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Skills</h2>
          <p className="text-slate-700 mt-1">{data.skills.filter((s) => s).join(" • ")}</p>
        </div>
      )}
    </div>
  )
}

function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="space-y-3 text-xs">
      <div>
        {data.photo && (
          <div className="mb-3">
            <img
              src={data.photo || "/placeholder.svg"}
              alt="Profile"
              className="w-16 h-16 rounded object-cover border border-slate-300"
            />
          </div>
        )}
        <h1 className="text-xl font-bold text-slate-900">{data.fullName}</h1>
        <div className="text-slate-600 space-y-0.5">
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.location && <div>{data.location}</div>}
          {data.portfolioLink && (
            <div>
              <a
                href={data.portfolioLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {data.portfolioLink}
              </a>
            </div>
          )}
        </div>
      </div>

      {data.summary && (
        <div>
          <h2 className="font-bold text-slate-900">SUMMARY</h2>
          <p className="text-slate-700">{data.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div>
          <h2 className="font-bold text-slate-900">EXPERIENCE</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mt-1">
              <div className="flex justify-between">
                <span className="font-bold text-slate-900">{exp.position}</span>
                <span className="text-slate-600">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="text-slate-600">{exp.company}</p>
              <p className="text-slate-700">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div>
          <h2 className="font-bold text-slate-900">EDUCATION</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mt-1">
              <div className="flex justify-between">
                <span className="font-bold text-slate-900">{edu.degree}</span>
                <span className="text-slate-600">{edu.graduationDate}</span>
              </div>
              <p className="text-slate-600">{edu.school}</p>
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div>
          <h2 className="font-bold text-slate-900">SKILLS</h2>
          <p className="text-slate-700">{data.skills.filter((s) => s).join(", ")}</p>
        </div>
      )}
    </div>
  )
}
