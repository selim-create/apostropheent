import type { Metadata } from 'next';
import LegacyHomeContent from '@/components/LegacyHomeContent';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { getApiSite } from '@/lib/apostrophe-api';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getApiSite('en').catch(() => null);
  const seo = site?.home?.rank_math;

  return {
    title: seo?.title || 'Apostrophe Entertainment',
    description: seo?.description || 'Apostrophe Entertainment is a marketing communications agency for the global entertainment and media industry.',
    alternates: {
      canonical: '/',
      languages: {
        en: '/',
        fr: '/fr',
      },
    },
  };
}

export default function HomePage() {
  return (
    <>
      <SiteHeader active="home" lang="en" homePage />
      <LegacyHomeContent lang="en" />
      <SiteFooter lang="en" />
    </>
  );
}
