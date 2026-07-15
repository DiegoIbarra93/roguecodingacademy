<script setup lang="ts">
defineProps<{
  device: string;
}>();
</script>

<template>
  <svg viewBox="0 0 120 120" class="h-full w-full text-app-accent" aria-hidden="true">
    <template v-if="device === 'mainframe'">
      <rect
        x="28"
        y="18"
        width="64"
        height="84"
        rx="4"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      />
      <rect x="36" y="28" width="48" height="20" rx="2" fill="currentColor" opacity="0.25" />
      <circle
        v-for="n in 4"
        :key="n"
        :cx="44 + (n - 1) * 12"
        cy="68"
        r="3"
        fill="currentColor"
        :opacity="0.5 + (n - 1) * 0.1"
      />
      <rect x="40" y="82" width="40" height="8" rx="1" fill="currentColor" opacity="0.35" />
    </template>

    <template v-else-if="device === 'desktop'">
      <rect
        x="22"
        y="22"
        width="76"
        height="52"
        rx="4"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      />
      <rect x="28" y="28" width="64" height="40" rx="2" fill="currentColor" opacity="0.2" />
      <path d="M45 84h30l6 12H39l6-12z" fill="none" stroke="currentColor" stroke-width="2" />
    </template>

    <template v-else-if="device === 'cloud'">
      <ellipse
        cx="60"
        cy="58"
        rx="36"
        ry="18"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M38 64c-8 0-14-6-14-13s6-13 14-13c1.5-8 8.5-14 17-14 7.5 0 14 4.5 16.5 11 1-.3 2-.5 3.5-.5 7 0 12.5 5.5 12.5 12.5S81.5 70 74.5 70H38z"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <circle cx="44" cy="82" r="2.5" fill="currentColor" opacity="0.45" />
      <circle cx="60" cy="86" r="2.5" fill="currentColor" opacity="0.55" />
      <circle cx="76" cy="82" r="2.5" fill="currentColor" opacity="0.45" />
      <path
        d="M44 78v-4M60 82v-6M76 78v-4"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        opacity="0.5"
      />
    </template>

    <template v-else-if="device === 'phone'">
      <rect
        x="42"
        y="14"
        width="36"
        height="92"
        rx="6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      />
      <rect x="48" y="26" width="24" height="60" rx="2" fill="currentColor" opacity="0.22" />
      <circle cx="60" cy="96" r="3" fill="currentColor" opacity="0.5" />
    </template>

    <template v-else>
      <circle
        cx="60"
        cy="60"
        r="34"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        opacity="0.7"
      />
      <circle cx="60" cy="60" r="18" fill="currentColor" opacity="0.2" />
      <path
        d="M40 60c8-18 32-18 40 0M45 72c6-10 24-10 30 0"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        opacity="0.8"
      />
    </template>
  </svg>
</template>
