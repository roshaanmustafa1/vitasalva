<template>
  <section class="border-b border-line bg-white">
    <div class="layout-full py-16 lg:py-20">
      <SectionHeading
        :eyebrow="$t('finder.eyebrow')"
        :title="$t('finder.title')"
        :lead="$t('finder.lead')"
      />
      <p data-reveal class="mt-3 flex items-center gap-2 text-sm text-ink-soft">
        <DemoBadge /> {{ $t('finder.demoNote') }}
      </p>

      <div data-reveal class="mt-8 flex flex-wrap gap-2" role="group" :aria-label="$t('finder.categoryLabel')">
        <button
          v-for="pill in pills"
          :key="pill"
          type="button"
          class="rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
          :class="category === pill
            ? 'border-signal bg-signal text-white shadow-sm'
            : 'border-line bg-white text-pine-900 hover:border-pine-900'"
          :aria-pressed="category === pill"
          @click="category = pill"
        >
          {{ $t('finder.categories.' + pill) }}
        </button>
      </div>

      <div data-reveal class="mt-5 flex flex-col gap-3 rounded-xl border border-line bg-paper-deep p-4 sm:p-5 lg:flex-row lg:items-center">
        <label class="relative flex-1">
          <span class="sr-only">{{ $t('finder.searchLabel') }}</span>
          <Search class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <input
            v-model="query"
            type="search"
            :placeholder="$t('finder.searchPlaceholder')"
            class="w-full rounded-md border border-line bg-white py-3 pl-10 pr-4 text-sm text-ink placeholder:text-ink-soft/70 focus:border-signal focus:outline-none"
          />
        </label>
        <label class="lg:w-56">
          <span class="sr-only">{{ $t('finder.cityLabel') }}</span>
          <select
            v-model="city"
            class="w-full rounded-md border border-line bg-white px-4 py-3 text-sm text-ink focus:border-signal focus:outline-none"
          >
            <option value="all">{{ $t('finder.allCities') }}</option>
            <option v-for="c in CITIES" :key="c" :value="c">{{ c }}</option>
          </select>
        </label>
      </div>

      <div v-if="filtered.length" class="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="course in filtered"
          :key="course.id"
          class="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition-shadow hover:shadow-[0_12px_32px_rgba(14,29,18,0.12)]"
        >
          <div class="h-1.5 w-full" :class="styles(course).bar" aria-hidden="true" />
          <div class="flex flex-1 flex-col p-5">
            <div class="flex items-start justify-between gap-3">
              <span class="flex h-11 w-11 items-center justify-center rounded-lg" :class="styles(course).tint">
                <component :is="SERVICE_ICONS[course.serviceSlug]" class="h-5 w-5" aria-hidden="true" />
              </span>
              <div class="flex flex-col items-end gap-1.5">
                <span class="rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide" :class="styles(course).badge">
                  {{ $t('finder.badges.' + course.category) }}
                </span>
                <DemoBadge />
              </div>
            </div>
            <h3 class="mt-4 font-display text-lg font-bold leading-snug text-pine-900">
              {{ course.title }}
            </h3>
            <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">{{ course.outcome }}</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-paper-deep px-3 py-1 text-xs font-semibold text-pine-900">
                <Clock class="h-3.5 w-3.5" aria-hidden="true" /> {{ course.duration }}
              </span>
              <span class="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal-deep">
                <ShieldCheck class="h-3.5 w-3.5" aria-hidden="true" /> {{ $t('finder.validity') }}
              </span>
            </div>
            <dl class="mt-4 space-y-1.5 text-sm text-ink-soft">
              <div class="flex items-center gap-2">
                <CalendarDays class="h-4 w-4 shrink-0 text-teal" />
                <dt class="sr-only">{{ $t('finder.dateLabel') }}</dt>
                <dd>{{ course.dateLabel }}</dd>
              </div>
              <div class="flex items-center gap-2">
                <MapPin class="h-4 w-4 shrink-0 text-teal" />
                <dt class="sr-only">{{ $t('finder.cityLabel2') }}</dt>
                <dd>{{ course.city }}</dd>
              </div>
              <div class="flex items-center gap-2">
                <Users class="h-4 w-4 shrink-0 text-teal" />
                <dt class="sr-only">{{ $t('finder.spotsLabel') }}</dt>
                <dd>{{ $t('finder.spotsFree', { left: course.spotsLeft, total: course.spotsTotal }) }}</dd>
              </div>
            </dl>
          </div>
          <div class="flex items-center justify-between gap-3 border-t border-line bg-paper-deep px-5 py-3.5">
            <p class="text-xs font-semibold leading-snug text-pine-900">{{ course.format }}</p>
            <NuxtLink
              :to="localePath('/kurse/' + course.serviceSlug)"
              class="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-signal px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-signal-deep"
            >
              {{ $t('finder.viewSyllabus') }}
              <ArrowRight class="h-3.5 w-3.5" />
            </NuxtLink>
          </div>
        </article>
      </div>
      <p v-else data-reveal class="mt-6 rounded-xl border border-dashed border-line bg-paper-deep p-8 text-center text-sm text-ink-soft">
        {{ $t('finder.empty') }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'
import { ArrowRight, CalendarDays, Clock, MapPin, Search, ShieldCheck, Users } from '@lucide/vue'
import { useSiteData } from '~/composables/useSiteData'
import type { CourseCategory } from '~/config/courses'
import { CITIES } from '~/config/courses'
import { CATEGORY_STYLES, SERVICE_ICONS } from '~/config/serviceVisuals'

const localePath = useLocalePath()
const { courses, serviceBySlug } = useSiteData()

const pills = ['all', 'workplace', 'cpr', 'pediatric', 'trauma'] as const
const query = ref('')
const category = ref<(typeof pills)[number]>('all')
const city = ref('all')

/** Courses enriched with their module's category, outcome, duration and format. */
const enriched = computed(() =>
  courses.value.map((c) => {
    const svc = serviceBySlug(c.serviceSlug)
    return {
      ...c,
      category: svc?.category ?? 'workplace',
      outcome: svc?.outcome ?? '',
      duration: svc?.duration ?? c.durationLabel,
      format: svc?.format ?? '',
    }
  }),
)

const styles = (c: { category: CourseCategory }) => CATEGORY_STYLES[c.category]

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return enriched.value.filter((c) => {
    if (category.value !== 'all' && c.category !== category.value) return false
    if (city.value !== 'all' && c.city !== city.value) return false
    if (q && !(c.title + ' ' + c.city).toLowerCase().includes(q)) return false
    return true
  })
})
</script>
