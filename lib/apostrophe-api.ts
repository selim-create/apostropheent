export type ApiLanguage = 'en' | 'fr';

export type MediaAsset = {
  id: number;
  url: string;
  alt: string;
  mime: string;
  width: number | null;
  height: number | null;
};

export type ApiHome = {
  id: number;
  title: string;
  hero_title: string;
  about_heading: string;
  about_content: string;
  services_heading: string;
  fields_heading: string;
  contact_heading: string;
  hero_desktop: MediaAsset | null;
  hero_mobile: MediaAsset | null;
  translations: Record<string, { id: number; slug: string }>;
  rank_math: { title: string; description: string; focus_keyword: string };
};

export type ApiService = {
  id: number;
  slug: string;
  title: string;
  content: string;
  image: MediaAsset | null;
  style_key: string;
  order: number;
};

export type ApiField = {
  id: number;
  slug: string;
  title: string;
  order: number;
};

export type ApiSite = {
  schema_version: string;
  language: ApiLanguage;
  home: ApiHome | null;
  services: ApiService[];
  fields: ApiField[];
  listing_seo?: {
    work: { title: string; description: string };
    testimonials: { title: string; description: string };
  };
  contact: {
    email: string;
    phone: string;
    instagram: string;
    linkedin: string;
    addresses: { london: string; paris: string; istanbul: string };
  };
};

export type ApiWorkVideo = {
  id: number;
  url: string;
  attachment_id: number;
  source_type: 'youtube' | 'vimeo' | 'file' | 'external';
  orientation: 'landscape' | 'portrait' | 'square';
  poster: MediaAsset | null;
  title: string;
  featured: boolean;
  order: number;
};

export type ApiWorkItem = {
  id: number;
  slug: string;
  language: ApiLanguage;
  title: string;
  service: string;
  year: number | null;
  accent: 'pink' | 'orange' | 'blue' | 'cream' | 'red';
  presentation_type: 'standard' | 'media_feature';
  media_publisher: string;
  media_cover: MediaAsset | null;
  summary: string;
  content: string;
  order: number;
  thumbnail: MediaAsset | null;
  hero_media: MediaAsset | null;
  gallery: MediaAsset[];
  video_url: string;
  videos?: ApiWorkVideo[];
  external_link: { label: string; url: string };
  translations: Record<string, { id: number; slug: string }>;
  rank_math: { title: string; description: string; focus_keyword: string };
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
const IS_DEV = process.env.NODE_ENV !== 'production';

async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}/wp-json/apostrophe/v1${path}`, {
    ...(IS_DEV ? { cache: 'no-store' as const } : { next: { revalidate: 300 } }),
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) throw new Error(`Apostrophe API ${response.status}: ${path}`);
  return response.json() as Promise<T>;
}

export async function getApiSite(lang: ApiLanguage): Promise<ApiSite> {
  return apiFetch<ApiSite>(`/site?lang=${lang}`);
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
