<template>
  <section class="relative overflow-hidden bg-gradient-to-b from-pine-800 to-pine-950 text-white">
    <div class="pointer-events-none absolute -left-32 -top-24 h-96 w-96 rounded-full bg-teal/20 blur-3xl" aria-hidden="true" />
    <div class="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" aria-hidden="true" />

    <div class="layout-full relative py-14 lg:py-20">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div class="max-w-2xl">
          <p data-reveal class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-sage">
            <span class="h-px w-8 bg-sage" aria-hidden="true" />
            {{ $t('instructors.eyebrow') }}
          </p>
          <h2 data-reveal class="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem]">
            {{ $t('instructors.title') }}
          </h2>
          <p data-reveal class="mt-4 text-base leading-relaxed text-white/70">{{ $t('instructors.lead') }}</p>
        </div>
        <p data-reveal class="flex items-center gap-2 text-sm text-white/65">
          <DemoBadge /> {{ $t('instructors.demoLabel') }}
        </p>
      </div>

      <div class="mt-10 grid gap-5 md:grid-cols-3 lg:gap-6">
        <article
          v-for="(person, i) in instructors"
          :key="person.id"
          data-reveal
          class="group relative isolate flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-3xl bg-pine-900 p-4 shadow-[0_30px_60px_-34px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:-translate-y-1.5"
        >
          <img
            :src="person.image"
            :alt="$t('instructors.portraitAlt', { name: person.name })"
            class="absolute inset-0 -z-20 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 -z-10 bg-gradient-to-t from-pine-950/85 via-pine-950/10 to-transparent" aria-hidden="true" />

          <span class="inline-flex h-9 w-9 items-center justify-center self-start rounded-full bg-white/90 font-display text-xs font-extrabold text-pine-800 backdrop-blur-md">
            {{ String(i + 1).padStart(2, '0') }}
          </span>

          <div class="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
            <h3 class="font-display text-xl font-extrabold leading-tight tracking-[-0.01em]">{{ person.name }}</h3>
            <p class="mt-1 text-sm font-semibold text-sage">{{ person.role }}</p>
            <p class="mt-2 text-sm leading-relaxed text-white/80">{{ person.focus }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSiteData } from '~/composables/useSiteData'

const { instructors } = useSiteData()
</script>
