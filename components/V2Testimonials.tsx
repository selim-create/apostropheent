import ScrollReveal from '@/components/ScrollReveal';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { getApiPreview, getApiSite, getApiTestimonials } from '@/lib/apostrophe-api';
import type { ApiPreviewParams, ApiTestimonial } from '@/lib/apostrophe-api';
import type { SiteLanguage } from '@/lib/site-v2-content';
import { v2Ui } from '@/lib/site-v2-i18n';

export default async function V2Testimonials({ lang, preview }: { lang: SiteLanguage; preview?: ApiPreviewParams | null }) {
  const ui = v2Ui[lang];
  const [initialTestimonials, site] = await Promise.all([getApiTestimonials(lang), getApiSite(lang)]);
  let testimonials = initialTestimonials;
  const listingContent = site.listing_content?.testimonials;
  const pageTitle = listingContent?.title?.trim() || ui.testimonialsTitle;
  const pageIntro = listingContent?.intro?.trim() || ui.testimonialsIntro;

  if (preview) {
    try {
      const data = await getApiPreview<ApiTestimonial>(preview);
      if (data.post_type === 'ae_testimonial') {
        testimonials = [data.item, ...testimonials.filter((item) => item.id !== data.item.id)];
      }
    } catch {
      // Invalid/expired preview tokens should not break the public listing.
    }
  }

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
        <h1>{pageTitle}</h1>
        <p className="v2-intro v2-testimonials-intro">{pageIntro}</p>
      </section>

      <section className="v2-testimonial-grid" aria-label={ui.testimonialsAria}>
        {testimonials.map((item, index) => (
          <article
            id={`testimonial-${item.id}`}
            className={`v2-testimonial-card ${index % 2 === 0 ? 'is-left' : 'is-right'}`}
            key={item.id}
            data-reveal="late"
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
