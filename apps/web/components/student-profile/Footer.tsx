import Link from 'next/link'
import { Icon } from '@/components/ui/primitives'
import { globeD } from '@/components/ui/icons'

const footerLinks = [
  { label: 'ABOUT US', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
  { label: 'PRIVACY POLICY', href: '/privacy' },
  { label: 'TERMS OF SERVICE', href: '/terms' },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-4 px-5" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Icon d={globeD} className="w-4 h-4" />
          <small className="font-medium">© 2026 CAREERLINK PLATFORM. ALL RIGHTS RESERVED.</small>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center gap-6" role="list">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150 font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
