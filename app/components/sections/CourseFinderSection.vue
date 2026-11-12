<template>
  <section class="border-b border-line bg-paper-deep/60">
    <div class="layout-full py-16 lg:py-20">
      <SectionHeading
        :eyebrow="$t('finder.eyebrow')"
        :title="$t('finder.title')"
        :lead="$t('finder.lead')"
      />
      <p data-reveal class="mt-3 flex items-center gap-2 text-sm text-ink-soft">
        <DemoBadge /> {{ $t('finder.demoNote') }}
      </p>

      <div data-reveal class="mt-8 flex flex-col gap-3 border border-line bg-white p-4 sm:p-5 lg:flex-row lg:items-center">
        <label class="relative flex-1">
          <span class="sr-only">{{ $t('finder.searchLabel') }}</span>
          <Search class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <input
            v-model="query"
            type="search"
            :placeholder="$t('finder.searchPlaceholder')"
            class="w-full rounded-sm border border-line bg-paper py-3 pl-10 pr-4 text-sm text-ink placeholder:text-ink-soft/70 focus:border-signal focus:outline-none"
          />
        </label>
        <label class="lg:w-64">
          <span class="sr-only">{{ $t('finder.categoryLabel') }}</span>
          <select
            v-model="category"
            class="w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm text-ink focus:border-signal focus:outline-none"
          >
            <option value="all">{{ $t('finder.allCategories') }}</option>
            <option v-for="s in services" :key="s.slug" :value="s.slug">{{ s.title }}</option>
          </select>
        </label>
        <label class="lg:w-56">
          <span class="sr-only">{{ $t('finder.cityLabel') }}</span>
          <select
            v-model="city"
            class="w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm text-ink focus:border-signal focus:outline-none"
          >
            <option value="all">{{ $t('finder.allCities') }}</option>
            <option v-for="c in CITIES" :key="c" :value="c">{{ c }}</option>
          </select>
        </label>
      </div>

      <div v-if="filtered.length" class="mt-6 grid gap-4 md:grid-cols-2">
        <article
          v-for="course in filtered"
          :key="course.id"
          class="group flex flex-col border border-line bg-white p-5 transition-shadow hover:shadow-[0_8px_30px_rgba(12,43,37,0.08)]"
        >
          <div class="flex items-start justify-between gap-3">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-signal-deep">
              {{ serviceTitle(course.serviceSlug) }}
            </p>
            <DemoBadge />
          </div>
          <h3 class="mt-3 font-display text-xl font-semibold leading-snug text-pine-900">
            {{ course.title }}
          </h3>
          <dl class="mt-4 space-y-1.5 text-sm text-ink-soft">
            <div class="flex items-center gap-2">
              <CalendarDays class="h-4 w-4 shrink-0 text-signal-deep" />
              <dt class="sr-only">{{ $t('finder.dateLabel') }}</dt>
              <dd>{{ course.dateLabel }}</dd>
            </div>
            <div class="flex items-center gap-2">
              <MapPin class="h-4 w-4 shrink-0 text-signal-deep" />
              <dt class="sr-only">{{ $t('finder.cityLabel2') }}</dt>
              <dd>{{ course.city }} · {{ course.durationLabel }}</dd>
            </div>
            <div class="flex items-center gap-2">
              <Users class="h-4 w-4 shrink-0 text-signal-deep" />
              <dt class="sr-only">{{ $t('finder.spotsLabel') }}</dt>
              <dd>{{ $t('finder.spotsFree', { left: course.spotsLeft, total: course.spotsTotal }) }}</dd>
            </div>
          </dl>
          <div class="mt-5 flex gap-3 border-t border-line pt-4">
            <NuxtLink
              :to="localePath(`/kurse/${course.serviceSlug}`)"
              class="text-sm font-semibold text-pine-900 underline-offset-4 hover:text-signal-deep hover:underline"
            >
              {{ $t('common.details') }}
            </NuxtLink>
            <NuxtLink
              :to="localePath(`/termine?kurs=${course.id}`)"
              class="ml-auto inline-flex items-center gap-1.5 rounded-sm bg-pine-900 px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-pine-700"
            >
              {{ $t('common.book') }}
              <ArrowRight class="h-3.5 w-3.5" />
            </NuxtLink>
          </div>
        </article>
      </div>
      <p v-else data-reveal class="mt-6 border border-dashed border-line bg-white p-8 text-center text-sm text-ink-soft">
        {{ $t('finder.empty') }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'
import { ArrowRight, CalendarDays, MapPin, Search, Users } from '@lucide/vue'
import { useSiteData } from '~/composables/useSiteData'
import { CITIES } from '~/config/courses'

const localePath = useLocalePath()
const { courses, services, serviceTitle } = useSiteData()

const query = ref('')
const category = ref('all')
const city = ref('all')

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return courses.value.filter((c) => {
    if (category.value !== 'all' && c.serviceSlug !== category.value) return false
    if (city.value !== 'all' && c.city !== city.value) return false
    if (q && !`${c.title} ${c.city}`.toLowerCase().includes(q)) return false
    return true
  })
})
</script>
