import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { getApiTestimonials } from '@/lib/apostrophe-api';
import type { SiteLanguage } from '@/lib/site-v2-content';
import { v2Ui } from '@/lib/site-v2-i18n';

export default async function V2Testimonials({ lang }: { lang: SiteLanguage }) {
  const ui = v2Ui[lang];
  const testimonials = await getApiTestimonials(lang);

  return (
    <main className="v2-page v2-page-testimonials">
      <SiteHeader
        active="testimonials"
        lang={lang}
        enHref="/testimonials"
        frHref="/fr/temoignages"
      />

      <section className="v2-hero-block v2-testimonials-hero">
        <p className="v2-eyebrow">{ui.testimonialsEyebrow}</p>
        <h1>{ui.testimonialsTitle}</h1>
        <p className="v2-intro v2-testimonials-intro">{ui.testimonialsIntro}</p>
      </section>

      <section className="v2-testimonial-grid" aria-label={ui.testimonialsAria}>
        {testimonials.map((item, index) => {
          const featured = index === 0;

          return (
            <article
              className={`v2-testimonial-card testimonial-${item.accent}${featured ? ' is-featured' : ''}`}
              key={item.id}
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

      <SiteFooter lang={lang} />
    </main>
  );
}
