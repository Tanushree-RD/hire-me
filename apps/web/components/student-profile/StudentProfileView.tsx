'use client'

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
import { Icon } from '@/components/ui/primitives'
import { helpCircleD } from '@/components/ui/icons'

export default function StudentProfileView() {
  const { profile, experiences, projects, skills, academics } = useProfile()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-[160px]">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-5 py-2.5 flex items-center justify-end shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <a
            href="/help"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150 flex items-center gap-1.5"
          >
            <Icon d={helpCircleD} className="w-4 h-4" />
            Need Help?
          </a>
        </header>

        {/* Page Content */}
        <main className="px-4 sm:px-5 lg:px-6 py-5 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-5">
            {/* Left Column: Profile, Experience, Projects */}
            <div className="space-y-5 min-w-0">
              <ProfileHeader profile={profile} />
              <ExperienceTimeline experiences={experiences} />
              <ProjectsGrid projects={projects} />
            </div>

            {/* Right Column: Skills, Academics */}
            <aside className="space-y-5" aria-label="Profile sidebar">
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
