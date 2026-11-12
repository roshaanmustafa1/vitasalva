<template>
  <section class="border-b border-line bg-paper">
    <div class="layout-full py-16 lg:py-24">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <SectionHeading
            :eyebrow="$t('faqSection.eyebrow')"
            :title="$t('faqSection.title')"
            :lead="$t('faqSection.lead')"
          />
          <NuxtLink
            :to="localePath('/faq')"
            data-reveal
            class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-pine-900 underline-offset-4 hover:text-signal-deep hover:underline"
          >
            {{ $t('faqSection.viewAll') }}
            <ArrowRight class="h-4 w-4" />
          </NuxtLink>
        </div>
        <div class="lg:col-span-8" data-reveal>
          <FaqAccordion :items="faqs.slice(0, 4)" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'
import { ArrowRight } from '@lucide/vue'
import { useSiteData } from '~/composables/useSiteData'

const localePath = useLocalePath()
const { faqs } = useSiteData()
</script>
