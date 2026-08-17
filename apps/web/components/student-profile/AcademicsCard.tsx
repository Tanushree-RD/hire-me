import { Icon, Card } from '@/components/ui/primitives'
import { calendarD } from '@/components/ui/icons'
import type { AcademicData } from './types'

const defaultAcademics: AcademicData = {
  gpa: '3.9 / 4.0',
  major: 'Computer Science',
  minor: 'Mathematics',
  honors: "Dean's List (All Semesters)",
  expectedGraduation: 'May 2025',
}

/** A single key-value row in the academics table. */
function AcademicRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between py-2.5 first:pt-0">
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="text-sm font-semibold text-gray-900 text-right">{value}</dd>
    </div>
  )
}

export default function AcademicsCard({
  academics = defaultAcademics,
}: {
  academics?: AcademicData
}) {
  const rows = [
    { label: 'GPA', value: academics.gpa },
    { label: 'Major', value: academics.major },
    { label: 'Minor', value: academics.minor },
    { label: 'Honors', value: academics.honors },
  ]

  return (
    <Card as="section" className="p-5">
      <h2 className="text-base font-bold text-gray-900 mb-3">Academics</h2>

      <dl className="divide-y divide-gray-100">
        {rows.map((row) => (
          <AcademicRow key={row.label} label={row.label} value={row.value} />
        ))}
      </dl>

      {/* Expected Graduation Badge */}
      <div className="mt-3 bg-accent-50 rounded-lg p-3 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Icon d={calendarD} className="w-4 h-4 text-accent-600" />
          <span className="text-xs font-bold text-accent-600 uppercase tracking-wider">
            Expected Graduation
          </span>
        </div>
        <p className="text-sm font-semibold text-gray-900">
          <time>{academics.expectedGraduation}</time>
        </p>
      </div>
    </Card>
  )
}
