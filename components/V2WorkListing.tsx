import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { getApiWork } from '@/lib/apostrophe-api';
import type { MediaAsset } from '@/lib/apostrophe-api';
import type { SiteLanguage } from '@/lib/site-v2-content';
import { localizeService, v2Ui, workBasePath } from '@/lib/site-v2-i18n';

function mediaOrientation(media: MediaAsset | null): 'landscape' | 'portrait' | 'square' {
  if (!media?.width || !media?.height) return 'landscape';
  const ratio = media.width / media.height;
  if (ratio > 1.08) return 'landscape';
  if (ratio < 0.92) return 'portrait';
  return 'square';
}

export default async function V2WorkListing({ lang }: { lang: SiteLanguage }) {
  const ui = v2Ui[lang];
  const basePath = workBasePath(lang);
  const works = await getApiWork(lang);

  return (
    <main className="v2-page v2-page-work">
      <style>{`
        .v2-page-work .v2-work-grid{width:min(100%,1440px);box-sizing:border-box}
        .v2-page-work .v2-work-card{min-width:0}
        .v2-page-work .v2-work-media.has-media{padding:0!important;overflow:hidden;display:grid!important;place-items:center}
        .v2-page-work .v2-work-media.has-media img{display:block;width:100%;height:100%;min-width:0;min-height:0;object-position:center}
        .v2-page-work .v2-work-media.has-media.is-landscape img{object-fit:cover}
        .v2-page-work .v2-work-media.has-media.is-portrait img,.v2-page-work .v2-work-media.has-media.is-square img{object-fit:contain}
        @media(min-width:981px){
          .v2-page-work .v2-work-card{height:clamp(500px,calc(100svh - 180px),650px)!important;max-height:650px!important}
          .v2-page-work .v2-work-card:nth-child(3n){height:clamp(520px,calc(100svh - 180px),690px)!important;max-height:690px!important}
          .v2-page-work .v2-work-copy h2{font-size:clamp(27px,2.25vw,40px)!important}
          .v2-page-work .v2-work-card:nth-child(3n) .v2-work-copy h2{font-size:clamp(34px,3vw,52px)!important}
        }
        @media(max-width:980px){
          .v2-page-work .v2-work-media.has-media{aspect-ratio:3/2!important}
          .v2-page-work .v2-work-media.has-media.is-portrait{aspect-ratio:2/3!important}
          .v2-page-work .v2-work-media.has-media.is-square{aspect-ratio:1!important}
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
          const orientation = mediaOrientation(cardMedia);

          return (
            <Link key={work.id} href={`${basePath}/${work.slug}`} className={`v2-work-card accent-${work.accent}`}>
              <div className={`v2-work-media${cardMedia ? ` has-media is-${orientation}` : ''}`}>
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
