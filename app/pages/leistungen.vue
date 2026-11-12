<template>
  <div>
    <div class="bg-pine-900 text-paper">
      <div class="layout-full py-16 lg:py-20">
        <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-sage">
          <span class="h-px w-8 bg-sage" aria-hidden="true" /> {{ $t('pages.leistungen.eyebrow') }}
        </p>
        <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          {{ $t('pages.leistungen.title') }}
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-paper/75">
          {{ $t('pages.leistungen.lead') }}
        </p>
      </div>
    </div>

    <ServicesSection />

    <section class="border-b border-line bg-white">
      <div class="layout-full py-16 lg:py-24">
        <SectionHeading
          :eyebrow="$t('pages.leistungen.processEyebrow')"
          :title="$t('pages.leistungen.processTitle')"
        />
        <ol class="mt-12 grid gap-6 md:grid-cols-4">
          <li v-for="(step, i) in steps" :key="step.title" data-reveal class="border-t-2 border-pine-900 pt-6">
            <p class="font-display text-4xl font-semibold text-signal/80">{{ String(i + 1).padStart(2, '0') }}</p>
            <h3 class="mt-3 font-display text-xl font-semibold text-pine-900">{{ step.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ step.text }}</p>
          </li>
        </ol>
        <div data-reveal class="mt-12 flex flex-wrap gap-4">
          <NuxtLink
            :to="localePath('/termine')"
            class="inline-flex items-center gap-2 rounded-sm bg-pine-900 px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-pine-700"
          >
            {{ $t('pages.leistungen.ctaDate') }}
            <ArrowRight class="h-4 w-4" />
          </NuxtLink>
          <NuxtLink
            :to="localePath('/kontakt')"
            class="inline-flex items-center gap-2 rounded-sm border border-pine-900/25 bg-white px-7 py-3.5 text-sm font-semibold text-pine-900 transition-colors hover:border-pine-900"
          >
            {{ $t('pages.leistungen.ctaAdvice') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'
import { ArrowRight } from '@lucide/vue'
import ServicesSection from '~/components/sections/ServicesSection.vue'
import { useI18n } from 'vue-i18n'
import { usePageSeo } from '~/composables/usePageSeo'
import { useReveal } from '~/composables/useReveal'
import { resolveTm } from '~/composables/useSiteData'

useReveal()
usePageSeo('meta.titles.leistungen', 'meta.descriptions.leistungen')

const localePath = useLocalePath()
const { tm, rt } = useI18n()

const steps = computed(() => resolveTm<{ title: string, text: string }[]>(tm('pages.leistungen.steps'), rt) || [])
</script>
