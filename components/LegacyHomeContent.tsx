import Link from 'next/link';
import Script from 'next/script';
import { getApiSite, getApiTestimonials, getApiWork } from '@/lib/apostrophe-api';
import { legacyContent, type LegacyLanguage } from '@/lib/legacy-content';
import { localizeService } from '@/lib/site-v2-i18n';
import { getWorkPresentation } from '@/lib/work-presentation';

const serviceAssetMap: Record<string, string> = {
  'strategic-communications': '/assets/img/services/strategic-communications.gif',
  'digital-marketing': '/assets/img/services/digital-marketing.gif',
  'b2b-event-marketing': '/assets/img/services/b2b-event-marketing.gif',
  '360-creative-marketing': '/assets/img/services/360-creative-marketing.gif',
  'strategic-consultancy': '/assets/img/services/strategic-consultancy.gif',
};

function cmsParagraphs(html: string): string[] {
  const normalized = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<\/(p|div|li|blockquote|h[1-6])\s*>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/[\t\r]+/g, ' ')
    .trim();

  return normalized
    .split(/\n\s*\n+/)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function renderLegacyCopy(html: string, className = 'metin') {
  const paragraphs = cmsParagraphs(html);

  return paragraphs.map((paragraph, index) => (
    <p
      className={`${className}${index < paragraphs.length - 1 ? ' mb-3' : ''}`}
      key={`${paragraph.slice(0, 32)}-${index}`}
      dangerouslySetInnerHTML={{ __html: paragraph }}
    />
  ));
}

function excerpt(value: string, maxLength = 320): string {
  const clean = value.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLength) return clean;
  const shortened = clean.slice(0, maxLength);
  const boundary = shortened.lastIndexOf(' ');
  return `${shortened.slice(0, boundary > 220 ? boundary : maxLength).trim()}…`;
}

export default async function LegacyHomeContent({ lang }: { lang: LegacyLanguage }) {
  const c = legacyContent[lang];
  const [api, works, testimonials] = await Promise.all([
    getApiSite(lang).catch(() => null),
    getApiWork(lang).catch(() => []),
    getApiTestimonials(lang).catch(() => []),
  ]);
  const home = api?.home;

  const heroTitle = home?.hero_title || c.heroTitle;
  const aboutHeading = home?.about_heading || c.nav.about;
  const aboutHtml = home?.about_content || c.aboutHtml;
  const servicesHeading = home?.services_heading || c.nav.services;
  const fieldsHeading = home?.fields_heading || c.nav.fields;
  const contactHeading = home?.contact_heading || c.nav.contact;

  const services = api?.services?.length
    ? api.services.map((service) => ({
        id: service.style_key || service.slug,
        title: service.title,
        contentHtml: service.content,
        image: service.image?.url || serviceAssetMap[service.style_key] || '',
      }))
    : c.services.map((service) => ({
        id: service.id,
        title: service.title,
        contentHtml: service.content,
        image: service.image,
      }));

  const fields = api?.fields?.length ? api.fields.map((field) => field.title) : c.fields;
  const instagram = api?.contact.instagram || 'https://www.instagram.com/apostropheentertainment';
  const linkedin = api?.contact.linkedin || 'https://www.linkedin.com/company/apostrophe-entertainment';
  const heroDesktop = home?.hero_desktop?.url || '/assets/img/slider/apostrophe-entertainment-slider-1.jpg';
  const heroMobile = home?.hero_mobile?.url || '/assets/img/slider/apostrophe-entertainment-slider-mobile-1.jpg';

  const workPath = lang === 'fr' ? '/fr/projets' : '/work';
  const testimonialsPath = lang === 'fr' ? '/fr/temoignages' : '/testimonials';
  const workHeading = lang === 'fr' ? 'PROJETS' : 'WORK';
  const testimonialsHeading = lang === 'fr' ? 'TÉMOIGNAGES' : 'TESTIMONIALS';
  const workCta = lang === 'fr' ? 'Voir tous les projets' : 'View all work';
  const testimonialsCta = lang === 'fr' ? 'Voir tous les témoignages' : 'Read all testimonials';
  const workPreview = works.slice(0, 3);
  const testimonialPreview = testimonials.slice(0, 2);

  return (
    <>
      <div className="body">
        <main role="main" className="main">
          <section id="home">
            <div id="apostropheslider" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-touch="true">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img className="d-block w-100 d-none d-md-block" src={heroDesktop} alt="Apostrophe Entertainment" />
                  <img className="d-block w-100 d-xl-none d-lg-none d-md-none" src={heroMobile} alt="Apostrophe Entertainment" />
                  <div className="carousel-caption">
                    <div className="baslik appear-animation" data-appear-animation="fadeInDown" data-appear-animation-delay="2.5" data-appear-animation-duration="1.5s" data-plugin-animated-letters="" data-plugin-options="{'startDelay': 500, 'minWindowWidth': 0, 'animationName': 'typeWriter', 'animationSpeed': 50}">
                      {heroTitle}
                    </div>
                  </div>
                </div>
              </div>
              <div className="slider-social">
                <a target="_blank" rel="noreferrer" href={instagram}><img src="/assets/img/instagram.svg" height="20" alt="Apostrophe Instagram" /></a>
                <a target="_blank" rel="noreferrer" href={linkedin}><img src="/assets/img/linkedin.svg" height="20" alt="Apostrophe Linkedin" /></a>
              </div>
            </div>
          </section>
        </main>
      </div>

      <section id="aboutus" className="py-5 border-0 m-0 appear-animation" data-appear-animation="fadeIn">
        <div className="container my-3">
          <div className="row mb-5"><div className="col text-center appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="200"><h2 className="font-weight-semi-bold mb-2">{aboutHeading}</h2></div></div>
          <div className="row"><div className="col text-center appear-animation" data-appear-animation="fadeInLeftShorter" data-appear-animation-delay="300">{renderLegacyCopy(aboutHtml)}</div></div>
        </div>
      </section>

      <section id="services" className="py-5 border-0 m-0 appear-animation" data-appear-animation="fadeIn">
        <div className="container my-3">
          <div className="row mb-5"><div className="col text-center appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="200"><h2 className="font-weight-semi-bold mb-2">{servicesHeading}</h2></div></div>
          {services.map((service, index) => {
            const imageFirst = index % 2 === 1;
            return (
              <div className="row py-3" id={service.id} key={service.id}>
                <div className={`col-lg-8 col-md-8 appear-animation align-self-center order-2 ${imageFirst ? 'order-lg-2 order-md-2' : 'order-lg-1 order-md-1'}`} data-appear-animation={imageFirst ? 'fadeInLeftShorter' : 'fadeInRightShorter'} data-appear-animation-delay="300">
                  <div className={`services-head-${index + 1} mb-3`}>{service.title}</div>
                  <div className="mb-3">{renderLegacyCopy(service.contentHtml)}</div>
                </div>
                <div className={`col-lg-4 col-md-4 appear-animation align-self-center order-1 ${imageFirst ? 'order-lg-1 order-md-1' : 'order-lg-2 order-md-2'}`} data-appear-animation={imageFirst ? 'fadeInRightShorter' : 'fadeInLeftShorter'} data-appear-animation-delay="300">
                  {service.image ? <img src={service.image} className="img-fluid mb-3 mt-3" alt={service.title} /> : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="fields" className="py-5 border-0 m-0 appear-animation" data-appear-animation="fadeIn">
        <div className="container my-3">
          <div className="row mb-5"><div className="col text-center appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="200"><h2 className="font-weight-semi-bold mb-2">{fieldsHeading}</h2></div></div>
          <div className="row"><div className="col text-center"><div className="hopCircleContainer">
            {fields.map((field, index) => <div key={field} className="appear-animation circle-title" data-appear-animation="rotateIn" data-appear-animation-delay={String((index + 1) * 100)}>{field}</div>)}
          </div></div></div>
        </div>
      </section>

      {workPreview.length ? (
        <section id="home-work" className="home-preview home-work-preview appear-animation" data-appear-animation="fadeIn">
          <div className="container">
            <div className="home-preview-head appear-animation" data-appear-animation="fadeInUpShorter">
              <h2>{workHeading}</h2>
              <Link href={workPath}>{workCta} <span>→</span></Link>
            </div>
            <div className="home-work-grid">
              {workPreview.map((work, index) => {
                const presentation = getWorkPresentation(work);
                const media = presentation.cover;
                return (
                  <Link
                    key={work.id}
                    href={`${workPath}/${work.slug}`}
                    className={`home-work-card appear-animation${presentation.isMediaFeature ? ' is-media-feature' : ''}`}
                    data-appear-animation="fadeInUpShorter"
                    data-appear-animation-delay={String(100 + index * 120)}
                  >
                    <div className="home-work-media">
                      {presentation.isMediaFeature && presentation.publisherLabel ? <span className="home-work-publisher">{presentation.publisherLabel}</span> : null}
                      {media ? <img src={media.url} alt={media.alt || work.title} loading="lazy" /> : <span className="home-work-placeholder" />}
                    </div>
                    <div className="home-work-copy">
                      <p>{localizeService(work.service, lang)}</p>
                      <h3>{work.title}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {testimonialPreview.length ? (
        <section id="home-testimonials" className="home-preview home-testimonials-preview appear-animation" data-appear-animation="fadeIn">
          <div className="container">
            <div className="home-preview-head appear-animation" data-appear-animation="fadeInUpShorter">
              <h2>{testimonialsHeading}</h2>
              <Link href={testimonialsPath}>{testimonialsCta} <span>→</span></Link>
            </div>
            <div className="home-testimonial-list">
              {testimonialPreview.map((item, index) => (
                <article
                  className={`home-testimonial-row appear-animation${index % 2 ? ' is-alt' : ''}`}
                  data-appear-animation={index % 2 ? 'fadeInRightShorter' : 'fadeInLeftShorter'}
                  data-appear-animation-delay={String(120 + index * 120)}
                  key={item.id}
                >
                  <blockquote>“{excerpt(item.quote)}”</blockquote>
                  <footer>
                    <strong>{item.name}</strong>
                    {item.role ? <span>{item.role}</span> : null}
                    {item.company ? <span>{item.company}</span> : null}
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="contact" className="border-0 m-0 appear-animation" data-appear-animation="fadeIn">
        <div className="container my-3"><div className="row mb-5"><div className="col text-center appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="200"><h2 className="font-weight-semi-bold mb-2">{contactHeading}</h2></div></div></div>
      </section>

      <Script src="/assets/js/theme-core.js" strategy="afterInteractive" />
      <Script src="/assets/js/theme.js" strategy="afterInteractive" />
    </>
  );
}
