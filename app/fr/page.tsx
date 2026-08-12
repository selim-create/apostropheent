import type { Metadata } from 'next';
import LegacyHomeContent from '@/components/LegacyHomeContent';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { getApiSite } from '@/lib/apostrophe-api';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getApiSite('fr').catch(() => null);
  const seo = site?.home?.rank_math;

  return {
    title: seo?.title || 'Apostrophe Entertainment',
    description: seo?.description || 'Apostrophe Entertainment est une agence de communication marketing pour l’industrie mondiale du divertissement et des médias.',
    alternates: {
      canonical: '/fr',
      languages: {
        en: '/',
        fr: '/fr',
      },
    },
  };
}

export default function FrenchPage() {
  return (
    <>
      <SiteHeader active="home" lang="fr" homePage />
      <LegacyHomeContent lang="fr" />
      <SiteFooter lang="fr" />
    </>
  );
}
