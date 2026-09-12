import WorkVideo from '@/components/WorkVideo';
import type { ApiWorkVideo } from '@/lib/apostrophe-api';
import styles from './WorkVideos.module.css';

function embedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');
    if (host === 'youtu.be') {
      const id = parsed.pathname.split('/').filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const id = parsed.searchParams.get('v') || parsed.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const id = parsed.pathname.split('/').filter(Boolean).find((part) => /^\d+$/.test(part));
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch { return null; }
  return null;
}

function legacyVideo(url: string): ApiWorkVideo | null {
  if (!url) return null;
  return { id:1, url, attachment_id:0, source_type:/youtube|youtu\.be/i.test(url)?'youtube':/vimeo/i.test(url)?'vimeo':'file', orientation:'landscape', poster:null, title:'', featured:true, order:1 };
}

export default function WorkVideos({ videos, legacyUrl, workTitle, label }: { videos?: ApiWorkVideo[]; legacyUrl?: string; workTitle: string; label: string }) {
  const items = videos?.length ? [...videos].sort((a,b)=>a.order-b.order) : [legacyVideo(legacyUrl || '')].filter(Boolean) as ApiWorkVideo[];
  if (!items.length) return null;
  const portraitCount = items.filter((item)=>item.orientation==='portrait').length;
  const landscapeCount = items.filter((item)=>item.orientation==='landscape').length;
  const layoutClass = portraitCount===items.length ? styles.allPortrait : landscapeCount===items.length ? styles.allLandscape : styles.mixed;
  return <section className={styles.section} aria-label={`${workTitle} ${label.toLowerCase()}`} data-reveal>
    <div className={styles.heading}><span>{label}</span><span>{String(items.length).padStart(2,'0')}</span></div>
    <div className={`${styles.grid} ${layoutClass}`}>
      {items.map((video,index)=>{
        const embed=embedUrl(video.url);
        const orientationClass=video.orientation==='portrait'?styles.portrait:video.orientation==='square'?styles.square:styles.landscape;
        const title=video.title || `${workTitle} video ${index+1}`;
        return <article className={`${styles.item} ${orientationClass}${video.featured?` ${styles.featured}`:''}`} key={`${video.id}-${video.url}`}>
          <div className={styles.media}>{embed ? <iframe src={embed} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> : <WorkVideo src={video.url} title={title} poster={video.poster?.url} />}</div>
          {video.title ? <p className={styles.caption}>{video.title}</p> : null}
        </article>;
      })}
    </div>
  </section>;
}
