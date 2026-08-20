'use client'

import { useState, useRef, type ChangeEvent } from 'react'
import { Camera, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/primitives'
import UserAvatar from '../UserAvatar'
import type { ProfileData } from '../types'

interface BasicInfoSectionProps {
  data: ProfileData
  onChange: (profile: ProfileData) => void
}

export default function BasicInfoSection({ data, onChange }: BasicInfoSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [, setPreviewUrl] = useState<string | null>(null)

  const handleFieldChange = (field: keyof ProfileData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      onChange({ ...data, photoUrl: url })
    }
  }

  const handleRemovePhoto = () => {
    setPreviewUrl(null)
    onChange({ ...data, photoUrl: '' })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card as="section" className="p-6 sm:p-7">
      <div className="border-b border-border-subtle pb-4 mb-6">
        <h2 className="text-xl font-bold tracking-tight text-text-main">Basic Information</h2>
        <p className="text-xs text-text-muted mt-1">
          Manage your personal details, profile avatar, and public contact information.
        </p>
      </div>

      {/* Photo Upload Area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 rounded-2xl bg-bg-page border border-border-subtle mb-6">
        <div className="relative shrink-0">
          <UserAvatar
            name={data.name}
            photoUrl={data.photoUrl}
            size="84"
            round={true}
            className="w-[84px] h-[84px] ring-4 ring-card shadow-xs"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-7 h-7 bg-brand rounded-full flex items-center justify-center shadow-md hover:bg-brand-hover hover:scale-110 active:scale-95 transition-all duration-150 text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            title="Change photo"
            aria-label="Change photo"
          >
            <Camera className="w-3.5 h-3.5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-text-main">Profile Photo</h3>
          <p className="text-xs text-text-muted mt-0.5 mb-3">
            Powered by react-avatar. Upload a high-res photo or your initials will be automatically
            generated.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
            aria-label="Upload profile photo file"
          />

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-card text-text-main border border-border-subtle hover:bg-bg-page hover:border-border-muted active:scale-95 active:bg-border-subtle transition-all duration-150 shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <Camera className="w-3.5 h-3.5 text-text-muted" />
              Upload Photo
            </button>

            {data.photoUrl && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-red-600 bg-red-50/80 border border-red-200 hover:bg-red-100/80 active:scale-95 active:bg-red-200 transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove
              </button>
            )}
          </div>
        </div>
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
      </div>
    </Card>
  )
}
