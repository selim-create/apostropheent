import V2Testimonials from '@/components/V2Testimonials';
import { listingMetadata } from '@/lib/seo';

export function generateMetadata() {
  return listingMetadata('testimonials', 'fr');
}

export default function FrenchTestimonialsPage() {
  return <V2Testimonials lang="fr" />;
}
