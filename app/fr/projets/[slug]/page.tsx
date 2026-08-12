import V2WorkDetail from '@/components/V2WorkDetail';
import { getApiWork } from '@/lib/apostrophe-api';
import { workDetailMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  const works = await getApiWork('fr');
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return workDetailMetadata(slug, 'fr');
}

export default async function FrenchWorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <V2WorkDetail lang="fr" slug={slug} />;
}
