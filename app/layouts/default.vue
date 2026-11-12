<template>
  <div class="min-h-screen bg-paper font-sans text-ink">
    <header
      class="site-header"
      :class="isHome ? 'site-header--home' : 'site-header--page'"
      :data-mode="solid ? 'solid' : 'overlay'"
    >
      <div class="hdr-row">
        <div class="hdr-block hdr-block--left">
          <NuxtLink
            :to="localePath('/')"
            class="flex items-center gap-2.5 transition-opacity hover:opacity-90"
            :aria-label="$t('nav.homeAria')"
          >
            <svg class="h-9 w-9 shrink-0 sm:h-10 sm:w-10" viewBox="0 0 40 44" aria-hidden="true">
              <path d="M20 2 4 8v13c0 10 6.8 18.2 16 21 9.2-2.8 16-11 16-21V8L20 2Z" class="fill-pine-800" />
              <path d="M17 12h6v7h7v6h-7v7h-6v-7h-7v-6h7v-7Z" fill="#fff" />
            </svg>
            <span class="flex flex-col leading-none">
              <span class="font-display text-[1.35rem] font-extrabold tracking-[-0.02em] text-ink">
                Vita<span class="text-pine-600">Salva</span>
              </span>
              <span class="mt-1 hidden text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-ink-soft sm:block">
                {{ $t('nav.tagline') }}
              </span>
            </span>
          </NuxtLink>
        </div>

        <nav class="hdr-nav hidden xl:flex" :aria-label="$t('nav.mainNavLabel')">
          <NuxtLink v-for="link in navLinks" :key="link.to" :to="localePath(link.to)">
            {{ link.label }}
          </NuxtLink>
        </nav>
        <div class="flex-1 xl:hidden" />

        <div class="hdr-block hdr-block--right">
          <div class="hidden sm:flex items-center overflow-hidden rounded-full border border-line bg-white text-xs font-semibold" role="group" aria-label="Sprache wählen / Choose language">
            <NuxtLink :to="switchLocalePath('de') || '/'" class="px-3 py-2 transition-colors" :class="locale === 'de' ? 'bg-pine-800 text-white' : 'text-ink hover:text-pine-700'" :aria-current="locale === 'de' ? 'true' : undefined">DE</NuxtLink>
            <NuxtLink :to="switchLocalePath('en') || '/en'" class="px-3 py-2 transition-colors" :class="locale === 'en' ? 'bg-pine-800 text-white' : 'text-ink hover:text-pine-700'" :aria-current="locale === 'en' ? 'true' : undefined">EN</NuxtLink>
          </div>
          <NuxtLink
            :to="localePath('/termine')"
            class="hidden items-center rounded-full bg-pine-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pine-900 sm:inline-flex"
          >
            {{ $t('nav.bookCta') }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/termine')"
            class="hidden h-11 w-11 items-center justify-center rounded-full bg-pine-900 text-white transition-colors hover:bg-pine-700 sm:inline-flex"
            :aria-label="$t('nav.bookCta')"
          >
            <ArrowUpRight class="h-4 w-4" />
          </NuxtLink>
          <button
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-pine-800 text-white xl:hidden"
            :aria-expanded="mobileOpen"
            :aria-label="$t('nav.menuLabel')"
            @click="mobileOpen = !mobileOpen"
          >
            <X v-if="mobileOpen" class="h-5 w-5" />
            <Menu v-else class="h-5 w-5" />
          </button>
        </div>
      </div>

      <div v-show="mobileOpen" class="hdr-drawer xl:hidden">
        <div class="rounded-2xl border border-line bg-white p-4 shadow-xl">
          <nav class="flex flex-col gap-1 text-base font-medium" :aria-label="$t('nav.mobileNavLabel')">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="localePath(link.to)"
              class="rounded-lg px-3 py-2.5 transition-colors hover:bg-paper-deep hover:text-pine-700"
              @click="mobileOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
            <div class="mt-2 flex w-fit sm:hidden items-center overflow-hidden rounded-full border border-line bg-white text-xs font-semibold" role="group" aria-label="Sprache wählen / Choose language">
            <NuxtLink :to="switchLocalePath('de') || '/'" class="px-3 py-2 transition-colors" :class="locale === 'de' ? 'bg-pine-800 text-white' : 'text-ink hover:text-pine-700'" :aria-current="locale === 'de' ? 'true' : undefined">DE</NuxtLink>
            <NuxtLink :to="switchLocalePath('en') || '/en'" class="px-3 py-2 transition-colors" :class="locale === 'en' ? 'bg-pine-800 text-white' : 'text-ink hover:text-pine-700'" :aria-current="locale === 'en' ? 'true' : undefined">EN</NuxtLink>
          </div>
            <NuxtLink
              :to="localePath('/termine')"
              class="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-pine-800 px-5 py-3 text-sm font-semibold text-white"
              @click="mobileOpen = false"
            >
              {{ $t('nav.bookCta') }}
              <ArrowUpRight class="h-4 w-4" />
            </NuxtLink>
          </nav>
        </div>
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
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sage">{{ $t('footer.navHeading') }}</p>
          <ul class="mt-4 space-y-2.5 text-sm">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink :to="localePath(link.to)" class="text-paper/75 transition-colors hover:text-paper">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <nav :aria-label="$t('footer.servicesHeading')">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sage">{{ $t('footer.servicesHeading') }}</p>
          <ul class="mt-4 space-y-2.5 text-sm">
            <li v-for="service in services" :key="service.slug">
              <NuxtLink :to="localePath(`/kurse/${service.slug}`)" class="text-paper/75 transition-colors hover:text-paper">
                {{ service.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sage">{{ $t('footer.legalHeading') }}</p>
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
import { ArrowUpRight, Menu, X } from '@lucide/vue'
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

const route = useRoute()
/** Home = i18n route names "index___de" / "index___en". */
const isHome = computed(() => String(route.name ?? '').startsWith('index'))
const scrolled = ref(false)
/** Overlay (notched, over the hero) only on home at the top; solid floating bar otherwise. */
const solid = computed(() => !isHome.value || scrolled.value)

function onScroll() {
  scrolled.value = window.scrollY > 24
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
watch(() => route.fullPath, () => { mobileOpen.value = false })
</script>
