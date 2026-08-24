'use client'

import { Card } from '@/components/ui/primitives'
import type { ProfileData } from '../types'

interface BasicInfoSectionProps {
  data: ProfileData
  onChange: (profile: ProfileData) => void
}

export default function BasicInfoSection({ data, onChange }: BasicInfoSectionProps) {
  const handleFieldChange = (field: keyof ProfileData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Card as="section" className="p-6 sm:p-7">
      <div className="border-b border-border-subtle pb-4 mb-6">
        <h2 className="text-xl font-bold tracking-tight text-text-main">Basic Information</h2>
        <p className="text-xs text-text-muted mt-1">
          Manage your personal details and public contact information.
        </p>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label
            htmlFor="edit-name"
            className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="edit-name"
            type="text"
            required
            value={data.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            placeholder="e.g. Alex Mercer"
            className="w-full px-3.5 py-2 text-sm text-text-main bg-card border border-border-subtle rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
          />
        </div>

        {/* Headline / Degree */}
        <div className="sm:col-span-2">
          <label
            htmlFor="edit-degree"
            className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5"
          >
            Headline / Degree Description <span className="text-red-500">*</span>
          </label>
          <input
            id="edit-degree"
            type="text"
            required
            value={data.degree}
            onChange={(e) => handleFieldChange('degree', e.target.value)}
            placeholder="e.g. B.S. Computer Science, Stanford University '25"
            className="w-full px-3.5 py-2 text-sm text-text-main bg-card border border-border-subtle rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
          />
        </div>

        {/* University */}
        <div>
          <label
            htmlFor="edit-university"
            className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5"
          >
            University
          </label>
          <input
            id="edit-university"
            type="text"
            value={data.university || ''}
            onChange={(e) => handleFieldChange('university', e.target.value)}
            placeholder="e.g. Stanford University"
            className="w-full px-3.5 py-2 text-sm text-text-main bg-card border border-border-subtle rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
          />
        </div>

        {/* Graduation Year */}
        <div>
          <label
            htmlFor="edit-grad-year"
            className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5"
          >
            Graduation Year
          </label>
          <input
            id="edit-grad-year"
            type="text"
            value={data.graduationYear || ''}
            onChange={(e) => handleFieldChange('graduationYear', e.target.value)}
            placeholder="e.g. 2025"
            className="w-full px-3.5 py-2 text-sm text-text-main bg-card border border-border-subtle rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
          />
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="edit-location"
            className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5"
          >
            Location
          </label>
          <input
            id="edit-location"
            type="text"
            value={data.location}
            onChange={(e) => handleFieldChange('location', e.target.value)}
            placeholder="e.g. San Francisco, CA"
            className="w-full px-3.5 py-2 text-sm text-text-main bg-card border border-border-subtle rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
          />
        </div>

        {/* GitHub URL */}
        <div>
          <label
            htmlFor="edit-github"
            className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5"
          >
            GitHub URL / Handle
          </label>
          <input
            id="edit-github"
            type="text"
            value={data.github}
            onChange={(e) => handleFieldChange('github', e.target.value)}
            placeholder="e.g. github.com/alexm"
            className="w-full px-3.5 py-2 text-sm text-text-main bg-card border border-border-subtle rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
          />
        </div>

        {/* Email */}
        <div className="sm:col-span-2">
          <label
            htmlFor="edit-email"
            className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5"
          >
            Email Address
          </label>
          <input
            id="edit-email"
            type="email"
            value={data.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            placeholder="e.g. alex@example.edu"
            className="w-full px-3.5 py-2 text-sm text-text-main bg-card border border-border-subtle rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
          />
        </div>

        {/* Resume Link */}
        <div className="sm:col-span-2">
          <label
            htmlFor="edit-resume-link"
            className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5"
          >
            Resume Link
          </label>
          <input
            id="edit-resume-link"
            type="url"
            value={data.resumeLink || ''}
            onChange={(e) => handleFieldChange('resumeLink', e.target.value)}
            placeholder="e.g. https://drive.google.com/file/d/.../view"
            className="w-full px-3.5 py-2 text-sm text-text-main bg-card border border-border-subtle rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
          />
        </div>
      </div>
    </Card>
  )
}
