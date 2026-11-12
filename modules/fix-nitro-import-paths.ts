import { defineNuxtModule } from '@nuxt/kit'

/**
 * WORKAROUND (2026-11-12): the Windows username "Roshaan's Pc" contains an
 * apostrophe. Nuxt and its modules register Nitro auto-imports with absolute
 * paths (e.g. `C:/Users/Roshaan's Pc/.../node_modules/@nuxt/nitro-server/dist/runtime/utils/paths`
 * and `.../node_modules/@nuxtjs/i18n/dist/runtime/composables/shared`), and
 * Nitro embeds them verbatim in single quotes in the generated
 * `virtual:#imports` module, which breaks Rollup parsing with
 * "RollupError: virtual:#imports: Expected ';', got 'ident'".
 *
 * This hook rewrites any such path to the Windows 8.3 short form
 * (`C:\Users\ROSHAAN~1` — verified on this PC 2026-11-12), which resolves
 * to the same files but contains no apostrophe. If the Windows user folder
 * is ever renamed, find the new short name with:
 *   cmd → for %I in ("%USERPROFILE%") do @echo %~sI
 * and update it below.
 *
 * ORDER MATTERS (two registrations, both needed):
 * - @nuxt/nitro-server's own imports are in the config before any
 *   `nitro:config` hook runs, so the direct registration catches them.
 * - @nuxtjs/i18n defers its server auto-imports (defineI18nLocale,
 *   defineI18nConfig, defineI18nLocaleDetector) to a `modules:done` hook,
 *   which registers its `nitro:config` push hook AFTER this module's setup.
 *   So the sanitiser is registered a second time from `modules:done`, which
 *   runs after i18n's handler and therefore after its push hook.
 * The rewrite is idempotent, so running twice is harmless.
 *
 * Upstream cause: Nuxt/Nitro do not escape special characters in
 * auto-import paths (unimport `toExports()` is called with no fileDir, so
 * absolute paths are never relativised).
 */
export default defineNuxtModule({
  meta: { name: 'fix-nitro-import-paths' },
  setup(_options, nuxt) {
    const sanitize = (nitroConfig: any) => {
      const fixPath = (p: string) =>
        p.includes("Roshaan's Pc") ? p.split("Roshaan's Pc").join('ROSHAAN~1') : p
      const fixList = (list: Array<{ from?: unknown }> | undefined) => {
        for (const item of list ?? []) {
          if (item && typeof item.from === 'string') {
            item.from = fixPath(item.from)
          }
        }
      }
      fixList(nitroConfig.imports?.imports as Array<{ from?: unknown }> | undefined)
      fixList(nitroConfig.imports?.presets as Array<{ from?: unknown }> | undefined)
    }
    nuxt.hook('nitro:config', sanitize)
    nuxt.hook('modules:done', () => {
      nuxt.hook('nitro:config', sanitize)
    })
  },
})
