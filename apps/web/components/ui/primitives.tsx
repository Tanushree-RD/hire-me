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

/** Reusable card container matching Landing, Login, and Onboarding surfaces. */
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
      className={`bg-card rounded-2xl sm:rounded-3xl shadow-[0_6px_30px_-6px_rgba(0,0,0,0.05)] border border-border-subtle transition-all duration-200 ease-in-out ${className}`}
    >
      {children}
    </Tag>
  )
}

/* ------------------------------------------------------------------ */
/*  SectionHeading                                                     */
/* ------------------------------------------------------------------ */

/** Consistent section heading matching Landing and Onboarding header typography. */
export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-text-main mb-3.5">
      {children}
    </h2>
  )
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
    'text-xs font-mono px-2.5 py-0.5 rounded inline-block transition-all duration-150 ease-in-out'
  const styles =
    variant === 'outline'
      ? 'bg-brand-light text-brand-dark rounded border border-brand-mint/50 hover:-translate-y-0.5 hover:shadow-xs'
      : 'bg-bg-page text-text-muted border border-border-subtle'

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
    emerald: 'text-brand-dark bg-brand-light border border-brand-mint',
  }

  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${styles[variant]}`}
    >
      {children}
    </span>
  )
}
