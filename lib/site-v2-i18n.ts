import type { SiteLanguage } from '@/lib/site-v2-content';

export const v2Ui = {
  en: {
    workNav: 'WORK',
    testimonialsNav: 'TESTIMONIALS',
    workEyebrow: 'SELECTED WORK',
    workTitle: 'WORK',
    workIntro: "A glimpse into the partnerships and campaigns we've had the pleasure of crafting.",
    viewCase: 'VIEW CASE →',
    allWork: '← ALL WORK',
    detailLabel: 'APOSTROPHE / WORK',
    defaultSummary: 'A selected project by Apostrophe Entertainment.',
    defaultBody: [
      'Project copy and media will be connected from the Apostrophe WordPress CMS after the visual architecture is approved.',
      'This page is currently using the final content structure with temporary media placeholders.',
    ],
    externalLink: 'View coverage',
    galleryWide: 'PROJECT MEDIA / VIDEO',
    exploreAll: 'Explore all work →',
    testimonialsEyebrow: 'CLIENT VOICES',
    testimonialsTitle: 'TESTIMONIALS',
    testimonialsIntro: 'What our clients say about partnering with us',
    testimonialsAria: 'Client testimonials',
  },
  fr: {
    workNav: 'PROJETS',
    testimonialsNav: 'TÉMOIGNAGES',
    workEyebrow: 'PROJETS SÉLECTIONNÉS',
    workTitle: 'PROJETS',
    workIntro: 'Un aperçu des collaborations et campagnes que nous avons eu le plaisir d’imaginer et de réaliser.',
    viewCase: 'VOIR LE PROJET →',
    allWork: '← TOUS LES PROJETS',
    detailLabel: 'APOSTROPHE / PROJET',
    defaultSummary: 'Un projet sélectionné par Apostrophe Entertainment.',
    defaultBody: [
      'Les textes et médias du projet seront connectés au CMS WordPress Apostrophe après validation de l’architecture visuelle.',
      'Cette page utilise pour le moment la structure finale avec des emplacements médias temporaires.',
    ],
    externalLink: 'Voir la publication',
    galleryWide: 'MÉDIAS DU PROJET / VIDÉO',
    exploreAll: 'Découvrir tous les projets →',
    testimonialsEyebrow: 'VOIX DE NOS CLIENTS',
    testimonialsTitle: 'TÉMOIGNAGES',
    testimonialsIntro: 'Ce que nos clients disent de leur collaboration avec nous',
    testimonialsAria: 'Témoignages clients',
  },
} as const;

const frenchServiceLabels: Record<string, string> = {
  'PR & Event Management': 'Relations presse & gestion d’événements',
  'Advertising, Creative & Artwork Design': 'Publicité, création & conception graphique',
  'Exclusive Interview Placement': 'Placement d’interview exclusive',
  'Exclusive Media Announcement': 'Annonce média exclusive',
  'Advertising, Creative, Media Planning & Artwork Design': 'Publicité, création, plan média & conception graphique',
  'AI-Powered Social Engagement Campaign': 'Campagne d’engagement social propulsée par l’IA',
  'Event Management': 'Gestion d’événements',
  'PR & Interview Placement': 'Relations presse & placement d’interview',
  'PR & Digital Campaign': 'Relations presse & campagne digitale',
};

export function localizeService(service: string, lang: SiteLanguage): string {
  return lang === 'fr' ? frenchServiceLabels[service] ?? service : service;
}

export function workBasePath(lang: SiteLanguage): string {
  return lang === 'fr' ? '/fr/projets' : '/work';
}

export function testimonialsPath(lang: SiteLanguage): string {
  return lang === 'fr' ? '/fr/temoignages' : '/testimonials';
}
