import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { getApiWorkItem } from '@/lib/apostrophe-api';
import type { SiteLanguage } from '@/lib/site-v2-content';
import { localizeService, v2Ui, workBasePath } from '@/lib/site-v2-i18n';

function videoEmbed(url: string): { type: 'embed' | 'file'; src: string } | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = parsed.pathname.split('/').filter(Boolean)[0];
      return id ? { type: 'embed', src: `https://www.youtube.com/embed/${id}` } : null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const id = parsed.searchParams.get('v') || parsed.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1];
      return id ? { type: 'embed', src: `https://www.youtube.com/embed/${id}` } : null;
    }

    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const id = parsed.pathname.split('/').filter(Boolean).find((part) => /^\d+$/.test(part));
      return id ? { type: 'embed', src: `https://player.vimeo.com/video/${id}` } : null;
    }

    if (/\.(mp4|webm|ogg)(?:$|\?)/i.test(url)) {
      return { type: 'file', src: url };
    }
  } catch {
    return null;
  }

  return null;
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
  const video = videoEmbed(work.video_url);

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

      {video ? (
        <section className="v2-work-video" aria-label={`${work.title} video`}>
          {video.type === 'embed' ? (
            <div className="v2-work-video-frame">
              <iframe src={video.src} title={`${work.title} video`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
          ) : (
            <video className="v2-work-video-file" controls preload="metadata" playsInline>
              <source src={video.src} />
            </video>
          )}
        </section>
      ) : null}

      <nav className="v2-next-work">
        <Link href={basePath}>{ui.exploreAll}</Link>
      </nav>
      <SiteFooter lang={lang} />
    </main>
  );
}
