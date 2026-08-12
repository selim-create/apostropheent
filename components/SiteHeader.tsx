import Link from 'next/link';
import { legacyContent, type LegacyLanguage } from '@/lib/legacy-content';
import { testimonialsPath, v2Ui, workBasePath } from '@/lib/site-v2-i18n';

export type SiteHeaderActive = 'home' | 'about' | 'services' | 'fields' | 'work' | 'testimonials' | 'contact';

type SiteHeaderProps = {
  active?: SiteHeaderActive;
  lang?: LegacyLanguage;
  homePage?: boolean;
  enHref?: string;
  frHref?: string;
};

export default function SiteHeader({
  active,
  lang = 'en',
  homePage = false,
  enHref,
  frHref,
}: SiteHeaderProps) {
  const c = legacyContent[lang];
  const ui = v2Ui[lang];
  const isFr = lang === 'fr';
  const homePath = isFr ? '/fr' : '/';
  const navClass = (key: SiteHeaderActive) => `nav-link${active === key ? ' active' : ''}`;
  const sectionHref = (section: string) => homePage ? `#${section}` : `${homePath}?section=${section}`;

  const navLabels = isFr
    ? {
        home: 'ACCUEIL',
        about: 'AGENCE',
        services: 'SERVICES',
        fields: 'DOMAINES',
        contact: 'CONTACT',
      }
    : {
        home: c.nav.home,
        about: c.nav.about,
        services: c.nav.services,
        fields: c.nav.fields,
        contact: c.nav.contact,
      };

  return (
    <header
      id="header"
      className={`header-transparent header-effect-shrink apostrophe-shared-header apostrophe-lang-${lang}${homePage ? ' apostrophe-home-header' : ' apostrophe-inner-header'}`}
      data-home-header={homePage ? 'true' : 'false'}
    >
      <div className="header-body border-top-0 box-shadow-none">
        <div className="header-container container">
          <div className="header-row">
            <div className="header-column">
              <div className="header-row">
                <div className="header-logo">
                  <Link href={homePath} title="Apostrophe Entertainment">
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
                        <li>
                          {homePage ? (
                            <a data-hash="" className={navClass('home')} href="#home">{navLabels.home}</a>
                          ) : (
                            <Link className={navClass('home')} href={homePath}>{navLabels.home}</Link>
                          )}
                        </li>
                        <li><a className={navClass('about')} data-hash={homePage ? '' : undefined} data-hash-offset={homePage ? '0' : undefined} data-hash-offset-lg={homePage ? '68' : undefined} href={sectionHref('aboutus')}>{navLabels.about}</a></li>
                        <li><a className={navClass('services')} data-hash={homePage ? '' : undefined} data-hash-offset={homePage ? '0' : undefined} data-hash-offset-lg={homePage ? '68' : undefined} href={sectionHref('services')}>{navLabels.services}</a></li>
                        <li><a className={navClass('fields')} data-hash={homePage ? '' : undefined} data-hash-offset={homePage ? '0' : undefined} data-hash-offset-lg={homePage ? '68' : undefined} href={sectionHref('fields')}>{navLabels.fields}</a></li>
                        <li><Link className={navClass('work')} href={workBasePath(lang)}>{ui.workNav}</Link></li>
                        <li><Link className={navClass('testimonials')} href={testimonialsPath(lang)}>{ui.testimonialsNav}</Link></li>
                        <li><a className={navClass('contact')} data-hash={homePage ? '' : undefined} data-hash-offset={homePage ? '0' : undefined} data-hash-offset-lg={homePage ? '68' : undefined} href={sectionHref('contact')}>{navLabels.contact}</a></li>
                        <li className="dil">
                          <div className="dilsecimi">
                            <Link title={c.languageLabels.en} href={enHref ?? '/'} className={!isFr ? 'aktif' : undefined}>EN</Link>
                            <Link title={c.languageLabels.fr} href={frHref ?? '/fr'} className={isFr ? 'aktif' : undefined}>FR</Link>
                          </div>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <button className="btn header-btn-collapse-nav" data-bs-toggle="collapse" data-bs-target=".header-nav-main nav">
                    <i className="fas fa-bars" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
