import V2Testimonials from '@/components/V2Testimonials';
import { listingMetadata } from '@/lib/seo';

export function generateMetadata() {
  return listingMetadata('testimonials', 'en');
}

export default function TestimonialsPage() {
  return <V2Testimonials lang="en" />;
}
