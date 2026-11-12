<template>
  <div class="divide-y divide-line border-y border-line">
    <div v-for="(item, i) in items" :key="i">
      <button
        type="button"
        class="flex w-full items-center justify-between gap-4 py-5 text-left"
        :aria-expanded="openIndex === i"
        @click="toggle(i)"
      >
        <span class="font-display text-lg font-semibold text-ink sm:text-xl">{{ item.q }}</span>
        <span
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink transition-transform duration-300"
          :class="openIndex === i ? 'rotate-45 border-signal text-signal-deep' : ''"
          aria-hidden="true"
        >
          <Plus class="h-4 w-4" />
        </span>
      </button>
      <div v-show="openIndex === i" class="pb-6 pr-10 text-base leading-relaxed text-ink-soft">
        {{ item.a }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@lucide/vue'
import type { LocalizedFaq } from '~/composables/useSiteData'

defineProps<{ items: LocalizedFaq[] }>()

const openIndex = ref<number | null>(0)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>
