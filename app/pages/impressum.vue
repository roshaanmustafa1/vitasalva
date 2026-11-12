<template>
  <div>
    <div class="bg-pine-900 text-paper">
      <div class="layout-full py-16 lg:py-20">
        <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-signal">
          <span class="h-px w-8 bg-signal" aria-hidden="true" /> {{ $t('pages.impressum.eyebrow') }}
        </p>
        <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">{{ $t('pages.impressum.title') }}</h1>
      </div>
    </div>

    <section class="border-b border-line bg-paper">
      <div class="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <div class="border border-signal/40 bg-signal/10 p-5 text-sm leading-relaxed text-ink">
          <strong>{{ $t('pages.impressum.musterTitle') }}</strong>
          {{ $t('pages.impressum.musterText') }}
        </div>

        <div class="prose-vita mt-10">
          <template v-for="section in sections" :key="section.h">
            <h2>{{ section.h }}</h2>
            <p v-for="(para, i) in section.p" :key="i" class="whitespace-pre-line">{{ para }}</p>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { usePageSeo } from '~/composables/usePageSeo'
import { resolveTm } from '~/composables/useSiteData'

usePageSeo('meta.titles.impressum', 'meta.descriptions.impressum')

const { tm, rt } = useI18n()

const sections = computed(
  () => resolveTm<{ h: string, p: string[] }[]>(tm('pages.impressum.sections'), rt) || [],
)
</script>

<style scoped>
.prose-vita h2 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  color: #0c2b25;
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
}
.prose-vita h2:first-child {
  margin-top: 0;
}
.prose-vita p {
  font-size: 1rem;
  line-height: 1.7;
  color: #4a5753;
}
</style>
