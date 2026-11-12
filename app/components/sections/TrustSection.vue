<template>
  <section class="border-b border-line bg-white">
    <div class="layout-full py-14">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="pillar in pillars" :key="pillar.title" data-reveal>
          <component :is="pillar.icon" class="h-7 w-7 text-signal-deep" />
          <h3 class="mt-4 font-display text-xl font-semibold text-pine-900">{{ pillar.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ pillar.text }}</p>
        </div>
      </div>
      <p data-reveal class="mt-10 border-t border-line pt-5 text-xs leading-relaxed text-ink-soft">
        {{ $t('trust.note') }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Award, GraduationCap, ShieldCheck, Users } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { resolveTm } from '~/composables/useSiteData'

const { tm, rt } = useI18n()

const icons = [GraduationCap, Users, ShieldCheck, Award]

const pillars = computed(() =>
  (resolveTm<{ title: string, text: string }[]>(tm('trust.pillars'), rt) || []).map((p, i) => ({
    ...p,
    icon: icons[i],
  })),
)
</script>
