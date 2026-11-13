<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-pine-700 to-pine-900 text-white">
    <div class="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full bg-white/5 blur-2xl" aria-hidden="true" />
    <div class="pointer-events-none absolute -bottom-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-teal/20 blur-3xl" aria-hidden="true" />
    <Quote class="pointer-events-none absolute -left-4 top-6 h-56 w-56 text-white/[0.05] lg:left-10 lg:h-72 lg:w-72" aria-hidden="true" />

    <div class="layout-full relative grid items-center gap-12 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
      <!-- Heading + controls -->
      <div class="lg:col-span-5">
        <p data-reveal class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-sage">
          <span class="h-px w-8 bg-sage" aria-hidden="true" />
          {{ $t('testimonials.eyebrow') }}
        </p>
        <h2 data-reveal class="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem]">
          {{ $t('testimonials.title') }}
        </h2>
        <p data-reveal class="mt-4 max-w-md text-base leading-relaxed text-white/75">
          {{ $t('testimonials.lead') }}
        </p>
        <p data-reveal class="mt-4 flex items-center gap-2 text-sm text-white/65">
          <DemoBadge /> {{ $t('testimonials.demoLabel') }}
        </p>

        <div data-reveal class="mt-8 flex items-center gap-5">
          <div class="flex gap-2.5">
            <button
              type="button"
              class="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-pine-900"
              :aria-label="$t('testimonials.prev')"
              @click="prev"
            >
              <ArrowLeft class="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              class="flex h-12 w-12 items-center justify-center rounded-full bg-white text-pine-900 transition-colors hover:bg-mist"
              :aria-label="$t('testimonials.next')"
              @click="next"
            >
              <ArrowRight class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <p class="font-display text-sm font-bold tabular-nums text-white/80" aria-live="polite">
            <span class="text-xl text-white">{{ String(active + 1).padStart(2, '0') }}</span>
            <span class="mx-1 text-white/40">/</span>{{ String(testimonials.length).padStart(2, '0') }}
          </p>
        </div>
      </div>

      <!-- Testimonial cards -->
      <div class="min-w-0 lg:col-span-7" data-reveal>
        <ClientOnly>
          <Swiper
            :modules="[Autoplay, A11y]"
            :slides-per-view="1"
            :space-between="24"
            :loop="true"
            :speed="700"
            :autoplay="{ delay: 6500, disableOnInteraction: false }"
            class="!overflow-hidden"
            @swiper="onSwiper"
            @slide-change="onSlideChange"
          >
            <SwiperSlide v-for="t in testimonials" :key="t.id">
              <figure class="rounded-3xl bg-white p-7 text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-10">
                <span class="flex h-12 w-12 items-center justify-center rounded-full bg-pine-800 text-white">
                  <Quote class="h-5 w-5" aria-hidden="true" />
                </span>
                <blockquote class="mt-6 font-display text-xl font-bold leading-snug tracking-[-0.01em] text-pine-900 sm:text-2xl">
                  {{ quoteOpen }}{{ t.quote }}{{ quoteClose }}
                </blockquote>
                <figcaption class="mt-8 flex items-center gap-4 border-t border-line pt-6">
                  <img
                    :src="t.image"
                    :alt="$t('testimonials.portraitAlt', { name: t.name })"
                    class="h-14 w-14 rounded-full object-cover ring-4 ring-pine-800/10"
                    loading="lazy"
                  />
                  <span class="leading-tight">
                    <span class="block text-base font-bold text-pine-900">{{ t.name }}</span>
                    <span class="mt-1 block text-sm text-ink-soft">{{ t.role }}</span>
                  </span>
                </figcaption>
              </figure>
            </SwiperSlide>
          </Swiper>
          <template #fallback>
            <figure class="rounded-3xl bg-white p-7 text-ink sm:p-10">
              <blockquote class="font-display text-xl font-bold leading-snug text-pine-900 sm:text-2xl">
                {{ quoteOpen }}{{ testimonials[0]?.quote }}{{ quoteClose }}
              </blockquote>
              <figcaption class="mt-6 text-sm font-semibold text-pine-900">{{ testimonials[0]?.name }}</figcaption>
            </figure>
          </template>
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight, Quote } from '@lucide/vue'
import type { Swiper as SwiperType } from 'swiper'
import { A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'
import { useSiteData } from '~/composables/useSiteData'
import 'swiper/css'

const { locale } = useI18n()
const { testimonials } = useSiteData()

/** German quotes: „…“ — English quotes: “…” */
const quoteOpen = computed(() => (locale.value === 'de' ? '„' : '“'))
const quoteClose = computed(() => (locale.value === 'de' ? '“' : '”'))

const active = ref(0)
let swiper: SwiperType | undefined
function onSwiper(instance: SwiperType) {
  swiper = instance
}
function prev() {
  swiper?.slidePrev()
}
function next() {
  swiper?.slideNext()
}
function onSlideChange(instance: SwiperType) {
  active.value = instance.realIndex
}
</script>
