'use client'

import { useState, useRef, type ChangeEvent } from 'react'
import Link from 'next/link'
import { Icon, Card } from '@/components/ui/primitives'
import {
  cameraPaths,
  locationPaths,
  githubD,
  emailD,
  downloadD,
  editD,
  verifiedCheckPaths,
} from '@/components/ui/icons'
import UserAvatar from './UserAvatar'
import type { ProfileData } from './types'

const defaultProfile: ProfileData = {
  name: 'Alex Mercer',
  degree: "B.S. Computer Science, Stanford University '25",
  location: 'San Francisco, CA',
  github: 'github.com/alexm',
  email: 'alex@example.edu',
  photoUrl: '',
  isVerified: true,
}

/** A single contact-info item (location, github, email). */
function ContactDetail({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1">
      {icon}
      {children}
    </span>
  )
}

export default function ProfileHeader({ profile = defaultProfile }: { profile?: ProfileData }) {
  const [photoUrl, setPhotoUrl] = useState<string>(profile.photoUrl)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setPhotoUrl(previewUrl)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const currentPhoto = photoUrl || profile.photoUrl

  return (
    <Card as="section" className="p-5">
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
        {/* Profile Photo with react-avatar */}
        <figure className="relative shrink-0 w-[84px] h-[84px]">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
            aria-label="Upload profile photo"
          />
          <UserAvatar
            name={profile.name}
            photoUrl={currentPhoto}
            size="84"
            round={true}
            className="w-[84px] h-[84px]"
          />
          <button
            type="button"
            onClick={handleButtonClick}
            className="absolute bottom-0 right-0 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center shadow-md hover:bg-accent-600 hover:scale-110 active:scale-95 transition-all duration-150 ease-in-out cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
            aria-label="Change profile photo"
          >
            <Icon paths={cameraPaths} className="w-3 h-3 text-white" strokeWidth={2} />
          </button>
        </figure>

        {/* Profile Info */}
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-gray-900 leading-tight">{profile.name}</h1>
            {profile.isVerified && (
              <span className="inline-flex items-center gap-1 bg-accent-50 text-accent-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                <Icon
                  paths={verifiedCheckPaths}
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  label="Verified"
                />
                Verified Student
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-2">{profile.degree}</p>

          <address className="not-italic flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-gray-500 mb-3">
            <ContactDetail icon={<Icon paths={locationPaths} className="w-4 h-4" />}>
              {profile.location}
            </ContactDetail>

            <ContactDetail icon={<Icon d={githubD} className="w-4 h-4" fill="currentColor" />}>
              <a
                href={`https://${profile.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors duration-150"
              >
                {profile.github}
              </a>
            </ContactDetail>

            <ContactDetail icon={<Icon d={emailD} className="w-4 h-4" />}>
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-gray-900 transition-colors duration-150"
              >
                {profile.email}
              </a>
            </ContactDetail>
          </address>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3" role="group" aria-label="Profile actions">
            <a
              href="/alex-mercer-resume.pdf"
              download="Alex_Mercer_Resume.pdf"
              className="inline-flex items-center gap-2 bg-accent-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-accent-600 active:bg-accent-700 transition-colors duration-150 shadow-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
            >
              <Icon d={downloadD} className="w-4 h-4" strokeWidth={2} />
              Download Resume
            </a>
            <Link
              href="/student/profile/edit"
              className="inline-flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-md text-sm font-semibold border border-gray-300 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
            >
              <Icon d={editD} className="w-4 h-4" strokeWidth={2} />
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}
