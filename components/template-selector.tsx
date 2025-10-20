"use client"

interface TemplateSelectorProps {
  selected: "modern" | "classic" | "minimal"
  onSelect: (template: "modern" | "classic" | "minimal") => void
}

export function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean, contemporary design with accent colors",
    },
    {
      id: "classic",
      name: "Classic",
      description: "Traditional format, ATS-friendly",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and elegant, maximum compatibility",
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Choose Template</h2>
      <div className="grid grid-cols-3 gap-4">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id as any)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selected === t.id ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-slate-900">{t.name}</h3>
              {selected === t.id && <span className="text-blue-600 font-bold">✓</span>}
            </div>
            <p className="text-sm text-slate-600">{t.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
