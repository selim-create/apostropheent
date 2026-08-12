import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { works, type SiteLanguage } from '@/lib/site-v2-content';
import { localizeService, v2Ui, workBasePath } from '@/lib/site-v2-i18n';

export default function V2WorkDetail({ lang, slug }: { lang: SiteLanguage; slug: string }) {
  const work = works.find((item) => item.slug === slug);
  if (!work) notFound();

  const ui = v2Ui[lang];
  const basePath = workBasePath(lang);

  return (
    <main className={`v2-page v2-work-detail accent-${work.accent}`}>
      <SiteHeader
        active="work"
        lang={lang}
        enHref={`/work/${work.slug}`}
        frHref={`/fr/projets/${work.slug}`}
      />
      <section className="v2-detail-hero">
        <div>
          <Link href={basePath} className="v2-back">{ui.allWork}</Link>
          <p className="v2-eyebrow">{localizeService(work.service, lang)}</p>
          <h1>{work.title}</h1>
          {work.year ? <p className="v2-detail-year">{work.year}</p> : null}
        </div>
        <div className="v2-detail-art" aria-hidden="true"><span>{ui.detailLabel}</span></div>
      </section>

      <section className="v2-detail-content">
        <div className="v2-detail-lead">
          <p>{work.summary ?? ui.defaultSummary}</p>
        </div>
        <div className="v2-detail-body">
          {(work.body ?? [...ui.defaultBody]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {work.externalUrl ? (
            <a className="v2-external-link" href={work.externalUrl} target="_blank" rel="noreferrer">
              {work.externalLabel ?? ui.externalLink} <span>↗</span>
            </a>
          ) : null}
        </div>
      </section>

      <section className="v2-gallery-placeholder" aria-label={ui.galleryWide}>
        <div className="wide">{ui.galleryWide}</div>
        <div>IMAGE 01</div>
        <div>IMAGE 02</div>
      </section>

      <nav className="v2-next-work">
        <Link href={basePath}>{ui.exploreAll}</Link>
      </nav>
      <SiteFooter lang={lang} />
    </main>
  );
}
