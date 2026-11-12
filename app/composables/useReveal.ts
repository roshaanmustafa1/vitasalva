import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Animates every [data-reveal] element in the current page on scroll.
 * Client-only (onMounted) — SSR-safe. Cleans up on unmount.
 */
export function useReveal() {
  let ctx: gsap.Context | undefined

  onMounted(async () => {
    await nextTick()
    ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger)
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
      })
      ScrollTrigger.refresh()
    })
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}
