<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  topics: string[];
  emptyTitle: string;
  emptyBody: string;
}>();

const topic = ref('all');
const query = ref('');

function applyFilter() {
  const q = query.value.trim().toLowerCase();
  const cards = document.querySelectorAll<HTMLElement>('[data-course-card]');
  let visible = 0;

  cards.forEach((card) => {
    const topics = (card.dataset.topics ?? '').split(',').filter(Boolean);
    const hay = (card.dataset.search ?? '').toLowerCase();
    const topicMatch = topic.value === 'all' || topics.includes(topic.value);
    const queryMatch = !q || hay.includes(q);
    const show = topicMatch && queryMatch;
    card.hidden = !show;
    if (show) visible += 1;
  });

  document.querySelectorAll<HTMLElement>('[data-course-section]').forEach((section) => {
    const sectionCards = section.querySelectorAll<HTMLElement>('[data-course-card]');
    const anyVisible = [...sectionCards].some((c) => !c.hidden);
    section.hidden = !anyVisible;
  });

  const emptyEl = document.getElementById('course-filter-empty');
  if (emptyEl) emptyEl.hidden = visible > 0;
}

function formatTopicLabel(label: string) {
  return label.replace(/\S+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
}

watch([topic, query], applyFilter);

onMounted(() => {
  applyFilter();

  const { hash } = location;
  if (hash && hash !== '#request-seat') {
    document.querySelector(hash)?.scrollIntoView();
  }

  document.querySelectorAll('nav[aria-label="Course tracks"] a').forEach((link) => {
    link.addEventListener('click', () => {
      query.value = '';
      topic.value = 'all';
      applyFilter();
    });
  });
});
</script>

<template>
  <div>
    <div class="glass-panel mb-6 grid gap-3 p-4 sm:mb-8 sm:grid-cols-2 sm:p-5">
      <label class="block text-sm">
        <span class="mb-1.5 block text-app-muted">Search</span>
        <input
          v-model="query"
          type="search"
          placeholder="What do you want to build?"
          class="field-control"
        />
      </label>
      <label class="block text-sm">
        <span class="mb-1.5 block text-app-muted">Topic</span>
        <select v-model="topic" class="field-control">
          <option value="all">All Topics</option>
          <option v-for="t in topics" :key="t" :value="t">{{ formatTopicLabel(t) }}</option>
        </select>
      </label>
    </div>

    <div
      id="course-filter-empty"
      class="glass-panel p-6 text-center sm:p-8"
      hidden
    >
      <h2 class="font-display text-xl font-semibold">{{ emptyTitle }}</h2>
      <p class="mx-auto mt-2 max-w-lg text-sm text-app-muted">{{ emptyBody }}</p>
    </div>
  </div>
</template>
