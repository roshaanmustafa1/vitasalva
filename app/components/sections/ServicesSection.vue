<template>
  <section class="bg-paper-deep">
    <div class="layout-full py-12 lg:py-16">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          :eyebrow="$t('services.eyebrow')"
          :title="$t('services.title')"
          :lead="$t('services.lead')"
        />
        <NuxtLink
          :to="localePath('/leistungen')"
          data-reveal
          class="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-pine-800 underline-offset-4 hover:underline"
        >
          {{ $t('common.viewAllServices') }}
          <ArrowRight class="h-4 w-4" aria-hidden="true" />
        </NuxtLink>
      </div>

      <!-- Photo bento grid: tile footprint is defined once in TILE_SPANS (below) -->
      <div class="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:auto-rows-[11.5rem] lg:grid-cols-4 lg:gap-4">
        <NuxtLink
          v-for="tile in tiles"
          :key="tile.slug"
          :to="localePath('/kurse/' + tile.slug)"
          data-reveal
          class="group relative isolate flex min-h-[12rem] flex-col justify-between overflow-hidden rounded-3xl bg-pine-900 p-5 text-white transition-shadow duration-300 hover:shadow-[0_26px_50px_-24px_rgba(14,29,18,0.7)] lg:p-6"
          :class="tile.span"
        >
          <img
            :src="tile.image"
            alt=""
            class="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div
            class="absolute inset-0 -z-10 bg-gradient-to-t from-pine-950/90 via-pine-950/35 to-pine-950/10 transition-opacity duration-300 group-hover:from-pine-900/95"
            aria-hidden="true"
          />

          <div class="flex items-start justify-between gap-3">
            <span class="font-display text-sm font-extrabold tabular-nums text-white/80">
              {{ String(tile.index + 1).padStart(2, '0') }}
            </span>
            <span class="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/25 bg-white/15 backdrop-blur-md">
              <component :is="SERVICE_ICONS[tile.slug]" class="h-5 w-5" aria-hidden="true" />
            </span>
          </div>

          <div>
            <h3
              class="font-display font-extrabold leading-snug tracking-[-0.01em]"
              :class="tile.big ? 'text-2xl lg:text-[1.75rem]' : 'text-base lg:text-[1.05rem]'"
            >
              {{ tile.title }}
            </h3>
            <p v-if="tile.big || tile.wide" class="mt-2 max-w-sm text-sm leading-relaxed text-white/80">
              {{ tile.description }}
            </p>
            <ul v-if="tile.big" class="mt-4 space-y-1.5">
              <li v-for="point in tile.highlights.slice(0, 3)" :key="point" class="flex items-center gap-2 text-sm text-white/85">
                <Check class="h-3.5 w-3.5 shrink-0 text-sage" stroke-width="3" aria-hidden="true" /> {{ point }}
              </li>
            </ul>
            <div class="mt-3 flex items-center justify-between gap-3">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                <Clock class="h-3.5 w-3.5" aria-hidden="true" /> {{ tile.duration }}
              </span>
              <span
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-pine-900 transition-transform duration-300 group-hover:rotate-45"
              >
                <ArrowUpRight class="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'
import { ArrowRight, ArrowUpRight, Check, Clock } from '@lucide/vue'
import { useSiteData } from '~/composables/useSiteData'
import { SERVICE_ICONS } from '~/config/serviceVisuals'

/** Tile footprint per position (repeats if more modules are added). Literal classes so Tailwind can see them. */
const TILE_SPANS: { span: string, big?: boolean, wide?: boolean }[] = [
  { span: 'lg:col-span-2 lg:row-span-2', big: true },
  { span: '' },
  { span: '' },
  { span: '' },
  { span: '' },
  { span: '' },
  { span: 'lg:col-span-2', wide: true },
  { span: '' },
]

const localePath = useLocalePath()
const { services } = useSiteData()

const tiles = computed(() =>
  services.value.map((s, i) => {
    const layout = TILE_SPANS[i % TILE_SPANS.length]!
    return { ...s, index: i, span: layout.span, big: !!layout.big, wide: !!layout.wide }
  }),
)
</script>
