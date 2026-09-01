'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, HelpCircle, Check } from 'lucide-react'
import { useProfile } from '@/components/student-profile/ProfileContext'
import Sidebar from '@/components/student-profile/Sidebar'
import Footer from '@/components/student-profile/Footer'
import { Button } from '@/components/ui/primitives'
import BasicInfoSection from './BasicInfoSection'
import SkillsEditSection from './SkillsEditSection'
import ExperienceEditSection from './ExperienceEditSection'
import ProjectsEditSection from './ProjectsEditSection'
import AcademicsEditSection from './AcademicsEditSection'
import type { FullProfileState } from '../types'

export default function EditProfileForm() {
  const router = useRouter()
  const { profile, experiences, projects, skills, academics, saveAll } = useProfile()

  const [formData, setFormData] = useState<FullProfileState>({
    profile: { ...profile },
    experiences: experiences.map((exp) => ({
      ...exp,
      achievements: [...exp.achievements],
    })),
    projects: projects.map((p) => ({
      ...p,
      tags: [...p.tags],
    })),
    skills: skills.map((s) => ({
      ...s,
      skills: [...s.skills],
    })),
    academics: { ...academics },
  })

  const handleCancel = () => {
    router.push('/student/profile')
  }

  const handleSave = (e?: FormEvent) => {
    if (e) e.preventDefault()
    saveAll(formData)
    router.push('/student/profile')
  }

  return (
    <div className="min-h-screen bg-bg-page flex">
      <Sidebar />

      <div className="flex-1 lg:ml-[160px]">
        <header className="sticky top-0 z-20 bg-card/90 backdrop-blur-md border-b border-border-subtle px-5 py-2.5 flex items-center justify-between shadow-xs">
          <Link
            href="/student/profile"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-text-main transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Profile
          </Link>

          <a
            href="/help"
            className="text-sm text-text-muted hover:text-text-main transition-colors duration-150 flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4" />
            Need Help?
          </a>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl mx-auto animate-fade-in">
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-text-main">Edit Profile</h1>
                <p className="text-sm text-text-muted mt-1">
                  Update your information, technical skills, experiences, and academic achievements.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button onClick={handleCancel} variant="secondary" size="md">
                  Cancel
                </Button>
                <Button onClick={handleSave} variant="primary" size="md">
                  <Check className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6 sm:space-y-8">
            <BasicInfoSection
              data={formData.profile}
              onChange={(updatedProfile) =>
                setFormData((prev) => ({ ...prev, profile: updatedProfile }))
              }
            />

            <SkillsEditSection
              categories={formData.skills}
              onChange={(updatedSkills) =>
                setFormData((prev) => ({ ...prev, skills: updatedSkills }))
              }
            />

            <ExperienceEditSection
              experiences={formData.experiences}
              onChange={(updatedExperiences) =>
                setFormData((prev) => ({ ...prev, experiences: updatedExperiences }))
              }
            />

            <ProjectsEditSection
              projects={formData.projects}
              onChange={(updatedProjects) =>
                setFormData((prev) => ({ ...prev, projects: updatedProjects }))
              }
            />

            <AcademicsEditSection
              academics={formData.academics}
              onChange={(updatedAcademics) =>
                setFormData((prev) => ({ ...prev, academics: updatedAcademics }))
              }
            />
          </form>
        </main>

        <Footer />
      </div>
    </div>
  )
}
