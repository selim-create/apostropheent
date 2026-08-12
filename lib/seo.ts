import type { Metadata } from 'next';
import { getApiSite, getApiWorkItem, type ApiLanguage } from '@/lib/apostrophe-api';

const SITE_URL = 'https://apostropheent.com';

export async function listingMetadata(type: 'work' | 'testimonials', lang: ApiLanguage): Promise<Metadata> {
  const site = await getApiSite(lang).catch(() => null);
  const seo = site?.listing_seo?.[type];

  const isFr = lang === 'fr';
  const path = type === 'work' ? (isFr ? '/fr/projets' : '/work') : (isFr ? '/fr/temoignages' : '/testimonials');
  const enPath = type === 'work' ? '/work' : '/testimonials';
  const frPath = type === 'work' ? '/fr/projets' : '/fr/temoignages';

  const defaults = type === 'work'
    ? {
        title: isFr ? 'Projets | Apostrophe Entertainment' : 'Work | Apostrophe Entertainment',
        description: isFr
          ? 'Découvrez une sélection de projets, campagnes et collaborations réalisés par Apostrophe Entertainment.'
          : 'Explore selected projects, campaigns and partnerships crafted by Apostrophe Entertainment.',
      }
    : {
        title: isFr ? 'Témoignages | Apostrophe Entertainment' : 'Testimonials | Apostrophe Entertainment',
        description: isFr
          ? 'Découvrez ce que nos clients disent de leur collaboration avec Apostrophe Entertainment.'
          : 'Read what clients say about partnering with Apostrophe Entertainment.',
      };

  const title = seo?.title?.trim() || defaults.title;
  const description = seo?.description?.trim() || defaults.description;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        'en': enPath,
        'fr': frPath,
        'x-default': enPath,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: 'Apostrophe Entertainment',
      locale: isFr ? 'fr_FR' : 'en_US',
      type: 'website',
    },
  };
}

export async function workDetailMetadata(slug: string, lang: ApiLanguage): Promise<Metadata> {
  const isFr = lang === 'fr';
  const work = await getApiWorkItem(slug, lang).catch(() => null);
  const path = isFr ? `/fr/projets/${slug}` : `/work/${slug}`;
  const enSlug = work?.translations?.en?.slug || slug;
  const frSlug = work?.translations?.fr?.slug || slug;
  const enPath = `/work/${enSlug}`;
  const frPath = `/fr/projets/${frSlug}`;

  const title = work?.rank_math?.title?.trim() || (work?.title ? `${work.title} | Apostrophe Entertainment` : 'Work | Apostrophe Entertainment');
  const description = work?.rank_math?.description?.trim() || work?.summary?.trim() || 'A selected project by Apostrophe Entertainment.';
  const image = work?.hero_media || work?.thumbnail;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        'en': enPath,
        'fr': frPath,
        'x-default': enPath,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: 'Apostrophe Entertainment',
      locale: isFr ? 'fr_FR' : 'en_US',
      type: 'article',
      ...(image?.url ? { images: [{ url: image.url, alt: image.alt || work?.title || 'Apostrophe Entertainment' }] } : {}),
    },
  };
}
