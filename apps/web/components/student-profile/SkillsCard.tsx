import { Code2, Wrench, Database } from 'lucide-react'
import { Card, Pill } from '@/components/ui/primitives'
import { codeD, wrenchD, databaseD } from '@/components/ui/icons'
import type { SkillCategory } from './types'

const defaultCategories: SkillCategory[] = [
  {
    label: 'LANGUAGES',
    iconD: codeD,
    skills: ['Python', 'Java', 'C++', 'JavaScript', 'Go'],
  },
  {
    label: 'FRAMEWORKS & TOOLS',
    iconD: wrenchD,
    skills: ['React', 'Node.js', 'Docker', 'Git', 'AWS'],
  },
  {
    label: 'DATABASE',
    iconD: databaseD,
    skills: ['PostgreSQL', 'Redis', 'MongoDB'],
  },
]

function getCategoryIcon(label: string) {
  if (label.includes('LANG')) return Code2
  if (label.includes('DATA')) return Database
  return Wrench
}

/** A single skill category group with label and pills. */
function SkillGroup({ category }: { category: SkillCategory }) {
  const CategoryIcon = getCategoryIcon(category.label)

  return (
    <div role="group" aria-label={`${category.label} skills`}>
      <div className="flex items-center gap-1.5 mb-2">
        <CategoryIcon className="w-4 h-4 text-text-muted" />
        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
          {category.label}
        </span>
      </div>
      <ul className="flex flex-wrap gap-2" aria-label={category.label}>
        {category.skills.map((skill) => (
          <li key={skill}>
            <Pill variant="outline">{skill}</Pill>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function SkillsCard({
  categories = defaultCategories,
}: {
  categories?: SkillCategory[]
}) {
  return (
    <Card as="section" className="p-6 sm:p-7">
      <h2 className="text-lg font-bold text-text-main tracking-tight mb-4">Skills Architecture</h2>
      <div className="space-y-4">
        {categories.map((cat) => (
          <SkillGroup key={cat.label} category={cat} />
        ))}
      </div>
    </Card>
  )
}
