'use client'

import { Card, Icon } from '@/components/ui/primitives'
import { plusD, trashD, xMarkD } from '@/components/ui/icons'
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
      startDate: '',
      endDate: '',
      duration: '',
      achievements: [''],
    }
    onChange([...experiences, newExp])
  }

  const handleDeleteExperience = (index: number) => {
    onChange(experiences.filter((_, idx) => idx !== index))
  }

  const handleUpdateExperience = <K extends keyof Experience>(
    index: number,
    field: K,
    value: Experience[K],
  ) => {
    const updated = [...experiences]
    const current = { ...updated[index] } as Experience

    if (field === 'startDate' || field === 'endDate') {
      const start = field === 'startDate' ? (value as string) : current.startDate || ''
      const end = field === 'endDate' ? (value as string) : current.endDate || ''
      current[field] = value
      current.duration = start && end ? `${start} — ${end}` : start || end || current.duration
    } else {
      current[field] = value
    }

    updated[index] = current
    onChange(updated)
  }

  const handleAddAchievement = (expIndex: number) => {
    const updated = [...experiences]
    const current = { ...updated[expIndex] } as Experience
    current.achievements = [...(current.achievements ?? []), '']
    updated[expIndex] = current
    onChange(updated)
  }

  const handleUpdateAchievement = (expIndex: number, achIndex: number, text: string) => {
    const updated = [...experiences]
    const current = { ...updated[expIndex] } as Experience
    const achievements = [...(current.achievements ?? [])]
    achievements[achIndex] = text
    current.achievements = achievements
    updated[expIndex] = current
    onChange(updated)
  }

  const handleDeleteAchievement = (expIndex: number, achIndex: number) => {
    const updated = [...experiences]
    const current = { ...updated[expIndex] } as Experience
    current.achievements = (current.achievements ?? []).filter((_, idx) => idx !== achIndex)
    updated[expIndex] = current
    onChange(updated)
  }

  return (
    <Card as="section" className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100 pb-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Work Experience</h2>
          <p className="text-xs text-gray-500 mt-1">
            Showcase your internships, full-time roles, or part-time work with key achievements.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddExperience}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-md bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 transition-colors shadow-xs shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent-500"
        >
          <Icon d={plusD} className="w-3.5 h-3.5" />
          Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {experiences.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-sm text-gray-500 mb-3">No work experience added yet.</p>
            <button
              type="button"
              onClick={handleAddExperience}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <Icon d={plusD} className="w-3.5 h-3.5" />
              Add First Experience
            </button>
          </div>
        ) : (
          experiences.map((exp, idx) => (
            <div
              key={exp.id || idx}
              className="p-5 rounded-lg bg-gray-50/60 border border-gray-200/80 transition-all hover:border-gray-300"
            >
              {/* Experience Item Header */}
              <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-gray-200/60">
                <span className="text-xs font-bold text-accent-700 bg-accent-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Experience #{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => handleDeleteExperience(idx)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors cursor-pointer"
                  aria-label={`Delete experience ${exp.title || idx + 1}`}
                >
                  <Icon d={trashD} className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Position / Title */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Position / Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={exp.title}
                    onChange={(e) => handleUpdateExperience(idx, 'title', e.target.value)}
                    placeholder="e.g. Software Engineering Intern"
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-xs placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={exp.company}
                    onChange={(e) => handleUpdateExperience(idx, 'company', e.target.value)}
                    placeholder="e.g. Google"
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-xs placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => handleUpdateExperience(idx, 'location', e.target.value)}
                    placeholder="e.g. Mountain View, CA or Remote"
                    className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-xs placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500"
                  />
                </div>

                {/* Duration / Start & End Dates */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Start Date
                    </label>
                    <input
                      type="text"
                      value={exp.startDate ?? (exp.duration.split('—')[0]?.trim() || '')}
                      onChange={(e) => handleUpdateExperience(idx, 'startDate', e.target.value)}
                      placeholder="e.g. JUN 2023"
                      className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-xs placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      End Date
                    </label>
                    <input
                      type="text"
                      value={exp.endDate ?? (exp.duration.split('—')[1]?.trim() || '')}
                      onChange={(e) => handleUpdateExperience(idx, 'endDate', e.target.value)}
                      placeholder="e.g. AUG 2023 or Present"
                      className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-xs placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500"
                    />
                  </div>
                </div>

                {/* Achievements / Bullet Points */}
                <div className="sm:col-span-2 space-y-2 mt-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Description & Achievements (Bullet Points)
                  </label>

                  {exp.achievements.map((achievement, aIdx) => (
                    <div key={aIdx} className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm font-bold select-none">•</span>
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) => handleUpdateAchievement(idx, aIdx, e.target.value)}
                        placeholder="e.g. Developed scalable microservices in Go, improving latency by 25%..."
                        className="flex-1 px-3 py-1.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-xs placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteAchievement(idx, aIdx)}
                        className="text-gray-400 hover:text-red-500 p-1.5 rounded transition-colors cursor-pointer"
                        title="Remove bullet point"
                        aria-label={`Remove achievement bullet ${aIdx + 1}`}
                      >
                        <Icon d={xMarkD} className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => handleAddAchievement(idx)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 hover:text-accent-700 pt-1 cursor-pointer"
                  >
                    <Icon d={plusD} className="w-3.5 h-3.5" />
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
