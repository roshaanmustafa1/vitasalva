<template>
  <section class="bg-pine-900 text-paper">
    <div class="layout-full py-20 text-center lg:py-28">
      <p data-reveal class="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-sage">
        <span class="h-px w-8 bg-sage" aria-hidden="true" />
        {{ $t('cta.eyebrow') }}
        <span class="h-px w-8 bg-sage" aria-hidden="true" />
      </p>
      <h2 data-reveal class="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
        {{ $t('cta.title') }}
      </h2>
      <p data-reveal class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-paper/75">
        {{ $t('cta.lead') }}
      </p>
      <div data-reveal class="mt-9 flex flex-wrap items-center justify-center gap-4">
        <AppButton :to="localePath('/termine')" variant="light">{{ $t('cta.findCourse') }}</AppButton>
        <AppButton :to="localePath('/kontakt')" variant="outlineLight">{{ $t('cta.contact') }}</AppButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'


const localePath = useLocalePath()
</script>
