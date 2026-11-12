<template>
  <section class="relative overflow-hidden bg-pine-900 text-white">
    <div class="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-pine-700/30 blur-3xl" aria-hidden="true" />
    <div class="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-teal/15 blur-3xl" aria-hidden="true" />

    <div class="layout-full relative grid items-center gap-14 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
      <!-- Copy -->
      <div class="lg:col-span-6">
        <p data-reveal class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-sage">
          <span class="h-px w-8 bg-sage" aria-hidden="true" />
          {{ $t('corporate.eyebrow') }}
        </p>
        <h2 data-reveal class="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem]">
          {{ $t('corporate.title') }}
        </h2>
        <p data-reveal class="mt-4 max-w-xl text-base leading-relaxed text-white/70">
          {{ $t('corporate.lead') }}
        </p>

        <ul class="mt-8 grid gap-3 sm:grid-cols-2">
          <li
            v-for="(benefit, i) in benefits"
            :key="benefit"
            data-reveal
            class="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal text-white">
              <component :is="benefitIcons[i % benefitIcons.length]" class="h-5 w-5" aria-hidden="true" />
            </span>
            <span class="text-sm font-medium leading-snug text-white/90">{{ benefit }}</span>
          </li>
        </ul>

        <div data-reveal class="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
          <AppButton :to="localePath('/unternehmen')" variant="light">{{ $t('corporate.cta') }}</AppButton>
          <NuxtLink
            :to="localePath('/kontakt')"
            class="inline-flex items-center gap-2 text-sm font-semibold text-sage underline-offset-4 hover:underline"
          >
            {{ $t('common.contactCta') }}
            <ArrowRight class="h-4 w-4" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>

      <!-- Visual -->
      <div class="relative mx-auto w-full max-w-md lg:col-span-6 lg:max-w-none" data-reveal>
        <div class="absolute -bottom-4 -right-4 h-full w-full rounded-[2rem] border-2 border-white/15" aria-hidden="true" />
        <div class="absolute -left-5 -top-5 h-36 w-36 rounded-full bg-teal/25 blur-xl" aria-hidden="true" />
        <img
          :src="CORPORATE_IMAGE"
          :alt="$t('corporate.imgAlt')"
          class="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl sm:aspect-[4/3] lg:aspect-[4/5] lg:max-h-[34rem]"
          loading="lazy"
        />
        <div
          v-if="onSite"
          class="absolute -bottom-6 left-5 flex items-center gap-4 rounded-2xl border border-white/70 bg-white/90 p-4 text-ink shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md sm:left-[-1.5rem] sm:w-72"
        >
          <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pine-800 text-white">
            <Building2 class="h-6 w-6" aria-hidden="true" />
          </span>
          <span class="leading-tight">
            <span class="block font-display text-base font-extrabold text-pine-900">{{ onSite.title }}</span>
            <span class="block text-sm text-ink-soft">{{ onSite.text }}</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'
import { ArrowRight, Building2, CalendarDays, ClipboardCheck, UserCheck } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { resolveTm } from '~/composables/useSiteData'
import { CORPORATE_IMAGE } from '~/config/courses'

const localePath = useLocalePath()
const { tm, rt } = useI18n()

const benefitIcons = [Building2, CalendarDays, UserCheck, ClipboardCheck]
const benefits = computed(() => resolveTm<string[]>(tm('corporate.benefits'), rt) || [])

/** Reuses the trust strip's "On-Site Workplace Delivery" copy for the floating card. */
const onSite = computed(() => {
  const pillars = resolveTm<{ title: string, text: string }[]>(tm('trust.pillars'), rt) || []
  return pillars[3]
})
</script>
