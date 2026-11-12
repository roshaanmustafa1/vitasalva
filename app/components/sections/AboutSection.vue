<template>
  <section class="overflow-hidden bg-white">
    <div class="layout-full grid items-center gap-14 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
      <!-- Visual -->
      <div class="relative mx-auto w-full max-w-md lg:col-span-6 lg:max-w-none" data-reveal>
        <div class="absolute -left-4 -top-4 h-full w-full rounded-[2rem] border-2 border-pine-700/20" aria-hidden="true" />
        <div class="absolute -bottom-5 -right-5 h-40 w-40 rounded-full bg-teal/15" aria-hidden="true" />
        <img
          :src="ABOUT_IMAGE"
          :alt="$t('about.imgAlt')"
          class="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-xl lg:max-h-[36rem]"
          loading="lazy"
        />
        <span class="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-pine-800 px-4 py-2 text-xs font-bold text-white shadow-lg">
          <ShieldCheck class="h-4 w-4 text-sage" aria-hidden="true" />
          {{ $t('finder.validity') }}
        </span>
        <div
          v-if="proof"
          class="absolute -bottom-6 left-5 right-5 flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-[0_20px_40px_-20px_rgba(14,29,18,0.45)] sm:left-auto sm:right-[-1.5rem] sm:w-72"
        >
          <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal text-white">
            <BadgeCheck class="h-6 w-6" aria-hidden="true" />
          </span>
          <span class="leading-tight">
            <span class="block font-display text-base font-extrabold text-pine-900">{{ proof.title }}</span>
            <span class="block text-sm text-ink-soft">{{ proof.text }}</span>
          </span>
        </div>
      </div>

      <!-- Copy -->
      <div class="lg:col-span-6">
        <SectionHeading
          :eyebrow="$t('about.eyebrow')"
          :title="$t('about.title')"
          :lead="$t('about.lead')"
        />
        <p data-reveal class="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
          {{ $t('about.text') }}
        </p>

        <ol class="relative mt-8 space-y-6 before:absolute before:bottom-5 before:left-[1.1rem] before:top-5 before:w-px before:bg-line">
          <li v-for="value in values" :key="value.title" data-reveal class="relative flex gap-4">
            <span class="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal text-white ring-4 ring-white">
              <Check class="h-4 w-4" stroke-width="3" aria-hidden="true" />
            </span>
            <div class="pt-0.5">
              <h3 class="font-display text-lg font-bold text-pine-900">{{ value.title }}</h3>
              <p class="mt-1 text-sm leading-relaxed text-ink-soft">{{ value.text }}</p>
            </div>
          </li>
        </ol>

        <div data-reveal class="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
          <AppButton :to="localePath('/leistungen')">{{ $t('about.link') }}</AppButton>
          <NuxtLink
            :to="localePath('/termine')"
            class="inline-flex items-center gap-2 text-sm font-semibold text-pine-800 underline-offset-4 hover:underline"
          >
            {{ $t('common.viewAllDates') }}
            <ArrowRight class="h-4 w-4" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'
import { ArrowRight, BadgeCheck, Check, ShieldCheck } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { resolveTm } from '~/composables/useSiteData'
import { ABOUT_IMAGE } from '~/config/courses'

const localePath = useLocalePath()
const { tm, rt } = useI18n()

const values = computed(() =>
  resolveTm<{ title: string, text: string }[]>(tm('about.values'), rt) || [],
)

/** Reuses the hero's last stat (verifiable digital certificate) for the floating proof card. */
const proof = computed(() => {
  const stats = resolveTm<{ title: string, text: string }[]>(tm('hero.stats'), rt) || []
  return stats[stats.length - 1]
})
</script>
