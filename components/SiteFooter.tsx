import Link from 'next/link';
import { legacyContent, type LegacyLanguage } from '@/lib/legacy-content';

export default function SiteFooter({ lang = 'en' }: { lang?: LegacyLanguage }) {
  const c = legacyContent[lang];
  const homePath = lang === 'fr' ? '/fr' : '/';

  return (
    <footer id="footer" className="mt-0 apostrophe-shared-footer">
      <div className="container">
        <div className="row py-5">
          <div className="col-lg-4 mt-2 mb-2 text-xl-start text-lg-start text-md-center text-center">
            <Link href={homePath}>
              <img alt="Apostrophe Entertainment" width="222" height="80" src="/assets/img/footer-logo.svg" className="mb-4" />
            </Link>
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: c.footer.shortHtml }} />
            <a href="mailto:info@apostropheent.com">info@ApostropheEnt.com</a>
            <ul className="footer-social-icons social-icons social-icons-clean mb-5 mt-4">
              <li><a target="_blank" rel="noreferrer" href="https://www.instagram.com/apostropheentertainment"><img src="/assets/img/instagram.svg" height="20" alt="Instagram" /></a></li>
              <li><a target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/apostrophe-entertainment"><img src="/assets/img/linkedin.svg" height="20" alt="LinkedIn" /></a></li>
            </ul>
          </div>

          <div className="col-lg-4 mt-2 mb-2 text-center">
            <h5 className="text-5 text-transform-uppercase font-weight-semibold text-color-light mb-3">{c.footer.addressesLabel}</h5>
            <div className="mb-3 mt-2"><h5 className="text-4 text-transform-none font-weight-semibold text-color-light mb-1">London</h5><p className="mb-1 font-light">36 Shoreditch High Street, E1 6JJ</p></div>
            <div className="mb-3"><h5 className="text-4 text-transform-none font-weight-semibold text-color-light mb-1">Paris</h5><p className="mb-1 font-light">18 Rue Pavée, 75004</p></div>
            <div className="mb-5"><h5 className="text-4 text-transform-none font-weight-semibold text-color-light mb-1">Istanbul</h5><p className="mb-1 font-light">33 Sıraselviler St, Cihangir</p><a href="tel:+905309526649">+90 530 952 66 49</a></div>
          </div>

          <div className="col-lg-4 mt-2 mb-2 text-xl-end text-lg-end text-md-center text-center">
            <h5 className="text-5 text-transform-uppercase font-weight-semibold text-color-light mb-3">{c.nav.services}</h5>
            {c.services.map((service) => (
              <p className="mb-1" key={service.id}><a href={`${homePath}#${service.id}`}>{service.title}</a></p>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-copyright footer-copyright-style-2">
        <div className="container py-3">
          <div className="row">
            <div className="col-lg-7 d-flex align-items-center justify-content-center justify-content-lg-start mb-4 mb-lg-0">
              <p className="fcopy">{c.footer.copyright.replace('2023', '2026')}</p>
            </div>
            <div className="col-lg-5 d-flex align-items-center justify-content-center justify-content-lg-end">
              <a href="https://hipmedya.com" target="_blank" rel="noreferrer" aria-label="Hip Medya"><span className="footer-credit-hip">hip.</span></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
