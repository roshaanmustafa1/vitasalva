<template>
  <div data-reveal>
    <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-signal-deep">
      <span class="h-px w-8 bg-signal" aria-hidden="true" />
      {{ eyebrow }}
    </p>
    <h2 class="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
      {{ title }}
    </h2>
    <p v-if="lead" class="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
      {{ lead }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  lead?: string
}>()
</script>
