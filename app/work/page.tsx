import V2WorkListing from '@/components/V2WorkListing';
import { listingMetadata } from '@/lib/seo';

export function generateMetadata() {
  return listingMetadata('work', 'en');
}

export default function WorkPage() {
  return <V2WorkListing lang="en" />;
}
