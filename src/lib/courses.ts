import { getCollection, type CollectionEntry } from 'astro:content';

export type CourseEntry = CollectionEntry<'courses'>;

export type CourseListItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  level: CourseEntry['data']['level'];
  topics: string[];
  duration?: string;
  format: CourseEntry['data']['format'];
  status: CourseEntry['data']['status'];
  featured: boolean;
  order: number;
  outcomes: string[];
  prerequisites: string[];
};

export function toCourseListItem(entry: CourseEntry): CourseListItem {
  return {
    id: entry.id,
    slug: entry.id,
    title: entry.data.title,
    summary: entry.data.summary,
    level: entry.data.level,
    topics: entry.data.topics,
    duration: entry.data.duration,
    format: entry.data.format,
    status: entry.data.status,
    featured: entry.data.featured,
    order: entry.data.order,
    outcomes: entry.data.outcomes,
    prerequisites: entry.data.prerequisites,
  };
}

export async function getAllCourses(): Promise<CourseListItem[]> {
  const entries = await getCollection('courses');
  return entries
    .map(toCourseListItem)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export async function getCourseBySlug(slug: string): Promise<CourseEntry | undefined> {
  const entries = await getCollection('courses');
  return entries.find((e) => e.id === slug || e.id === `${slug}.md`);
}

export function getUniqueTopics(courses: CourseListItem[]): string[] {
  return [...new Set(courses.flatMap((c) => c.topics))].sort();
}

export function getUniqueLevels(courses: CourseListItem[]): CourseListItem['level'][] {
  const order: CourseListItem['level'][] = ['beginner', 'intermediate', 'advanced'];
  const present = new Set(courses.map((c) => c.level));
  return order.filter((l) => present.has(l));
}

export function filterCourses(
  courses: CourseListItem[],
  opts: { topic?: string; level?: string; query?: string },
): CourseListItem[] {
  const q = opts.query?.trim().toLowerCase() ?? '';
  return courses.filter((c) => {
    if (opts.topic && opts.topic !== 'all' && !c.topics.includes(opts.topic)) return false;
    if (opts.level && opts.level !== 'all' && c.level !== opts.level) return false;
    if (!q) return true;
    const hay = [c.title, c.summary, ...c.topics].join(' ').toLowerCase();
    return hay.includes(q);
  });
}
