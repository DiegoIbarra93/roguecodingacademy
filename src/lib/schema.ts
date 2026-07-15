import { site } from '../data/site';
import type { CourseListItem } from './courses';
import type { TeamMember } from '../data/team';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': site.orgId,
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.country,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: site.location.areaServed,
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': site.websiteId,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { '@id': site.orgId },
  };
}

export function webPageSchema(opts: {
  name: string;
  description: string;
  path: string;
  type?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': opts.type ?? 'WebPage',
    '@id': `${site.url}${opts.path}#webpage`,
    url: `${site.url}${opts.path}`,
    name: opts.name,
    description: opts.description,
    isPartOf: { '@id': site.websiteId },
    about: { '@id': site.orgId },
  };
}

export function courseSchema(course: CourseListItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.summary,
    provider: { '@id': site.orgId },
    educationalLevel: course.level,
    url: `${site.url}/courses/${course.slug}`,
  };
}

export function personSchema(member: TeamMember) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}/team#${member.id}`,
    name: member.name,
    jobTitle: member.role,
    description: member.bio.join(' '),
    worksFor: { '@id': site.orgId },
    ...(member.sameAs?.length ? { sameAs: member.sameAs } : {}),
  };
}
