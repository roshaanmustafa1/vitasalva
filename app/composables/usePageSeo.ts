import { useLocaleHead } from '#i18n'
import { useI18n } from 'vue-i18n'

/**
 * Sets a translated <title> + meta description for a page and adds the
 * per-locale SEO head from @nuxtjs/i18n (html lang attribute, hreflang links,
 * canonical URL, og:locale). Requires `baseUrl` in nuxt.config.ts for the
 * canonical/hreflang URLs.
 *
 * MUST be imported explicitly via `~/composables/usePageSeo` — never rely on
 * Nuxt auto-import for local composables (breaks with the apostrophe in the
 * Windows username on Roshaan's PC).
 */
export function usePageSeo(titleKey: string, descriptionKey: string) {
  const { t } = useI18n()
  const i18nHead = useLocaleHead({ seo: true })

  useHead(() => ({
    title: t(titleKey),
    htmlAttrs: { lang: i18nHead.value.htmlAttrs.lang },
    link: [...(i18nHead.value.link || [])],
    meta: [
      ...(i18nHead.value.meta || []),
      { name: 'description', content: t(descriptionKey) },
    ],
  }))
}
