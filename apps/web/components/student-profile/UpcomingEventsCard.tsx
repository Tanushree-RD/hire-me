import Link from 'next/link'
import { Card, Badge } from '@/components/ui/primitives'
import type { UpcomingEvent } from './types'

const defaultEvents: UpcomingEvent[] = [
  {
    date: 'TOMORROW • 2:00 PM EST',
    title: 'FAANG Career Fair 2024',
    description: 'Connect with university recruiters from Google, Meta, and Apple.',
    isVirtual: true,
    href: '/student/jobs',
  },
]

/** A single event entry. */
function EventEntry({ event }: { event: UpcomingEvent }) {
  return (
    <article className="border-l-[3px] border-accent-500 pl-4 py-1">
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <time className="text-xs font-bold text-accent-600 uppercase tracking-wide">
          {event.date}
        </time>
        {event.isVirtual && <Badge variant="emerald">Virtual</Badge>}
      </div>
      <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{event.title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed mb-2">{event.description}</p>
      {event.href && (
        <Link
          href={event.href}
          className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 hover:text-accent-700 transition-colors duration-150"
        >
          Register →
        </Link>
      )}
    </article>
  )
}

export default function UpcomingEventsCard({
  events = defaultEvents,
}: {
  events?: UpcomingEvent[]
}) {
  return (
    <Card as="section" className="p-5">
      <h2 className="text-base font-bold text-gray-900 mb-3">Upcoming Events</h2>
      <div className="space-y-3">
        {events.map((event, idx) => (
          <EventEntry key={idx} event={event} />
        ))}
      </div>
    </Card>
  )
}
