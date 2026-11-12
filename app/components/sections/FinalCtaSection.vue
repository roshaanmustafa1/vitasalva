<template>
  <section class="bg-pine-900 text-paper">
    <div class="layout-full py-20 text-center lg:py-28">
      <p data-reveal class="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-signal">
        <span class="h-px w-8 bg-signal" aria-hidden="true" />
        {{ $t('cta.eyebrow') }}
        <span class="h-px w-8 bg-signal" aria-hidden="true" />
      </p>
      <h2 data-reveal class="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
        {{ $t('cta.title') }}
      </h2>
      <p data-reveal class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-paper/75">
        {{ $t('cta.lead') }}
      </p>
      <div data-reveal class="mt-9 flex flex-wrap items-center justify-center gap-4">
        <NuxtLink
          :to="localePath('/termine')"
          class="inline-flex items-center gap-2 rounded-sm bg-signal px-7 py-3.5 text-sm font-semibold text-pine-950 transition-colors hover:bg-signal-deep hover:text-white"
        >
          {{ $t('cta.findCourse') }}
          <ArrowRight class="h-4 w-4" />
        </NuxtLink>
        <NuxtLink
          :to="localePath('/kontakt')"
          class="inline-flex items-center gap-2 rounded-sm border border-paper/40 px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-paper"
        >
          {{ $t('cta.contact') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'
import { ArrowRight } from '@lucide/vue'

const localePath = useLocalePath()
</script>
