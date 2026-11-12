<template>
  <section class="bg-paper-deep px-[var(--shell-p)] pb-14 pt-10 lg:pb-20 lg:pt-14">
    <div class="layout-full">
      <ul
        class="grid gap-px overflow-hidden rounded-[var(--r)] border border-line bg-line shadow-[0_18px_50px_-28px_rgba(14,29,18,0.35)] sm:grid-cols-2 lg:grid-cols-4"
      >
        <li
          v-for="(pillar, i) in pillars"
          :key="pillar.title"
          data-reveal
          class="group relative flex flex-col bg-white p-7 transition-colors duration-300 hover:bg-mist/60 lg:p-9"
        >
          <span
            class="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-pine-700 transition-transform duration-500 group-hover:scale-x-100"
            aria-hidden="true"
          />
          <div class="flex items-start justify-between">
            <span
              class="flex h-14 w-14 items-center justify-center rounded-full bg-pine-800 text-white ring-8 ring-pine-800/10 transition-all duration-300 group-hover:bg-pine-700 group-hover:ring-pine-700/20"
            >
              <component :is="pillar.icon" class="h-6 w-6" aria-hidden="true" />
            </span>
            <span class="font-display text-4xl font-extrabold leading-none text-ink/[0.07]" aria-hidden="true">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
          </div>
          <h3 class="mt-7 font-display text-lg font-bold leading-snug text-ink">{{ pillar.title }}</h3>
          <p class="mt-2.5 text-sm leading-relaxed text-ink-soft">{{ pillar.text }}</p>
        </li>
      </ul>

      <p data-reveal class="mt-6 flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
        <Info class="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {{ $t('trust.note') }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Award, Building2, HeartPulse, Info, Stethoscope } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { resolveTm } from '~/composables/useSiteData'

const { tm, rt } = useI18n()

const icons = [Stethoscope, HeartPulse, Award, Building2]

const pillars = computed(() =>
  (resolveTm<{ title: string, text: string }[]>(tm('trust.pillars'), rt) || []).map((p, i) => ({
    ...p,
    icon: icons[i],
  })),
)
</script>
