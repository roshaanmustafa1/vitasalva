<template>
  <section class="border-b border-line bg-paper-deep">
    <div class="layout-full py-16 lg:py-24">
      <SectionHeading
        :eyebrow="$t('services.eyebrow')"
        :title="$t('services.title')"
        :lead="$t('services.lead')"
      />

      <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(service, i) in services"
          :key="service.slug"
          data-reveal
          class="group flex flex-col overflow-hidden rounded-xl border transition-shadow hover:shadow-[0_12px_40px_rgba(14,29,18,0.14)]"
          :class="isHighlight(i) ? 'border-pine-900 bg-pine-900 text-white' : 'border-line bg-white'"
        >
          <div
            class="relative flex aspect-[16/10] items-center justify-center overflow-hidden"
            :class="isHighlight(i) ? 'bg-gradient-to-br from-pine-700 to-pine-950' : 'bg-gradient-to-br from-paper-deep to-teal/20'"
            aria-hidden="true"
          >
            <span class="absolute left-4 top-3 font-display text-sm font-bold tracking-wide" :class="isHighlight(i) ? 'text-white/60' : 'text-pine-900/40'">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <span class="absolute -right-6 -top-6 h-28 w-28 rounded-full" :class="isHighlight(i) ? 'bg-white/5' : 'bg-teal/10'" />
            <span class="absolute -bottom-8 -left-8 h-32 w-32 rounded-full" :class="isHighlight(i) ? 'bg-signal/20' : 'bg-pine-900/5'" />
            <span
              class="relative flex h-20 w-20 items-center justify-center rounded-2xl shadow-md transition-transform duration-500 group-hover:scale-105"
              :class="isHighlight(i) ? 'bg-white text-pine-900' : 'bg-white text-pine-900'"
            >
              <component :is="SERVICE_ICONS[service.slug]" class="h-10 w-10" :class="isHighlight(i) ? 'text-signal' : 'text-teal'" />
            </span>
          </div>
          <div class="flex flex-1 flex-col p-5">
            <p class="flex items-center gap-2 text-xs font-medium" :class="isHighlight(i) ? 'text-white/70' : 'text-ink-soft'">
              <Clock class="h-3.5 w-3.5" :class="isHighlight(i) ? 'text-sage' : 'text-teal'" /> {{ service.duration }}
            </p>
            <h3 class="mt-3 font-display text-lg font-bold leading-snug" :class="isHighlight(i) ? 'text-white' : 'text-pine-900'">
              {{ service.title }}
            </h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed" :class="isHighlight(i) ? 'text-white/75' : 'text-ink-soft'">{{ service.description }}</p>
            <NuxtLink
              v-if="isHighlight(i)"
              :to="localePath('/kurse/' + service.slug)"
              class="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-signal px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-signal-deep"
            >
              {{ $t('services.fullCurriculum') }}
            </NuxtLink>
            <NuxtLink
              v-else
              :to="localePath('/kurse/' + service.slug)"
              class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-pine-900 underline-offset-4 hover:text-signal-deep hover:underline"
            >
              {{ $t('common.learnMore') }}
              <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'
import { ArrowRight, Clock } from '@lucide/vue'
import { useSiteData } from '~/composables/useSiteData'
import { SERVICE_ICONS } from '~/config/serviceVisuals'

const localePath = useLocalePath()
const { services } = useSiteData()

/** The last (8th) card is the highlighted navy card. */
const isHighlight = (i: number) => i === services.value.length - 1
</script>
