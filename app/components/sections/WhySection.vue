<template>
  <section class="border-b border-line bg-paper">
    <div class="layout-full grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
      <div class="lg:col-span-4">
        <SectionHeading
          :eyebrow="$t('why.eyebrow')"
          :title="$t('why.title')"
        />
      </div>
      <ol class="lg:col-span-8">
        <li
          v-for="(item, i) in reasons"
          :key="item.title"
          data-reveal
          class="flex gap-6 border-t border-line py-7 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-7"
        >
          <span class="font-display text-4xl font-semibold leading-none text-signal/80">
            {{ String(i + 1).padStart(2, '0') }}
          </span>
          <div>
            <h3 class="font-display text-2xl font-semibold text-pine-900">{{ item.title }}</h3>
            <p class="mt-2 max-w-xl text-base leading-relaxed text-ink-soft">{{ item.text }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { resolveTm } from '~/composables/useSiteData'

const { tm, rt } = useI18n()

const reasons = computed(() => resolveTm<{ title: string, text: string }[]>(tm('why.reasons'), rt) || [])
</script>
