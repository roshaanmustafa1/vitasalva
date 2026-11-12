<template>
  <div>
    <div class="bg-pine-900 text-paper">
      <div class="layout-full py-16 lg:py-20">
        <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-sage">
          <span class="h-px w-8 bg-sage" aria-hidden="true" /> {{ $t('pages.unternehmen.eyebrow') }}
        </p>
        <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
          {{ $t('pages.unternehmen.title') }}
        </h1>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-paper/75">
          {{ $t('pages.unternehmen.lead') }}
        </p>
      </div>
    </div>

    <section class="border-b border-line bg-paper">
      <div class="layout-full py-16 lg:py-24">
        <SectionHeading
          :eyebrow="$t('pages.unternehmen.offersEyebrow')"
          :title="$t('pages.unternehmen.offersTitle')"
        />
        <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <article v-for="item in offers" :key="item.title" data-reveal class="border border-line bg-white p-6">
            <component :is="item.icon" class="h-7 w-7 text-signal-deep" />
            <h3 class="mt-4 font-display text-xl font-semibold text-pine-900">{{ item.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="border-b border-line bg-white">
      <div class="layout-full py-16 lg:py-24">
        <SectionHeading
          :eyebrow="$t('pages.unternehmen.processEyebrow')"
          :title="$t('pages.unternehmen.processTitle')"
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

    <section class="border-b border-line bg-paper">
      <div class="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <SectionHeading
          :eyebrow="$t('pages.unternehmen.formEyebrow')"
          :title="$t('pages.unternehmen.formTitle')"
          :lead="$t('pages.unternehmen.formLead')"
        />
        <form v-if="!sent" class="mt-10 space-y-5" @submit.prevent="sent = true">
          <div class="grid gap-5 sm:grid-cols-2">
            <label class="block">
              <span class="mb-1.5 block text-sm font-semibold text-ink">{{ $t('pages.unternehmen.form.company') }}</span>
              <input
                v-model="form.company"
                required
                type="text"
                :placeholder="$t('pages.unternehmen.form.companyPh')"
                class="w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm focus:border-signal focus:outline-none"
              />
            </label>
            <label class="block">
              <span class="mb-1.5 block text-sm font-semibold text-ink">{{ $t('pages.unternehmen.form.contactPerson') }}</span>
              <input
                v-model="form.name"
                required
                type="text"
                :placeholder="$t('pages.unternehmen.form.namePh')"
                class="w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm focus:border-signal focus:outline-none"
              />
            </label>
          </div>
          <div class="grid gap-5 sm:grid-cols-2">
            <label class="block">
              <span class="mb-1.5 block text-sm font-semibold text-ink">{{ $t('pages.unternehmen.form.email') }}</span>
              <input
                v-model="form.email"
                required
                type="email"
                :placeholder="$t('pages.unternehmen.form.emailPh')"
                class="w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm focus:border-signal focus:outline-none"
              />
            </label>
            <label class="block">
              <span class="mb-1.5 block text-sm font-semibold text-ink">{{ $t('pages.unternehmen.form.persons') }}</span>
              <input
                v-model.number="form.persons"
                type="number"
                min="1"
                class="w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm focus:border-signal focus:outline-none"
              />
            </label>
          </div>
          <label class="block">
            <span class="mb-1.5 block text-sm font-semibold text-ink">{{ $t('pages.unternehmen.form.training') }}</span>
            <textarea
              v-model="form.message"
              required
              rows="4"
              :placeholder="$t('pages.unternehmen.form.trainingPh')"
              class="w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm focus:border-signal focus:outline-none"
            />
          </label>
          <AppButton type="submit">{{ $t('pages.unternehmen.form.submit') }}</AppButton>
        </form>
        <div v-else class="mt-10 border border-line bg-white p-8 text-center">
          <CheckCircle2 class="mx-auto h-10 w-10 text-signal-deep" />
          <h2 class="mt-4 font-display text-2xl font-semibold text-pine-900">{{ $t('pages.unternehmen.form.thanksTitle') }}</h2>
          <p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            {{ $t('pages.unternehmen.form.thanksText') }}
          </p>
          <AppButton type="button" variant="outline" class="mt-6" @click="sent = false">{{ $t('pages.unternehmen.form.sendAnother') }}</AppButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Building2, CheckCircle2, MapPin, Users } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { usePageSeo } from '~/composables/usePageSeo'
import { useReveal } from '~/composables/useReveal'
import { resolveTm } from '~/composables/useSiteData'

useReveal()
usePageSeo('meta.titles.unternehmen', 'meta.descriptions.unternehmen')

const { tm, rt } = useI18n()

const offerIcons = [MapPin, Users, Building2, CheckCircle2]

const offers = computed(() =>
  (resolveTm<{ title: string, text: string }[]>(tm('pages.unternehmen.offers'), rt) || []).map((o, i) => ({
    ...o,
    icon: offerIcons[i],
  })),
)

const steps = computed(() => resolveTm<{ title: string, text: string }[]>(tm('pages.unternehmen.steps'), rt) || [])

const form = reactive({ company: '', name: '', email: '', persons: 10, message: '' })
const sent = ref(false)
</script>
