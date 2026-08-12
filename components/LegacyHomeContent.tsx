import Script from 'next/script';
import { getApiSite } from '@/lib/apostrophe-api';
import { legacyContent, type LegacyLanguage } from '@/lib/legacy-content';

const serviceAssetMap: Record<string, string> = {
  'strategic-communications': '/assets/img/services/strategic-communications.gif',
  'digital-marketing': '/assets/img/services/digital-marketing.gif',
  'b2b-event-marketing': '/assets/img/services/b2b-event-marketing.gif',
  '360-creative-marketing': '/assets/img/services/360-creative-marketing.gif',
  'strategic-consultancy': '/assets/img/services/strategic-consultancy.gif',
};

export default async function LegacyHomeContent({ lang }: { lang: LegacyLanguage }) {
  const c = legacyContent[lang];
  const api = await getApiSite(lang).catch(() => null);
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
          <div className="row"><div className="col text-center appear-animation" data-appear-animation="fadeInLeftShorter" data-appear-animation-delay="300"><div className="metin" dangerouslySetInnerHTML={{ __html: aboutHtml }} /></div></div>
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
                  <div className="metin mb-3" dangerouslySetInnerHTML={{ __html: service.contentHtml }} />
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

      <section id="contact" className="border-0 m-0 appear-animation" data-appear-animation="fadeIn">
        <div className="container my-3"><div className="row mb-5"><div className="col text-center appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="200"><h2 className="font-weight-semi-bold mb-2">{contactHeading}</h2></div></div></div>
      </section>

      <Script src="/assets/js/theme-core.js" strategy="afterInteractive" />
      <Script src="/assets/js/theme.js" strategy="afterInteractive" />
    </>
  );
}
