'use client'

import { HelpCircle } from 'lucide-react'
import {
  Sidebar,
  ProfileHeader,
  ExperienceTimeline,
  ProjectsGrid,
  SkillsCard,
  AcademicsCard,
  Footer,
} from '@/components/student-profile'
import { useProfile } from '@/components/student-profile/ProfileContext'

export default function StudentProfileView() {
  const { profile, experiences, projects, skills, academics } = useProfile()

  return (
    <div className="min-h-screen bg-bg-page flex">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-[160px]">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-card/90 backdrop-blur-md border-b border-border-subtle px-5 py-2.5 flex items-center justify-end shadow-xs">
          <a
            href="/help"
            className="text-sm text-text-muted hover:text-text-main transition-colors duration-150 flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4" />
            Need Help?
          </a>
        </header>

        {/* Page Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto animate-fade-in">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6 sm:gap-7">
            {/* Left Column: Profile, Experience, Projects */}
            <div className="space-y-6 sm:space-y-7 min-w-0">
              <ProfileHeader profile={profile} />
              <ExperienceTimeline experiences={experiences} />
              <ProjectsGrid projects={projects} />
            </div>

            {/* Right Column: Skills, Academics */}
            <aside className="space-y-6 sm:space-y-7" aria-label="Profile sidebar">
              <SkillsCard categories={skills} />
              <AcademicsCard academics={academics} />
            </aside>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
