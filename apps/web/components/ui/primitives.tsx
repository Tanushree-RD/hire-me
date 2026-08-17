import type { ComponentProps, ReactNode } from 'react'

/* ------------------------------------------------------------------ */
/*  Icon                                                               */
/* ------------------------------------------------------------------ */

/** Shared SVG wrapper that eliminates repetitive SVG boilerplate. */
export function Icon({
  d,
  paths,
  className = 'w-4 h-4',
  fill = 'none',
  strokeWidth = 1.5,
  label,
  ...rest
}: {
  /** Single path shorthand — use for icons with one `<path>`. */
  d?: string
  /** Multiple paths — use for icons with several `<path>` elements. */
  paths?: ComponentProps<'path'>[]
  className?: string
  fill?: string
  strokeWidth?: number
  /** Accessible label. Omit for decorative icons. */
  label?: string
} & Omit<ComponentProps<'svg'>, 'children'>) {
  const isFilled = fill !== 'none'

  return (
    <svg
      className={className}
      fill={isFilled ? fill : 'none'}
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth={isFilled ? undefined : strokeWidth}
      viewBox={rest.viewBox ?? '0 0 24 24'}
      aria-hidden={!label}
      aria-label={label}
      role={label ? 'img' : undefined}
      {...rest}
    >
      {d && <path strokeLinecap="round" strokeLinejoin="round" d={d} />}
      {paths?.map((p, i) => (
        <path key={i} strokeLinecap="round" strokeLinejoin="round" {...p} />
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */

/** Reusable white card with rounded corners, shadow, and border. */
export function Card({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'aside'
}) {
  return (
    <Tag
      className={`bg-white rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-gray-100 transition-shadow duration-150 ease-in-out hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${className}`}
    >
      {children}
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/*  SectionHeading                                                     */
/* ------------------------------------------------------------------ */

/** Consistent section heading used above card groups. */
export function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-base font-bold text-gray-900 mb-3">{children}</h2>
}

/* ------------------------------------------------------------------ */
/*  Pill                                                               */
/* ------------------------------------------------------------------ */

/** Mono-styled tag/pill used for skills, tech tags, and duration badges. */
export function Pill({
  children,
  variant = 'default',
}: {
  children: ReactNode
  variant?: 'default' | 'outline'
}) {
  const base =
    'text-xs font-mono px-2 py-0.5 rounded inline-block transition-all duration-150 ease-in-out'
  const styles =
    variant === 'outline'
      ? 'bg-gray-50 text-gray-700 px-2.5 py-1 rounded border border-gray-200 hover:-translate-y-0.5 hover:shadow-sm'
      : 'bg-gray-100 text-gray-600 border border-gray-200'

  return <span className={`${base} ${styles}`}>{children}</span>
}

/* ------------------------------------------------------------------ */
/*  Badge                                                              */
/* ------------------------------------------------------------------ */

/** Small colored badge (e.g. "Virtual", "Verified Student"). */
export function Badge({
  children,
  variant = 'emerald',
}: {
  children: ReactNode
  variant?: 'emerald'
}) {
  const styles = {
    emerald: 'text-accent-600 bg-accent-50 border border-accent-200',
  }

  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${styles[variant]}`}
    >
      {children}
    </span>
  )
}
