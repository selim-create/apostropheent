'use client';

import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';

type GalleryItem = {
  id: number;
  url: string;
  alt: string;
};

export default function WorkGallery({
  items,
  title,
  label,
}: {
  items: GalleryItem[];
  title: string;
  label: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setActiveIndex(null), []);
  const previous = useCallback(() => {
    setActiveIndex((current) => current === null ? null : (current - 1 + items.length) % items.length);
  }, [items.length]);
  const next = useCallback(() => {
    setActiveIndex((current) => current === null ? null : (current + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, close, next, previous]);

  if (items.length === 0) return null;

  const activeItem = activeIndex === null ? null : items[activeIndex];
  const lightbox = activeItem && activeIndex !== null ? (
    <div
      className="v2-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} ${label}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="v2-lightbox-topbar">
        <span>{title}</span>
        <span>{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
        <button type="button" onClick={close} aria-label="Close gallery">×</button>
      </div>

      <button type="button" className="v2-lightbox-arrow v2-lightbox-prev" onClick={previous} aria-label="Previous image">←</button>
      <figure className="v2-lightbox-stage">
        <img src={activeItem.url} alt={activeItem.alt || `${title} ${activeIndex + 1}`} />
        {activeItem.alt ? <figcaption>{activeItem.alt}</figcaption> : null}
      </figure>
      <button type="button" className="v2-lightbox-arrow v2-lightbox-next" onClick={next} aria-label="Next image">→</button>
    </div>
  ) : null;

  return (
    <>
      <section className="v2-work-gallery" aria-label={label} data-reveal>
        <div className="v2-work-gallery-heading">
          <span>{label}</span>
        </div>

        <div className="v2-work-gallery-grid">
          {items.map((item, index) => (
            <button
              type="button"
              className="v2-work-gallery-item"
              key={item.id}
              onClick={() => setActiveIndex(index)}
              aria-label={`${label} ${index + 1}: ${item.alt || title}`}
              style={{ '--gallery-index': index } as CSSProperties}
            >
              <img src={item.url} alt={item.alt || `${title} ${index + 1}`} loading="lazy" />
              <span className="v2-work-gallery-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="v2-work-gallery-expand" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </section>
      {mounted && lightbox ? createPortal(lightbox, document.body) : null}
    </>
  );
}
