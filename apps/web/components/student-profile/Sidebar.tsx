'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@/components/ui/primitives'
import { briefcasePaths, documentD, userD } from '@/components/ui/icons'
import type { NavItem } from './types'

const navItems: NavItem[] = [
  { label: 'Job Feed', href: '/student/jobs', iconPaths: briefcasePaths },
  { label: 'My Applications', href: '/student/applications', iconD: documentD },
  { label: 'Profile', href: '/student/profile', iconD: userD },
]

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeNav = 'Profile'

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200 cursor-pointer"
        aria-label="Open navigation menu"
      >
        <Icon d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" className="w-5 h-5 text-gray-700" />
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex flex-col w-[160px] min-h-screen bg-white border-r border-gray-200 transition-transform duration-200 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:z-30`}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="flex items-center justify-between gap-2 px-4 py-3.5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-1.5" aria-label="CareerLink home">
            <div className="w-7 h-7 bg-accent-500 rounded-md flex items-center justify-center">
              <Icon paths={briefcasePaths} className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <span className="font-bold text-gray-900 text-sm">CareerLink</span>
          </Link>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1 text-gray-400 hover:text-gray-700 transition-colors duration-150 cursor-pointer"
            aria-label="Close navigation menu"
          >
            <Icon d="M6 18 18 6M6 6l12 12" className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-3" aria-label="Sidebar navigation">
          <ul className="space-y-1" role="list">
            {navItems.map((item) => {
              const isActive = item.label === activeNav
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13px] font-medium transition-all duration-150 ease-in-out ${
                      isActive
                        ? 'text-accent-600 bg-accent-50 border-l-[3px] border-accent-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {item.iconD && <Icon d={item.iconD} className="w-4 h-4" />}
                    {item.iconPaths && <Icon paths={item.iconPaths} className="w-4 h-4" />}
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </>
  )
}
