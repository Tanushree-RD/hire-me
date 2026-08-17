import Link from 'next/link'
import { Icon } from '@/components/ui/primitives'
import { documentD } from '@/components/ui/icons'

export const metadata = {
  title: 'My Applications — CareerLink',
  description: 'Track and manage your job applications in one place.',
}

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-accent-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Icon d={documentD} className="w-8 h-8 text-accent-500" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Applications</h1>
        <p className="text-gray-500 mb-6">
          Your application tracker is coming soon. You&apos;ll be able to monitor every application
          from submission to offer.
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
