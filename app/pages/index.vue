<template>
  <div>
    <HeroSection />
    <TrustSection />
    <CourseFinderSection />
    <ServicesSection />
    <AboutSection />
    <CorporateSection />
    <UpcomingSection />
    <InstructorsSection />
    <WhySection />
    <TestimonialsSection />
    <FaqSection />
    <FinalCtaSection />
  </div>
</template>

<script setup lang="ts">
import AboutSection from '~/components/sections/AboutSection.vue'
import CorporateSection from '~/components/sections/CorporateSection.vue'
import CourseFinderSection from '~/components/sections/CourseFinderSection.vue'
import FaqSection from '~/components/sections/FaqSection.vue'
import FinalCtaSection from '~/components/sections/FinalCtaSection.vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import InstructorsSection from '~/components/sections/InstructorsSection.vue'
import ServicesSection from '~/components/sections/ServicesSection.vue'
import TestimonialsSection from '~/components/sections/TestimonialsSection.vue'
import TrustSection from '~/components/sections/TrustSection.vue'
import UpcomingSection from '~/components/sections/UpcomingSection.vue'
import WhySection from '~/components/sections/WhySection.vue'
import { usePageSeo } from '~/composables/usePageSeo'
import { useReveal } from '~/composables/useReveal'

useReveal()
usePageSeo('meta.titles.home', 'meta.descriptions.home')
</script>
