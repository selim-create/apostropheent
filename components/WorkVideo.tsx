'use client';

import { useRef, useState } from 'react';

export default function WorkVideo({ src, title, poster }: { src: string; title: string; poster?: string | null }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
    } catch {
      // Browser controls remain available if autoplay/play is blocked.
    }
  };

  return (
    <div className={`v2-work-video-direct${playing ? ' is-playing' : ''}`}>
      <video
        ref={videoRef}
        className="v2-work-video-file"
        controls
        preload="metadata"
        playsInline
        poster={poster || undefined}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      >
        <source src={src} />
      </video>

      {!playing ? (
        <button type="button" className="v2-work-video-play" onClick={play} aria-label={`Play ${title}`}>
          <span aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
