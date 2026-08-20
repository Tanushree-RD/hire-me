'use client'

import { Plus, Trash2, X } from 'lucide-react'
import { Card } from '@/components/ui/primitives'
import type { Experience } from '../types'

interface ExperienceEditSectionProps {
  experiences: Experience[]
  onChange: (experiences: Experience[]) => void
}

export default function ExperienceEditSection({
  experiences,
  onChange,
}: ExperienceEditSectionProps) {
  const handleAddExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      title: '',
      company: '',
      location: '',
      duration: '',
      startDate: '',
      endDate: '',
      achievements: [''],
    }
    onChange([...experiences, newExp])
  }

  const handleDeleteExperience = (index: number) => {
    onChange(experiences.filter((_, idx) => idx !== index))
  }

  const handleUpdateExperience = (index: number, field: keyof Experience, value: unknown) => {
    const nextExperiences = [...experiences]
    const current = nextExperiences[index]
    if (!current) return

    const updated = { ...current, [field]: value } as Experience

    // If start date or end date is updated, sync composite duration string
    if (field === 'startDate' || field === 'endDate') {
      const start = (field === 'startDate' ? value : current.startDate) || ''
      const end = (field === 'endDate' ? value : current.endDate) || ''
      if (start || end) {
        updated.duration = `${start} — ${end}`.trim()
      }
    }

    nextExperiences[index] = updated
    onChange(nextExperiences)
  }

  const handleAddAchievement = (expIndex: number) => {
    const nextExperiences = [...experiences]
    const current = nextExperiences[expIndex]
    if (!current) return
    nextExperiences[expIndex] = {
      ...current,
      achievements: [...current.achievements, ''],
    }
    onChange(nextExperiences)
  }

  const handleUpdateAchievement = (expIndex: number, achIndex: number, text: string) => {
    const nextExperiences = [...experiences]
    const current = nextExperiences[expIndex]
    if (!current) return
    const nextAch = [...current.achievements]
    nextAch[achIndex] = text
    nextExperiences[expIndex] = {
      ...current,
      achievements: nextAch,
    }
    onChange(nextExperiences)
  }

  const handleDeleteAchievement = (expIndex: number, achIndex: number) => {
    const nextExperiences = [...experiences]
    const current = nextExperiences[expIndex]
    if (!current) return
    nextExperiences[expIndex] = {
      ...current,
      achievements: current.achievements.filter((_, i) => i !== achIndex),
    }
    onChange(nextExperiences)
  }

  return (
    <Card as="section" className="p-6 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border-subtle pb-4 mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-text-main">Work Experience</h2>
          <p className="text-xs text-text-muted mt-1">
            Showcase your internships, full-time roles, or part-time work with key achievements.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddExperience}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl bg-brand text-white hover:bg-brand-hover active:bg-brand-dark active:scale-[0.98] transition-all shadow-xs shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {experiences.length === 0 ? (
          <div className="text-center py-8 bg-bg-page rounded-2xl border border-dashed border-border-muted">
            <p className="text-sm text-text-muted mb-3">No work experience added yet.</p>
            <button
              type="button"
              onClick={handleAddExperience}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-card border border-border-subtle text-text-main hover:bg-bg-page cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add First Experience
            </button>
          </div>
        ) : (
          experiences.map((exp, idx) => (
            <div
              key={exp.id || idx}
              className="p-5 sm:p-6 rounded-2xl bg-bg-page border border-border-subtle transition-all duration-200 hover:border-border-muted hover:shadow-xs"
            >
              {/* Experience Item Header */}
              <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-border-subtle">
                <span className="text-xs font-bold text-brand-dark bg-brand-light px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-brand-mint/50">
                  Experience #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleDeleteExperience(idx)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50/80 border border-red-200/80 hover:bg-red-100/80 active:scale-95 px-3 py-1.5 rounded-xl transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                  aria-label={`Delete experience ${exp.title || idx + 1}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Position / Title */}
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
                    Position / Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={exp.title}
                    onChange={(e) => handleUpdateExperience(idx, 'title', e.target.value)}
                    placeholder="e.g. Software Engineering Intern"
                    className="w-full px-3 py-2 text-sm text-text-main bg-card border border-border-subtle rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={exp.company}
                    onChange={(e) => handleUpdateExperience(idx, 'company', e.target.value)}
                    placeholder="e.g. Google"
                    className="w-full px-3 py-2 text-sm text-text-main bg-card border border-border-subtle rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => handleUpdateExperience(idx, 'location', e.target.value)}
                    placeholder="e.g. Mountain View, CA or Remote"
                    className="w-full px-3 py-2 text-sm text-text-main bg-card border border-border-subtle rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                  />
                </div>

                {/* Duration / Start & End Dates */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
                      Start Date
                    </label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => handleUpdateExperience(idx, 'startDate', e.target.value)}
                      placeholder="e.g. JUN 2023"
                      className="w-full px-3 py-2 text-sm text-text-main bg-card border border-border-subtle rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
                      End Date
                    </label>
                    <input
                      type="text"
                      value={exp.endDate}
                      onChange={(e) => handleUpdateExperience(idx, 'endDate', e.target.value)}
                      placeholder="e.g. AUG 2023 or Present"
                      className="w-full px-3 py-2 text-sm text-text-main bg-card border border-border-subtle rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                    />
                  </div>
                </div>

                {/* Achievements / Bullet Points */}
                <div className="sm:col-span-2 space-y-2 mt-1">
                  <label className="block text-xs font-bold text-text-muted uppercase tracking-wider">
                    Description & Achievements (Bullet Points)
                  </label>

                  {exp.achievements.map((achievement, aIdx) => (
                    <div key={aIdx} className="flex items-center gap-2">
                      <span className="text-text-muted/60 text-sm font-bold select-none">•</span>
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) => handleUpdateAchievement(idx, aIdx, e.target.value)}
                        placeholder="e.g. Developed scalable microservices in Go, improving latency by 25%..."
                        className="flex-1 px-3 py-1.5 text-sm text-text-main bg-card border border-border-subtle rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteAchievement(idx, aIdx)}
                        className="text-text-muted hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg active:scale-95 transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-red-500"
                        title="Remove bullet point"
                        aria-label={`Remove achievement bullet ${aIdx + 1}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => handleAddAchievement(idx)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-dark hover:text-brand active:scale-95 pt-1 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-brand"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Bullet Point
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
