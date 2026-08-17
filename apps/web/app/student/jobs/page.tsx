import Link from 'next/link'
import { Icon } from '@/components/ui/primitives'
import { briefcasePaths } from '@/components/ui/icons'

export const metadata = {
  title: 'Job Feed — CareerLink',
  description: 'Browse and discover job opportunities tailored to your profile.',
}

export default function JobFeedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-accent-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Icon paths={briefcasePaths} className="w-8 h-8 text-accent-500" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Job Feed</h1>
        <p className="text-gray-500 mb-6">
          Your personalised job feed is coming soon. We&apos;re working on matching you with the
          best opportunities.
        </p>
        <Link
          href="/student/profile"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent-600 hover:text-accent-700 transition-colors"
        >
          ← Back to Profile
        </Link>
      </div>
    </div>
  )
}
