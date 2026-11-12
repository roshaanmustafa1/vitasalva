<template>
  <section class="border-b border-line bg-white">
    <div class="layout-full py-16 lg:py-24">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          :eyebrow="$t('instructors.eyebrow')"
          :title="$t('instructors.title')"
          :lead="$t('instructors.lead')"
        />
        <p data-reveal class="flex items-center gap-2 text-sm text-ink-soft">
          <DemoBadge /> {{ $t('instructors.demoLabel') }}
        </p>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <article v-for="person in instructors" :key="person.id" data-reveal class="group border border-line bg-paper">
          <div class="overflow-hidden">
            <img
              :src="person.image"
              :alt="$t('instructors.portraitAlt', { name: person.name })"
              class="aspect-[4/5] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
          <div class="p-6">
            <h3 class="font-display text-xl font-semibold text-pine-900">{{ person.name }}</h3>
            <p class="mt-1 text-sm font-semibold text-signal-deep">{{ person.role }}</p>
            <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ person.focus }}</p>
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
