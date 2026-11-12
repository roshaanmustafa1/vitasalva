<template>
  <div>
    <template v-if="service">
      <div class="relative overflow-hidden bg-pine-900 text-paper">
        <div class="absolute inset-0 bg-gradient-to-br from-pine-800 to-pine-950" aria-hidden="true" />
        <div class="layout-full relative py-16 lg:py-24">
          <NuxtLink
            :to="localePath('/leistungen')"
            class="inline-flex items-center gap-2 text-sm font-medium text-paper/75 transition-colors hover:text-paper"
          >
            <ArrowLeft class="h-4 w-4" /> {{ $t('pages.kurse.backToServices') }}
          </NuxtLink>
          <p class="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-sage">
            <span class="h-px w-8 bg-sage" aria-hidden="true" /> {{ $t('pages.kurse.eyebrow') }}
            <DemoBadge />
          </p>
          <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {{ service.title }}
          </h1>
          <p class="mt-4 max-w-2xl text-base leading-relaxed text-paper/80">{{ service.description }}</p>
        </div>
      </div>

      <section class="border-b border-line bg-paper">
        <div class="layout-full grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
          <div class="lg:col-span-7">
            <h2 class="font-display text-3xl font-semibold text-pine-900">{{ $t('pages.kurse.learnTitle') }}</h2>
            <ul class="mt-7 space-y-4">
              <li v-for="point in service.highlights" :key="point" class="flex items-start gap-3">
                <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal/15">
                  <Check class="h-3.5 w-3.5 text-signal-deep" />
                </span>
                <span class="text-base leading-relaxed text-ink">{{ point }}</span>
              </li>
            </ul>
            <p class="mt-8 border-l-2 border-signal bg-white p-5 text-sm leading-relaxed text-ink-soft">
              {{ $t('pages.kurse.note') }}
            </p>
          </div>

          <aside class="lg:col-span-5">
            <div class="border border-line bg-white p-7">
              <h2 class="font-display text-xl font-semibold text-pine-900">{{ $t('pages.kurse.atGlance') }}</h2>
              <dl class="mt-5 space-y-4 text-sm">
                <div class="flex items-start gap-3 border-b border-line pb-4">
                  <Clock class="mt-0.5 h-4 w-4 shrink-0 text-signal-deep" />
                  <div>
                    <dt class="font-semibold text-ink">{{ $t('pages.kurse.duration') }}</dt>
                    <dd class="text-ink-soft">{{ service.duration }} {{ $t('pages.kurse.durationDemo') }}</dd>
                  </div>
                </div>
                <div class="flex items-start gap-3 border-b border-line pb-4">
                  <Users class="mt-0.5 h-4 w-4 shrink-0 text-signal-deep" />
                  <div>
                    <dt class="font-semibold text-ink">{{ $t('pages.kurse.targetGroup') }}</dt>
                    <dd class="text-ink-soft">{{ service.audience }}</dd>
                  </div>
                </div>
                <div class="flex items-start gap-3 border-b border-line pb-4">
                  <Languages class="mt-0.5 h-4 w-4 shrink-0 text-signal-deep" />
                  <div>
                    <dt class="font-semibold text-ink">{{ $t('pages.kurse.language') }}</dt>
                    <dd class="text-ink-soft">{{ $t('pages.kurse.languageValue') }}</dd>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <Award class="mt-0.5 h-4 w-4 shrink-0 text-signal-deep" />
                  <div>
                    <dt class="font-semibold text-ink">{{ $t('pages.kurse.certificate') }}</dt>
                    <dd class="text-ink-soft">{{ $t('pages.kurse.certificateText') }}</dd>
                  </div>
                </div>
              </dl>
              <AppButton :to="localePath('/termine')" block class="mt-7">{{ $t('pages.kurse.findDate') }}</AppButton>
            </div>
          </aside>
        </div>
      </section>

      <section v-if="courses.length" class="border-b border-line bg-white">
        <div class="layout-full py-16 lg:py-20">
          <div class="flex flex-wrap items-end justify-between gap-4">
            <h2 class="font-display text-3xl font-semibold text-pine-900">{{ $t('pages.kurse.nextDates') }}</h2>
            <DemoBadge />
          </div>
          <div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <article v-for="course in courses" :key="course.id" class="border border-line bg-paper p-5">
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-signal-deep">{{ course.dateLabel }}</p>
              <h3 class="mt-2 font-display text-lg font-semibold text-pine-900">{{ course.title }}</h3>
              <p class="mt-2 flex items-center gap-2 text-sm text-ink-soft">
                <MapPin class="h-4 w-4 text-signal-deep" /> {{ course.city }} · {{ course.durationLabel }} ·
                {{ $t('upcoming.spotsFree', { n: course.spotsLeft }) }}
              </p>
              <NuxtLink
                :to="localePath(`/termine?kurs=${course.id}`)"
                class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-pine-900 underline-offset-4 hover:text-signal-deep hover:underline"
              >
                {{ $t('common.bookNow') }}
                <ArrowRight class="h-4 w-4" />
              </NuxtLink>
            </article>
          </div>
        </div>
      </section>
    </template>

    <div v-else class="layout-full py-24 text-center">
      <h1 class="font-display text-4xl font-semibold text-pine-900">{{ $t('pages.kurse.notFoundTitle') }}</h1>
      <p class="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-soft">
        {{ $t('pages.kurse.notFoundText') }}
      </p>
      <AppButton :to="localePath('/leistungen')" class="mt-8">{{ $t('pages.kurse.viewAllServices') }}</AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocaleHead, useLocalePath } from '#i18n'
import { ArrowLeft, ArrowRight, Award, Check, Clock, Languages, MapPin, Users } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { useSiteData } from '~/composables/useSiteData'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const i18nHead = useLocaleHead({ seo: true })
const { serviceBySlug, coursesForService } = useSiteData()

const slug = computed(() => String(route.params.slug))
const service = computed(() => serviceBySlug(slug.value))
const courses = computed(() => coursesForService(slug.value))

useHead(() => ({
  title: service.value ? `${service.value.title} – VITASALVA` : t('meta.titles.courseNotFound'),
  htmlAttrs: { lang: i18nHead.value.htmlAttrs.lang },
  link: [...(i18nHead.value.link || [])],
  meta: [
    ...(i18nHead.value.meta || []),
    { name: 'description', content: service.value?.description ?? t('meta.descriptions.leistungen') },
  ],
}))
</script>
