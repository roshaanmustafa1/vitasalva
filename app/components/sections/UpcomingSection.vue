<template>
  <section class="border-b border-line bg-paper">
    <div class="layout-full py-16 lg:py-24">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          :eyebrow="$t('upcoming.eyebrow')"
          :title="$t('upcoming.title')"
          :lead="$t('upcoming.lead')"
        />
        <p data-reveal class="flex items-center gap-2 text-sm text-ink-soft">
          <DemoBadge /> {{ $t('upcoming.demoLabel') }}
        </p>
      </div>

      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="course in upcoming"
          :key="course.id"
          data-reveal
          class="flex flex-col rounded-2xl border border-line bg-white p-6 transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(14,29,18,0.4)]"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="rounded-xl border border-line bg-paper px-3 py-2 text-center">
              <p class="font-display text-2xl font-bold leading-none text-pine-900">{{ course.day }}</p>
              <p class="mt-1 text-[11px] font-semibold uppercase tracking-widest text-signal-deep">
                {{ course.monthYear }}
              </p>
            </div>
            <span class="rounded-full bg-pine-900 px-3 py-1 text-xs font-semibold text-paper">
              {{ $t('upcoming.spotsFree', { n: course.spotsLeft }) }}
            </span>
          </div>
          <p class="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-signal-deep">
            {{ serviceTitle(course.serviceSlug) }}
          </p>
          <h3 class="mt-2 font-display text-xl font-semibold leading-snug text-pine-900">{{ course.title }}</h3>
          <p class="mt-3 flex items-center gap-2 text-sm text-ink-soft">
            <MapPin class="h-4 w-4 shrink-0 text-signal-deep" /> {{ course.city }} · {{ course.durationLabel }}
          </p>
          <div class="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-paper-deep" aria-hidden="true">
            <div class="h-full rounded-full bg-signal" :style="{ width: `${(course.spotsLeft / course.spotsTotal) * 100}%` }" />
          </div>
          <NuxtLink
            :to="localePath(`/termine?kurs=${course.id}`)"
            class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-pine-900 underline-offset-4 hover:text-signal-deep hover:underline"
          >
            {{ $t('common.bookNow') }}
            <ArrowRight class="h-4 w-4" />
          </NuxtLink>
        </article>
      </div>

      <div data-reveal class="mt-10 text-center">
        <AppButton :to="localePath('/termine')" variant="outline">{{ $t('upcoming.viewAll') }}</AppButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'
import { ArrowRight, MapPin } from '@lucide/vue'
import { useSiteData } from '~/composables/useSiteData'

const localePath = useLocalePath()
const { courses, serviceTitle } = useSiteData()

const upcoming = computed(() => courses.value.slice(0, 6))
</script>
