import Link from 'next/link';
import Script from 'next/script';
import { legacyContent, type LegacyLanguage } from '@/lib/legacy-content';

export default function LegacySite({ lang }: { lang: LegacyLanguage }) {
  const c = legacyContent[lang];
  const isFr = lang === 'fr';

  return (
    <>
      <div className="body">
        <header id="header" className="header-transparent header-effect-shrink" data-plugin-options="{'stickyEnabled': true, 'stickyEffect': 'shrink', 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': true, 'stickyChangeLogo': true, 'stickyStartAt': 30, 'stickyHeaderContainerHeight': 70}">
          <div className="header-body border-top-0 bg-light box-shadow-none">
            <div className="header-container container">
              <div className="header-row">
                <div className="header-column">
                  <div className="header-row">
                    <div className="header-logo">
                      <Link href={isFr ? '/fr' : '/'} title="Apostrophe Entertainment">
                        <img alt="Apostrophe Entertainment" src="/assets/img/logo.svg" className="logo-main" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="header-column justify-content-end">
                  <div className="header-row">
                    <div className="header-nav header-nav-links header-nav-dropdowns-dark header-nav-light-text order-2 order-lg-1">
                      <div className="header-nav-main header-nav-main-font-lg header-nav-main-font-lg-upper-2 header-nav-main-mobile-dark header-nav-main-square header-nav-main-dropdown-no-borders header-nav-main-effect-2 header-nav-main-sub-effect-1">
                        <nav className="collapse">
                          <ul className="nav nav-pills" id="mainNav">
                            <li><a data-hash="" className="nav-link active" href="#home">{c.nav.home}</a></li>
                            <li><a className="nav-link" data-hash="" data-hash-offset="0" data-hash-offset-lg="68" href="#aboutus">{c.nav.about}</a></li>
                            <li><a className="nav-link" data-hash="" data-hash-offset="0" data-hash-offset-lg="68" href="#services">{c.nav.services}</a></li>
                            <li><a className="nav-link" data-hash="" data-hash-offset="0" data-hash-offset-lg="68" href="#fields">{c.nav.fields}</a></li>
                            <li><a className="nav-link" data-hash="" data-hash-offset="0" data-hash-offset-lg="68" href="#contact">{c.nav.contact}</a></li>
                            <li className="dil">
                              <div className="dilsecimi">
                                <Link title={c.languageLabels.en} href="/" className={!isFr ? 'aktif' : undefined}>EN</Link>
                                <Link title={c.languageLabels.fr} href="/fr" className={isFr ? 'aktif' : undefined}>FR</Link>
                              </div>
                            </li>
                          </ul>
                        </nav>
                      </div>
                      <button className="btn header-btn-collapse-nav" data-bs-toggle="collapse" data-bs-target=".header-nav-main nav"><i className="fas fa-bars" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main role="main" className="main">
          <section id="home">
            <div id="apostropheslider" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-touch="true">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img className="d-block w-100 d-none d-md-block" src="/assets/img/slider/apostrophe-entertainment-slider-1.jpg" alt="Apostrophe Entertainment" />
                  <img className="d-block w-100 d-xl-none d-lg-none d-md-none" src="/assets/img/slider/apostrophe-entertainment-slider-mobile-1.jpg" alt="Apostrophe Entertainment" />
                  <div className="carousel-caption">
                    <div className="baslik appear-animation" data-appear-animation="fadeInDown" data-appear-animation-delay="2.5" data-appear-animation-duration="1.5s" data-plugin-animated-letters="" data-plugin-options="{'startDelay': 500, 'minWindowWidth': 0, 'animationName': 'typeWriter', 'animationSpeed': 50}">
                      {c.heroTitle}
                    </div>
                  </div>
                </div>
              </div>
              <div className="slider-social">
                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/apostropheentertainment"><img src="/assets/img/instagram.svg" height="20" alt="Apostrophe Instagram" /></a>
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/apostrophe-entertainment"><img src="/assets/img/linkedin.svg" height="20" alt="Apostrophe Linkedin" /></a>
              </div>
            </div>
          </section>
        </main>
      </div>

      <section id="aboutus" className="py-5 border-0 m-0 appear-animation" data-appear-animation="fadeIn">
        <div className="container my-3">
          <div className="row mb-5"><div className="col text-center appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="200"><h2 className="font-weight-semi-bold mb-2">{c.nav.about}</h2></div></div>
          <div className="row"><div className="col text-center appear-animation" data-appear-animation="fadeInLeftShorter" data-appear-animation-delay="300"><p className="metin" dangerouslySetInnerHTML={{ __html: c.aboutHtml }} /></div></div>
        </div>
      </section>

      <section id="services" className="py-5 border-0 m-0 appear-animation" data-appear-animation="fadeIn">
        <div className="container my-3">
          <div className="row mb-5"><div className="col text-center appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="200"><h2 className="font-weight-semi-bold mb-2">{c.nav.services}</h2></div></div>
          {c.services.map((service, index) => {
            const imageFirst = index % 2 === 1;
            return (
              <div className="row py-3" id={service.id} key={service.id}>
                <div className={`col-lg-8 col-md-8 appear-animation align-self-center order-2 ${imageFirst ? 'order-lg-2 order-md-2' : 'order-lg-1 order-md-1'}`} data-appear-animation={imageFirst ? 'fadeInLeftShorter' : 'fadeInRightShorter'} data-appear-animation-delay="300">
                  <div className={`services-head-${index + 1} mb-3`}>{service.title}</div>
                  <p className="metin mb-3">{service.content}</p>
                </div>
                <div className={`col-lg-4 col-md-4 appear-animation align-self-center order-1 ${imageFirst ? 'order-lg-1 order-md-1' : 'order-lg-2 order-md-2'}`} data-appear-animation={imageFirst ? 'fadeInRightShorter' : 'fadeInLeftShorter'} data-appear-animation-delay="300">
                  <img src={service.image} className="img-fluid mb-3 mt-3" alt={service.title} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="fields" className="py-5 border-0 m-0 appear-animation" data-appear-animation="fadeIn">
        <div className="container my-3">
          <div className="row mb-5"><div className="col text-center appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="200"><h2 className="font-weight-semi-bold mb-2">{c.nav.fields}</h2></div></div>
          <div className="row"><div className="col text-center"><div className="hopCircleContainer">
            {c.fields.map((field, index) => <div key={field} className="appear-animation circle-title" data-appear-animation="rotateIn" data-appear-animation-delay={String((index + 1) * 100)}>{field}</div>)}
          </div></div></div>
        </div>
      </section>

      <section id="contact" className="border-0 m-0 appear-animation" data-appear-animation="fadeIn">
        <div className="container my-3"><div className="row mb-5"><div className="col text-center appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="200"><h2 className="font-weight-semi-bold mb-2">{c.nav.contact}</h2></div></div></div>
      </section>

      <footer id="footer" className="mt-0">
        <div className="container">
          <div className="row py-5">
            <div className="col-lg-4 mt-2 mb-2 text-xl-start text-lg-start text-md-center text-center appear-animation" data-appear-animation="fadeInRightShorter" data-appear-animation-delay="200">
              <Link href={isFr ? '/fr' : '/'}><img alt="Apostrophe Entertainment" width="222" height="80" src="/assets/img/footer-logo.svg" className="mb-4" /></Link>
              <p className="mb-4" dangerouslySetInnerHTML={{ __html: c.footer.shortHtml }} />
              <a href="mailto:info@apostropheent.com">info@ApostropheEnt.com</a>
              <ul className="footer-social-icons social-icons social-icons-clean mb-5 mt-4">
                <li><a target="_blank" rel="noreferrer" href="https://www.instagram.com/apostropheentertainment"><img src="/assets/img/instagram.svg" height="20" alt="Instagram" /></a></li>
                <li><a target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/apostrophe-entertainment"><img src="/assets/img/linkedin.svg" height="20" alt="Linkedin" /></a></li>
              </ul>
            </div>
            <div className="col-lg-4 mt-2 mb-2 text-center appear-animation" data-appear-animation="fadeInUpShorter" data-appear-animation-delay="200">
              <h5 className="text-5 text-transform-uppercase font-weight-semibold text-color-light mb-3">{c.footer.addressesLabel}</h5>
              <div className="mb-3 mt-2"><h5 className="text-4 text-transform-none font-weight-semibold text-color-light mb-1">London</h5><p className="mb-1 font-light">36 Shoreditch High Street, E1 6JJ</p></div>
              <div className="mb-3"><h5 className="text-4 text-transform-none font-weight-semibold text-color-light mb-1">Paris</h5><p className="mb-1 font-light">18 Rue Pavée, 75004</p></div>
              <div className="mb-5"><h5 className="text-4 text-transform-none font-weight-semibold text-color-light mb-1">Istanbul</h5><p className="mb-1 font-light">33 Sıraselviler St, Cihangir</p><a href="tel:+905309526649">+90 530 952 66 49</a></div>
            </div>
            <div className="col-lg-4 mt-2 mb-2 text-xl-end text-lg-end text-md-center text-center appear-animation" data-appear-animation="fadeInLeftShorter" data-appear-animation-delay="200">
              <h5 className="text-5 text-transform-uppercase font-weight-semibold text-color-light mb-3">{c.nav.services}</h5>
              {c.services.map((service) => <p className="mb-1" key={service.id}><a data-hash="" data-hash-offset="0" data-hash-offset-lg="68" href={`#${service.id}`}>{service.title}</a></p>)}
            </div>
          </div>
        </div>
        <div className="footer-copyright footer-copyright-style-2">
          <div className="container py-3"><div className="row"><div className="col-lg-7 d-flex align-items-center justify-content-center justify-content-lg-start mb-4 mb-lg-0"><p className="fcopy">{c.footer.copyright}</p></div><div className="col-lg-5 d-flex align-items-center justify-content-center justify-content-lg-end"><a href="https://www.kronomondo.com" target="_blank" rel="noreferrer"><img src="/assets/img/kronomondo.svg" height="18" alt="Kronomondo" /></a></div></div></div>
        </div>
      </footer>

      <Script src="/assets/js/theme-core.js" strategy="afterInteractive" />
      <Script src="/assets/js/theme.js" strategy="afterInteractive" />
    </>
  );
}
