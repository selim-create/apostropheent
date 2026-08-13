import Link from 'next/link';
import { notFound } from 'next/navigation';
import ScrollReveal from '@/components/ScrollReveal';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import WorkGallery from '@/components/WorkGallery';
import WorkVideos from '@/components/WorkVideos';
import { getApiWorkItem } from '@/lib/apostrophe-api';
import type { SiteLanguage } from '@/lib/site-v2-content';
import { localizeService, v2Ui, workBasePath } from '@/lib/site-v2-i18n';

function headingSlug(html: string, index: number): string {
  const text = html
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z0-9#]+;/gi, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `case-${text || `section-${index + 1}`}`;
}

function prepareCaseStudy(html: string): { html: string; headings: Array<{ id: string; labelHtml: string }> } {
  const headings: Array<{ id: string; labelHtml: string }> = [];
  let index = 0;
  const prepared = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_match, attributes: string, inner: string) => {
    const id = headingSlug(inner, index);
    headings.push({ id, labelHtml: inner });
    index += 1;
    const cleanAttributes = attributes.replace(/\s+id=(['"]).*?\1/i, '');
    return `<h2${cleanAttributes} id="${id}">${inner}</h2>`;
  });
  return { html: prepared, headings };
}

export default async function V2WorkDetail({ lang, slug }: { lang: SiteLanguage; slug: string }) {
  let work;
  try {
    work = await getApiWorkItem(slug, lang);
  } catch {
    notFound();
  }

  const ui = v2Ui[lang];
  const basePath = workBasePath(lang);
  const galleryLabel = lang === 'fr' ? 'GALERIE' : 'GALLERY';
  const videoLabel = lang === 'fr' ? 'VIDÉOS' : 'VIDEOS';
  const caseStudy = prepareCaseStudy(work.content || '');

  return (
    <main className={`v2-page v2-work-detail accent-${work.accent}`}>
      <ScrollReveal />
      <SiteHeader active="work" lang={lang} enHref={`/work/${work.slug}`} frHref={`/fr/projets/${work.slug}`} />

      <section className="v2-detail-hero">
        <div className="v2-detail-hero-copy">
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

      <section className={`v2-case-study${caseStudy.headings.length ? ' has-toc' : ''}`} data-reveal>
        {caseStudy.headings.length ? (
          <nav className="v2-case-study-toc" aria-label={lang === 'fr' ? 'Sections du projet' : 'Project sections'}>
            {caseStudy.headings.map((heading, index) => (
              <a href={`#${heading.id}`} key={heading.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span dangerouslySetInnerHTML={{ __html: heading.labelHtml }} />
              </a>
            ))}
          </nav>
        ) : null}

        <article className="v2-case-study-body">
          {work.content ? (
            <div className="v2-rich-copy" dangerouslySetInnerHTML={{ __html: caseStudy.html }} />
          ) : (
            <div className="v2-rich-copy">{ui.defaultBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          )}
          {work.external_link?.url ? (
            <a className="v2-external-link" href={work.external_link.url} target="_blank" rel="noreferrer">
              {work.external_link.label || ui.externalLink} <span>↗</span>
            </a>
          ) : null}
        </article>
      </section>

      {work.gallery.length > 0 ? <WorkGallery items={work.gallery} title={work.title} label={galleryLabel} /> : null}

      <WorkVideos videos={work.videos} legacyUrl={work.video_url} workTitle={work.title} label={videoLabel} />

      <nav className="v2-next-work" data-reveal><Link href={basePath}>{ui.exploreAll}</Link></nav>
      <SiteFooter lang={lang} />
    </main>
  );
}
