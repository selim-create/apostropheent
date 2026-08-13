import V2WorkListing from '@/components/V2WorkListing';
import { listingMetadata } from '@/lib/seo';

export function generateMetadata() {
  return listingMetadata('work', 'fr');
}

export default function FrenchWorkPage() {
  return <V2WorkListing lang="fr" />;
}
