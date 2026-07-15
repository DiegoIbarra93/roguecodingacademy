<script setup lang="ts">
import { ref } from 'vue';
import { buildSeatMailto } from '../../lib/mailto';

export type CourseOption = { slug: string; title: string };

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

const name = ref('');
const email = ref('');
const course = ref(props.defaultCourse);
const message = ref('');
const error = ref('');
const sent = ref(false);

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
</script>

<template>
  <div class="glass-panel p-5 sm:p-8">
    <h2 class="font-display text-xl font-semibold tracking-tight text-app-text sm:text-2xl">
      {{ title }}
    </h2>
    <p v-if="supporting" class="mt-2 max-w-xl text-sm text-app-muted sm:text-base">
      {{ supporting }}
    </p>

    <p
      v-if="sent"
      class="mt-6 rounded-xl border border-app-accent/30 bg-app-accent-subtle p-4 text-sm text-app-text"
      role="status"
    >
      {{ successMessage }}
    </p>

    <form
      v-else
      class="mx-auto mt-5 max-w-md space-y-4 sm:mt-6"
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
            {{ c.title }}
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
  </div>
</template>
