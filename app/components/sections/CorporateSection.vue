<template>
  <section class="border-b border-line bg-pine-900 text-paper">
    <div class="layout-full grid items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
      <div class="lg:col-span-6">
        <p data-reveal class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-sage">
          <span class="h-px w-8 bg-sage" aria-hidden="true" />
          {{ $t('corporate.eyebrow') }}
        </p>
        <h2 data-reveal class="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
          {{ $t('corporate.title') }}
        </h2>
        <p data-reveal class="mt-4 max-w-xl text-base leading-relaxed text-paper/75">
          {{ $t('corporate.lead') }}
        </p>
        <ul class="mt-8 space-y-4">
          <li v-for="benefit in benefits" :key="benefit" data-reveal class="flex items-start gap-3">
            <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal/20">
              <Check class="h-3.5 w-3.5 text-sage" />
            </span>
            <span class="text-sm leading-relaxed text-paper/85">{{ benefit }}</span>
          </li>
        </ul>
        <NuxtLink
          :to="localePath('/unternehmen')"
          data-reveal
          class="mt-9 inline-flex items-center gap-2 rounded-sm bg-signal px-7 py-3.5 text-sm font-semibold text-pine-950 transition-colors hover:bg-signal-deep hover:text-white"
        >
          {{ $t('corporate.cta') }}
          <ArrowRight class="h-4 w-4" />
        </NuxtLink>
      </div>
      <div class="relative lg:col-span-6" data-reveal>
        <div class="absolute -bottom-3 -right-3 h-full w-full border border-signal/40" aria-hidden="true" />
        <img
          :src="CORPORATE_IMAGE"
          :alt="$t('corporate.imgAlt')"
          class="relative aspect-[4/3] w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'
import { ArrowRight, Check } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { resolveTm } from '~/composables/useSiteData'
import { CORPORATE_IMAGE } from '~/config/courses'

const localePath = useLocalePath()
const { tm, rt } = useI18n()

const benefits = computed(() => resolveTm<string[]>(tm('corporate.benefits'), rt) || [])
</script>
