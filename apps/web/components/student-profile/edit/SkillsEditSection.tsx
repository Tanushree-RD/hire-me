'use client'

import { useState, type KeyboardEvent } from 'react'
import { Card, Icon } from '@/components/ui/primitives'
import { codeD, wrenchD, databaseD, plusD, xMarkD, editD, checkD } from '@/components/ui/icons'
import type { SkillCategory } from '../types'

interface SkillsEditSectionProps {
  categories: SkillCategory[]
  onChange: (categories: SkillCategory[]) => void
}

/** Individual Category Skill Editor */
function SkillCategoryEditor({
  category,
  categoryIndex,
  onUpdateCategory,
}: {
  category: SkillCategory
  categoryIndex: number
  onUpdateCategory: (index: number, updated: SkillCategory) => void
}) {
  const [newSkillText, setNewSkillText] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingValue, setEditingValue] = useState('')

  const handleAddSkill = () => {
    const trimmed = newSkillText.trim()
    if (!trimmed) return
    if (category.skills.includes(trimmed)) {
      setNewSkillText('')
      return
    }

    const updated = {
      ...category,
      skills: [...category.skills, trimmed],
    }
    onUpdateCategory(categoryIndex, updated)
    setNewSkillText('')
  }

  const handleAddKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleRemoveSkill = (skillIndex: number) => {
    const updated = {
      ...category,
      skills: category.skills.filter((_, idx) => idx !== skillIndex),
    }
    onUpdateCategory(categoryIndex, updated)
  }

  const handleStartEdit = (index: number, currentValue: string) => {
    setEditingIndex(index)
    setEditingValue(currentValue)
  }

  const handleSaveEdit = (skillIndex: number) => {
    const trimmed = editingValue.trim()
    if (!trimmed) {
      handleRemoveSkill(skillIndex)
    } else {
      const updatedSkills = [...category.skills]
      updatedSkills[skillIndex] = trimmed
      onUpdateCategory(categoryIndex, { ...category, skills: updatedSkills })
    }
    setEditingIndex(null)
    setEditingValue('')
  }

  const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement>, skillIndex: number) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSaveEdit(skillIndex)
    } else if (e.key === 'Escape') {
      setEditingIndex(null)
      setEditingValue('')
    }
  }

  const iconD =
    category.iconD ||
    (category.label.includes('LANG')
      ? codeD
      : category.label.includes('DATA')
        ? databaseD
        : wrenchD)

  return (
    <div className="p-4 rounded-lg bg-gray-50/70 border border-gray-200/80 space-y-3">
      {/* Category Header */}
      <div className="flex items-center gap-2">
        <Icon d={iconD} className="w-4 h-4 text-accent-600" />
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
          {category.label}
        </h3>
        <span className="text-xs text-gray-400 font-mono">({category.skills.length})</span>
      </div>

      {/* Skills Pill List */}
      <div className="flex flex-wrap gap-2 min-h-[36px] items-center">
        {category.skills.length === 0 ? (
          <span className="text-xs text-gray-400 italic">
            No skills added yet in this category.
          </span>
        ) : (
          category.skills.map((skill, sIdx) => {
            const isEditing = editingIndex === sIdx

            if (isEditing) {
              return (
                <div
                  key={sIdx}
                  className="inline-flex items-center gap-1 bg-white border-2 border-accent-500 rounded px-1.5 py-0.5 shadow-xs"
                >
                  <input
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    onKeyDown={(e) => handleEditKeyDown(e, sIdx)}
                    onBlur={() => handleSaveEdit(sIdx)}
                    autoFocus
                    className="text-xs font-mono text-gray-900 bg-transparent outline-none w-24 px-1"
                  />
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault()
                      handleSaveEdit(sIdx)
                    }}
                    className="text-accent-600 hover:text-accent-700 p-0.5 rounded cursor-pointer"
                    title="Save skill"
                    aria-label={`Save ${skill}`}
                  >
                    <Icon d={checkD} className="w-3.5 h-3.5" />
                  </button>
                </div>
              )
            }

            return (
              <div
                key={sIdx}
                className="group inline-flex items-center gap-1.5 bg-white text-gray-700 text-xs font-mono px-2.5 py-1 rounded border border-gray-200 shadow-xs hover:border-gray-300 transition-all"
              >
                <span>{skill}</span>

                {/* Edit inline button */}
                <button
                  type="button"
                  onClick={() => handleStartEdit(sIdx, skill)}
                  className="opacity-60 hover:opacity-100 text-gray-400 hover:text-accent-600 transition-opacity cursor-pointer p-0.5"
                  title="Edit skill"
                  aria-label={`Edit ${skill}`}
                >
                  <Icon d={editD} className="w-3 h-3" />
                </button>

                {/* Remove skill button */}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(sIdx)}
                  className="opacity-60 hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity cursor-pointer p-0.5"
                  title="Remove skill"
                  aria-label={`Remove ${skill}`}
                >
                  <Icon d={xMarkD} className="w-3 h-3" />
                </button>
              </div>
            )
          })
        )}
      </div>

      {/* Add Skill Input */}
      <div className="flex items-center gap-2 pt-1">
        <div className="relative flex-1">
          <input
            type="text"
            value={newSkillText}
            onChange={(e) => setNewSkillText(e.target.value)}
            onKeyDown={handleAddKeyDown}
            placeholder={`Add a skill to ${category.label.toLowerCase()} (e.g. Next.js)...`}
            className="w-full pl-3 pr-8 py-1.5 text-xs text-gray-900 bg-white border border-gray-300 rounded-md shadow-xs placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500 transition-colors"
          />
        </div>
        <button
          type="button"
          onClick={handleAddSkill}
          disabled={!newSkillText.trim()}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md bg-accent-500 text-white hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-accent-500"
        >
          <Icon d={plusD} className="w-3.5 h-3.5" />
          Add
        </button>
      </div>
    </div>
  )
}

export default function SkillsEditSection({ categories, onChange }: SkillsEditSectionProps) {
  const handleUpdateCategory = (index: number, updated: SkillCategory) => {
    const nextCategories = [...categories]
    nextCategories[index] = updated
    onChange(nextCategories)
  }

  return (
    <Card as="section" className="p-6">
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h2 className="text-lg font-bold text-gray-900">Skills Architecture</h2>
        <p className="text-xs text-gray-500 mt-1">
          Add, edit, or remove technical skills across Languages, Frameworks & Tools, and Databases.
        </p>
      </div>

      <div className="space-y-4">
        {categories.map((cat, idx) => (
          <SkillCategoryEditor
            key={cat.label}
            category={cat}
            categoryIndex={idx}
            onUpdateCategory={handleUpdateCategory}
          />
        ))}
      </div>
    </Card>
  )
}
