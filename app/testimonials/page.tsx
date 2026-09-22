import V2Testimonials from '@/components/V2Testimonials';
import type { ApiPreviewParams } from '@/lib/apostrophe-api';
import { listingMetadata } from '@/lib/seo';

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

export function generateMetadata() {
  return listingMetadata('testimonials', 'en');
}

export default async function TestimonialsPage({ searchParams }: { searchParams: SearchParams }) {
  const query = await searchParams;
  return <V2Testimonials lang="en" preview={previewParams(query)} />;
}
