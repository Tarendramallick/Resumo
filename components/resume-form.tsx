"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface ResumeData {
  fullName: string
  email: string
  phone: string
  location: string
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

interface ResumeFormProps {
  data: ResumeData
  onChange: (data: ResumeData) => void
}

export function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [expandedSection, setExpandedSection] = useState<string>("personal")

  const updateField = (field: keyof ResumeData, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    })
  }

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((e) => e.id !== id),
    })
  }

  const updateExperience = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    })
  }

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        {
          id: Date.now().toString(),
          school: "",
          degree: "",
          field: "",
          graduationDate: "",
        },
      ],
    })
  }

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((e) => e.id !== id),
    })
  }

  const updateEducation = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      education: data.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    })
  }

  const addSkill = () => {
    onChange({
      ...data,
      skills: [...data.skills, ""],
    })
  }

  const removeSkill = (index: number) => {
    onChange({
      ...data,
      skills: data.skills.filter((_, i) => i !== index),
    })
  }

  const updateSkill = (index: number, value: string) => {
    onChange({
      ...data,
      skills: data.skills.map((s, i) => (i === index ? value : s)),
    })
  }

  return (
    <div className="space-y-4">
      {/* Personal Information */}
      <Card className="p-6">
        <button
          onClick={() => setExpandedSection(expandedSection === "personal" ? "" : "personal")}
          className="w-full text-left font-semibold text-slate-900 hover:text-blue-600 transition-colors"
        >
          Personal Information
        </button>
        {expandedSection === "personal" && (
          <div className="mt-4 space-y-4">
            <Input
              placeholder="Full Name"
              value={data.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
            />
            <Input
              placeholder="Email"
              type="email"
              value={data.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
            <Input placeholder="Phone" value={data.phone} onChange={(e) => updateField("phone", e.target.value)} />
            <Input
              placeholder="Location"
              value={data.location}
              onChange={(e) => updateField("location", e.target.value)}
            />
            <textarea
              placeholder="Professional Summary"
              value={data.summary}
              onChange={(e) => updateField("summary", e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
        )}
      </Card>

      {/* Experience */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setExpandedSection(expandedSection === "experience" ? "" : "experience")}
            className="font-semibold text-slate-900 hover:text-blue-600 transition-colors"
          >
            Experience
          </button>
          {expandedSection === "experience" && (
            <Button onClick={addExperience} size="sm" variant="outline" className="gap-2 bg-transparent">
              + Add
            </Button>
          )}
        </div>
        {expandedSection === "experience" && (
          <div className="mt-4 space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="space-y-3 pb-4 border-b border-slate-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-3">
                    <Input
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                    />
                    <Input
                      placeholder="Position"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Start Date"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                      />
                      <Input
                        placeholder="End Date"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                      />
                    </div>
                    <textarea
                      placeholder="Description"
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                  <Button
                    onClick={() => removeExperience(exp.id)}
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-red-700 ml-2"
                  >
                    🗑️
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Education */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setExpandedSection(expandedSection === "education" ? "" : "education")}
            className="font-semibold text-slate-900 hover:text-blue-600 transition-colors"
          >
            Education
          </button>
          {expandedSection === "education" && (
            <Button onClick={addEducation} size="sm" variant="outline" className="gap-2 bg-transparent">
              + Add
            </Button>
          )}
        </div>
        {expandedSection === "education" && (
          <div className="mt-4 space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="space-y-3 pb-4 border-b border-slate-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-3">
                    <Input
                      placeholder="School/University"
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                    />
                    <Input
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                    />
                    <Input
                      placeholder="Field of Study"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                    />
                    <Input
                      placeholder="Graduation Date"
                      value={edu.graduationDate}
                      onChange={(e) => updateEducation(edu.id, "graduationDate", e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={() => removeEducation(edu.id)}
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-red-700 ml-2"
                  >
                    🗑️
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Skills */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setExpandedSection(expandedSection === "skills" ? "" : "skills")}
            className="font-semibold text-slate-900 hover:text-blue-600 transition-colors"
          >
            Skills
          </button>
          {expandedSection === "skills" && (
            <Button onClick={addSkill} size="sm" variant="outline" className="gap-2 bg-transparent">
              + Add
            </Button>
          )}
        </div>
        {expandedSection === "skills" && (
          <div className="mt-4 space-y-3">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <Input placeholder="Skill" value={skill} onChange={(e) => updateSkill(index, e.target.value)} />
                <Button
                  onClick={() => removeSkill(index)}
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                >
                  🗑️
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
