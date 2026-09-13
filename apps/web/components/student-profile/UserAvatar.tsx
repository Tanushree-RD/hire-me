'use client'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import type { UserAvatarProps } from './types'

export function getInitials(name?: string): string {
  if (!name || !name.trim()) return 'S'
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'S'
  if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase()
  return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase()
}

export default function UserAvatar({
  name,
  photoUrl,
  size = '96',
  className = '',
  round = true,
  textSizeRatio = 2.2,
}: UserAvatarProps) {
  const isRound = round === true || round === 'true'
  const numericSize = parseFloat(String(size)) || 96
  const fontSize = Math.round(numericSize / (textSizeRatio || 2.2))
  const initials = getInitials(name)
  const sizePx = `${numericSize}px`

  return (
    <Avatar
      className={cn(
        'sb-avatar shrink-0 select-none shadow-sm',
        isRound ? 'rounded-full' : 'rounded-lg',
        className,
      )}
      style={{ width: sizePx, height: sizePx }}
    >
      {photoUrl ? (
        <AvatarImage
          src={photoUrl}
          alt={name || 'Student profile photo'}
          className="w-full h-full object-cover"
        />
      ) : null}
      <AvatarFallback
        className={cn(
          'w-full h-full bg-brand text-white font-bold tracking-wider uppercase',
          isRound ? 'rounded-full' : 'rounded-lg',
        )}
        style={{ fontSize: `${fontSize}px` }}
        aria-label={name || 'Student'}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}
