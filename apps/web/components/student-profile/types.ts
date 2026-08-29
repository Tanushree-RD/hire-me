/**
 * Shared TypeScript interfaces for the student profile feature.
 * Exported so they can be reused by components and future API layers.
 */

export interface ProfileData {
  name: string
  degree: string
  university?: string
  graduationYear?: string
  location: string
  github: string
  email: string
  resumeLink?: string
  photoUrl: string
  isVerified: boolean
}

export interface Experience {
  id?: string
  title: string
  company: string
  location: string
  duration: string
  startDate?: string
  endDate?: string
  achievements: string[]
}

export interface Project {
  id?: string
  title: string
  description: string
  tags: string[]
}

export interface SkillCategory {
  label: string
  /** Icon path data — a single `d` string or `paths` array for the `Icon` component. */
  iconD: string
  skills: string[]
}

export interface AcademicData {
  gpa: string
  major: string
  minor: string
  honors: string
  expectedGraduation: string
}

export interface FullProfileState {
  profile: ProfileData
  experiences: Experience[]
  projects: Project[]
  skills: SkillCategory[]
  academics: AcademicData
}

export interface UpcomingEvent {
  date: string
  title: string
  description: string
  isVirtual: boolean
  /** Optional link for event registration or details. */
  href?: string
}

export interface UserAvatarProps {
  name: string
  photoUrl?: string
  size?: string
  className?: string
  round?: boolean | string
  textSizeRatio?: number
}

export interface NavItem {
  label: string
  href: string
  iconD?: string
  iconPaths?: import('react').ComponentProps<'path'>[]
}

export interface BasicInfoSectionProps {
  data: ProfileData
  onChange: (profile: ProfileData) => void
}

export interface AcademicsEditSectionProps {
  academics: AcademicData
  onChange: (academics: AcademicData) => void
}

export interface ExperienceEditSectionProps {
  experiences: Experience[]
  onChange: (experiences: Experience[]) => void
}

export interface ProjectsEditSectionProps {
  projects: Project[]
  onChange: (projects: Project[]) => void
}

export interface SkillsEditSectionProps {
  categories: SkillCategory[]
  onChange: (categories: SkillCategory[]) => void
}

export interface ProfileContextValue {
  profile: ProfileData
  experiences: Experience[]
  projects: Project[]
  skills: SkillCategory[]
  academics: AcademicData
  setProfile: (profile: ProfileData | ((prev: ProfileData) => ProfileData)) => void
  setExperiences: (experiences: Experience[] | ((prev: Experience[]) => Experience[])) => void
  setProjects: (projects: Project[] | ((prev: Project[]) => Project[])) => void
  setSkills: (skills: SkillCategory[] | ((prev: SkillCategory[]) => SkillCategory[])) => void
  setAcademics: (academics: AcademicData | ((prev: AcademicData) => AcademicData)) => void
  saveAll: (data: FullProfileState) => void
  resetToDefault: () => void
}
