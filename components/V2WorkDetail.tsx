import Link from 'next/link';
import { notFound } from 'next/navigation';
import ScrollReveal from '@/components/ScrollReveal';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import WorkGallery from '@/components/WorkGallery';
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
  const storyLabel = lang === 'fr' ? 'ÉTUDE DE CAS' : 'CASE STUDY';
  const galleryLabel = lang === 'fr' ? 'GALERIE' : 'GALLERY';

  return (
    <main className={`v2-page v2-work-detail accent-${work.accent}`}>
      <ScrollReveal />
      <SiteHeader
        active="work"
        lang={lang}
        enHref={`/work/${work.slug}`}
        frHref={`/fr/projets/${work.slug}`}
      />

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

      <section className="v2-case-study" data-reveal>
        <div className="v2-case-study-marker">
          <span>01</span>
          <span>{storyLabel}</span>
        </div>
        <article className="v2-case-study-body">
          {work.content ? (
            <div className="v2-rich-copy" dangerouslySetInnerHTML={{ __html: work.content }} />
          ) : (
            <div className="v2-rich-copy">
              {ui.defaultBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          )}
          {work.external_link?.url ? (
            <a className="v2-external-link" href={work.external_link.url} target="_blank" rel="noreferrer">
              {work.external_link.label || ui.externalLink} <span>↗</span>
            </a>
          ) : null}
        </article>
      </section>

      {work.gallery.length > 0 ? (
        <WorkGallery items={work.gallery} title={work.title} label={galleryLabel} />
      ) : null}

      {video ? (
        <section className="v2-work-video" aria-label={`${work.title} video`} data-reveal>
          <div className="v2-work-section-label"><span>03</span><span>VIDEO</span></div>
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

      <nav className="v2-next-work" data-reveal>
        <Link href={basePath}>{ui.exploreAll}</Link>
      </nav>
      <SiteFooter lang={lang} />
    </main>
  );
}
