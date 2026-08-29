import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Icon({
  d,
  paths,
  className = 'w-4 h-4',
  fill = 'none',
  strokeWidth = 1.5,
  label,
  ...rest
}: {
  d?: string
  paths?: ComponentProps<'path'>[]
  className?: string
  fill?: string
  strokeWidth?: number
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

export function Card({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'aside'
}) {
  return (
    <Tag
      className={cn(
        'bg-card rounded-2xl sm:rounded-3xl shadow-[0_6px_30px_-6px_rgba(0,0,0,0.05)] border border-border-subtle transition-all duration-200 ease-in-out',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-text-main mb-3.5">
      {children}
    </h2>
  )
}

export function Pill({
  children,
  variant = 'default',
  className,
}: {
  children: ReactNode
  variant?: 'default' | 'outline'
  className?: string
}) {
  return (
    <span
      className={cn(
        'text-xs font-mono px-2.5 py-0.5 rounded inline-block transition-all duration-150 ease-in-out',
        variant === 'outline'
          ? 'bg-brand-light text-brand-dark rounded border border-brand-mint/50 hover:-translate-y-0.5 hover:shadow-xs'
          : 'bg-bg-page text-text-muted border border-border-subtle',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Badge({
  children,
  variant = 'emerald',
  className,
}: {
  children: ReactNode
  variant?: 'emerald'
  className?: string
}) {
  const styles = {
    emerald: 'text-brand-dark bg-brand-light border border-brand-mint',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide',
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
