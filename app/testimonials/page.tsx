import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { testimonials, testimonialsIntro } from '@/lib/site-v2-content';

export default function TestimonialsPage() {
  return (
    <main className="v2-page v2-page-testimonials">
      <SiteHeader active="testimonials" />
      <section className="v2-hero-block v2-testimonials-hero">
        <p className="v2-eyebrow">CLIENT VOICES</p>
        <h1>TESTIMONIALS</h1>
        <p className="v2-intro">{testimonialsIntro}</p>
      </section>
      <section className="v2-testimonial-list">
        {testimonials.map((item, index) => (
          <article className="v2-testimonial-card" key={`${item.name}-${item.company}`}>
            <div className="v2-testimonial-number">{String(index + 1).padStart(2, '0')}</div>
            <blockquote>“{item.quote}”</blockquote>
            <footer>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
              <span>{item.company}</span>
            </footer>
          </article>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
