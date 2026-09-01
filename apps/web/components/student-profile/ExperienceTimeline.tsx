import { MapPin } from 'lucide-react'
import { Card, SectionHeading, Pill } from '@/components/ui/primitives'
import { cn } from '@/lib/utils'
import { defaultExperiences } from './ProfileContext'
import type { Experience } from './types'

function TimelineEntry({ experience, isLast }: { experience: Experience; isLast: boolean }) {
  return (
    <article
      className="relative flex gap-4"
      aria-label={`${experience.title} at ${experience.company}`}
    >
      <div className="flex flex-col items-center shrink-0" aria-hidden="true">
        <div className="w-3 h-3 rounded-full bg-brand mt-1.5 shrink-0 z-10 shadow-xs" />
        {!isLast && <div className="w-0.5 bg-border-subtle flex-1 mt-1" />}
      </div>

      <div className={cn('flex-1 min-w-0', isLast ? 'pb-0' : 'pb-6')}>
        <div className="flex items-center justify-between gap-3 mb-1">
          <h3 className="font-bold text-text-main text-sm sm:text-base tracking-tight">
            {experience.title}
          </h3>
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
              key={exp.id || `${exp.company}-${exp.title}-${idx}`}
              experience={exp}
              isLast={idx === experiences.length - 1}
            />
          ))}
        </div>
      </Card>
    </section>
  )
}
