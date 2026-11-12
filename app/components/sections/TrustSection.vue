<template>
  <section class="border-b border-line bg-paper-deep">
    <div class="layout-full py-14">
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="pillar in pillars"
          :key="pillar.title"
          data-reveal
          class="flex flex-col rounded-xl border border-line bg-white p-6 shadow-sm"
        >
          <span class="flex h-12 w-12 items-center justify-center rounded-full bg-teal text-white">
            <component :is="pillar.icon" class="h-6 w-6" aria-hidden="true" />
          </span>
          <h3 class="mt-5 font-display text-lg font-bold leading-snug text-pine-900">{{ pillar.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ pillar.text }}</p>
        </div>
      </div>
      <p data-reveal class="mt-8 text-xs leading-relaxed text-ink-soft">
        {{ $t('trust.note') }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Award, Building2, HeartPulse, Stethoscope } from '@lucide/vue'
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
