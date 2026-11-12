import { useI18n } from 'vue-i18n'
import { DEMO_COURSES, INSTRUCTORS, SERVICES, TESTIMONIALS } from '~/config/courses'

/**
 * Merges structural data from `~/config/courses` with translated copy from the
 * locale files (`i18n/locales/*.json`) and formats course dates per locale.
 *
 * MUST be imported explicitly via `~/composables/useSiteData` — never rely on
 * Nuxt auto-import for local composables (breaks with the apostrophe in the
 * Windows username on Roshaan's PC).
 */

export interface LocalizedService {
  slug: string
  image: string
  title: string
  description: string
  duration: string
  audience: string
  highlights: string[]
}

export interface LocalizedCourse {
  id: string
  serviceSlug: string
  city: string
  dateStart: string
  dateEnd: string
  spotsLeft: number
  spotsTotal: number
  /** Localised title, e.g. "Erste-Hilfe-Kurs (Grundkurs)" / "First Aid Course (Basic Course)" */
  title: string
  /** Localised display date, e.g. "Sa., 5. Dezember 2026" / "Sat, 5 December 2026" */
  dateLabel: string
  /** Localised duration, e.g. "1 Tag" / "3 Tage" / "1 day" / "3 days" */
  durationLabel: string
  /** Day number for the calendar tile, e.g. "05" */
  day: string
  /** Month + year for the calendar tile, e.g. "Dez. 2026" / "Dec 2026" */
  monthYear: string
}

export interface LocalizedInstructor {
  id: string
  image: string
  name: string
  role: string
  focus: string
}

export interface LocalizedTestimonial {
  id: string
  image: string
  quote: string
  name: string
  role: string
}

export interface LocalizedFaq {
  q: string
  a: string
}

interface ServiceCopy {
  title: string
  description: string
  duration: string
  audience: string
  highlights: string[]
}

function atNoon(iso: string): Date {
  return new Date(`${iso}T12:00:00`)
}

export function resolveTm<T = unknown>(value: unknown, rt?: (val: any) => string): T {
  if (value == null) return value as T
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value as T
  }
  if (Array.isArray(value)) {
    return value.map((item) => resolveTm(item, rt)) as T
  }
  if (typeof value === 'object') {
    // If it's a message AST node (has type and body/loc/static)
    if ('type' in value && ('body' in value || 'loc' in value || 'static' in value)) {
      if (rt) {
        try {
          const res = rt(value)
          if (res) return res as T
        } catch {
          // fallback below
        }
      }
      const v = value as any
      if (typeof v.static === 'string') return v.static as T
      if (typeof v.loc?.source === 'string') return v.loc.source as T
      return '' as T
    }
    const res: Record<string, unknown> = {}
    for (const key of Object.keys(value)) {
      res[key] = resolveTm((value as Record<string, unknown>)[key], rt)
    }
    return res as T
  }
  if (typeof value === 'function' && rt) {
    try {
      return rt(value) as T
    } catch {
      return '' as T
    }
  }
  return value as T
}

export function useSiteData() {
  const { t, tm, rt, locale } = useI18n()

  const intlLocale = computed(() => (locale.value === 'en' ? 'en-GB' : 'de-DE'))

  /** "Sa., 5. Dezember 2026" / "Sat, 5 December 2026" — or a range like "Mo., 14. – Mi., 16. Dezember 2026". */
  function formatCourseDate(dateStart: string, dateEnd: string): string {
    const start = atNoon(dateStart)
    const end = atNoon(dateEnd)
    const loc = intlLocale.value
    const full = new Intl.DateTimeFormat(loc, {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    if (dateStart === dateEnd) return full.format(start)
    const short = new Intl.DateTimeFormat(loc, { weekday: 'short', day: 'numeric' })
    return `${short.format(start)} – ${full.format(end)}`
  }

  function durationDays(dateStart: string, dateEnd: string): number {
    return Math.round((atNoon(dateEnd).getTime() - atNoon(dateStart).getTime()) / 86400000) + 1
  }

  function durationLabel(dateStart: string, dateEnd: string): string {
    return t('common.duration', durationDays(dateStart, dateEnd))
  }

  function dayOf(iso: string): string {
    return String(atNoon(iso).getDate()).padStart(2, '0')
  }

  function monthYearOf(iso: string): string {
    return atNoon(iso).toLocaleDateString(intlLocale.value, { month: 'short', year: 'numeric' })
  }

  function localizeCourse(c: (typeof DEMO_COURSES)[number]): LocalizedCourse {
    return {
      ...c,
      title: t(`courseTitles.${c.id}`),
      dateLabel: formatCourseDate(c.dateStart, c.dateEnd),
      durationLabel: durationLabel(c.dateStart, c.dateEnd),
      day: dayOf(c.dateStart),
      monthYear: monthYearOf(c.dateStart),
    }
  }

  const services = computed<LocalizedService[]>(() => {
    const raw = tm('serviceData')
    const copy = resolveTm<Record<string, ServiceCopy>>(raw, rt) || {}
    return SERVICES.map((s) => ({
      ...s,
      ...(copy[s.slug] || {
        title: '',
        description: '',
        duration: '',
        audience: '',
        highlights: [],
      }),
    }))
  })

  const courses = computed<LocalizedCourse[]>(() =>
    [...DEMO_COURSES]
      .sort((a, b) => a.dateStart.localeCompare(b.dateStart))
      .map(localizeCourse),
  )

  const instructors = computed<LocalizedInstructor[]>(() => {
    const raw = tm('instructors.list')
    const copy = resolveTm<Omit<LocalizedInstructor, 'image'>[]>(raw, rt) || []
    return INSTRUCTORS.map((p) => ({
      ...p,
      ...(copy.find((c) => c?.id === p.id) || { name: '', role: '', focus: '' }),
    }))
  })

  const testimonials = computed<LocalizedTestimonial[]>(() => {
    const raw = tm('testimonials.list')
    const copy = resolveTm<Omit<LocalizedTestimonial, 'image'>[]>(raw, rt) || []
    return TESTIMONIALS.map((p) => ({
      ...p,
      ...(copy.find((c) => c?.id === p.id) || { name: '', role: '', quote: '' }),
    }))
  })

  const faqs = computed<LocalizedFaq[]>(() => {
    const raw = tm('faqs')
    return resolveTm<LocalizedFaq[]>(raw, rt) || []
  })

  function serviceBySlug(slug: string): LocalizedService | undefined {
    return services.value.find((s) => s.slug === slug)
  }

  function coursesForService(slug: string): LocalizedCourse[] {
    return courses.value.filter((c) => c.serviceSlug === slug)
  }

  function serviceTitle(slug: string): string {
    return serviceBySlug(slug)?.title ?? slug
  }

  return {
    services,
    courses,
    instructors,
    testimonials,
    faqs,
    serviceBySlug,
    coursesForService,
    serviceTitle,
    formatCourseDate,
    durationLabel,
    dayOf,
    monthYearOf,
  }
}
