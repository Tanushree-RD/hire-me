'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sidebar, Footer } from '@/components/student-profile'
import { useProfile } from '@/components/student-profile/ProfileContext'
import { Icon } from '@/components/ui/primitives'
import { helpCircleD, arrowLeftD, checkD } from '@/components/ui/icons'
import BasicInfoSection from './BasicInfoSection'
import SkillsEditSection from './SkillsEditSection'
import ExperienceEditSection from './ExperienceEditSection'
import ProjectsEditSection from './ProjectsEditSection'
import AcademicsEditSection from './AcademicsEditSection'
import type { FullProfileState } from '../types'

export default function EditProfileForm() {
  const router = useRouter()
  const { profile, experiences, projects, skills, academics, saveAll } = useProfile()

  // Local draft state initialized with current profile context data
  const [formData, setFormData] = useState<FullProfileState>({
    profile: { ...profile },
    experiences: JSON.parse(JSON.stringify(experiences)),
    projects: JSON.parse(JSON.stringify(projects)),
    skills: JSON.parse(JSON.stringify(skills)),
    academics: { ...academics },
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    // Save to shared React context state
    saveAll(formData)

    // Smooth navigation back to /student/profile
    router.push('/student/profile')
  }

  const handleCancel = () => {
    router.push('/student/profile')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-[160px]">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-5 py-2.5 flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <Link
            href="/student/profile"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
          >
            <Icon d={arrowLeftD} className="w-3.5 h-3.5" />
            Back to Profile
          </Link>

          <a
            href="/help"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150 flex items-center gap-1.5"
          >
            <Icon d={helpCircleD} className="w-4 h-4" />
            Need Help?
          </a>
        </header>

        {/* Page Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-6 max-w-4xl mx-auto">
          {/* Header Title Banner */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
                <p className="text-sm text-gray-500 mt-1">
                  Update your information, technical skills, experiences, and academic achievements.
                </p>
              </div>

              {/* Quick actions at the top as well */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-accent-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-accent-500 rounded-md hover:bg-accent-600 active:bg-accent-700 transition-colors shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-accent-500"
                >
                  <Icon d={checkD} className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSave} className="space-y-6">
            {/* 1. Basic Information & Photo */}
            <BasicInfoSection
              data={formData.profile}
              onChange={(updatedProfile) =>
                setFormData((prev) => ({ ...prev, profile: updatedProfile }))
              }
            />

            {/* 2. Skills Architecture */}
            <SkillsEditSection
              categories={formData.skills}
              onChange={(updatedSkills) =>
                setFormData((prev) => ({ ...prev, skills: updatedSkills }))
              }
            />

            {/* 3. Work Experience */}
            <ExperienceEditSection
              experiences={formData.experiences}
              onChange={(updatedExperiences) =>
                setFormData((prev) => ({ ...prev, experiences: updatedExperiences }))
              }
            />

            {/* 4. Projects */}
            <ProjectsEditSection
              projects={formData.projects}
              onChange={(updatedProjects) =>
                setFormData((prev) => ({ ...prev, projects: updatedProjects }))
              }
            />

            {/* 5. Academics */}
            <AcademicsEditSection
              academics={formData.academics}
              onChange={(updatedAcademics) =>
                setFormData((prev) => ({ ...prev, academics: updatedAcademics }))
              }
            />

            {/* Bottom Sticky Action Bar */}
            <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-lg flex items-center justify-between gap-4">
              <p className="text-xs text-gray-500 hidden sm:block">
                All changes will be updated in your profile session.
              </p>

              <div className="flex items-center gap-3 ml-auto">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-accent-500"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-accent-500 rounded-md hover:bg-accent-600 active:bg-accent-700 transition-colors shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                >
                  <Icon d={checkD} className="w-4 h-4" strokeWidth={2} />
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
