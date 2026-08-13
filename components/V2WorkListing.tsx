import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { getApiWork } from '@/lib/apostrophe-api';
import type { SiteLanguage } from '@/lib/site-v2-content';
import { localizeService, v2Ui, workBasePath } from '@/lib/site-v2-i18n';

export default async function V2WorkListing({ lang }: { lang: SiteLanguage }) {
  const ui = v2Ui[lang];
  const basePath = workBasePath(lang);
  const works = await getApiWork(lang);

  return (
    <main className="v2-page v2-page-work">
      <SiteHeader
        active="work"
        lang={lang}
        enHref="/work"
        frHref="/fr/projets"
      />
      <section className="v2-hero-block">
        <p className="v2-eyebrow">{ui.workEyebrow}</p>
        <h1>{ui.workTitle}</h1>
        <p className="v2-intro">{ui.workIntro}</p>
      </section>
      <section className="v2-work-grid" aria-label={ui.workEyebrow}>
        {works.map((work, index) => {
          const cardMedia = work.thumbnail || work.hero_media;

          return (
            <Link key={work.id} href={`${basePath}/${work.slug}`} className={`v2-work-card accent-${work.accent}`}>
              <div className={`v2-work-media${cardMedia ? ' has-media' : ''}`}>
                {cardMedia ? (
                  <img src={cardMedia.url} alt={cardMedia.alt || work.title} loading="lazy" />
                ) : (
                  <>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div className="v2-work-shape" aria-hidden="true" />
                  </>
                )}
              </div>
              <div className="v2-work-copy">
                <p className="v2-work-service">{localizeService(work.service, lang)}</p>
                <h2>{work.title}</h2>
                {work.year ? <p className="v2-work-year">{work.year}</p> : null}
                <span className="v2-arrow">{ui.viewCase}</span>
              </div>
            </Link>
          );
        })}
      </section>
      <SiteFooter lang={lang} />
    </main>
  );
}
