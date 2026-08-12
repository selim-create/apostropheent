import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { workIntro, works } from '@/lib/site-v2-content';

export default function WorkPage() {
  return (
    <main className="v2-page v2-page-work">
      <SiteHeader active="work" />
      <section className="v2-hero-block">
        <p className="v2-eyebrow">SELECTED WORK</p>
        <h1>WORK</h1>
        <p className="v2-intro">{workIntro}</p>
      </section>
      <section className="v2-work-grid" aria-label="Selected work">
        {works.map((work, index) => (
          <Link key={work.slug} href={`/work/${work.slug}`} className={`v2-work-card accent-${work.accent}`}>
            <div className="v2-work-media" aria-hidden="true">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div className="v2-work-shape" />
            </div>
            <div className="v2-work-copy">
              <p className="v2-work-service">{work.service}</p>
              <h2>{work.title}</h2>
              {work.year ? <p className="v2-work-year">{work.year}</p> : null}
              <span className="v2-arrow">VIEW CASE →</span>
            </div>
          </Link>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
