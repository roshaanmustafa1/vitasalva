<template>
  <div>
    <div class="bg-pine-900 text-paper">
      <div class="layout-full py-16 lg:py-20">
        <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-sage">
          <span class="h-px w-8 bg-sage" aria-hidden="true" /> {{ $t('pages.faq.eyebrow') }}
        </p>
        <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          {{ $t('pages.faq.title') }}
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-paper/75">
          {{ $t('pages.faq.lead') }}
        </p>
      </div>
    </div>

    <section class="border-b border-line bg-paper">
      <div class="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <FaqAccordion :items="faqs" />
        <div class="mt-12 border border-line bg-white p-7 text-center">
          <h2 class="font-display text-2xl font-semibold text-pine-900">{{ $t('pages.faq.missingTitle') }}</h2>
          <p class="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
            {{ $t('pages.faq.missingText') }}
          </p>
          <NuxtLink
            :to="localePath('/kontakt')"
            class="mt-5 inline-flex items-center gap-2 rounded-sm bg-pine-900 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-pine-700"
          >
            {{ $t('pages.faq.contactCta') }}
            <ArrowRight class="h-4 w-4" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'
import { ArrowRight } from '@lucide/vue'
import { usePageSeo } from '~/composables/usePageSeo'
import { useSiteData } from '~/composables/useSiteData'

usePageSeo('meta.titles.faq', 'meta.descriptions.faq')

const localePath = useLocalePath()
const { faqs } = useSiteData()
</script>
