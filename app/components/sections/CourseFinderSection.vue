<template>
  <section class="relative overflow-hidden bg-pine-900 text-white">
    <div class="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-pine-700/30 blur-3xl" aria-hidden="true" />
    <div class="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-teal/15 blur-3xl" aria-hidden="true" />

    <div class="layout-full relative py-12 lg:py-16">
      <!-- Heading + search -->
      <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div data-reveal class="max-w-2xl">
          <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-sage">
            <span class="h-px w-8 bg-sage" aria-hidden="true" />
            {{ $t('finder.eyebrow') }}
          </p>
          <h2 class="mt-4 font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] sm:text-3xl lg:text-4xl">
            {{ $t('finder.title') }}
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">{{ $t('finder.lead') }}</p>
          <p class="mt-3 flex items-center gap-2 text-sm text-white/60">
            <DemoBadge /> {{ $t('finder.demoNote') }}
          </p>
        </div>

        <div data-reveal class="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <label class="relative sm:w-64">
            <span class="sr-only">{{ $t('finder.searchLabel') }}</span>
            <Search class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
            <input
              v-model="query"
              type="search"
              :placeholder="$t('finder.searchPlaceholder')"
              class="w-full rounded-full border border-white/20 bg-white/10 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/50 focus:border-sage focus:outline-none"
            />
          </label>
          <label class="relative sm:w-48">
            <span class="sr-only">{{ $t('finder.cityLabel') }}</span>
            <MapPin class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
            <select
              v-model="city"
              class="w-full appearance-none rounded-full border border-white/20 bg-white/10 py-3 pl-11 pr-4 text-sm text-white focus:border-sage focus:outline-none"
            >
              <option value="all" class="text-ink">{{ $t('finder.allCities') }}</option>
              <option v-for="c in CITIES" :key="c" :value="c" class="text-ink">{{ c }}</option>
            </select>
          </label>
        </div>
      </div>

      <!-- Category tabs with counts -->
      <div data-reveal class="mt-7 flex flex-wrap gap-2" role="group" :aria-label="$t('finder.categoryLabel')">
        <button
          v-for="pill in pills"
          :key="pill"
          type="button"
          class="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors"
          :class="category === pill
            ? 'border-white bg-white text-pine-900'
            : 'border-white/25 text-white/85 hover:border-white/60 hover:text-white'"
          :aria-pressed="category === pill"
          @click="category = pill"
        >
          {{ $t('finder.categories.' + pill) }}
          <span
            class="rounded-full px-2 py-0.5 text-[11px] font-bold"
            :class="category === pill ? 'bg-pine-900 text-white' : 'bg-white/15 text-white'"
          >
            {{ counts[pill] }}
          </span>
        </button>
      </div>

      <!-- Cards -->
      <div v-if="filtered.length" class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(course, i) in filtered"
          :key="course.id"
          class="group flex flex-col overflow-hidden rounded-2xl bg-white text-ink shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]"
          :class="i === 0 ? 'lg:col-span-2 lg:flex-row' : ''"
        >
          <div
            class="relative aspect-[16/10] overflow-hidden"
            :class="i === 0 ? 'lg:aspect-auto lg:w-[45%]' : ''"
          >
            <img
              :src="course.image"
              :alt="course.title"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-pine-950/70 via-transparent to-pine-950/20" aria-hidden="true" />

            <span
              class="absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur-md"
              :class="styles(course).chip"
            >
              {{ $t('finder.badges.' + course.category) }}
            </span>

            <div class="absolute bottom-3 left-3 flex items-center gap-2.5">
              <span class="flex h-11 w-11 flex-col items-center justify-center rounded-xl bg-white text-center leading-none shadow-lg">
                <span class="font-display text-base font-extrabold text-pine-800">{{ course.day }}</span>
                <span class="mt-0.5 text-[8px] font-bold uppercase tracking-wide text-ink-soft">{{ course.monthYear }}</span>
              </span>
              <span class="flex items-center gap-1 text-xs font-semibold text-white drop-shadow">
                <MapPin class="h-4 w-4" aria-hidden="true" /> {{ course.city }}
              </span>
            </div>
          </div>

          <div class="flex flex-1 flex-col p-4" :class="i === 0 ? 'lg:justify-center lg:p-7' : ''">
            <div class="flex items-center gap-2">
              <span class="flex h-8 w-8 items-center justify-center rounded-lg" :class="styles(course).tint">
                <component :is="SERVICE_ICONS[course.serviceSlug]" class="h-4 w-4" aria-hidden="true" />
              </span>
              <DemoBadge />
            </div>
            <h3
              class="mt-3 font-display font-extrabold leading-snug tracking-[-0.01em] text-pine-900"
              :class="i === 0 ? 'text-xl lg:text-2xl' : 'text-base'"
            >
              {{ course.title }}
            </h3>
            <p class="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-ink-soft" :class="i === 0 ? 'lg:line-clamp-3 lg:text-sm' : ''">
              {{ course.outcome }}
            </p>

            <p class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold">
              <span class="inline-flex items-center gap-1.5 text-pine-900">
                <Clock class="h-3.5 w-3.5" aria-hidden="true" /> {{ course.duration }}
              </span>
              <span class="inline-flex items-center gap-1.5 text-teal-deep">
                <ShieldCheck class="h-3.5 w-3.5" aria-hidden="true" /> {{ $t('finder.validity') }}
              </span>
            </p>

            <div class="mt-3">
              <div class="flex items-center justify-between gap-2 text-[11px] font-semibold">
                <span :class="course.spotsLeft <= 5 ? 'text-red-700' : 'text-ink-soft'">
                  {{ $t('finder.spotsFree', { left: course.spotsLeft, total: course.spotsTotal }) }}
                </span>
                <span class="text-ink-soft">{{ course.format }}</span>
              </div>
              <div class="mt-1.5 h-1 overflow-hidden rounded-full bg-paper-deep">
                <div
                  class="h-full rounded-full"
                  :class="course.spotsLeft <= 5 ? 'bg-red-600' : 'bg-pine-600'"
                  :style="{ width: Math.round((1 - course.spotsLeft / course.spotsTotal) * 100) + '%' }"
                />
              </div>
            </div>

            <AppButton
              :to="localePath('/kurse/' + course.serviceSlug)"
              size="sm"
              :block="i !== 0"
              class="mt-4"
              :class="i === 0 ? 'lg:self-start' : ''"
            >
              {{ $t('finder.viewSyllabus') }}
            </AppButton>
          </div>
        </article>
      </div>
      <p v-else data-reveal class="mt-8 rounded-3xl border border-dashed border-white/30 p-10 text-center text-sm text-white/70">
        {{ $t('finder.empty') }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'
import { Clock, MapPin, Search, ShieldCheck } from '@lucide/vue'
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

const counts = computed(() => {
  const base: Record<(typeof pills)[number], number> = { all: enriched.value.length, workplace: 0, cpr: 0, pediatric: 0, trauma: 0 }
  for (const c of enriched.value) base[c.category]++
  return base
})

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
