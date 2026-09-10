'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const regularNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal="late"])'));
    const lateNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal="late"]'));
    if (!regularNodes.length && !lateNodes.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      [...regularNodes, ...lateNodes].forEach((node) => node.classList.add('is-visible'));
      return;
    }

    const regularObserver = regularNodes.length ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        regularObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }) : null;

    const lateObserver = lateNodes.length ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        lateObserver.unobserve(entry.target);
      });
    }, { threshold: 0.18, rootMargin: '-8% 0px -34% 0px' }) : null;

    regularNodes.forEach((node) => regularObserver?.observe(node));
    lateNodes.forEach((node) => lateObserver?.observe(node));

    return () => {
      regularObserver?.disconnect();
      lateObserver?.disconnect();
    };
  }, []);

  return null;
}
