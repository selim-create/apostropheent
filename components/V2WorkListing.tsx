import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { getApiWork } from '@/lib/apostrophe-api';
import type { SiteLanguage } from '@/lib/site-v2-content';
import { localizeService, v2Ui, workBasePath } from '@/lib/site-v2-i18n';
import { getWorkPresentation } from '@/lib/work-presentation';
import styles from './V2WorkListing.module.css';

export default async function V2WorkListing({ lang }: { lang: SiteLanguage }) {
  const ui = v2Ui[lang];
  const basePath = workBasePath(lang);
  const works = await getApiWork(lang);

  return (
    <main className={styles.page}>
      <SiteHeader active="work" lang={lang} enHref="/work" frHref="/fr/projets" />

      <section className={styles.hero}>
        <h1 className={styles.title}>{ui.workTitle}</h1>
        <p className={styles.intro}>{ui.workIntro}</p>
      </section>

      <section className={styles.grid} aria-label={ui.workTitle}>
        {works.map((work) => {
          const presentation = getWorkPresentation(work);
          const media = presentation.cover;

          return (
            <Link
              key={work.id}
              href={`${basePath}/${work.slug}`}
              className={`${styles.card}${presentation.isMediaFeature ? ` ${styles.mediaFeatureCard}` : ''}`}
            >
              <div className={`${styles.media}${presentation.isMediaFeature ? ` ${styles.mediaFeatureMedia}` : ''}`}>
                {presentation.isMediaFeature ? <span className={styles.publisher}>{presentation.publisherLabel}</span> : null}
                {media ? (
                  <img
                    className={`${styles.image}${presentation.isMediaFeature ? ` ${styles.mediaFeatureImage}` : ''}`}
                    src={media.url}
                    alt={media.alt || work.title}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.placeholder} aria-hidden="true">
                    <div className={styles.placeholderShape} />
                  </div>
                )}
              </div>

              <div className={styles.copy}>
                <p className={styles.service}>{localizeService(work.service, lang)}</p>
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
