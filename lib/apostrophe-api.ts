export type ApiLanguage = 'en' | 'fr';

export type MediaAsset = {
  id: number;
  url: string;
  alt: string;
  mime: string;
  width: number | null;
  height: number | null;
};

export type ApiWorkItem = {
  id: number;
  slug: string;
  language: ApiLanguage;
  title: string;
  service: string;
  year: number | null;
  accent: 'pink' | 'orange' | 'blue' | 'cream' | 'red';
  summary: string;
  content: string;
  order: number;
  thumbnail: MediaAsset | null;
  hero_media: MediaAsset | null;
  gallery: MediaAsset[];
  video_url: string;
  external_link: {
    label: string;
    url: string;
  };
  translations: Record<string, { id: number; slug: string }>;
  rank_math: {
    title: string;
    description: string;
    focus_keyword: string;
  };
};

export type ApiTestimonial = {
  id: number;
  language: ApiLanguage;
  quote: string;
  name: string;
  role: string;
  company: string;
  accent: 'pink' | 'orange' | 'blue' | 'cream' | 'red';
  order: number;
  translations: Record<string, { id: number; slug: string }>;
};

const API_BASE = (process.env.APOSTROPHE_API_URL ?? 'https://api.apostropheent.com').replace(/\/$/, '');

async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}/wp-json/apostrophe/v1${path}`, {
    next: { revalidate: 300 },
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Apostrophe API ${response.status}: ${path}`);
  }

  return response.json() as Promise<T>;
}

export async function getApiWork(lang: ApiLanguage): Promise<ApiWorkItem[]> {
  const data = await apiFetch<{ language: string; items: ApiWorkItem[] }>(`/work?lang=${lang}`);
  return data.items;
}

export async function getApiWorkItem(slug: string, lang: ApiLanguage): Promise<ApiWorkItem> {
  return apiFetch<ApiWorkItem>(`/work/${encodeURIComponent(slug)}?lang=${lang}`);
}

export async function getApiTestimonials(lang: ApiLanguage): Promise<ApiTestimonial[]> {
  const data = await apiFetch<{ language: string; items: ApiTestimonial[] }>(`/testimonials?lang=${lang}`);
  return data.items;
}
