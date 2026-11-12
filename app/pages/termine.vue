<template>
  <div>
    <div class="bg-pine-900 text-paper">
      <div class="layout-full py-16 lg:py-20">
        <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-sage">
          <span class="h-px w-8 bg-sage" aria-hidden="true" /> {{ $t('pages.termine.eyebrow') }}
        </p>
        <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          {{ $t('pages.termine.title') }}
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-paper/75">
          {{ $t('pages.termine.lead') }}
        </p>
      </div>
    </div>

    <CourseFinderSection />

    <section class="border-b border-line bg-white">
      <div class="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <SectionHeading
          :eyebrow="$t('pages.termine.formEyebrow')"
          :title="$t('pages.termine.formTitle')"
          :lead="$t('pages.termine.formLead')"
        />

        <form v-if="!sent" class="mt-10 space-y-5" @submit.prevent="submit">
          <div class="grid gap-5 sm:grid-cols-2">
            <label class="block">
              <span class="mb-1.5 block text-sm font-semibold text-ink">{{ $t('pages.termine.form.name') }}</span>
              <input
                v-model="form.name"
                required
                type="text"
                :placeholder="$t('pages.termine.form.namePh')"
                class="w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm focus:border-signal focus:outline-none"
              />
            </label>
            <label class="block">
              <span class="mb-1.5 block text-sm font-semibold text-ink">{{ $t('pages.termine.form.email') }}</span>
              <input
                v-model="form.email"
                required
                type="email"
                :placeholder="$t('pages.termine.form.emailPh')"
                class="w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm focus:border-signal focus:outline-none"
              />
            </label>
          </div>
          <label class="block">
            <span class="mb-1.5 block text-sm font-semibold text-ink">{{ $t('pages.termine.form.course') }}</span>
            <select
              v-model="form.courseId"
              required
              class="w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm focus:border-signal focus:outline-none"
            >
              <option value="" disabled>{{ $t('pages.termine.form.chooseOption') }}</option>
              <option v-for="c in courses" :key="c.id" :value="c.id">
                {{ c.title }} – {{ c.dateLabel }}, {{ c.city }}
              </option>
            </select>
          </label>
          <div class="grid gap-5 sm:grid-cols-2">
            <label class="block">
              <span class="mb-1.5 block text-sm font-semibold text-ink">{{ $t('pages.termine.form.persons') }}</span>
              <input
                v-model.number="form.persons"
                required
                type="number"
                min="1"
                max="50"
                class="w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm focus:border-signal focus:outline-none"
              />
            </label>
            <label class="block">
              <span class="mb-1.5 block text-sm font-semibold text-ink">{{ $t('pages.termine.form.company') }}</span>
              <input
                v-model="form.company"
                type="text"
                :placeholder="$t('pages.termine.form.companyPh')"
                class="w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm focus:border-signal focus:outline-none"
              />
            </label>
          </div>
          <label class="block">
            <span class="mb-1.5 block text-sm font-semibold text-ink">{{ $t('pages.termine.form.message') }}</span>
            <textarea
              v-model="form.message"
              rows="4"
              :placeholder="$t('pages.termine.form.messagePh')"
              class="w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm focus:border-signal focus:outline-none"
            />
          </label>
          <button
            type="submit"
            class="inline-flex items-center gap-2 rounded-sm bg-pine-900 px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-pine-700"
          >
            {{ $t('pages.termine.form.submit') }}
            <ArrowRight class="h-4 w-4" />
          </button>
          <p class="text-xs leading-relaxed text-ink-soft">
            {{ $t('pages.termine.form.demoNote') }}
          </p>
        </form>

        <div v-else class="mt-10 border border-line bg-paper p-8 text-center">
          <CheckCircle2 class="mx-auto h-10 w-10 text-signal-deep" />
          <h2 class="mt-4 font-display text-2xl font-semibold text-pine-900">{{ $t('pages.termine.form.thanksTitle') }}</h2>
          <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            {{ $t('pages.termine.form.thanksText') }}
          </p>
          <button
            type="button"
            class="mt-6 inline-flex items-center gap-2 rounded-sm border border-pine-900/25 bg-white px-6 py-3 text-sm font-semibold text-pine-900"
            @click="sent = false"
          >
            {{ $t('pages.termine.form.sendAnother') }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, CheckCircle2 } from '@lucide/vue'
import CourseFinderSection from '~/components/sections/CourseFinderSection.vue'
import { usePageSeo } from '~/composables/usePageSeo'
import { useReveal } from '~/composables/useReveal'
import { useSiteData } from '~/composables/useSiteData'

useReveal()
usePageSeo('meta.titles.termine', 'meta.descriptions.termine')

const { courses } = useSiteData()

const route = useRoute()

const form = reactive({
  name: '',
  email: '',
  courseId: (route.query.kurs as string) || '',
  persons: 1,
  company: '',
  message: '',
})
const sent = ref(false)

function submit() {
  sent.value = true
}
</script>
