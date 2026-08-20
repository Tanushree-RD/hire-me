import { MapPin } from 'lucide-react'
import { Card, SectionHeading, Pill } from '@/components/ui/primitives'
import type { Experience } from './types'

const defaultExperiences: Experience[] = [
  {
    title: 'Software Engineering Intern',
    company: 'Google',
    location: 'Mountain View, CA',
    duration: 'JUN 2023 — AUG 2023',
    achievements: [
      'Developed a highly scalable microservice using Go and gRPC, improving data processing speed by 25%.',
      'Collaborated with cross-functional teams to design and implement new API endpoints.',
      'Optimized database queries in PostgreSQL, reducing latency for search results by 40%.',
    ],
  },
  {
    title: 'Backend Developer (Part-time)',
    company: 'StartupX',
    location: 'Remote',
    duration: 'JAN 2023 — MAY 2023',
    achievements: [
      'Maintained and optimized PostgreSQL databases for user analytics.',
      'Built RESTful APIs in Node.js/Express for the core mobile application.',
      'Implemented automated testing with Jest, achieving 90% code coverage.',
    ],
  },
]

/** A single experience entry in the timeline. */
function TimelineEntry({ experience, isLast }: { experience: Experience; isLast: boolean }) {
  return (
    <article
      className="relative flex gap-4"
      aria-label={`${experience.title} at ${experience.company}`}
    >
      {/* Timeline connector */}
      <div className="flex flex-col items-center shrink-0" aria-hidden="true">
        <div className="w-3 h-3 rounded-full bg-brand mt-1.5 shrink-0 z-10 shadow-xs" />
        {!isLast && <div className="w-0.5 bg-border-subtle flex-1 mt-1" />}
      </div>

      {/* Content */}
      <div className={`flex-1 min-w-0 ${isLast ? 'pb-0' : 'pb-6'}`}>
        <div className="flex items-center justify-between gap-3 mb-1">
          <h3 className="font-bold text-text-main text-sm sm:text-base tracking-tight">{experience.title}</h3>
          <Pill>
            <time className="font-mono">{experience.duration}</time>
          </Pill>
        </div>

        <p className="text-xs sm:text-sm font-medium text-text-muted mb-2.5">
          {experience.company}{' '}
          <span className="inline-flex items-center gap-1 ml-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {experience.location}
          </span>
        </p>

        <ul className="space-y-1.5 list-none">
          {experience.achievements.map((achievement, i) => (
            <li key={i} className="text-sm text-text-muted leading-relaxed flex items-start gap-2">
              <span className="text-text-muted/60 mt-1 shrink-0" aria-hidden="true">
                •
              </span>
              <span className="text-text-main/90">{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function ExperienceTimeline({
  experiences = defaultExperiences,
}: {
  experiences?: Experience[]
}) {
  return (
    <section aria-labelledby="experience-heading">
      <SectionHeading>
        <span id="experience-heading">Experience</span>
      </SectionHeading>
      <Card className="p-6 sm:p-7">
        <div className="space-y-0">
          {experiences.map((exp, idx) => (
            <TimelineEntry
              key={`${exp.company}-${exp.title}`}
              experience={exp}
              isLast={idx === experiences.length - 1}
            />
          ))}
        </div>
      </Card>
    </section>
  )
}
