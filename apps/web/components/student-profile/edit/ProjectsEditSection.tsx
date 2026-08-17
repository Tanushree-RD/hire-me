'use client'

import { useState, type KeyboardEvent } from 'react'
import { Card, Icon } from '@/components/ui/primitives'
import { plusD, trashD, xMarkD } from '@/components/ui/icons'
import type { Project } from '../types'

interface ProjectsEditSectionProps {
  projects: Project[]
  onChange: (projects: Project[]) => void
}

/** Individual Project Card Editor with tag management */
function ProjectCardEditor({
  project,
  index,
  onUpdate,
  onDelete,
}: {
  project: Project
  index: number
  onUpdate: (index: number, updated: Project) => void
  onDelete: (index: number) => void
}) {
  const [newTag, setNewTag] = useState('')

  const handleFieldChange = (field: keyof Project, value: Project[keyof Project]) => {
    onUpdate(index, { ...project, [field]: value })
  }

  const handleAddTag = () => {
    const trimmed = newTag.trim().toUpperCase()
    if (!trimmed) return
    if (project.tags.includes(trimmed)) {
      setNewTag('')
      return
    }

    const updatedTags = [...project.tags, trimmed]
    onUpdate(index, { ...project, tags: updatedTags })
    setNewTag('')
  }

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleRemoveTag = (tagIndex: number) => {
    const updatedTags = project.tags.filter((_, idx) => idx !== tagIndex)
    onUpdate(index, { ...project, tags: updatedTags })
  }

  return (
    <div className="p-5 rounded-lg bg-gray-50/60 border border-gray-200/80 transition-all hover:border-gray-300">
      {/* Project Card Header */}
      <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-gray-200/60">
        <span className="text-xs font-bold text-accent-700 bg-accent-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          Project #{index + 1}
        </span>

        <button
          type="button"
          onClick={() => onDelete(index)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors cursor-pointer"
          aria-label={`Delete project ${project.title || index + 1}`}
        >
          <Icon d={trashD} className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Project Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={project.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="e.g. Distributed Cache System"
            className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-xs placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            required
            value={project.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            placeholder="Describe the architecture, problem solved, impact, and engineering techniques used..."
            className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-xs placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500 resize-y"
          />
        </div>

        {/* Tags / Technologies */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Technologies & Tags
          </label>

          {/* Current tags */}
          <div className="flex flex-wrap gap-2 mb-2 min-h-[30px] items-center">
            {project.tags.length === 0 ? (
              <span className="text-xs text-gray-400 italic">No tags added yet.</span>
            ) : (
              project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="inline-flex items-center gap-1.5 bg-white text-gray-700 text-xs font-mono px-2 py-0.5 rounded border border-gray-200 shadow-xs"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tIdx)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                    title="Remove tag"
                    aria-label={`Remove tag ${tag}`}
                  >
                    <Icon d={xMarkD} className="w-3 h-3" />
                  </button>
                </span>
              ))
            )}
          </div>

          {/* Add Tag Input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Add tech tag (e.g. REACT, PYTHON)..."
              className="flex-1 px-3 py-1.5 text-xs text-gray-900 bg-white border border-gray-300 rounded-md shadow-xs placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-accent-500 focus:border-accent-500 uppercase font-mono"
            />
            <button
              type="button"
              onClick={handleAddTag}
              disabled={!newTag.trim()}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md bg-accent-500 text-white hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-accent-500"
            >
              <Icon d={plusD} className="w-3.5 h-3.5" />
              Add Tag
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsEditSection({ projects, onChange }: ProjectsEditSectionProps) {
  const handleAddProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: '',
      description: '',
      tags: [],
    }
    onChange([...projects, newProj])
  }

  const handleDeleteProject = (index: number) => {
    onChange(projects.filter((_, idx) => idx !== index))
  }

  const handleUpdateProject = (index: number, updated: Project) => {
    const nextProjects = [...projects]
    nextProjects[index] = updated
    onChange(nextProjects)
  }

  return (
    <Card as="section" className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-100 pb-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Featured Projects</h2>
          <p className="text-xs text-gray-500 mt-1">
            Highlight your top software projects, architectures, and technical accomplishments.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddProject}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-md bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 transition-colors shadow-xs shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent-500"
        >
          <Icon d={plusD} className="w-3.5 h-3.5" />
          Add Project
        </button>
      </div>

      <div className="space-y-6">
        {projects.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-sm text-gray-500 mb-3">No projects added yet.</p>
            <button
              type="button"
              onClick={handleAddProject}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              <Icon d={plusD} className="w-3.5 h-3.5" />
              Add First Project
            </button>
          </div>
        ) : (
          projects.map((project, idx) => (
            <ProjectCardEditor
              key={project.id || idx}
              project={project}
              index={idx}
              onUpdate={handleUpdateProject}
              onDelete={handleDeleteProject}
            />
          ))
        )}
      </div>
    </Card>
  )
}
