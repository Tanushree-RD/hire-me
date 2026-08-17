import type { ReactNode } from 'react'
import { ProfileProvider } from '@/components/student-profile/ProfileContext'

export default function StudentLayout({ children }: { children: ReactNode }) {
  return <ProfileProvider>{children}</ProfileProvider>
}
