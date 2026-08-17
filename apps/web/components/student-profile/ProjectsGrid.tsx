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
    <Card as="article" className="p-5 flex flex-col">
      <h3 className="font-semibold text-gray-900 text-base mb-2">{project.title}</h3>
      <p className="text-sm text-gray-500 mb-3 flex-1 leading-relaxed">{project.description}</p>
      <ul className="flex flex-wrap gap-2" aria-label={`Technologies used in ${project.title}`}>
        {project.tags.map((tag) => (
          <li key={tag}>
            <Pill>{tag}</Pill>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
