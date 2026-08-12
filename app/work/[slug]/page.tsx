import V2WorkDetail from '@/components/V2WorkDetail';
import { getApiWork } from '@/lib/apostrophe-api';

export async function generateStaticParams() {
  const works = await getApiWork('en');
  return works.map((work) => ({ slug: work.slug }));
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <V2WorkDetail lang="en" slug={slug} />;
}
