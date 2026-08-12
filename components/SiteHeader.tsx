import Link from 'next/link';
import { legacyContent, type LegacyLanguage } from '@/lib/legacy-content';

export type SiteHeaderActive = 'home' | 'about' | 'services' | 'fields' | 'work' | 'testimonials' | 'contact';

type SiteHeaderProps = {
  active?: SiteHeaderActive;
  lang?: LegacyLanguage;
  homePage?: boolean;
};

export default function SiteHeader({ active, lang = 'en', homePage = false }: SiteHeaderProps) {
  const c = legacyContent[lang];
  const isFr = lang === 'fr';
  const homePath = isFr ? '/fr' : '/';
  const navClass = (key: SiteHeaderActive) => `nav-link${active === key ? ' active' : ''}`;
  const sectionHref = (section: string) => homePage ? `#${section}` : `${homePath}#${section}`;

  return (
    <header
      id="header"
      className="header-transparent header-effect-shrink apostrophe-shared-header"
      data-plugin-options="{'stickyEnabled': true, 'stickyEffect': 'shrink', 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': true, 'stickyChangeLogo': true, 'stickyStartAt': 30, 'stickyHeaderContainerHeight': 70}"
    >
      <div className="header-body border-top-0 bg-light box-shadow-none">
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
                            <a data-hash="" className={navClass('home')} href="#home">{c.nav.home}</a>
                          ) : (
                            <Link className={navClass('home')} href={homePath}>{c.nav.home}</Link>
                          )}
                        </li>
                        <li><a className={navClass('about')} data-hash={homePage ? '' : undefined} data-hash-offset={homePage ? '0' : undefined} data-hash-offset-lg={homePage ? '68' : undefined} href={sectionHref('aboutus')}>{c.nav.about}</a></li>
                        <li><a className={navClass('services')} data-hash={homePage ? '' : undefined} data-hash-offset={homePage ? '0' : undefined} data-hash-offset-lg={homePage ? '68' : undefined} href={sectionHref('services')}>{c.nav.services}</a></li>
                        <li><a className={navClass('fields')} data-hash={homePage ? '' : undefined} data-hash-offset={homePage ? '0' : undefined} data-hash-offset-lg={homePage ? '68' : undefined} href={sectionHref('fields')}>{c.nav.fields}</a></li>
                        <li><Link className={navClass('work')} href="/work">WORK</Link></li>
                        <li><Link className={navClass('testimonials')} href="/testimonials">TESTIMONIALS</Link></li>
                        <li><a className={navClass('contact')} data-hash={homePage ? '' : undefined} data-hash-offset={homePage ? '0' : undefined} data-hash-offset-lg={homePage ? '68' : undefined} href={sectionHref('contact')}>{c.nav.contact}</a></li>
                        <li className="dil">
                          <div className="dilsecimi">
                            <Link title={c.languageLabels.en} href="/" className={!isFr ? 'aktif' : undefined}>EN</Link>
                            <Link title={c.languageLabels.fr} href="/fr" className={isFr ? 'aktif' : undefined}>FR</Link>
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
