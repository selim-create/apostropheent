'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const c = legacyContent[lang];
  const ui = v2Ui[lang];
  const isFr = lang === 'fr';
  const homePath = isFr ? '/fr' : '/';
  const navClass = (key: SiteHeaderActive) => `nav-link${active === key ? ' active' : ''}`;
  const mobileNavClass = (key: SiteHeaderActive) => `apostrophe-mobile-nav-link${active === key ? ' active' : ''}`;
  const sectionHref = (section: string) => homePage ? `#${section}` : `${homePath}?section=${section}`;

  const navLabels = {
    home: c.nav.home,
    about: c.nav.about,
    services: c.nav.services,
    fields: c.nav.fields,
    contact: c.nav.contact,
  };

  useEffect(() => {
    document.documentElement.classList.toggle('apostrophe-mobile-menu-open', mobileOpen);
    document.body.classList.toggle('apostrophe-mobile-menu-open', mobileOpen);

    return () => {
      document.documentElement.classList.remove('apostrophe-mobile-menu-open');
      document.body.classList.remove('apostrophe-mobile-menu-open');
    };
  }, [mobileOpen]);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 992) setMobileOpen(false);
    };

    window.addEventListener('resize', closeOnDesktop);
    return () => window.removeEventListener('resize', closeOnDesktop);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      id="header"
      className={`header-transparent header-effect-shrink apostrophe-shared-header apostrophe-lang-${lang}${homePage ? ' apostrophe-home-header' : ' apostrophe-inner-header'}${mobileOpen ? ' mobile-menu-open' : ''}`}
      data-home-header={homePage ? 'true' : 'false'}
    >
      <div className="header-body border-top-0 box-shadow-none">
        <div className="header-container container">
          <div className="header-row">
            <div className="header-column">
              <div className="header-row">
                <div className="header-logo">
                  <Link href={homePath} title="Apostrophe Entertainment" onClick={closeMobile}>
                    <img alt="Apostrophe Entertainment" src="/assets/img/logo.svg" className="logo-main" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="header-column justify-content-end apostrophe-desktop-nav-column">
              <div className="header-row">
                <div className="header-nav header-nav-links header-nav-dropdowns-dark header-nav-light-text order-2 order-lg-1">
                  <div className="header-nav-main header-nav-main-font-lg header-nav-main-font-lg-upper-2 header-nav-main-mobile-dark header-nav-main-square header-nav-main-dropdown-no-borders header-nav-main-effect-2 header-nav-main-sub-effect-1">
                    <nav>
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
                </div>
              </div>
            </div>

            <button
              type="button"
              className={`apostrophe-mobile-menu-toggle${mobileOpen ? ' is-open' : ''}`}
              aria-expanded={mobileOpen}
              aria-controls="apostrophe-mobile-menu"
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <div id="apostrophe-mobile-menu" className={`apostrophe-mobile-menu${mobileOpen ? ' is-open' : ''}`} aria-hidden={!mobileOpen}>
        <nav className="apostrophe-mobile-menu-nav" aria-label="Mobile navigation">
          <Link className={mobileNavClass('home')} href={homePath} onClick={closeMobile}>{navLabels.home}</Link>
          <a className={mobileNavClass('about')} href={sectionHref('aboutus')} onClick={closeMobile}>{navLabels.about}</a>
          <a className={mobileNavClass('services')} href={sectionHref('services')} onClick={closeMobile}>{navLabels.services}</a>
          <a className={mobileNavClass('fields')} href={sectionHref('fields')} onClick={closeMobile}>{navLabels.fields}</a>
          <Link className={mobileNavClass('work')} href={workBasePath(lang)} onClick={closeMobile}>{ui.workNav}</Link>
          <Link className={mobileNavClass('testimonials')} href={testimonialsPath(lang)} onClick={closeMobile}>{ui.testimonialsNav}</Link>
          <a className={mobileNavClass('contact')} href={sectionHref('contact')} onClick={closeMobile}>{navLabels.contact}</a>
        </nav>

        <div className="apostrophe-mobile-languages">
          <Link title={c.languageLabels.en} href={enHref ?? '/'} className={!isFr ? 'active' : undefined} onClick={closeMobile}>EN</Link>
          <span aria-hidden="true">|</span>
          <Link title={c.languageLabels.fr} href={frHref ?? '/fr'} className={isFr ? 'active' : undefined} onClick={closeMobile}>FR</Link>
        </div>
      </div>
    </header>
  );
}
