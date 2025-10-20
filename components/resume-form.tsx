"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"

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

interface ResumeFormProps {
  data: ResumeData
  onChange: (data: ResumeData) => void
}

export function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["personal"]))

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const updateField = (field: keyof ResumeData, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateField("photo", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
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
      <Card className="p-0">
        <button
          onClick={() => toggleSection("personal")}
          className="w-full text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors p-6 flex items-center justify-between"
        >
          <span>👤 Personal Information</span>
          <span className="text-slate-400">{expandedSections.has("personal") ? "−" : "+"}</span>
        </button>
        {expandedSections.has("personal") && (
          <div className="px-6 pb-6 space-y-4 border-t border-slate-200">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Profile Photo</label>
              <div className="flex items-center gap-4">
                {data.photo && (
                  <img
                    src={data.photo || "/placeholder.svg"}
                    alt="Profile"
                    className="w-20 h-20 rounded-lg object-cover border border-slate-300"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
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
            <Input
              placeholder="Portfolio Link (e.g., https://yourportfolio.com)"
              type="url"
              value={data.portfolioLink}
              onChange={(e) => updateField("portfolioLink", e.target.value)}
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
      <Card className="p-0">
        <button
          onClick={() => toggleSection("experience")}
          className="w-full text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors p-6 flex items-center justify-between"
        >
          <span>💼 Experience</span>
          <span className="text-slate-400">{expandedSections.has("experience") ? "−" : "+"}</span>
        </button>
        {expandedSections.has("experience") && (
          <div className="px-6 pb-6 space-y-6 border-t border-slate-200">
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
            <Button onClick={addExperience} size="sm" variant="outline" className="gap-2 bg-transparent w-full">
              + Add Experience
            </Button>
          </div>
        )}
      </Card>

      {/* Education */}
      <Card className="p-0">
        <button
          onClick={() => toggleSection("education")}
          className="w-full text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors p-6 flex items-center justify-between"
        >
          <span>🎓 Education</span>
          <span className="text-slate-400">{expandedSections.has("education") ? "−" : "+"}</span>
        </button>
        {expandedSections.has("education") && (
          <div className="px-6 pb-6 space-y-6 border-t border-slate-200">
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
            <Button onClick={addEducation} size="sm" variant="outline" className="gap-2 bg-transparent w-full">
              + Add Education
            </Button>
          </div>
        )}
      </Card>

      {/* Skills */}
      <Card className="p-0">
        <button
          onClick={() => toggleSection("skills")}
          className="w-full text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors p-6 flex items-center justify-between"
        >
          <span>⭐ Skills</span>
          <span className="text-slate-400">{expandedSections.has("skills") ? "−" : "+"}</span>
        </button>
        {expandedSections.has("skills") && (
          <div className="px-6 pb-6 space-y-3 border-t border-slate-200">
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
            <Button onClick={addSkill} size="sm" variant="outline" className="gap-2 bg-transparent w-full">
              + Add Skill
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
