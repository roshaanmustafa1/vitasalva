import type { Component } from 'vue'
import { Baby, Bandage, BriefcaseMedical, Brain, Droplets, HardHat, HeartPulse, Wind } from '@lucide/vue'
import type { CourseCategory } from '~/config/courses'

/** Icon per training module (slug -> lucide icon). */
export const SERVICE_ICONS: Record<string, Component> = {
  'cpr-aed': HeartPulse,
  'workplace-first-aid': BriefcaseMedical,
  'pediatric-life-support': Baby,
  'bleeding-trauma': Droplets,
  'burns-fractures': Bandage,
  'choking-airway': Wind,
  'industrial-rescue': HardHat,
  'mental-health': Brain,
}

/** Static class strings per category (kept literal so Tailwind can detect them). */
export const CATEGORY_STYLES: Record<CourseCategory, { bar: string, tint: string, badge: string, chip: string }> = {
  workplace: { bar: 'bg-pine-900', tint: 'bg-pine-900/10 text-pine-900', badge: 'bg-pine-900/10 text-pine-900', chip: 'bg-white/90 text-pine-900' },
  cpr: { bar: 'bg-signal', tint: 'bg-signal/10 text-signal-deep', badge: 'bg-signal/10 text-signal-deep', chip: 'bg-white/90 text-pine-800' },
  pediatric: { bar: 'bg-teal', tint: 'bg-teal/10 text-teal-deep', badge: 'bg-teal/10 text-teal-deep', chip: 'bg-white/90 text-teal-deep' },
  trauma: { bar: 'bg-red-900', tint: 'bg-red-900/10 text-red-900', badge: 'bg-red-900/10 text-red-900', chip: 'bg-white/90 text-red-900' },
}
