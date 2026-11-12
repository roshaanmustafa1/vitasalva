<template>
  <component
    :is="tag"
    v-bind="tagProps"
    class="group inline-flex items-center gap-2 rounded-full text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine-600 focus-visible:ring-offset-2"
    :class="block ? 'flex w-full' : ''"
  >
    <span
      class="inline-flex items-center justify-center rounded-full transition-colors duration-200"
      :class="[block ? 'flex-1' : '', SIZES[size].pill, VARIANTS[variant].pill]"
    >
      <slot />
    </span>
    <span
      v-if="arrow"
      class="flex shrink-0 items-center justify-center rounded-full transition-colors duration-200"
      :class="[SIZES[size].circle, VARIANTS[variant].circle]"
      aria-hidden="true"
    >
      <ArrowUpRight class="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
    </span>
  </component>
</template>

<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'

/**
 * Site-wide button: a rounded pill with a separate round arrow button next to it
 * (same style as the header "Book a Course" CTA). Renders a NuxtLink when `to`
 * is given (pass an already localised path), otherwise a native <button>.
 */
type Variant = 'primary' | 'light' | 'outline' | 'outlineLight'
type Size = 'md' | 'sm'

const props = withDefaults(
  defineProps<{
    to?: string
    type?: 'button' | 'submit' | 'reset'
    variant?: Variant
    size?: Size
    /** Full-width button (pill stretches, arrow stays on the right) */
    block?: boolean
    /** Show the round arrow button */
    arrow?: boolean
  }>(),
  { to: undefined, type: 'button', variant: 'primary', size: 'md', block: false, arrow: true },
)

/** Literal class strings so Tailwind can detect them. */
const VARIANTS: Record<Variant, { pill: string, circle: string }> = {
  primary: {
    pill: 'bg-pine-800 text-white group-hover:bg-pine-900',
    circle: 'bg-pine-900 text-white group-hover:bg-pine-700',
  },
  light: {
    pill: 'bg-white text-pine-900 group-hover:bg-mist',
    circle: 'bg-sage text-pine-900 group-hover:bg-white',
  },
  outline: {
    pill: 'border border-pine-900/25 bg-white text-pine-900 group-hover:border-pine-900',
    circle: 'border border-pine-900/25 bg-white text-pine-900 group-hover:border-pine-900',
  },
  outlineLight: {
    pill: 'border border-white/40 text-white group-hover:border-white',
    circle: 'border border-white/40 text-white group-hover:border-white',
  },
}
const SIZES: Record<Size, { pill: string, circle: string }> = {
  md: { pill: 'px-6 py-3 text-sm', circle: 'h-11 w-11' },
  sm: { pill: 'px-5 py-2.5 text-[13px]', circle: 'h-10 w-10' },
}

const NuxtLink = resolveComponent('NuxtLink')
const tag = computed(() => (props.to ? NuxtLink : 'button'))
const tagProps = computed(() => (props.to ? { to: props.to } : { type: props.type }))
</script>
