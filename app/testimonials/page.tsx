import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { testimonials, testimonialsIntro } from '@/lib/site-v2-content';

const testimonialTones = ['pink', 'blue', 'orange', 'cream', 'red', 'blue', 'pink'] as const;

export default function TestimonialsPage() {
  return (
    <main className="v2-page v2-page-testimonials">
      <SiteHeader active="testimonials" />

      <section className="v2-hero-block v2-testimonials-hero">
        <p className="v2-eyebrow">CLIENT VOICES</p>
        <h1>TESTIMONIALS</h1>
        <p className="v2-intro v2-testimonials-intro">{testimonialsIntro}</p>
      </section>

      <section className="v2-testimonial-grid" aria-label="Client testimonials">
        {testimonials.map((item, index) => {
          const tone = testimonialTones[index % testimonialTones.length];
          const featured = index === 0;

          return (
            <article
              className={`v2-testimonial-card testimonial-${tone}${featured ? ' is-featured' : ''}`}
              key={`${item.name}-${item.company}`}
            >
              <div className="v2-testimonial-topline">
                <span className="v2-testimonial-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="v2-testimonial-quote-mark" aria-hidden="true">“</span>
              </div>

              <blockquote>{item.quote}</blockquote>

              <footer>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
                <span>{item.company}</span>
              </footer>
            </article>
          );
        })}
      </section>

      <SiteFooter />
    </main>
  );
}
