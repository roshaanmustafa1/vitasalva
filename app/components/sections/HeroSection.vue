<template>
  <section class="overflow-hidden border-b border-line bg-paper">
    <div class="layout-full grid items-center gap-12 pb-16 pt-14 lg:grid-cols-12 lg:pb-24 lg:pt-20">
      <div class="lg:col-span-6">
        <p data-hero class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-signal-deep">
          <span class="h-px w-8 bg-signal" aria-hidden="true" />
          {{ $t('hero.eyebrow') }}
        </p>
        <h1 data-hero class="mt-6 font-display text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-pine-900 sm:text-6xl lg:text-[4.25rem]">
          {{ $t('hero.titleA') }}
          <em class="italic text-signal-deep">{{ $t('hero.titleEm') }}</em>
          {{ $t('hero.titleB') }}
        </h1>
        <p data-hero class="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          {{ $t('hero.lead') }}
        </p>
        <div data-hero class="mt-9 flex flex-wrap items-center gap-4">
          <NuxtLink
            :to="localePath('/termine')"
            class="inline-flex items-center gap-2 rounded-sm bg-pine-900 px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-pine-700"
          >
            {{ $t('hero.ctaFind') }}
            <ArrowRight class="h-4 w-4" />
          </NuxtLink>
          <NuxtLink
            :to="localePath('/leistungen')"
            class="inline-flex items-center gap-2 rounded-sm border border-pine-900/25 bg-white px-7 py-3.5 text-sm font-semibold text-pine-900 transition-colors hover:border-pine-900"
          >
            {{ $t('hero.ctaServices') }}
          </NuxtLink>
        </div>
        <ul data-hero class="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-ink">
          <li class="flex items-center gap-2">
            <GraduationCap class="h-4 w-4 text-signal-deep" /> {{ $t('hero.bullet1') }}
          </li>
          <li class="flex items-center gap-2">
            <Users class="h-4 w-4 text-signal-deep" /> {{ $t('hero.bullet2') }}
          </li>
          <li class="flex items-center gap-2">
            <ShieldCheck class="h-4 w-4 text-signal-deep" /> {{ $t('hero.bullet3') }}
          </li>
        </ul>
      </div>

      <div class="relative lg:col-span-6" data-hero>
        <div class="absolute -right-3 -top-3 h-full w-full border border-signal/50" aria-hidden="true" />
        <img
          ref="heroImg"
          :src="HERO_IMAGE"
          :alt="$t('hero.imgAlt')"
          class="relative aspect-[4/3] w-full object-cover"
          loading="eager"
        />
        <div class="absolute bottom-5 left-5 flex items-center gap-3 bg-pine-900 px-5 py-4 text-paper">
          <CalendarCheck class="h-5 w-5 shrink-0 text-signal" />
          <p class="text-sm leading-snug">
            <span class="font-semibold">{{ $t('hero.cardTitle') }}</span>
            <span class="block text-paper/70">{{ $t('hero.cardText') }}</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useLocalePath } from '#i18n'
import { ArrowRight, CalendarCheck, GraduationCap, ShieldCheck, Users } from '@lucide/vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HERO_IMAGE } from '~/config/courses'

const localePath = useLocalePath()
const heroImg = ref<HTMLImageElement | null>(null)
let heroCtx: gsap.Context | undefined

onMounted(async () => {
  await nextTick()
  heroCtx = gsap.context(() => {
    gsap.from('[data-hero]', {
      opacity: 0,
      y: 24,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      clearProps: 'all',
    })
    if (heroImg.value) {
      gsap.registerPlugin(ScrollTrigger)
      gsap.to(heroImg.value, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: heroImg.value, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }
  })
})

onUnmounted(() => {
  heroCtx?.revert()
})
</script>
