'use client'

import { Card } from '@/components/ui/primitives'
import { cn } from '@/lib/utils'
import type { AcademicData, AcademicsEditSectionProps } from '../types'

export default function AcademicsEditSection({
  academics,
  onChange,
  errors,
}: AcademicsEditSectionProps) {
  const handleFieldChange = (field: keyof AcademicData, value: string) => {
    onChange({ ...academics, [field]: value })
  }

  return (
    <Card as="section" className="p-6 sm:p-7">
      <div className="border-b border-border-subtle pb-4 mb-6">
        <h2 className="text-xl font-bold tracking-tight text-text-main">Academics</h2>
        <p className="text-xs text-text-muted mt-1">
          Keep your GPA, degree major, minor, academic honors, and graduation date up-to-date.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label
            htmlFor="edit-gpa"
            className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5"
          >
            GPA <span className="text-red-500">*</span>
          </label>
          <input
            id="edit-gpa"
            type="text"
            required
            value={academics.gpa}
            onChange={(e) => handleFieldChange('gpa', e.target.value)}
            placeholder="e.g. 3.9 / 4.0"
            aria-invalid={Boolean(errors?.gpa)}
            className={cn(
              'w-full px-3.5 py-2 text-sm text-text-main bg-card border rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-1 transition-colors',
              errors?.gpa
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-border-subtle focus:ring-brand focus:border-brand',
            )}
          />
          {errors?.gpa && (
            <p className="mt-1.5 text-xs text-red-500 font-medium" role="alert">
              {errors.gpa}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="edit-expected-grad"
            className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5"
          >
            Graduation Date / Expected Graduation <span className="text-red-500">*</span>
          </label>
          <input
            id="edit-expected-grad"
            type="text"
            required
            value={academics.expectedGraduation}
            onChange={(e) => handleFieldChange('expectedGraduation', e.target.value)}
            placeholder="e.g. May 2025"
            aria-invalid={Boolean(errors?.expectedGraduation)}
            className={cn(
              'w-full px-3.5 py-2 text-sm text-text-main bg-card border rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-1 transition-colors',
              errors?.expectedGraduation
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-border-subtle focus:ring-brand focus:border-brand',
            )}
          />
          {errors?.expectedGraduation && (
            <p className="mt-1.5 text-xs text-red-500 font-medium" role="alert">
              {errors.expectedGraduation}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="edit-major"
            className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5"
          >
            Major <span className="text-red-500">*</span>
          </label>
          <input
            id="edit-major"
            type="text"
            required
            value={academics.major}
            onChange={(e) => handleFieldChange('major', e.target.value)}
            placeholder="e.g. Computer Science"
            aria-invalid={Boolean(errors?.major)}
            className={cn(
              'w-full px-3.5 py-2 text-sm text-text-main bg-card border rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-1 transition-colors',
              errors?.major
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-border-subtle focus:ring-brand focus:border-brand',
            )}
          />
          {errors?.major && (
            <p className="mt-1.5 text-xs text-red-500 font-medium" role="alert">
              {errors.major}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="edit-minor"
            className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5"
          >
            Minor
          </label>
          <input
            id="edit-minor"
            type="text"
            value={academics.minor}
            onChange={(e) => handleFieldChange('minor', e.target.value)}
            placeholder="e.g. Mathematics or None"
            className="w-full px-3.5 py-2 text-sm text-text-main bg-card border border-border-subtle rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-colors"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="edit-honors"
            className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5"
          >
            Academic Honors / Awards
          </label>
          <input
            id="edit-honors"
            type="text"
            value={academics.honors}
            onChange={(e) => handleFieldChange('honors', e.target.value)}
            placeholder="e.g. Dean's List (All Semesters), Summa Cum Laude"
            className="w-full px-3.5 py-2 text-sm text-text-main bg-card border border-border-subtle rounded-xl shadow-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-colors"
          />
        </div>
      </div>
    </Card>
  )
}
