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

    const forceLanguageReload = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const languageLink = target?.closest<HTMLAnchorElement>('.dilsecimi a');

      if (!languageLink) {
        return;
      }

      const targetUrl = new URL(languageLink.href, window.location.href);

      if (targetUrl.pathname === window.location.pathname) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      window.location.assign(targetUrl.href);
    };

    // Keep the legacy migration deterministic while the old theme scripts are still loaded.
    // Next.js client-side language navigation leaves DOM mutations from theme.js behind,
    // therefore language changes intentionally perform a clean document navigation.
    document.addEventListener('click', forceLanguageReload, true);
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
      document.removeEventListener('click', forceLanguageReload, true);
      window.removeEventListener('scroll', scheduleNavigationUpdate);
      window.removeEventListener('resize', scheduleNavigationUpdate);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return null;
}
