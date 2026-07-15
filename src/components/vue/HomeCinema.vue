<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EraDevice from './EraDevice.vue';

export type CinemaEra = {
  id: string;
  year: string;
  title: string;
  body: string;
  device: string;
};

export type CinemaHero = {
  brand: string;
  headline: string;
  supporting: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
};

const props = defineProps<{
  hero: CinemaHero;
  eras: readonly CinemaEra[];
  journeyEyebrow?: string;
  journeyTitle?: string;
}>();

const rootRef = ref<HTMLElement | null>(null);
const stageRef = ref<HTMLElement | null>(null);
const heroRef = ref<HTMLElement | null>(null);
const hudRef = ref<HTMLElement | null>(null);
const cueRef = ref<HTMLElement | null>(null);
const railFillRef = ref<HTMLElement | null>(null);
const activeIndex = ref(-1);
const reducedMotion = ref(
  typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
);

let ctx: gsap.Context | null = null;

const journeyEyebrow = computed(() => props.journeyEyebrow ?? 'Tech eras');
const journeyTitle = computed(() => props.journeyTitle ?? 'Always fast. Now faster.');

const tickTops = computed(() => {
  const n = props.eras.length;
  if (n <= 1) return ['0%'];
  return props.eras.map((_, i) => `${(i / (n - 1)) * 100}%`);
});

onMounted(() => {
  const root = rootRef.value;
  const stage = stageRef.value;
  if (!root || !stage) return;

  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion.value) {
    activeIndex.value = 0;
    if (railFillRef.value) railFillRef.value.style.transform = 'scaleY(1)';
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  ctx = gsap.context(() => {
    const scenes = gsap.utils.toArray<HTMLElement>('.cinema-scene');
    const n = scenes.length;
    if (!n) return;

    gsap.set(scenes, { autoAlpha: 0, scale: 1.04 });
    gsap.set(hudRef.value, { autoAlpha: 0 });

    const pinDistance = () => window.innerHeight * (n * 1.15 + 0.5);

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: () => `+=${pinDistance()}`,
        pin: stage,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (railFillRef.value) {
            railFillRef.value.style.transform = `scaleY(${p})`;
          }
          const journeyStart = 0.08;
          const journeyEnd = 0.88;
          if (p < journeyStart) {
            activeIndex.value = -1;
            return;
          }
          if (p >= journeyEnd) {
            activeIndex.value = n - 1;
            return;
          }
          const t = (p - journeyStart) / (journeyEnd - journeyStart);
          activeIndex.value = Math.min(n - 1, Math.floor(t * n));
        },
      },
    });

    // Leave the hero — journey owns the frame
    tl.to(
      heroRef.value,
      { autoAlpha: 0, scale: 0.96, y: -20, duration: 0.07 },
      0,
    );
    tl.to(cueRef.value, { autoAlpha: 0, duration: 0.04 }, 0);
    tl.to(hudRef.value, { autoAlpha: 1, duration: 0.06 }, 0.04);

    const segment = 0.74 / n;
    const startAt = 0.09;

    scenes.forEach((scene, i) => {
      const t0 = startAt + i * segment;
      const hold = segment * 0.55;
      const exitAt = t0 + hold;

      tl.fromTo(
        scene,
        { autoAlpha: 0, scale: 1.06, y: 28 },
        { autoAlpha: 1, scale: 1, y: 0, duration: segment * 0.28 },
        t0,
      );

      if (i < n - 1) {
        tl.to(
          scene,
          { autoAlpha: 0, scale: 0.97, y: -20, duration: segment * 0.28 },
          exitAt,
        );
      } else {
        tl.to(
          scene,
          { autoAlpha: 0, scale: 0.98, y: -12, duration: segment * 0.3 },
          exitAt,
        );
      }
    });

    // Bookend: hero returns before unlock
    tl.to(hudRef.value, { autoAlpha: 0, duration: 0.06 }, 0.9);
    tl.to(
      heroRef.value,
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.08 },
      0.9,
    );
  }, root);
});

onUnmounted(() => {
  ctx?.revert();
  ctx = null;
});
</script>

<template>
  <section
    ref="rootRef"
    id="journey"
    class="home-cinema relative -mt-[var(--header-stack)]"
    aria-label="Technology eras journey"
  >
    <div
      ref="stageRef"
      class="home-cinema__stage relative overflow-hidden bg-app-bg"
      :class="reducedMotion ? 'min-h-[100dvh] pb-12' : 'h-[100dvh]'"
    >
      <!-- Hero accent orbs — sit under the sticky nav from scroll 0 -->
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          class="accent-bubble accent-bubble--a absolute -left-28 top-0 h-[24rem] w-[24rem] rounded-full bg-app-accent/25 blur-3xl motion-reduce:hidden sm:-left-32 sm:h-[32rem] sm:w-[32rem]"
        />
        <div
          class="accent-bubble accent-bubble--b absolute -right-20 bottom-[8%] h-[24rem] w-[24rem] rounded-full bg-app-river/40 blur-3xl motion-reduce:hidden sm:-right-28 sm:h-[32rem] sm:w-[32rem]"
        />
        <div
          class="accent-bubble accent-bubble--c absolute left-[28%] top-[58%] h-48 w-48 rounded-full bg-app-mist/15 blur-3xl motion-reduce:hidden sm:h-64 sm:w-64"
        />
      </div>

      <!-- Hero -->
      <div
        ref="heroRef"
        class="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center px-4 pt-[calc(var(--header-stack)+0.5rem)] sm:px-8"
        :class="reducedMotion ? 'min-h-[70dvh]' : 'h-full'"
      >
        <p
          class="font-display text-[1.875rem] font-bold leading-[1.15] tracking-tight text-app-text min-[400px]:text-4xl sm:text-5xl lg:text-6xl"
        >
          {{ hero.brand }}
        </p>
        <h1
          class="mt-4 max-w-3xl font-display text-xl font-semibold tracking-tight text-app-mist sm:mt-6 sm:text-3xl lg:text-4xl"
        >
          {{ hero.headline }}
        </h1>
        <p class="mt-4 max-w-xl text-base text-app-muted sm:mt-5 sm:text-lg">
          {{ hero.supporting }}
        </p>
        <div class="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
          <a :href="hero.primaryCta.href" class="btn-primary w-full sm:w-auto">
            {{ hero.primaryCta.label }}
          </a>
          <a :href="hero.secondaryCta.href" class="btn-ghost w-full sm:w-auto">
            {{ hero.secondaryCta.label }}
          </a>
        </div>

        <p
          v-if="!reducedMotion"
          ref="cueRef"
          class="mt-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-app-muted/80 sm:mt-16"
        >
          <span
            class="cinema-cue-line inline-block h-8 w-px bg-gradient-to-b from-app-accent to-transparent"
            aria-hidden="true"
          />
          Scroll to travel the eras
        </p>
      </div>

      <!-- Full-bleed era scenes -->
      <div
        v-if="!reducedMotion"
        class="pointer-events-none absolute inset-0 z-20"
      >
        <article
          v-for="era in eras"
          :key="era.id"
          class="cinema-scene absolute inset-0 flex flex-col px-4 pb-10 pt-28 sm:px-10 sm:pb-12 sm:pt-32 lg:px-14"
          style="visibility: hidden"
        >
          <!-- Year HUD (top-left) -->
          <div class="max-w-xl shrink-0 pr-10 sm:pr-20">
            <p class="font-mono text-[11px] uppercase tracking-[0.28em] text-app-accent sm:text-xs">
              {{ era.year }}
            </p>
            <p
              class="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-app-muted/70 sm:text-[11px]"
            >
              {{ journeyEyebrow }}
            </p>
          </div>

          <!-- Mid: device front-and-center on mobile; copy + art row on sm+ -->
          <div
            class="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-6 sm:flex-row sm:items-center sm:gap-8 lg:gap-16"
          >
            <div
              class="cinema-art relative w-44 shrink-0 opacity-50 min-[400px]:w-52 sm:order-last sm:mx-0 sm:w-[min(38vw,320px)] sm:opacity-[0.55]"
              aria-hidden="true"
            >
              <div class="absolute -inset-6 rounded-full bg-app-accent/8 blur-3xl sm:-inset-8" />
              <div class="relative aspect-square w-full text-app-accent">
                <EraDevice :device="era.device" />
              </div>
            </div>

            <div class="relative z-10 w-full max-w-xl text-center sm:flex-1 sm:pr-0 sm:text-left">
              <h2
                class="font-display text-2xl font-semibold tracking-tight text-app-text sm:text-4xl lg:text-5xl lg:leading-[1.08]"
              >
                {{ era.title }}
              </h2>
              <p
                class="mx-auto mt-3 max-w-[34ch] text-sm text-app-muted sm:mx-0 sm:mt-5 sm:text-lg lg:text-xl"
              >
                {{ era.body }}
              </p>
            </div>
          </div>
        </article>
      </div>

      <!-- Side rail + ticks -->
      <div
        v-if="!reducedMotion"
        ref="hudRef"
        class="pointer-events-none absolute inset-y-0 right-0 z-30 flex opacity-0"
        aria-hidden="true"
      >
        <div
          class="relative my-[14vh] mr-2 flex w-8 flex-col items-end sm:my-[18vh] sm:mr-5 sm:w-16 lg:mr-7"
        >
          <ol class="absolute inset-y-0 right-3 sm:right-5">
            <li
              v-for="(era, i) in eras"
              :key="era.id"
              class="absolute right-0 flex -translate-y-1/2 items-center justify-end"
              :style="{ top: tickTops[i] }"
            >
              <span
                class="hidden whitespace-nowrap text-right font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-300 sm:inline"
                :class="activeIndex === i ? 'text-app-accent' : 'text-white/25'"
              >
                {{ era.year }}
              </span>
              <span
                class="block h-1.5 w-1.5 rounded-full transition-colors duration-300 sm:hidden"
                :class="activeIndex === i ? 'bg-app-accent shadow-glow' : 'bg-white/25'"
              />
            </li>
          </ol>

          <div
            class="absolute inset-y-0 right-0 w-0.5 overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            :aria-valuenow="Math.max(0, activeIndex + 1)"
            :aria-valuemin="0"
            :aria-valuemax="eras.length"
            aria-label="Journey progress"
          >
            <div
              ref="railFillRef"
              class="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-gradient-to-b from-app-accent to-app-mist shadow-glow"
              style="transform: scaleY(0)"
            />
          </div>
        </div>
      </div>

      <!-- Mobile device (shown under copy when mid-size truncates side art) — only in reduced? handled in scenes -->

      <!-- Reduced-motion: full stacked pages -->
      <div
        v-if="reducedMotion"
        class="relative z-10 mx-auto w-full max-w-3xl space-y-12 px-4 pt-6 sm:space-y-16 sm:px-8 sm:pt-8"
      >
        <p class="eyebrow">{{ journeyEyebrow }}</p>
        <p class="mt-1 font-display text-lg font-semibold sm:text-xl">{{ journeyTitle }}</p>

        <article
          v-for="era in eras"
          :key="era.id"
          class="border-t border-app-border/40 pt-8 sm:pt-10"
        >
          <p class="eyebrow">{{ era.year }}</p>
          <h2 class="mt-2 font-display text-2xl font-semibold tracking-tight sm:mt-3 sm:text-3xl">
            {{ era.title }}
          </h2>
          <p class="mt-3 max-w-md text-sm text-app-muted sm:mt-4 sm:text-base">{{ era.body }}</p>
          <div
            class="mt-6 w-24 text-app-accent opacity-60 sm:mt-8 sm:w-28"
            aria-hidden="true"
          >
            <EraDevice :device="era.device" />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cinema-cue-line {
  animation: cinema-pulse 2.2s ease-in-out infinite;
}

@keyframes cinema-pulse {
  0%,
  100% {
    opacity: 0.35;
    transform: scaleY(0.75);
  }
  50% {
    opacity: 1;
    transform: scaleY(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .cinema-cue-line {
    animation: none;
  }
}
</style>
