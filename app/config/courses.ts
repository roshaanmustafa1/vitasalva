/**
 * VITASALVA content data — STRUCTURAL data only (slugs, images, ISO dates, spots).
 *
 * All human-readable copy (titles, descriptions, highlights, dates as display
 * strings, instructor/testimonial/FAQ texts) lives in the locale files
 * `i18n/locales/de.json` and `i18n/locales/en.json` and is merged with this
 * data in `~/composables/useSiteData`. Never put copy in this file.
 *
 * IMPORTANT: All dates, testimonials, instructor profiles and course details
 * are DEMO content. Nothing here is a confirmed VITASALVA offering, price,
 * certification or business fact. Demo content is always shown with a "Demo"
 * badge in the UI and must be replaced with verified data before launch.
 */

export type CourseCategory = 'workplace' | 'cpr' | 'pediatric' | 'trauma'

export interface ServiceCategory {
  slug: string
  category: CourseCategory
  /** Photo for the "Field Areas" tiles (placeholder stock photography) */
  image: string
}

export interface DemoCourse {
  id: string
  serviceSlug: string
  city: string
  /** First day of the course (ISO date, e.g. "2026-12-05") */
  dateStart: string
  /** Last day of the course (ISO date; same as dateStart for single-day courses) */
  dateEnd: string
  spotsLeft: number
  spotsTotal: number
  /** Unique photo per course card (placeholder stock photography) */
  image: string
}

export interface Instructor {
  id: string
  image: string
}

export interface Testimonial {
  id: string
  image: string
}

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`

// Placeholder first-aid training photo (same asset as the first-aid course card) - replace with real VITASALVA CPR/AED training photography.
export const HERO_IMAGE = img('photo-1622115297822-a3798fdbe1f6', 2000)

/** Hero slider: structural data only. Copy lives in locale files under hero.slides (same order). */
export interface HeroSlide {
  id: string
  image: string
  /** CSS object-position for the photo */
  position: string
  /** Target route of the slide CTA (localised at render time) */
  to: string
}
// Placeholder stock photos - replace with real VITASALVA training photography.
export const HERO_SLIDES: HeroSlide[] = [
  { id: 'hands-on', image: HERO_IMAGE, position: 'center', to: '/leistungen' },
  { id: 'corporate', image: img('photo-1622551546704-36926ae49878', 2000), position: 'center', to: '/unternehmen' },
  { id: 'emergency', image: img('photo-1649260257572-91bf6f94cff6', 2000), position: 'center', to: '/termine' },
]
// Placeholder first-aid kit photo - replace with real hands-on VITASALVA training photography.
export const ABOUT_IMAGE = img('photo-1624638760852-8ede1666ab07', 1600)
export const CORPORATE_IMAGE = img('photo-1755550299761-4c0ebce79447', 1600)
export const CONTACT_IMAGE = img('photo-1521791136064-7986c2920216', 1400)

export const SERVICES: ServiceCategory[] = [
  { slug: 'cpr-aed', category: 'cpr', image: img('photo-1617257484989-9f8ab411c362', 1000) },
  { slug: 'workplace-first-aid', category: 'workplace', image: img('photo-1624638764471-cffef5035746', 1000) },
  { slug: 'pediatric-life-support', category: 'pediatric', image: img('photo-1755549694163-2006a86567e4', 1000) },
  { slug: 'bleeding-trauma', category: 'trauma', image: img('photo-1600531105235-7a82db92fc46', 1000) },
  { slug: 'burns-fractures', category: 'trauma', image: img('photo-1762347921012-79c5b5a7b9a0', 1000) },
  { slug: 'choking-airway', category: 'cpr', image: img('photo-1755550299761-f3f9283b4c5f', 1000) },
  { slug: 'industrial-rescue', category: 'workplace', image: img('photo-1504307651254-35680f356dfd', 1000) },
  { slug: 'mental-health', category: 'workplace', image: img('photo-1758273240360-76b908e7582a', 1000) },
]

export const DEMO_COURSES: DemoCourse[] = [
  { id: 'c1', serviceSlug: 'cpr-aed', city: 'Krefeld', dateStart: '2026-12-05', dateEnd: '2026-12-05', spotsLeft: 6, spotsTotal: 24, image: img('photo-1622115585848-1d5b6e8af4e4', 1000) },
  { id: 'c2', serviceSlug: 'workplace-first-aid', city: 'Düsseldorf', dateStart: '2026-12-12', dateEnd: '2026-12-12', spotsLeft: 12, spotsTotal: 24, image: img('photo-1755548376576-e045f6e01773', 1000) },
  { id: 'c3', serviceSlug: 'pediatric-life-support', city: 'Köln', dateStart: '2026-12-15', dateEnd: '2026-12-15', spotsLeft: 7, spotsTotal: 16, image: img('photo-1635533481079-403bede2e256', 1000) },
  { id: 'c4', serviceSlug: 'bleeding-trauma', city: 'Essen', dateStart: '2026-12-14', dateEnd: '2026-12-14', spotsLeft: 6, spotsTotal: 12, image: img('photo-1776047305985-af1ac68e689f', 1000) },
  { id: 'c5', serviceSlug: 'burns-fractures', city: 'Duisburg', dateStart: '2026-12-17', dateEnd: '2026-12-17', spotsLeft: 6, spotsTotal: 20, image: img('photo-1544531664-12a4ea82b7d4', 1000) },
  { id: 'c6', serviceSlug: 'choking-airway', city: 'Dortmund', dateStart: '2027-01-09', dateEnd: '2027-01-09', spotsLeft: 4, spotsTotal: 12, image: img('photo-1755549746563-a7c0a391af36', 1000) },
  { id: 'c7', serviceSlug: 'industrial-rescue', city: 'Krefeld', dateStart: '2027-01-11', dateEnd: '2027-01-12', spotsLeft: 5, spotsTotal: 10, image: img('photo-1541888946425-d81bb19240f5', 1000) },
  { id: 'c8', serviceSlug: 'mental-health', city: 'Düsseldorf', dateStart: '2027-01-22', dateEnd: '2027-01-22', spotsLeft: 5, spotsTotal: 16, image: img('photo-1758525226586-c9b75017de26', 1000) },
  { id: 'c9', serviceSlug: 'cpr-aed', city: 'Köln', dateStart: '2027-01-23', dateEnd: '2027-01-23', spotsLeft: 4, spotsTotal: 24, image: img('photo-1765996826970-df2db6481719', 1000) },
]

export const CITIES = [...new Set(DEMO_COURSES.map((c) => c.city))].sort()

export const INSTRUCTORS: Instructor[] = [
  { id: 'markus-weber', image: img('photo-1560250097-0b93528c311a', 800) },
  { id: 'anna-berger', image: img('photo-1573496359142-b8d87734a5a2', 800) },
  { id: 'thomas-richter', image: img('photo-1519085360753-af0119f7cbe7', 800) },
]

export const TESTIMONIALS: Testimonial[] = [
  { id: 'sandra-hoffmann', image: img('photo-1580489944761-15a19d654956', 200) },
  { id: 'michael-krueger', image: img('photo-1507003211169-0a1dd7228f2d', 200) },
  { id: 'julia-neumann', image: img('photo-1595152772835-219674b2a8a6', 200) },
]
