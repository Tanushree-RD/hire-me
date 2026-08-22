'use client'

import { useState, type KeyboardEvent } from 'react'
import { Plus, Trash2, X } from 'lucide-react'
import { Card } from '@/components/ui/primitives'
import type { Project } from '../types'

interface ProjectsEditSectionProps {
  projects: Project[]
  onChange: (projects: Project[]) => void
}

interface ProjectCardEditorProps {
  project: Project
  index: number
  onUpdate: (index: number, updated: Project) => void
  onDelete: (index: number) => void
}

/** Individual Project Card Editor with tag management */
function ProjectCardEditor({ project, index, onUpdate, onDelete }: ProjectCardEditorProps) {
  const [newTag, setNewTag] = useState('')

  const handleFieldChange = (field: keyof Project, value: unknown) => {
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
    <div className="p-5 sm:p-6 rounded-2xl bg-bg-page border border-border-subtle transition-all duration-200 hover:border-border-muted hover:shadow-xs">
      {/* Project Card Header */}
      <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-border-subtle">
        <span className="text-xs font-bold text-brand-dark bg-brand-light px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-brand-mint/50">
          Project #{index + 1}
        </span>

        <button
          type="button"
          onClick={() => onDelete(index)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50/80 border border-red-200/80 hover:bg-red-100/80 active:scale-95 px-3 py-1.5 rounded-xl transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          aria-label={`Delete project ${project.title || index + 1}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
            Project Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={project.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="e.g. Distributed Cache System"
            className="w-full px-3 py-2 text-sm text-text-main bg-card border border-border-subtle rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            required
            value={project.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            placeholder="Describe the architecture, problem solved, impact, and engineering techniques used..."
            className="w-full px-3 py-2 text-sm text-text-main bg-card border border-border-subtle rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand resize-y"
          />
        </div>

        {/* Tags / Technologies */}
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5">
            Technologies & Tags
          </label>

          {/* Current tags */}
          <div className="flex flex-wrap gap-2 mb-2 min-h-[30px] items-center">
            {project.tags.length === 0 ? (
              <span className="text-xs text-text-muted/60 italic">No tags added yet.</span>
            ) : (
              project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="inline-flex items-center gap-1.5 bg-card text-text-main text-xs font-mono px-2.5 py-1 rounded-lg border border-border-subtle shadow-xs"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tIdx)}
                    className="text-text-muted hover:text-red-500 hover:bg-red-50 p-0.5 rounded active:scale-95 transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-red-500"
                    title="Remove tag"
                    aria-label={`Remove tag ${tag}`}
                  >
                    <X className="w-3 h-3" />
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
              className="flex-1 px-3.5 py-2 text-xs text-text-main bg-card border border-border-subtle rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand uppercase font-mono"
            />
            <button
              type="button"
              onClick={handleAddTag}
              disabled={!newTag.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-brand text-white hover:bg-brand-hover active:scale-95 active:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all duration-150 shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <Plus className="w-3.5 h-3.5" />
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
    <Card as="section" className="p-6 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border-subtle pb-4 mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-text-main">Featured Projects</h2>
          <p className="text-xs text-text-muted mt-1">
            Highlight your top software projects, architectures, and technical accomplishments.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddProject}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl bg-brand text-white hover:bg-brand-hover active:scale-95 active:bg-brand-dark transition-all duration-150 shadow-xs shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Project
        </button>
      </div>

      <div className="space-y-6">
        {projects.length === 0 ? (
          <div className="text-center py-8 bg-bg-page rounded-2xl border border-dashed border-border-muted">
            <p className="text-sm text-text-muted mb-3">No projects added yet.</p>
            <button
              type="button"
              onClick={handleAddProject}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-card border border-border-subtle text-text-main hover:bg-bg-page hover:border-border-muted active:scale-95 active:bg-border-subtle transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <Plus className="w-3.5 h-3.5" />
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
