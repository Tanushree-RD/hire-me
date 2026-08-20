'use client'

import Avatar from 'react-avatar'

interface UserAvatarProps {
  name: string
  photoUrl?: string
  size?: string
  className?: string
  round?: boolean | string
  textSizeRatio?: number
}

/**
 * Reusable UserAvatar component using `react-avatar`.
 * - Displays image when `photoUrl` is provided.
 * - Automatically computes and renders initials from `name` if image is absent.
 * - Circular appearance with consistent CareerLink styling.
 */
export default function UserAvatar({
  name,
  photoUrl,
  size = '96',
  className = '',
  round = true,
  textSizeRatio = 2.2,
}: UserAvatarProps) {
  return (
    <div
      className={`inline-flex items-center justify-center overflow-hidden shrink-0 select-none shadow-sm ${
        round ? 'rounded-full' : 'rounded-lg'
      } ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Avatar
        name={name || 'Student'}
        src={photoUrl || undefined}
        size={size}
        round={round}
        textSizeRatio={textSizeRatio}
        color="#00c26d"
        fgColor="#ffffff"
        className="w-full h-full object-cover"
      />
    </div>
  )
}
