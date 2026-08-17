import { Icon, Card, Pill } from '@/components/ui/primitives'
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

/** A single skill category group with label and pills. */
function SkillGroup({ category }: { category: SkillCategory }) {
  return (
    <div role="group" aria-label={`${category.label} skills`}>
      <div className="flex items-center gap-1.5 mb-2">
        <Icon d={category.iconD} className="w-4 h-4 text-gray-500" />
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
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
    <Card as="section" className="p-5">
      <h2 className="text-base font-bold text-gray-900 mb-3">Skills Architecture</h2>
      <div className="space-y-4">
        {categories.map((cat) => (
          <SkillGroup key={cat.label} category={cat} />
        ))}
      </div>
    </Card>
  )
}
