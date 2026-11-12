<template>
  <section class="border-b border-line bg-white">
    <div class="layout-full py-16 lg:py-24">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          :eyebrow="$t('testimonials.eyebrow')"
          :title="$t('testimonials.title')"
          :lead="$t('testimonials.lead')"
        />
        <p data-reveal class="flex items-center gap-2 text-sm text-ink-soft">
          <DemoBadge /> {{ $t('testimonials.demoLabel') }}
        </p>
      </div>

      <ClientOnly>
        <Swiper
          data-reveal
          :modules="[Pagination, Autoplay]"
          :slides-per-view="1"
          :space-between="24"
          :autoplay="{ delay: 6000, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
          class="mt-12 pb-12"
        >
          <SwiperSlide v-for="t in testimonials" :key="t.id">
            <figure class="mx-auto max-w-3xl text-center">
              <Quote class="mx-auto h-8 w-8 text-signal" aria-hidden="true" />
              <blockquote class="mt-6 font-display text-2xl font-medium leading-snug text-pine-900 sm:text-[1.9rem]">
                {{ quoteOpen }}{{ t.quote }}{{ quoteClose }}
              </blockquote>
              <figcaption class="mt-7 flex items-center justify-center gap-3">
                <img :src="t.image" :alt="$t('testimonials.portraitAlt', { name: t.name })" class="h-11 w-11 rounded-full object-cover" loading="lazy" />
                <span class="text-left">
                  <span class="block text-sm font-semibold text-ink">{{ t.name }}</span>
                  <span class="block text-sm text-ink-soft">{{ t.role }}</span>
                </span>
              </figcaption>
            </figure>
          </SwiperSlide>
        </Swiper>
        <template #fallback>
          <figure class="mx-auto mt-12 max-w-3xl pb-12 text-center">
            <blockquote class="font-display text-2xl font-medium leading-snug text-pine-900">
              {{ quoteOpen }}{{ testimonials[0]?.quote }}{{ quoteClose }}
            </blockquote>
            <figcaption class="mt-7 text-sm font-semibold text-ink">{{ testimonials[0]?.name }}</figcaption>
          </figure>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Quote } from '@lucide/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'
import { useSiteData } from '~/composables/useSiteData'
import 'swiper/css'
import 'swiper/css/pagination'

const { locale } = useI18n()
const { testimonials } = useSiteData()

/** German quotes: „…“ — English quotes: “…” */
const quoteOpen = computed(() => (locale.value === 'de' ? '„' : '“'))
const quoteClose = computed(() => (locale.value === 'de' ? '“' : '”'))
</script>
