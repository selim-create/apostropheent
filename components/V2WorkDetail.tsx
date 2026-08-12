import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { getApiWorkItem } from '@/lib/apostrophe-api';
import type { SiteLanguage } from '@/lib/site-v2-content';
import { localizeService, v2Ui, workBasePath } from '@/lib/site-v2-i18n';

export default async function V2WorkDetail({ lang, slug }: { lang: SiteLanguage; slug: string }) {
  let work;
  try {
    work = await getApiWorkItem(slug, lang);
  } catch {
    notFound();
  }

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
        {work.hero_media ? (
          <div className="v2-detail-art v2-detail-art-media">
            <img src={work.hero_media.url} alt={work.hero_media.alt || work.title} />
          </div>
        ) : (
          <div className="v2-detail-art" aria-hidden="true"><span>{ui.detailLabel}</span></div>
        )}
      </section>

      <section className="v2-detail-content">
        <div className="v2-detail-lead">
          <p>{work.summary || ui.defaultSummary}</p>
        </div>
        <div className="v2-detail-body">
          {work.content ? (
            <div dangerouslySetInnerHTML={{ __html: work.content }} />
          ) : (
            ui.defaultBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
          )}
          {work.external_link?.url ? (
            <a className="v2-external-link" href={work.external_link.url} target="_blank" rel="noreferrer">
              {work.external_link.label || ui.externalLink} <span>↗</span>
            </a>
          ) : null}
        </div>
      </section>

      {work.gallery.length > 0 ? (
        <section className="v2-gallery-placeholder v2-gallery-live" aria-label={ui.galleryWide}>
          {work.gallery.map((item, index) => (
            <div key={item.id} className={index === 0 ? 'wide' : undefined}>
              <img src={item.url} alt={item.alt || `${work.title} ${index + 1}`} />
            </div>
          ))}
        </section>
      ) : (
        <section className="v2-gallery-placeholder" aria-label={ui.galleryWide}>
          <div className="wide">{ui.galleryWide}</div>
          <div>IMAGE 01</div>
          <div>IMAGE 02</div>
        </section>
      )}

      <nav className="v2-next-work">
        <Link href={basePath}>{ui.exploreAll}</Link>
      </nav>
      <SiteFooter lang={lang} />
    </main>
  );
}
