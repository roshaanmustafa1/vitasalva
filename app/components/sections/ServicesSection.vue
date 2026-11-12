<template>
  <section class="border-b border-line bg-paper">
    <div class="layout-full py-16 lg:py-24">
      <SectionHeading
        :eyebrow="$t('services.eyebrow')"
        :title="$t('services.title')"
        :lead="$t('services.lead')"
      />

      <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="service in services"
          :key="service.slug"
          data-reveal
          class="group flex flex-col border border-line bg-white transition-shadow hover:shadow-[0_12px_40px_rgba(12,43,37,0.10)]"
        >
          <div class="overflow-hidden">
            <img
              :src="service.image"
              :alt="service.title"
              class="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
          </div>
          <div class="flex flex-1 flex-col p-6">
            <p class="flex items-center gap-2 text-xs font-medium text-ink-soft">
              <Clock class="h-3.5 w-3.5 text-signal-deep" /> {{ service.duration }}
              <span aria-hidden="true">·</span>
              {{ service.audience }}
            </p>
            <h3 class="mt-3 font-display text-2xl font-semibold leading-snug text-pine-900">
              {{ service.title }}
            </h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{{ service.description }}</p>
            <NuxtLink
              :to="localePath(`/kurse/${service.slug}`)"
              class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-pine-900 underline-offset-4 hover:text-signal-deep hover:underline"
            >
              {{ $t('common.learnMore') }}
              <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </NuxtLink>
          </div>
        </article>

        <NuxtLink
          :to="localePath('/unternehmen')"
          data-reveal
          class="group flex min-h-[280px] flex-col justify-between bg-pine-900 p-6 text-paper transition-colors hover:bg-pine-800"
        >
          <Building2 class="h-8 w-8 text-signal" />
          <div>
            <h3 class="font-display text-2xl font-semibold leading-snug">{{ $t('services.corporateTitle') }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-paper/70">
              {{ $t('services.corporateText') }}
            </p>
            <span class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-signal">
              {{ $t('services.corporateCta') }}
              <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'
import { ArrowRight, Building2, Clock } from '@lucide/vue'
import { useSiteData } from '~/composables/useSiteData'

const localePath = useLocalePath()
const { services } = useSiteData()
</script>
