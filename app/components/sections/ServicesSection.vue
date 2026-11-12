<template>
  <section class="bg-paper-deep">
    <div class="layout-full py-12 lg:py-20">
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

      <div
        class="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8"
        @mouseenter="paused = true"
        @mouseleave="paused = false"
        @focusin="paused = true"
        @focusout="paused = false"
      >
        <!-- Photo that follows the open field area -->
        <div
          class="relative isolate h-80 overflow-hidden rounded-3xl bg-pine-900 shadow-[0_30px_60px_-34px_rgba(14,29,18,0.6)] sm:h-96 lg:sticky lg:top-24 lg:h-[34rem] lg:self-start"
          data-reveal
        >
          <img
            v-for="(service, i) in services"
            :key="service.slug"
            :src="service.image"
            alt=""
            class="absolute inset-0 -z-10 h-full w-full object-cover transition-all duration-700"
            :class="active === i ? 'scale-100 opacity-100' : 'scale-105 opacity-0'"
            :loading="i === 0 ? 'eager' : 'lazy'"
          />
          <div class="absolute inset-0 -z-0 bg-gradient-to-t from-pine-950/60 via-transparent to-pine-950/25" aria-hidden="true" />

          <div class="absolute inset-x-5 top-5 flex items-start justify-between">
            <span class="rounded-2xl bg-white px-4 py-2 font-display text-2xl font-extrabold leading-none text-pine-800 shadow-lg">
              {{ String(active + 1).padStart(2, '0') }}
              <span class="text-sm font-bold text-ink-soft">/ {{ String(services.length).padStart(2, '0') }}</span>
            </span>
            <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-pine-800 shadow-lg">
              <component :is="SERVICE_ICONS[current.slug]" class="h-6 w-6" aria-hidden="true" />
            </span>
          </div>

          <div class="absolute inset-x-5 bottom-5 flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-pine-900 shadow">
              <Clock class="h-4 w-4 text-pine-700" aria-hidden="true" /> {{ current.duration }}
            </span>
            <span class="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-pine-900 shadow">
              <ShieldCheck class="h-4 w-4 text-pine-700" aria-hidden="true" /> {{ $t('finder.validity') }}
            </span>
          </div>
        </div>

        <!-- Accordion -->
        <ul class="space-y-2.5" data-reveal>
          <li
            v-for="(service, i) in services"
            :key="service.slug"
            class="overflow-hidden rounded-2xl border bg-white transition-all duration-300"
            :class="active === i ? 'border-pine-700/30 shadow-[0_18px_40px_-24px_rgba(14,29,18,0.45)]' : 'border-line hover:border-pine-700/30'"
          >
            <h3>
              <button
                type="button"
                class="flex w-full items-center gap-4 px-5 py-4 text-left"
                :aria-expanded="active === i"
                :aria-controls="'field-panel-' + i"
                @click="select(i)"
              >
                <span
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-extrabold transition-colors duration-300"
                  :class="active === i ? 'bg-pine-800 text-white' : 'bg-paper-deep text-pine-800'"
                >
                  {{ String(i + 1).padStart(2, '0') }}
                </span>
                <span class="flex-1 font-display text-base font-bold leading-snug text-pine-900 sm:text-lg">
                  {{ service.title }}
                </span>
                <ChevronDown
                  class="h-5 w-5 shrink-0 text-pine-700 transition-transform duration-300"
                  :class="active === i ? 'rotate-180' : ''"
                  aria-hidden="true"
                />
              </button>
            </h3>

            <div
              :id="'field-panel-' + i"
              class="grid transition-[grid-template-rows] duration-300 ease-out"
              :class="active === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
              role="region"
            >
              <div class="min-h-0 overflow-hidden">
                <div class="px-5 pb-5 sm:pl-[4.75rem]">
                  <p class="text-[15px] leading-relaxed text-ink-soft">{{ service.description }}</p>

                  <ul class="mt-4 grid gap-x-5 gap-y-2 sm:grid-cols-2">
                    <li v-for="point in service.highlights" :key="point" class="flex items-start gap-2.5 text-sm text-ink">
                      <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pine-800 text-white">
                        <Check class="h-3 w-3" stroke-width="3" aria-hidden="true" />
                      </span>
                      {{ point }}
                    </li>
                  </ul>

                  <div class="mt-4 flex flex-wrap gap-2 text-[13px] font-semibold text-pine-900">
                    <span class="inline-flex items-center gap-1.5 rounded-full bg-paper-deep px-3 py-1.5">
                      <Users class="h-3.5 w-3.5 text-pine-700" aria-hidden="true" /> {{ service.audience }}
                    </span>
                    <span class="inline-flex items-center gap-1.5 rounded-full bg-paper-deep px-3 py-1.5">
                      <MapPin class="h-3.5 w-3.5 text-pine-700" aria-hidden="true" /> {{ service.format }}
                    </span>
                  </div>

                  <AppButton :to="localePath('/kurse/' + service.slug)" size="sm" class="mt-5">
                    {{ $t('services.fullCurriculum') }}
                  </AppButton>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useLocalePath } from '#i18n'
import { ArrowRight, Check, ChevronDown, Clock, MapPin, ShieldCheck, Users } from '@lucide/vue'
import { useSiteData } from '~/composables/useSiteData'
import { SERVICE_ICONS } from '~/config/serviceVisuals'

const AUTO_MS = 7000

const localePath = useLocalePath()
const { services } = useSiteData()

const active = ref(0)
const paused = ref(false)
const current = computed(() => services.value[active.value] ?? services.value[0]!)

function select(i: number) {
  active.value = i
}

let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    if (!paused.value && services.value.length) active.value = (active.value + 1) % services.value.length
  }, AUTO_MS)
})
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>
