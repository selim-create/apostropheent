import V2WorkDetail from '@/components/V2WorkDetail';
import { works } from '@/lib/site-v2-content';

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export default async function FrenchWorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <V2WorkDetail lang="fr" slug={slug} />;
}
