<template>
  <section class="flex min-h-[100svh] flex-col bg-white">
    <div class="flex flex-1 flex-col rounded-[calc(var(--r)+var(--shell-p))] bg-white p-[var(--shell-p)]">
      <div class="relative isolate grid flex-1 grid-cols-[minmax(0,1fr)] grid-rows-[1fr] overflow-hidden rounded-[var(--r)] bg-mist">
        <!-- Slider: background photo + copy change together per slide -->
        <Swiper
          class="hero-swiper col-start-1 row-start-1 w-full min-w-0 max-w-full"
          :modules="modules"
          effect="fade"
          :fade-effect="{ crossFade: true }"
          :loop="true"
          :speed="900"
          :autoplay="{ delay: AUTOPLAY_MS, disableOnInteraction: false, pauseOnMouseEnter: false }"
          :a11y="{ enabled: true }"
          @swiper="onSwiper"
          @slide-change="onSlideChange"
        >
          <SwiperSlide v-for="(slide, i) in slides" :key="slide.id" class="hero-slide">
            <img
              :src="slide.image"
              :alt="slide.imgAlt"
              class="hero-photo absolute inset-0 -z-20 h-full w-full object-cover lg:left-auto lg:w-[54%]"
              :style="{ objectPosition: slide.position }"
              :loading="i === 0 ? 'eager' : 'lazy'"
            />
            <div class="hero-fade absolute inset-0 -z-10" aria-hidden="true" />

            <div
              class="relative flex h-full flex-col px-6 pb-44 pt-[calc(var(--hdr-h)+2.5rem)] sm:px-10 lg:px-16 lg:pb-36"
            >
              <div class="max-w-[42rem]">
                <p
                  class="hero-anim flex items-center gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-ink-soft sm:text-xs"
                  style="--i: 0"
                >
                  {{ slide.eyebrow }}
                  <span class="hidden h-px w-24 bg-ink-soft/40 sm:block" aria-hidden="true" />
                </p>
                <component
                  :is="i === 0 ? 'h1' : 'h2'"
                  class="hero-anim mt-6 font-display text-[2.35rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3rem]"
                  style="--i: 1"
                >
                  <span class="block">{{ slide.titleA }}</span>
                  <span class="block text-pine-700">{{ slide.titleB }}</span>
                </component>
                <p class="hero-anim mt-6 max-w-md text-base leading-relaxed text-ink-soft lg:text-lg" style="--i: 2">
                  {{ slide.lead }}
                </p>
                <NuxtLink
                  :to="localePath(slide.to)"
                  class="hero-anim mt-8 inline-flex items-center gap-5 rounded-full bg-pine-800 py-2 pl-7 pr-2 text-sm font-semibold text-white transition-colors hover:bg-pine-900"
                  style="--i: 3"
                >
                  {{ slide.cta }}
                  <span class="flex h-11 w-11 items-center justify-center rounded-full bg-white text-pine-900">
                    <ArrowUpRight class="h-4 w-4" aria-hidden="true" />
                  </span>
                </NuxtLink>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div class="hero-fade-top pointer-events-none absolute inset-x-0 top-0 z-10 h-44" aria-hidden="true" />

        <!-- Bottom row: stats (left) + the 3 slides as controls (right) -->
        <div
          class="pointer-events-none relative z-10 col-start-1 row-start-1 flex flex-col justify-end px-6 pb-8 sm:px-10 lg:px-16 lg:pb-10"
        >
          <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <ul data-hero class="pointer-events-auto flex flex-wrap gap-y-4">
            <li
              v-for="(stat, i) in stats"
              :key="stat.title"
              class="flex items-center gap-3 pr-6 sm:pr-8"
              :class="i > 0 ? 'border-l border-ink/15 pl-6 sm:pl-8' : ''"
            >
              <component :is="statIcons[i]" class="h-7 w-7 shrink-0 text-ink-soft" aria-hidden="true" />
              <span class="leading-tight">
                <span class="block text-sm font-bold text-ink">{{ stat.title }}</span>
                <span class="block text-xs text-ink-soft">{{ stat.text }}</span>
              </span>
            </li>
          </ul>

          <div data-hero class="pointer-events-auto flex gap-3.5" role="tablist" :aria-label="$t('hero.slidesLabel')">
            <button
              v-for="(slide, i) in slides"
              :key="slide.id"
              type="button"
              role="tab"
              :aria-selected="active === i"
              :aria-label="slide.tab"
              class="relative h-14 w-14 shrink-0 rounded-full transition-transform sm:h-16 sm:w-16"
              :class="active === i ? 'scale-105' : 'opacity-75 hover:opacity-100'"
              @click="goTo(i)"
            >
              <img
                :src="slide.image"
                alt=""
                class="absolute inset-[5px] h-[calc(100%-10px)] w-[calc(100%-10px)] rounded-full border-2 border-white object-cover shadow-md"
                :style="{ objectPosition: slide.position }"
                loading="lazy"
              />
              <svg
                v-if="active === i"
                :key="progressKey"
                class="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <circle cx="50" cy="50" r="46" fill="none" stroke-width="5" class="stroke-pine-700/20" />
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke-width="5"
                  stroke-linecap="round"
                  pathLength="100"
                  stroke-dasharray="100"
                  class="hero-ring stroke-pine-700"
                  :style="{ animationDuration: AUTOPLAY_MS + 'ms' }"
                />
              </svg>
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, nextTick, ref } from 'vue'
import { useLocalePath } from '#i18n'
import { ArrowUpRight, ShieldCheck, Stethoscope, Users } from '@lucide/vue'
import { gsap } from 'gsap'
import { A11y, Autoplay, EffectFade } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'
import { resolveTm } from '~/composables/useSiteData'
import { HERO_SLIDES } from '~/config/courses'
import 'swiper/css'
import 'swiper/css/effect-fade'

interface SlideCopy {
  tab: string
  eyebrow: string
  titleA: string
  titleB: string
  lead: string
  cta: string
  imgAlt: string
}

const AUTOPLAY_MS = 4500
const modules = [Autoplay, EffectFade, A11y]

const localePath = useLocalePath()
const { tm, rt } = useI18n()

const statIcons = [Users, Stethoscope, ShieldCheck]
const stats = computed(() => resolveTm<{ title: string, text: string }[]>(tm('hero.stats'), rt) || [])

/** Structural data (image, link) from config merged with translated copy from the locale files. */
const slides = computed(() => {
  const copy = resolveTm<SlideCopy[]>(tm('hero.slides'), rt) || []
  return HERO_SLIDES.map((s, i) => ({
    ...s,
    ...(copy[i] || { tab: '', eyebrow: '', titleA: '', titleB: '', lead: '', cta: '', imgAlt: '' }),
  }))
})

const active = ref(0)
const progressKey = ref(0)
let swiper: SwiperType | undefined

function onSwiper(instance: SwiperType) {
  swiper = instance
}
function onSlideChange(instance: SwiperType) {
  active.value = instance.realIndex
  progressKey.value++
}
function goTo(i: number) {
  progressKey.value++
  swiper?.slideToLoop(i)
  swiper?.autoplay?.start()
}

let heroCtx: gsap.Context | undefined

onMounted(async () => {
  await nextTick()
  heroCtx = gsap.context(() => {
    gsap.from('[data-hero]', {
      opacity: 0,
      y: 24,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.1,
      clearProps: 'all',
    })
  })
})

onUnmounted(() => {
  heroCtx?.revert()
})
</script>
