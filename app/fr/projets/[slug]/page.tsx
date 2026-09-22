import V2WorkDetail from '@/components/V2WorkDetail';
import { getApiWork } from '@/lib/apostrophe-api';
import type { ApiPreviewParams } from '@/lib/apostrophe-api';
import { workDetailMetadata } from '@/lib/seo';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function previewParams(params: Record<string, string | string[] | undefined>): ApiPreviewParams | null {
  const enabled = params.ae_preview;
  const postId = params.post_id;
  const expires = params.expires;
  const token = params.token;

  if (enabled !== '1' || typeof postId !== 'string' || typeof expires !== 'string' || typeof token !== 'string') {
    return null;
  }

  return { postId, expires, token };
}

export async function generateStaticParams() {
  const works = await getApiWork('fr');
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return workDetailMetadata(slug, 'fr');
}

export default async function FrenchWorkDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const query = await searchParams;
  return <V2WorkDetail lang="fr" slug={slug} preview={previewParams(query)} />;
}
