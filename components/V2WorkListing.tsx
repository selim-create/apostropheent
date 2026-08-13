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
      <style>{`
        .v2-page-work .v2-work-grid {
          width: min(100%, 1440px);
          box-sizing: border-box;
        }

        .v2-page-work .v2-work-card {
          min-width: 0;
          overflow: hidden;
        }

        /* Listing images are editorial thumbnails: always fill the entire media cell. */
        .v2-page-work .v2-work-media.has-media,
        .v2-page-work .v2-work-card:nth-child(3n) .v2-work-media.has-media {
          position: relative !important;
          display: block !important;
          width: 100% !important;
          max-width: none !important;
          min-width: 0 !important;
          height: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
          overflow: hidden !important;
          align-self: stretch !important;
          justify-self: stretch !important;
          flex: none !important;
        }

        .v2-page-work .v2-work-media.has-media img,
        .v2-page-work .v2-work-card:nth-child(3n) .v2-work-media.has-media img {
          position: absolute !important;
          inset: 0 !important;
          display: block !important;
          width: 100% !important;
          max-width: none !important;
          height: 100% !important;
          min-width: 100% !important;
          min-height: 100% !important;
          margin: 0 !important;
          object-fit: cover !important;
          object-position: center !important;
        }

        @media (min-width: 981px) {
          .v2-page-work .v2-work-card {
            height: clamp(500px, calc(100svh - 180px), 650px) !important;
            max-height: 650px !important;
            grid-template-rows: minmax(0, 1fr) 118px !important;
          }

          .v2-page-work .v2-work-card:nth-child(3n) {
            height: clamp(520px, calc(100svh - 180px), 690px) !important;
            max-height: 690px !important;
            grid-template-rows: minmax(0, 1fr) 126px !important;
          }

          .v2-page-work .v2-work-copy {
            height: 100% !important;
            min-height: 0 !important;
            box-sizing: border-box;
            overflow: hidden;
          }

          .v2-page-work .v2-work-copy h2 {
            font-size: clamp(27px, 2.25vw, 40px) !important;
          }

          .v2-page-work .v2-work-card:nth-child(3n) .v2-work-copy h2 {
            font-size: clamp(34px, 3vw, 52px) !important;
          }
        }

        @media (max-width: 980px) {
          .v2-page-work .v2-work-media.has-media,
          .v2-page-work .v2-work-card:nth-child(3n) .v2-work-media.has-media {
            height: auto !important;
            aspect-ratio: 3 / 2 !important;
          }
        }
      `}</style>

      <SiteHeader active="work" lang={lang} enHref="/work" frHref="/fr/projets" />

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
