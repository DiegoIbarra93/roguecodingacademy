<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { buildSeatMailto } from '../../lib/mailto';

export type CourseOption = { slug: string; title: string; label?: string };

const props = withDefaults(
  defineProps<{
    courses?: CourseOption[];
    defaultCourse?: string;
    title?: string;
    supporting?: string;
    submitLabel?: string;
    successMessage?: string;
    privacy?: string;
  }>(),
  {
    courses: () => [],
    defaultCourse: '',
    title: 'Request a seat',
    submitLabel: 'Request a seat',
    successMessage:
      'Your email client should open with a prefilled message. Send it and we will follow up.',
    privacy: 'We only use your details to respond about class enrollment.',
  },
);

const mounted = ref(false);
const open = ref(false);
const name = ref('');
const email = ref('');
const course = ref(props.defaultCourse);
const message = ref('');
const error = ref('');
const sent = ref(false);
const panelRef = ref<HTMLElement | null>(null);
const closeBtnRef = ref<HTMLButtonElement | null>(null);

function openFlyout() {
  open.value = true;
  sent.value = false;
  error.value = '';
}

function closeFlyout() {
  open.value = false;
  if (location.hash === '#request-seat') {
    history.replaceState(null, '', location.pathname + location.search);
  }
}

function onFabClick(e: Event) {
  e.preventDefault();
  openFlyout();
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) {
    e.preventDefault();
    closeFlyout();
  }
}

function syncHash() {
  if (location.hash === '#request-seat') {
    openFlyout();
  }
}

function onSubmit(e: Event) {
  e.preventDefault();
  error.value = '';

  if (!name.value.trim() || !email.value.trim()) {
    error.value = 'Name and email are required.';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    error.value = 'Enter a valid email address.';
    return;
  }

  const courseLabel =
    props.courses.find((c) => c.slug === course.value)?.label ||
    props.courses.find((c) => c.slug === course.value)?.title ||
    course.value ||
    'General interest';

  window.location.href = buildSeatMailto({
    name: name.value.trim(),
    email: email.value.trim(),
    course: courseLabel,
    message: message.value.trim(),
  });
  sent.value = true;
}

watch(open, async (isOpen) => {
  document.body.classList.toggle('seat-flyout-open', isOpen);
  if (isOpen) {
    await nextTick();
    closeBtnRef.value?.focus();
  }
});

onMounted(async () => {
  // Defer Teleport until after hydrate — Astro body markup must not be a Teleport target SSR.
  mounted.value = true;
  await nextTick();
  syncHash();
  window.addEventListener('hashchange', syncHash);
  window.addEventListener('keydown', onKeydown);
  window.addEventListener('open-seat-request', openFlyout);
});

onUnmounted(() => {
  document.body.classList.remove('seat-flyout-open');
  window.removeEventListener('hashchange', syncHash);
  window.removeEventListener('keydown', onKeydown);
  window.removeEventListener('open-seat-request', openFlyout);
});
</script>

<template>
  <div>
    <a
      href="#request-seat"
      class="seat-request-fab btn-primary fixed z-40 min-h-12 px-5 shadow-tron-glow"
      :class="open ? 'pointer-events-none opacity-0' : 'opacity-100'"
      :aria-hidden="open"
      :tabindex="open ? -1 : 0"
      @click="onFabClick"
    >
      Request a seat
    </a>

    <Teleport v-if="mounted" to="body">
      <div
        class="seat-flyout-root"
        :class="{ 'is-open': open }"
        :inert="!open"
      >
        <button
          type="button"
          class="seat-flyout-backdrop"
          tabindex="-1"
          aria-label="Close seat request"
          @click="closeFlyout"
        />

        <aside
          id="request-seat"
          ref="panelRef"
          class="seat-flyout-panel"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="'seat-flyout-title'"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2
                id="seat-flyout-title"
                class="font-display text-xl font-semibold tracking-tight text-app-text sm:text-2xl"
              >
                {{ title }}
              </h2>
              <p
                v-if="supporting"
                class="mt-2 max-w-sm text-sm text-app-muted sm:text-base"
              >
                {{ supporting }}
              </p>
            </div>
            <button
              ref="closeBtnRef"
              type="button"
              class="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl border border-app-border/70 text-app-mist transition-colors hover:border-app-accent/40 hover:text-app-accent"
              aria-label="Close"
              @click="closeFlyout"
            >
              <span aria-hidden="true" class="text-lg leading-none">×</span>
            </button>
          </div>

          <p
            v-if="sent"
            class="mt-6 rounded-xl border border-app-accent/30 bg-app-accent-subtle p-4 text-sm text-app-text"
            role="status"
          >
            {{ successMessage }}
          </p>

          <form
            v-else
            class="mt-5 space-y-4 sm:mt-6"
            novalidate
            @submit="onSubmit"
          >
            <div>
              <label for="seat-name" class="mb-1.5 block text-sm font-medium text-app-text">
                Full name
              </label>
              <input
                id="seat-name"
                v-model="name"
                name="name"
                autocomplete="name"
                class="field-control"
                required
              />
            </div>

            <div>
              <label for="seat-email" class="mb-1.5 block text-sm font-medium text-app-text">
                Email
              </label>
              <input
                id="seat-email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                class="field-control"
                required
              />
            </div>

            <div>
              <label for="seat-course" class="mb-1.5 block text-sm font-medium text-app-text">
                Course interest
              </label>
              <select
                v-if="courses.length > 0"
                id="seat-course"
                v-model="course"
                name="course"
                class="field-control"
              >
                <option value="">General interest</option>
                <option v-for="c in courses" :key="c.slug" :value="c.slug">
                  {{ c.label || c.title }}
                </option>
              </select>
              <input
                v-else
                id="seat-course"
                v-model="course"
                name="course"
                placeholder="What do you want to learn?"
                class="field-control"
              />
            </div>

            <div>
              <label for="seat-message" class="mb-1.5 block text-sm font-medium text-app-text">
                Message <span class="font-normal text-app-muted">(optional)</span>
              </label>
              <textarea
                id="seat-message"
                v-model="message"
                name="message"
                rows="3"
                class="field-control min-h-[6rem] resize-y py-3"
              />
            </div>

            <p v-if="error" class="text-sm text-red-300" role="alert">{{ error }}</p>

            <button type="submit" class="btn-primary w-full">{{ submitLabel }}</button>
            <p class="text-xs text-app-muted">{{ privacy }}</p>
          </form>
        </aside>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.seat-request-fab {
  bottom: max(1.25rem, env(safe-area-inset-bottom));
  left: 50%;
  transform: translateX(-50%);
  animation: seat-fab-glow 2.8s ease-in-out infinite;
  transition: opacity 0.25s ease;
}

@media (min-width: 40rem) {
  .seat-request-fab {
    left: auto;
    right: max(1.5rem, env(safe-area-inset-right));
    transform: none;
  }
}

@keyframes seat-fab-glow {
  0%,
  100% {
    box-shadow: 0 0 28px rgba(255, 46, 200, 0.4);
  }
  50% {
    box-shadow: 0 0 48px rgba(255, 46, 200, 0.65);
  }
}

.seat-flyout-root {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 50;
}

.seat-flyout-root.is-open {
  pointer-events: auto;
}

.seat-flyout-backdrop {
  position: absolute;
  inset: 0;
  border: 0;
  margin: 0;
  padding: 0;
  cursor: pointer;
  background: rgba(6, 4, 10, 0.72);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.seat-flyout-root.is-open .seat-flyout-backdrop {
  opacity: 1;
}

.seat-flyout-panel {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  height: 100%;
  width: min(100%, 26rem);
  flex-direction: column;
  overflow-y: auto;
  border-left: 1px solid color-mix(in oklab, var(--color-app-border) 70%, transparent);
  background: color-mix(in oklab, var(--color-app-surface) 92%, transparent);
  padding: 1.25rem;
  padding-bottom: max(1.25rem, env(safe-area-inset-bottom));
  box-shadow:
    inset 0 1px 0 rgba(255, 200, 240, 0.1),
    -24px 0 60px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(20px);
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.seat-flyout-root.is-open .seat-flyout-panel {
  transform: translateX(0);
}

@media (min-width: 40rem) {
  .seat-flyout-panel {
    padding: 1.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .seat-request-fab {
    animation: none;
  }

  .seat-flyout-backdrop,
  .seat-flyout-panel {
    transition: none;
  }
}
</style>
