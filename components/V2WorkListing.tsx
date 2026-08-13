import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { getApiWork } from '@/lib/apostrophe-api';
import type { SiteLanguage } from '@/lib/site-v2-content';
import { localizeService, v2Ui, workBasePath } from '@/lib/site-v2-i18n';
import styles from './V2WorkListing.module.css';

function accentClass(accent: string) {
  return styles[accent] || styles.cream;
}

export default async function V2WorkListing({ lang }: { lang: SiteLanguage }) {
  const ui = v2Ui[lang];
  const basePath = workBasePath(lang);
  const works = await getApiWork(lang);

  return (
    <main className={styles.page}>
      <SiteHeader active="work" lang={lang} enHref="/work" frHref="/fr/projets" />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>{ui.workEyebrow}</p>
        <h1 className={styles.title}>{ui.workTitle}</h1>
        <p className={styles.intro}>{ui.workIntro}</p>
      </section>

      <section className={styles.grid} aria-label={ui.workEyebrow}>
        {works.map((work, index) => {
          const media = work.hero_media || work.thumbnail;
          const wide = (index + 1) % 3 === 0;

          return (
            <Link
              key={work.id}
              href={`${basePath}/${work.slug}`}
              className={`${styles.card} ${accentClass(work.accent)} ${wide ? styles.wide : ''}`}
            >
              <div className={styles.media}>
                {media ? (
                  <img className={styles.image} src={media.url} alt={media.alt || work.title} loading="lazy" />
                ) : (
                  <div className={styles.placeholder}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div className={styles.placeholderShape} />
                  </div>
                )}
              </div>

              <div className={styles.copy}>
                <p className={styles.service}>{localizeService(work.service, lang)}</p>
                <p className={styles.year}>{work.year || ''}</p>
                <h2>{work.title}</h2>
                <span className={styles.arrow}>{ui.viewCase}</span>
              </div>
            </Link>
          );
        })}
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
