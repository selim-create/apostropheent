import type { ApiWorkItem } from '@/lib/apostrophe-api';

export type MediaFeaturePublisher = {
  key: 'deadline' | 'variety' | 'episode' | 'formatbiz';
  label: string;
};

const mediaPublishers: Array<MediaFeaturePublisher & { hosts: string[] }> = [
  { key: 'deadline', label: 'DEADLINE', hosts: ['deadline.com'] },
  { key: 'variety', label: 'VARIETY', hosts: ['variety.com'] },
  { key: 'episode', label: 'EPISODE', hosts: ['episodedergi.com'] },
  { key: 'formatbiz', label: 'FORMATBIZ', hosts: ['formatbiz.it', 'formatbiz.com'] },
];

export function getMediaFeaturePublisher(work: Pick<ApiWorkItem, 'external_link'>): MediaFeaturePublisher | null {
  const rawUrl = work.external_link?.url?.trim();
  if (!rawUrl) return null;

  try {
    const host = new URL(rawUrl).hostname.replace(/^www\./, '').toLowerCase();
    const publisher = mediaPublishers.find((item) => item.hosts.some((candidate) => host === candidate || host.endsWith(`.${candidate}`)));
    return publisher ? { key: publisher.key, label: publisher.label } : null;
  } catch {
    const normalized = rawUrl.toLowerCase();
    const publisher = mediaPublishers.find((item) => item.hosts.some((candidate) => normalized.includes(candidate)));
    return publisher ? { key: publisher.key, label: publisher.label } : null;
  }
}
