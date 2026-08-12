import LegacyHomeContent from '@/components/LegacyHomeContent';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';

export default function FrenchPage() {
  return (
    <>
      <SiteHeader active="home" lang="fr" homePage />
      <LegacyHomeContent lang="fr" />
      <SiteFooter lang="fr" />
    </>
  );
}
