import Link from 'next/link';

export default function V2Header({ active }: { active?: 'work' | 'testimonials' }) {
  return (
    <header className="v2-header">
      <div className="v2-header-inner">
        <Link href="/" className="v2-logo-link" aria-label="Apostrophe Entertainment home">
          <img src="/assets/img/logo.svg" alt="Apostrophe Entertainment" className="v2-logo" />
        </Link>
        <nav className="v2-nav" aria-label="Primary navigation">
          <Link href="/#aboutus">ABOUT US</Link>
          <Link href="/#services">SERVICES</Link>
          <Link href="/#fields">FIELDS</Link>
          <Link href="/work" className={active === 'work' ? 'active' : undefined}>WORK</Link>
          <Link href="/testimonials" className={active === 'testimonials' ? 'active' : undefined}>TESTIMONIALS</Link>
          <Link href="/#contact">CONTACT US</Link>
          <span className="v2-lang"><strong>EN</strong><span />FR</span>
        </nav>
      </div>
    </header>
  );
}
