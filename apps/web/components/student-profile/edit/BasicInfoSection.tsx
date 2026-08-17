'use client'

import { useRef, type ChangeEvent } from 'react'
import { Card, Icon } from '@/components/ui/primitives'
import { cameraPaths, trashD } from '@/components/ui/icons'
import UserAvatar from '../UserAvatar'
import type { ProfileData } from '../types'

interface BasicInfoSectionProps {
  data: ProfileData
  onChange: (data: ProfileData) => void
}

export default function BasicInfoSection({ data, onChange }: BasicInfoSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFieldChange = (field: keyof ProfileData, value: string) => {
    const updated = { ...data, [field]: value }

    // If degree or university or graduationYear is updated, keep degree string synchronized if needed
    if (field === 'degree' || field === 'university' || field === 'graduationYear') {
      // If user directly edits degree, keep it.
      // If user edits university or year and degree is not set, we can help format it
    }

    onChange(updated)
  }

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        onChange({ ...data, photoUrl: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    onChange({ ...data, photoUrl: '' })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card as="section" className="p-6">
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h2 className="text-lg font-bold text-gray-900">Basic Information</h2>
        <p className="text-xs text-gray-500 mt-1">
          Manage your personal details, profile avatar, and public contact information.
        </p>
      </div>

      {/* Photo Upload Area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-4 rounded-lg bg-gray-50 border border-gray-200/70 mb-6">
        <div className="relative shrink-0">
          <UserAvatar
            name={data.name}
            photoUrl={data.photoUrl}
            size="84"
            round={true}
            className="w-[84px] h-[84px] ring-4 ring-white shadow-sm"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-7 h-7 bg-accent-500 rounded-full flex items-center justify-center shadow-md hover:bg-accent-600 active:scale-95 transition-all text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-accent-500"
            title="Change photo"
            aria-label="Change photo"
          >
            <Icon paths={cameraPaths} className="w-3.5 h-3.5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900">Profile Photo</h3>
          <p className="text-xs text-gray-500 mt-0.5 mb-3">
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100 transition-colors shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-accent-500"
            >
              <Icon paths={cameraPaths} className="w-3.5 h-3.5 text-gray-500" />
              Upload Photo
            </button>

            {data.photoUrl && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-red-600 bg-red-50/80 border border-red-200 hover:bg-red-100/70 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-red-500"
              >
                <Icon d={trashD} className="w-3.5 h-3.5" />
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
            className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
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
            className="w-full px-3.5 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
          />
        </div>

        {/* Headline / Degree */}
        <div className="sm:col-span-2">
          <label
            htmlFor="edit-degree"
            className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
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
            className="w-full px-3.5 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
          />
        </div>

        {/* University */}
        <div>
          <label
            htmlFor="edit-university"
            className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
          >
            University
          </label>
          <input
            id="edit-university"
            type="text"
            value={data.university || ''}
            onChange={(e) => handleFieldChange('university', e.target.value)}
            placeholder="e.g. Stanford University"
            className="w-full px-3.5 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
          />
        </div>

        {/* Graduation Year */}
        <div>
          <label
            htmlFor="edit-grad-year"
            className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
          >
            Graduation Year
          </label>
          <input
            id="edit-grad-year"
            type="text"
            value={data.graduationYear || ''}
            onChange={(e) => handleFieldChange('graduationYear', e.target.value)}
            placeholder="e.g. 2025"
            className="w-full px-3.5 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
          />
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="edit-location"
            className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
          >
            Location
          </label>
          <input
            id="edit-location"
            type="text"
            value={data.location}
            onChange={(e) => handleFieldChange('location', e.target.value)}
            placeholder="e.g. San Francisco, CA"
            className="w-full px-3.5 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
          />
        </div>

        {/* GitHub URL */}
        <div>
          <label
            htmlFor="edit-github"
            className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
          >
            GitHub URL / Handle
          </label>
          <input
            id="edit-github"
            type="text"
            value={data.github}
            onChange={(e) => handleFieldChange('github', e.target.value)}
            placeholder="e.g. github.com/alexm"
            className="w-full px-3.5 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
          />
        </div>

        {/* Email */}
        <div className="sm:col-span-2">
          <label
            htmlFor="edit-email"
            className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
          >
            Email Address
          </label>
          <input
            id="edit-email"
            type="email"
            value={data.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            placeholder="e.g. alex@example.edu"
            className="w-full px-3.5 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-xs placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
          />
        </div>
      </div>
    </Card>
  )
}
