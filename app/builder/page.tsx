"use client"

import { useState } from "react"
import { ResumeForm } from "@/components/resume-form"
import { ResumePreview } from "@/components/resume-preview"
import { TemplateSelector } from "@/components/template-selector"

export default function BuilderPage() {
  const [template, setTemplate] = useState<"modern" | "classic" | "minimal">("modern")
  const [resumeData, setResumeData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    experience: [],
    education: [],
    skills: [],
    certifications: [],
  })
  const [isFormatting, setIsFormatting] = useState(false)

  const handleFormatWithAI = async () => {
    setIsFormatting(true)
    try {
      const response = await fetch("/api/format-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData),
      })
      const formatted = await response.json()
      setResumeData(formatted)
    } catch (error) {
      console.error("Error formatting resume:", error)
    } finally {
      setIsFormatting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Resume Builder</h1>
          <button
            onClick={handleFormatWithAI}
            disabled={isFormatting}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium disabled:opacity-50"
          >
            {isFormatting ? "Formatting..." : "Format with AI"}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="space-y-6">
            <TemplateSelector selected={template} onSelect={setTemplate} />
            <ResumeForm data={resumeData} onChange={setResumeData} />
          </div>

          {/* Right: Preview */}
          <div className="sticky top-24 h-fit">
            <ResumePreview data={resumeData} template={template} />
          </div>
        </div>
      </div>
    </div>
  )
}
