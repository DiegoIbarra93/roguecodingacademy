<script setup lang="ts">
import { computed, ref } from 'vue';
import type { CourseListItem } from '../../lib/courses';

const props = defineProps<{
  courses: CourseListItem[];
  topics: string[];
  levels: string[];
  emptyTitle: string;
  emptyBody: string;
}>();

const topic = ref('all');
const level = ref('all');
const query = ref('');

function statusLabel(status: CourseListItem['status']) {
  switch (status) {
    case 'open':
      return 'Open';
    case 'full':
      return 'Full';
    default:
      return 'Coming soon';
  }
}

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return props.courses.filter((c) => {
    if (topic.value !== 'all' && !c.topics.includes(topic.value)) return false;
    if (level.value !== 'all' && c.level !== level.value) return false;
    if (!q) return true;
    const hay = [c.title, c.summary, ...c.topics].join(' ').toLowerCase();
    return hay.includes(q);
  });
});
</script>

<template>
  <div>
    <div class="glass-panel mb-6 grid gap-3 p-4 sm:mb-8 sm:grid-cols-3 sm:p-5">
      <label class="block text-sm">
        <span class="mb-1.5 block text-app-muted">Search</span>
        <input
          v-model="query"
          type="search"
          placeholder="Find courses that matter to you"
          class="field-control"
        />
      </label>
      <label class="block text-sm">
        <span class="mb-1.5 block text-app-muted">Topic</span>
        <select
          v-model="topic"
          class="field-control"
        >
          <option value="all">All topics</option>
          <option v-for="t in topics" :key="t" :value="t">{{ t }}</option>
        </select>
      </label>
      <label class="block text-sm">
        <span class="mb-1.5 block text-app-muted">Level</span>
        <select
          v-model="level"
          class="field-control"
        >
          <option value="all">All levels</option>
          <option v-for="l in levels" :key="l" :value="l">{{ l }}</option>
        </select>
      </label>
    </div>

    <div v-if="filtered.length === 0" class="glass-panel p-6 text-center sm:p-8">
      <h2 class="font-display text-xl font-semibold">{{ emptyTitle }}</h2>
      <p class="mx-auto mt-2 max-w-lg text-sm text-app-muted">{{ emptyBody }}</p>
    </div>

    <ul v-else class="grid gap-4 sm:grid-cols-2 sm:gap-5">
      <li v-for="course in filtered" :key="course.slug">
        <a
          :href="`/courses/${course.slug}`"
          class="glass-panel group flex h-full flex-col p-5 transition-shadow duration-300 hover:shadow-tron-glow sm:p-6"
        >
          <div class="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-app-muted">
            <span class="text-app-accent">{{ course.level }}</span>
            <span aria-hidden="true">·</span>
            <span>{{ statusLabel(course.status) }}</span>
            <template v-if="course.duration">
              <span aria-hidden="true">·</span>
              <span>{{ course.duration }}</span>
            </template>
          </div>
          <h2
            class="mt-3 font-display text-xl font-semibold tracking-tight group-hover:text-app-accent"
          >
            {{ course.title }}
          </h2>
          <p class="mt-2 flex-1 text-sm text-app-muted">{{ course.summary }}</p>
          <ul v-if="course.topics.length > 0" class="mt-4 flex flex-wrap gap-2">
            <li
              v-for="t in course.topics"
              :key="t"
              class="rounded-lg border border-app-border/60 bg-app-surface-2/40 px-2 py-1 text-xs text-app-mist"
            >
              {{ t }}
            </li>
          </ul>
        </a>
      </li>
    </ul>
  </div>
</template>
