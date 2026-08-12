import LegacyHomeContent from '@/components/LegacyHomeContent';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';

export default function HomePage() {
  return (
    <>
      <SiteHeader active="home" lang="en" homePage />
      <LegacyHomeContent lang="en" />
      <SiteFooter lang="en" />
    </>
  );
}
