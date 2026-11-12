<template>
  <div>
    <div class="bg-pine-900 text-paper">
      <div class="layout-full py-16 lg:py-20">
        <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-signal">
          <span class="h-px w-8 bg-signal" aria-hidden="true" /> {{ $t('pages.ueberUns.eyebrow') }}
        </p>
        <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          {{ $t('pages.ueberUns.title') }}
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-paper/75">
          {{ $t('pages.ueberUns.lead') }}
        </p>
      </div>
    </div>

    <section class="border-b border-line bg-paper">
      <div class="layout-full grid items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div class="lg:col-span-7">
          <SectionHeading
            :eyebrow="$t('pages.ueberUns.storyEyebrow')"
            :title="$t('pages.ueberUns.storyTitle')"
            :lead="$t('pages.ueberUns.storyLead')"
          />
          <p data-reveal class="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
            {{ $t('pages.ueberUns.storyText1') }}
          </p>
          <p data-reveal class="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            {{ $t('pages.ueberUns.storyText2') }}
          </p>
        </div>
        <div class="relative lg:col-span-5" data-reveal>
          <div class="absolute -bottom-3 -right-3 h-full w-full border border-signal/50" aria-hidden="true" />
          <img :src="ABOUT_IMAGE" :alt="$t('about.imgAlt')" class="relative aspect-[4/3] w-full object-cover" loading="lazy" />
        </div>
      </div>
    </section>

    <section class="border-b border-line bg-white">
      <div class="layout-full py-16 lg:py-24">
        <SectionHeading
          :eyebrow="$t('pages.ueberUns.missionEyebrow')"
          :title="$t('pages.ueberUns.missionTitle')"
        />
        <div class="mt-12 grid gap-6 md:grid-cols-3">
          <article v-for="value in values" :key="value.title" data-reveal class="border border-line bg-paper p-7">
            <component :is="value.icon" class="h-7 w-7 text-signal-deep" />
            <h3 class="mt-4 font-display text-xl font-semibold text-pine-900">{{ value.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ value.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="border-b border-line bg-paper">
      <div class="layout-full py-16 lg:py-24">
        <SectionHeading
          :eyebrow="$t('pages.ueberUns.approachEyebrow')"
          :title="$t('pages.ueberUns.approachTitle')"
        />
        <ol class="mt-12 grid gap-6 md:grid-cols-3">
          <li v-for="(step, i) in steps" :key="step.title" data-reveal class="border-t-2 border-pine-900 pt-6">
            <p class="font-display text-4xl font-semibold text-signal/80">{{ String(i + 1).padStart(2, '0') }}</p>
            <h3 class="mt-3 font-display text-xl font-semibold text-pine-900">{{ step.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ step.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <FinalCtaSection />
  </div>
</template>

<script setup lang="ts">
import { GraduationCap, ShieldCheck, Users } from '@lucide/vue'
import FinalCtaSection from '~/components/sections/FinalCtaSection.vue'
import { useI18n } from 'vue-i18n'
import { usePageSeo } from '~/composables/usePageSeo'
import { useReveal } from '~/composables/useReveal'
import { resolveTm } from '~/composables/useSiteData'
import { ABOUT_IMAGE } from '~/config/courses'

useReveal()
usePageSeo('meta.titles.ueberUns', 'meta.descriptions.ueberUns')

const { tm, rt } = useI18n()

const valueIcons = [ShieldCheck, GraduationCap, Users]

const values = computed(() =>
  (resolveTm<{ title: string, text: string }[]>(tm('about.values'), rt) || []).map((v, i) => ({
    ...v,
    icon: valueIcons[i],
  })),
)

const steps = computed(() => resolveTm<{ title: string, text: string }[]>(tm('pages.ueberUns.steps'), rt) || [])
</script>
