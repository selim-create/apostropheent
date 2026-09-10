import ScrollReveal from '@/components/ScrollReveal';
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
      <ScrollReveal />
      <SiteHeader
        active="testimonials"
        lang={lang}
        enHref="/testimonials"
        frHref="/fr/temoignages"
      />

      <section className="v2-hero-block v2-testimonials-hero">
        <h1>{ui.testimonialsTitle}</h1>
        <p className="v2-intro v2-testimonials-intro">{ui.testimonialsIntro}</p>
      </section>

      <section className="v2-testimonial-grid" aria-label={ui.testimonialsAria}>
        {testimonials.map((item, index) => (
          <article
            className={`v2-testimonial-card ${index % 2 === 0 ? 'is-left' : 'is-right'}`}
            key={item.id}
            data-reveal
          >
            <blockquote>{item.quote}</blockquote>
            <footer>
              <strong>{item.name}</strong>
              {item.role ? <span>{item.role}</span> : null}
              {item.company ? <span>{item.company}</span> : null}
            </footer>
          </article>
        ))}
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
