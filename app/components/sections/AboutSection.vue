<template>
  <section class="border-b border-line bg-white">
    <div class="layout-full grid items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
      <div class="relative lg:col-span-5" data-reveal>
        <div class="absolute -bottom-3 -left-3 h-full w-full border border-signal/50" aria-hidden="true" />
        <img :src="ABOUT_IMAGE" :alt="$t('about.imgAlt')" class="relative aspect-[4/3] w-full object-cover" loading="lazy" />
      </div>
      <div class="lg:col-span-7">
        <SectionHeading
          :eyebrow="$t('about.eyebrow')"
          :title="$t('about.title')"
          :lead="$t('about.lead')"
        />
        <p data-reveal class="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
          {{ $t('about.text') }}
        </p>
        <ul class="mt-8 space-y-5">
          <li v-for="value in values" :key="value.title" data-reveal class="flex gap-4">
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper-deep">
              <component :is="value.icon" class="h-5 w-5 text-signal-deep" />
            </span>
            <div>
              <h3 class="font-display text-lg font-semibold text-pine-900">{{ value.title }}</h3>
              <p class="mt-1 text-sm leading-relaxed text-ink-soft">{{ value.text }}</p>
            </div>
          </li>
        </ul>
        <NuxtLink
          :to="localePath('/ueber-uns')"
          data-reveal
          class="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-pine-900 underline-offset-4 hover:text-signal-deep hover:underline"
        >
          {{ $t('about.link') }}
          <ArrowRight class="h-4 w-4" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'
import { ArrowRight, GraduationCap, ShieldCheck, Users } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { resolveTm } from '~/composables/useSiteData'
import { ABOUT_IMAGE } from '~/config/courses'

const localePath = useLocalePath()
const { tm, rt } = useI18n()

const icons = [ShieldCheck, GraduationCap, Users]

const values = computed(() =>
  (resolveTm<{ title: string, text: string }[]>(tm('about.values'), rt) || []).map((v, i) => ({
    ...v,
    icon: icons[i],
  })),
)
</script>
