'use client';

import { useEffect } from 'react';

const sectionIds = ['home', 'aboutus', 'services', 'fields', 'contact'] as const;

export default function LegacyClientBehavior() {
  useEffect(() => {
    const navLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('#mainNav .nav-link[href^="#"]'),
    );

    let animationFrame = 0;

    const updateActiveNavigation = () => {
      animationFrame = 0;

      const header = document.getElementById('header');
      const headerHeight = header?.getBoundingClientRect().height ?? 70;
      const marker = headerHeight + 32;
      let activeSection: (typeof sectionIds)[number] = 'home';

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);

        if (section && section.getBoundingClientRect().top <= marker) {
          activeSection = sectionId;
        }
      }

      const pageBottom = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (pageBottom >= documentHeight - 8) {
        activeSection = 'contact';
      }

      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${activeSection}`;
        link.classList.toggle('active', isActive);
        link.setAttribute('aria-current', isActive ? 'page' : 'false');
      });
    };

    const scheduleNavigationUpdate = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateActiveNavigation);
    };

    const forceCleanNavigation = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href]');

      if (!anchor || anchor.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const targetUrl = new URL(anchor.href, window.location.href);

      if (targetUrl.origin !== window.location.origin) {
        return;
      }

      const isLanguageLink = Boolean(anchor.closest('.dilsecimi'));
      const currentIsV2 = window.location.pathname.startsWith('/work') || window.location.pathname.startsWith('/testimonials');
      const targetIsV2 = targetUrl.pathname.startsWith('/work') || targetUrl.pathname.startsWith('/testimonials');
      const crossesLegacyBoundary = currentIsV2 !== targetIsV2;

      if (!isLanguageLink && !crossesLegacyBoundary) {
        return;
      }

      if (targetUrl.pathname === window.location.pathname && targetUrl.hash === window.location.hash) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      window.location.assign(targetUrl.href);
    };

    // The legacy theme mutates the DOM and keeps plugin observers alive after initialization.
    // Language changes and transitions between legacy home routes and the new v2 routes therefore
    // intentionally use a clean document navigation instead of a Next.js client transition.
    document.addEventListener('click', forceCleanNavigation, true);
    window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
    window.addEventListener('resize', scheduleNavigationUpdate);

    const copyright = document.querySelector<HTMLElement>('.fcopy');
    if (copyright) {
      copyright.textContent = copyright.textContent?.replace('2023', '2026') ?? '';
    }

    const footerCredit = document.querySelector<HTMLAnchorElement>(
      '#footer .footer-copyright a[href*="kronomondo"]',
    );

    if (footerCredit) {
      footerCredit.href = 'https://hipmedya.com';
      footerCredit.title = 'Hip Medya';
      footerCredit.setAttribute('aria-label', 'Hip Medya');
      footerCredit.innerHTML = '<span class="footer-credit-hip">hip.</span>';
    }

    updateActiveNavigation();

    return () => {
      document.removeEventListener('click', forceCleanNavigation, true);
      window.removeEventListener('scroll', scheduleNavigationUpdate);
      window.removeEventListener('resize', scheduleNavigationUpdate);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return null;
}
