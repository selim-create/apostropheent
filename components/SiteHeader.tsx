import Link from 'next/link';

export type SiteHeaderActive = 'home' | 'about' | 'services' | 'fields' | 'work' | 'testimonials' | 'contact';

export default function SiteHeader({ active }: { active?: SiteHeaderActive }) {
  const navClass = (key: SiteHeaderActive) => `nav-link${active === key ? ' active' : ''}`;

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
                  <Link href="/" title="Apostrophe Entertainment">
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
                      <ul className="nav nav-pills" id="mainNavV2">
                        <li><Link className={navClass('home')} href="/">HOME</Link></li>
                        <li><Link className={navClass('about')} href="/#aboutus">ABOUT US</Link></li>
                        <li><Link className={navClass('services')} href="/#services">SERVICES</Link></li>
                        <li><Link className={navClass('fields')} href="/#fields">FIELDS</Link></li>
                        <li><Link className={navClass('work')} href="/work">WORK</Link></li>
                        <li><Link className={navClass('testimonials')} href="/testimonials">TESTIMONIALS</Link></li>
                        <li><Link className={navClass('contact')} href="/#contact">CONTACT US</Link></li>
                        <li className="dil">
                          <div className="dilsecimi">
                            <Link title="English" href="/" className="aktif">EN</Link>
                            <Link title="Français" href="/fr">FR</Link>
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
