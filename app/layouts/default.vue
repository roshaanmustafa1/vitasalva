<template>
  <div class="min-h-screen bg-paper font-sans text-ink">
    <header class="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div class="layout-full flex h-[72px] items-center justify-between">
        <NuxtLink
          :to="localePath('/')"
          class="flex items-center gap-3 transition-opacity hover:opacity-90"
          :aria-label="$t('nav.homeAria')"
        >
          <img
            src="~/assets/images/logo.png"
            alt="VITASALVA – Learn to Help"
            class="h-12 w-auto object-contain sm:h-14"
            width="326"
            height="350"
            loading="eager"
          />
        </NuxtLink>

        <nav class="hidden items-center gap-7 text-sm font-medium text-ink lg:flex" :aria-label="$t('nav.mainNavLabel')">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="localePath(link.to)"
            class="transition-colors hover:text-signal-deep"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-3">
          <div
            class="flex items-center overflow-hidden rounded-sm border border-line bg-white text-xs font-semibold"
            role="group"
            aria-label="Sprache wählen / Choose language"
          >
            <NuxtLink
              :to="switchLocalePath('de') || '/'"
              class="px-2.5 py-2 transition-colors"
              :class="locale === 'de' ? 'bg-pine-900 text-paper' : 'text-ink hover:text-signal-deep'"
              :aria-current="locale === 'de' ? 'true' : undefined"
            >
              DE
            </NuxtLink>
            <span class="h-4 w-px bg-line" aria-hidden="true" />
            <NuxtLink
              :to="switchLocalePath('en') || '/en'"
              class="px-2.5 py-2 transition-colors"
              :class="locale === 'en' ? 'bg-pine-900 text-paper' : 'text-ink hover:text-signal-deep'"
              :aria-current="locale === 'en' ? 'true' : undefined"
            >
              EN
            </NuxtLink>
          </div>
          <NuxtLink
            :to="localePath('/termine')"
            class="hidden items-center gap-2 rounded-sm bg-pine-900 px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-pine-700 sm:inline-flex"
          >
            {{ $t('nav.bookCta') }}
            <ArrowRight class="h-4 w-4" />
          </NuxtLink>
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line bg-white text-ink lg:hidden"
            :aria-expanded="mobileOpen"
            :aria-label="$t('nav.menuLabel')"
            @click="mobileOpen = !mobileOpen"
          >
            <X v-if="mobileOpen" class="h-5 w-5" />
            <Menu v-else class="h-5 w-5" />
          </button>
        </div>
      </div>

      <div v-show="mobileOpen" class="border-t border-line bg-paper px-5 py-4 lg:hidden">
        <nav class="flex flex-col gap-1 text-base font-medium" :aria-label="$t('nav.mobileNavLabel')">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="localePath(link.to)"
            class="rounded-sm px-2 py-2.5 transition-colors hover:bg-paper-deep hover:text-signal-deep"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
          <div class="my-2 flex items-center gap-2 pt-2 border-t border-line">
            <span class="text-xs font-semibold text-ink-soft mr-1">Sprache / Language:</span>
            <div
              class="inline-flex items-center overflow-hidden rounded-sm border border-line bg-white text-xs font-semibold"
              role="group"
            >
              <NuxtLink
                :to="switchLocalePath('de') || '/'"
                class="px-3 py-1.5 transition-colors"
                :class="locale === 'de' ? 'bg-pine-900 text-paper' : 'text-ink hover:text-signal-deep'"
                @click="mobileOpen = false"
              >
                DE
              </NuxtLink>
              <span class="h-3 w-px bg-line" aria-hidden="true" />
              <NuxtLink
                :to="switchLocalePath('en') || '/en'"
                class="px-3 py-1.5 transition-colors"
                :class="locale === 'en' ? 'bg-pine-900 text-paper' : 'text-ink hover:text-signal-deep'"
                @click="mobileOpen = false"
              >
                EN
              </NuxtLink>
            </div>
          </div>
          <NuxtLink
            :to="localePath('/termine')"
            class="mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-pine-900 px-5 py-3 text-sm font-semibold text-paper"
            @click="mobileOpen = false"
          >
            {{ $t('nav.bookCta') }}
            <ArrowRight class="h-4 w-4" />
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <footer class="bg-pine-900 text-paper">
      <div class="layout-full grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <NuxtLink
            :to="localePath('/')"
            class="inline-block transition-opacity hover:opacity-90"
            :aria-label="$t('nav.homeAria')"
          >
            <img
              src="~/assets/images/logo-white-text.png"
              alt="VITASALVA – Learn to Help"
              class="h-16 w-auto object-contain"
              width="326"
              height="350"
              loading="lazy"
            />
          </NuxtLink>
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">
            {{ $t('footer.about') }}
          </p>
          <p class="mt-5 inline-flex items-center gap-2 rounded-sm border border-paper/25 px-2 py-1 text-[11px] font-medium uppercase tracking-widest text-paper/70">
            {{ $t('footer.demoWebsite') }}
          </p>
        </div>

        <nav :aria-label="$t('footer.navHeading')">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-signal">{{ $t('footer.navHeading') }}</p>
          <ul class="mt-4 space-y-2.5 text-sm">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink :to="localePath(link.to)" class="text-paper/75 transition-colors hover:text-paper">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <nav :aria-label="$t('footer.servicesHeading')">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-signal">{{ $t('footer.servicesHeading') }}</p>
          <ul class="mt-4 space-y-2.5 text-sm">
            <li v-for="service in services" :key="service.slug">
              <NuxtLink :to="localePath(`/kurse/${service.slug}`)" class="text-paper/75 transition-colors hover:text-paper">
                {{ service.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-signal">{{ $t('footer.legalHeading') }}</p>
          <ul class="mt-4 space-y-2.5 text-sm">
            <li>
              <NuxtLink :to="localePath('/impressum')" class="text-paper/75 transition-colors hover:text-paper">{{ $t('pages.impressum.title') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/datenschutz')" class="text-paper/75 transition-colors hover:text-paper">{{ $t('pages.datenschutz.title') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/faq')" class="text-paper/75 transition-colors hover:text-paper">FAQ</NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/kontakt')" class="text-paper/75 transition-colors hover:text-paper">{{ $t('nav.kontakt') }}</NuxtLink>
            </li>
          </ul>
          <p class="mt-6 text-sm leading-relaxed text-paper/60">
            {{ $t('footer.contactNote') }}
          </p>
        </div>
      </div>

      <div class="border-t border-paper/15">
        <div class="layout-full flex flex-col gap-2 py-5 text-xs text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>{{ $t('footer.copyright') }}</p>
          <p>{{ $t('footer.demoNote') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useLocalePath, useSwitchLocalePath } from '#i18n'
import { ArrowRight, Menu, X } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import { useSiteData } from '~/composables/useSiteData'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { services } = useSiteData()

const navLinks = computed(() => [
  { label: t('nav.leistungen'), to: '/leistungen' },
  { label: t('nav.termine'), to: '/termine' },
  { label: t('nav.ueberUns'), to: '/ueber-uns' },
  { label: t('nav.unternehmen'), to: '/unternehmen' },
  { label: t('nav.faq'), to: '/faq' },
  { label: t('nav.kontakt'), to: '/kontakt' },
])

const mobileOpen = ref(false)
</script>
