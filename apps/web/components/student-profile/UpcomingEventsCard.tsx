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
    <article className="border-l-[3px] border-brand pl-4 py-2 bg-bg-page/50 rounded-r-2xl border border-border-subtle hover:bg-bg-page hover:border-brand/40 transition-all duration-200">
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <time className="text-xs font-bold text-brand-dark uppercase tracking-wider">
          {event.date}
        </time>
        {event.isVirtual && <Badge variant="emerald">Virtual</Badge>}
      </div>
      <h3 className="font-bold text-text-main text-sm mb-1">{event.title}</h3>
      <p className="text-xs text-text-muted leading-relaxed mb-2.5">{event.description}</p>
      {event.href && (
        <Link
          href={event.href}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-dark hover:text-brand transition-colors duration-150"
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
    <Card as="section" className="p-6 sm:p-7">
      <h2 className="text-lg font-bold text-text-main tracking-tight mb-4">Upcoming Events</h2>
      <div className="space-y-3.5">
        {events.map((event, idx) => (
          <EventEntry key={idx} event={event} />
        ))}
      </div>
    </Card>
  )
}
