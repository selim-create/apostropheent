import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { works } from '@/lib/site-v2-content';

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = works.find((item) => item.slug === slug);

  if (!work) notFound();

  return (
    <main className={`v2-page v2-work-detail accent-${work.accent}`}>
      <SiteHeader active="work" />
      <section className="v2-detail-hero">
        <div>
          <Link href="/work" className="v2-back">← ALL WORK</Link>
          <p className="v2-eyebrow">{work.service}</p>
          <h1>{work.title}</h1>
          {work.year ? <p className="v2-detail-year">{work.year}</p> : null}
        </div>
        <div className="v2-detail-art" aria-hidden="true"><span>APOSTROPHE / WORK</span></div>
      </section>

      <section className="v2-detail-content">
        <div className="v2-detail-lead">
          <p>{work.summary ?? 'A selected project by Apostrophe Entertainment.'}</p>
        </div>
        <div className="v2-detail-body">
          {(work.body ?? [
            'Project copy and media will be connected from the Apostrophe WordPress CMS after the visual architecture is approved.',
            'This page is currently using the final content structure with temporary media placeholders.',
          ]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {work.externalUrl ? (
            <a className="v2-external-link" href={work.externalUrl} target="_blank" rel="noreferrer">
              {work.externalLabel ?? 'View coverage'} <span>↗</span>
            </a>
          ) : null}
        </div>
      </section>

      <section className="v2-gallery-placeholder" aria-label="Project media placeholders">
        <div className="wide">PROJECT MEDIA / VIDEO</div>
        <div>IMAGE 01</div>
        <div>IMAGE 02</div>
      </section>

      <nav className="v2-next-work">
        <Link href="/work">Explore all work →</Link>
      </nav>
      <SiteFooter />
    </main>
  );
}
