'use client';

import { useEffect } from 'react';

const sectionIds = ['home', 'aboutus', 'services', 'fields', 'contact'] as const;

function isV2Path(pathname: string) {
  return pathname.startsWith('/work')
    || pathname.startsWith('/testimonials')
    || pathname.startsWith('/fr/projets')
    || pathname.startsWith('/fr/temoignages');
}

export default function LegacyClientBehavior() {
  useEffect(() => {
    const header = document.getElementById('header');
    const navLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('#mainNav .nav-link[href^="#"]'),
    );

    let animationFrame = 0;

    const updateHomeHeaderState = () => {
      if (!header?.classList.contains('apostrophe-home-header')) return;
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };

    const updateActiveNavigation = () => {
      animationFrame = 0;
      updateHomeHeaderState();

      if (isV2Path(window.location.pathname)) return;

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
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateActiveNavigation);
    };

    const scrollToSection = (id: string) => {
      const target = document.getElementById(id);
      if (!target) return false;

      const headerHeight = header?.getBoundingClientRect().height ?? 70;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
      scheduleNavigationUpdate();
      return true;
    };

    const scrollFromQuery = () => {
      if (isV2Path(window.location.pathname)) return;

      const url = new URL(window.location.href);
      const section = url.searchParams.get('section');
      if (!section) return;

      if (scrollToSection(section)) {
        url.searchParams.delete('section');
        window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
      }
    };

    const forceCleanNavigation = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href]');

      if (!anchor || anchor.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const targetUrl = new URL(anchor.href, window.location.href);
      if (targetUrl.origin !== window.location.origin) return;

      const isLanguageLink = Boolean(anchor.closest('.dilsecimi'));
      const currentIsV2 = isV2Path(window.location.pathname);
      const targetIsV2 = isV2Path(targetUrl.pathname);
      const crossesLegacyBoundary = currentIsV2 !== targetIsV2;
      const targetsHomeSection = targetUrl.searchParams.has('section');

      if (!isLanguageLink && !crossesLegacyBoundary && !targetsHomeSection) return;

      if (targetUrl.pathname === window.location.pathname && targetUrl.search === window.location.search && targetUrl.hash === window.location.hash) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      window.location.assign(targetUrl.href);
    };

    document.addEventListener('click', forceCleanNavigation, true);
    window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
    window.addEventListener('resize', scheduleNavigationUpdate);

    updateHomeHeaderState();
    updateActiveNavigation();

    // Query-based cross-route navigation avoids the old theme's delayed hash animation.
    // Run immediately, then once more on the next frame in case legacy content has just mounted.
    scrollFromQuery();
    window.requestAnimationFrame(scrollFromQuery);

    return () => {
      document.removeEventListener('click', forceCleanNavigation, true);
      window.removeEventListener('scroll', scheduleNavigationUpdate);
      window.removeEventListener('resize', scheduleNavigationUpdate);

      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return null;
}
