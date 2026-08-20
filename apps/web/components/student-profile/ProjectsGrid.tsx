import { Card, SectionHeading, Pill } from '@/components/ui/primitives'
import type { Project } from './types'

const defaultProjects: Project[] = [
  {
    title: 'Distributed Cache System',
    description:
      'A robust, fault-tolerant distributed caching layer built in C++ mimicking Redis-like behavior with consistent hashing.',
    tags: ['C++', 'NETWORKING', 'DISTRIBUTED SYSTEMS'],
  },
  {
    title: 'ML Trading Bot',
    description:
      'Algorithmic trading bot using Python and TensorFlow to predict short-term market trends with 72% historical accuracy.',
    tags: ['PYTHON', 'TENSORFLOW', 'FINANCE'],
  },
]

/** A single project card. */
function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      as="article"
      className="p-6 sm:p-7 flex flex-col hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_12px_36px_-8px_rgba(0,0,0,0.08)] cursor-default group"
    >
      <h3 className="font-bold text-text-main text-lg tracking-tight mb-2 group-hover:text-brand transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-text-muted mb-4 flex-1 leading-relaxed">{project.description}</p>
      <ul className="flex flex-wrap gap-2" aria-label={`Technologies used in ${project.title}`}>
        {project.tags.map((tag) => (
          <li key={tag}>
            <Pill variant="outline">{tag}</Pill>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default function ProjectsGrid({ projects = defaultProjects }: { projects?: Project[] }) {
  return (
    <section aria-labelledby="projects-heading">
      <SectionHeading>
        <span id="projects-heading">Projects</span>
      </SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
