<template>
  <div>
    <div class="bg-pine-900 text-paper">
      <div class="layout-full py-16 lg:py-20">
        <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-sage">
          <span class="h-px w-8 bg-sage" aria-hidden="true" /> {{ $t('pages.kontakt.eyebrow') }}
        </p>
        <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          {{ $t('pages.kontakt.title') }}
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-paper/75">
          {{ $t('pages.kontakt.lead') }}
        </p>
      </div>
    </div>

    <section class="border-b border-line bg-paper">
      <div class="layout-full grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div class="lg:col-span-7">
          <form v-if="!sent" class="space-y-5" @submit.prevent="sent = true">
            <div class="grid gap-5 sm:grid-cols-2">
              <label class="block">
                <span class="mb-1.5 block text-sm font-semibold text-ink">{{ $t('pages.kontakt.form.name') }}</span>
                <input
                  v-model="form.name"
                  required
                  type="text"
                  :placeholder="$t('pages.kontakt.form.namePh')"
                  class="w-full rounded-sm border border-line bg-white px-4 py-3 text-sm focus:border-signal focus:outline-none"
                />
              </label>
              <label class="block">
                <span class="mb-1.5 block text-sm font-semibold text-ink">{{ $t('pages.kontakt.form.email') }}</span>
                <input
                  v-model="form.email"
                  required
                  type="email"
                  :placeholder="$t('pages.kontakt.form.emailPh')"
                  class="w-full rounded-sm border border-line bg-white px-4 py-3 text-sm focus:border-signal focus:outline-none"
                />
              </label>
            </div>
            <label class="block">
              <span class="mb-1.5 block text-sm font-semibold text-ink">{{ $t('pages.kontakt.form.subject') }}</span>
              <select
                v-model="form.subject"
                required
                class="w-full rounded-sm border border-line bg-white px-4 py-3 text-sm focus:border-signal focus:outline-none"
              >
                <option v-for="option in subjectOptions" :key="option" :value="option">{{ option }}</option>
              </select>
            </label>
            <label class="block">
              <span class="mb-1.5 block text-sm font-semibold text-ink">{{ $t('pages.kontakt.form.message') }}</span>
              <textarea
                v-model="form.message"
                required
                rows="6"
                :placeholder="$t('pages.kontakt.form.messagePh')"
                class="w-full rounded-sm border border-line bg-white px-4 py-3 text-sm focus:border-signal focus:outline-none"
              />
            </label>
            <button
              type="submit"
              class="inline-flex items-center gap-2 rounded-sm bg-pine-900 px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-pine-700"
            >
              {{ $t('pages.kontakt.form.submit') }}
              <ArrowRight class="h-4 w-4" />
            </button>
            <p class="text-xs leading-relaxed text-ink-soft">
              {{ $t('pages.kontakt.form.demoNote') }}
            </p>
          </form>
          <div v-else class="border border-line bg-white p-8 text-center">
            <CheckCircle2 class="mx-auto h-10 w-10 text-signal-deep" />
            <h2 class="mt-4 font-display text-2xl font-semibold text-pine-900">{{ $t('pages.kontakt.form.thanksTitle') }}</h2>
            <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
              {{ $t('pages.kontakt.form.thanksText') }}
            </p>
            <button
              type="button"
              class="mt-6 inline-flex items-center gap-2 rounded-sm border border-pine-900/25 bg-white px-6 py-3 text-sm font-semibold text-pine-900"
              @click="sent = false"
            >
              {{ $t('pages.kontakt.form.sendAnother') }}
            </button>
          </div>
        </div>

        <aside class="lg:col-span-5">
          <div class="relative">
            <div class="absolute -bottom-3 -right-3 h-full w-full border border-signal/50" aria-hidden="true" />
            <img :src="CONTACT_IMAGE" :alt="$t('pages.kontakt.imgAlt')" class="relative aspect-[4/3] w-full object-cover" loading="lazy" />
          </div>
          <div class="mt-8 border border-line bg-white p-6">
            <h2 class="font-display text-xl font-semibold text-pine-900">{{ $t('pages.kontakt.asideTitle') }}</h2>
            <ul class="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
              <li v-for="(item, i) in asideItems" :key="item" class="flex gap-2.5">
                <component :is="asideIcons[i]" class="mt-0.5 h-4 w-4 shrink-0 text-signal-deep" />
                {{ item }}
              </li>
            </ul>
            <NuxtLink
              :to="localePath('/faq')"
              class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-pine-900 underline-offset-4 hover:text-signal-deep hover:underline"
            >
              {{ $t('pages.kontakt.faqLink') }}
              <ArrowRight class="h-4 w-4" />
            </NuxtLink>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useLocalePath } from '#i18n'
import { ArrowRight, CheckCircle2, Clock, Mail, Users } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { usePageSeo } from '~/composables/usePageSeo'
import { resolveTm } from '~/composables/useSiteData'
import { CONTACT_IMAGE } from '~/config/courses'

usePageSeo('meta.titles.kontakt', 'meta.descriptions.kontakt')

const localePath = useLocalePath()
const { tm, rt } = useI18n()

const subjectOptions = computed(() => resolveTm<string[]>(tm('pages.kontakt.form.subjectOptions'), rt) || [])
const asideItems = computed(() => resolveTm<string[]>(tm('pages.kontakt.asideItems'), rt) || [])
const asideIcons = [Clock, Users, Mail]

const form = reactive({ name: '', email: '', subject: '', message: '' })
const sent = ref(false)

// Default subject once the locale messages are loaded
watch(subjectOptions, (options) => {
  if (!form.subject && options.length) form.subject = options[0]
}, { immediate: true })
</script>
