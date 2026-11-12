import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  compatibilityDate: '2025-01-01',
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['@nuxtjs/i18n', 'shadcn-nuxt', './modules/fix-nitro-import-paths'],
  i18n: {
    defaultLocale: 'de',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'en', language: 'en-GB', name: 'English', file: 'en.json' },
    ],
    langDir: 'locales',
    lazy: true,
    vueI18n: './i18n.config.ts',
    detectBrowserLanguage: false,
    // TODO: replace with the real domain before launch (used for canonical + hreflang URLs)
    baseUrl: 'https://www.vitasalva.de',
  },
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: 'Ui',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui',
  },
  app: {
    head: {
      title: 'VITASALVA – Sicherheit & Schulungen',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'VITASALVA – Premium-Schulungen für Erste Hilfe, Brandschutz, Gabelstapler, Ladungssicherung, Hubarbeitsbühnen, Erdbaumaschinen und PSAgA. Praxisnah. Professionell. Sicher.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },
})
