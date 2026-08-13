export type LegacyLanguage = 'en' | 'fr';

type Service = {
  id: string;
  title: string;
  content: string;
  image: string;
};

type LegacyContent = {
  lang: LegacyLanguage;
  metaTitle: string;
  metaDescription: string;
  nav: {
    home: string;
    about: string;
    services: string;
    fields: string;
    contact: string;
  };
  languageLabels: {
    en: string;
    fr: string;
  };
  heroTitle: string;
  aboutHtml: string;
  services: Service[];
  fields: string[];
  footer: {
    addressesLabel: string;
    shortHtml: string;
    copyright: string;
  };
};

const sharedServices = [
  ['strategic-communications', '/assets/img/services/strategic-communications.gif'],
  ['digital-marketing', '/assets/img/services/digital-marketing.gif'],
  ['b2b-event-marketing', '/assets/img/services/b2b-event-marketing.gif'],
  ['360-creative-marketing', '/assets/img/services/360-creative-marketing.gif'],
  ['strategic-consultancy', '/assets/img/services/strategic-consultancy.gif'],
] as const;

export const legacyContent: Record<LegacyLanguage, LegacyContent> = {
  en: {
    lang: 'en',
    metaTitle: 'Apostrophe Entertainment Marketing Communications Agency',
    metaDescription:
      'Apostrophe Entertainment is a marketing communications agency for companies in the global entertainment & media industry.',
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      fields: 'Fields',
      contact: 'Contact Us',
    },
    languageLabels: {
      en: 'English',
      fr: 'Français',
    },
    heroTitle: 'Marketing Communications Agency for Global Entertainment and Media',
    aboutHtml:
      'Apostrophe Entertainment is a marketing communications agency for companies in the global entertainment & media industry. Our team consists of experts, specifically professionals from the international entertainment content business. With teams in London, Paris and Istanbul; we offer our clients a wide range of integrated marketing communication services, also strategic consultancy, to help their companies prosper, grow and be known in the best possible way worldwide.',
    services: [
      {
        id: sharedServices[0][0],
        image: sharedServices[0][1],
        title: 'Strategic Communications & PR',
        content:
          'As Apostrophe Entertainment, we help our clients to set their goals, analyze their audience, create the key messages and strategies. We believe that a smart Strategic Communication Plan is imperative for any businesses and we start from establishing such plans for our clients as a roadmap for success. Accordingly, we create PR plans and PR campaigns that works well with our clients’ strategies and marketing purposes.',
      },
      {
        id: sharedServices[1][0],
        image: sharedServices[1][1],
        title: 'Digital Marketing',
        content:
          'At Apostrophe Entertainment; SEO, Paid Media, Social Media Management, E-mail Marketing are some of the key tactics which we use for establishing integrated marketing communication plans. We implement and manage innovative strategies to market our client’s products and services in the entertainment content business to increase their sales and revenue.',
      },
      {
        id: sharedServices[2][0],
        image: sharedServices[2][1],
        title: 'B2B Event Marketing & Management',
        content:
          'At Apostrophe Entertainment, we design events from the scratch and consult our clients about event marketing and management, specifically for major content markets and festivals. From arranging the company’s attendance to a panel - seminar - conference to private and public content screenings, from organizing special company events as cocktails, private parties, VIP dinners to press & media events and red carpet ceremonies, we provide an extended B2B event management to our clients for them to reach their desired business outcomes.',
      },
      {
        id: sharedServices[3][0],
        image: sharedServices[3][1],
        title: '360° Creative Marketing Services',
        content:
          'We offer our clients an extended creative marketing services which we focus on creating disruptive ideas and building strategies to maximize their marketing impact. Ingenious Content Creation and Concept Design, Advertising, Branding & Design, Photography & Video Production, Social Media Content Production are the services at our agency’s core to help our clients to stand out.',
      },
      {
        id: sharedServices[4][0],
        image: sharedServices[4][1],
        title: 'Strategic Consultancy',
        content:
          'Apostrophe Entertainment also provides consultancy for selected clients about content sales & acquisitions, content distribution, co-productions and partnerships, industry trends, and major global entertainment content markets. Having longstanding relationships, a worldwide network and know-how in the field, we are happy to help to the small and medium-sized businesses’ needs in the international entertainment content business.',
      },
    ],
    fields: [
      'TV',
      'Digital Platforms',
      'Cinema',
      'Film Festivals',
      'Content Markets',
      'Trade Shows & Awards',
      'Red Carpet Ceremonies',
    ],
    footer: {
      addressesLabel: 'Addresses',
      shortHtml:
        'Apostrophe Entertainment is a marketing communications agency for companies in the global entertainment & media industry.',
      copyright: 'Copyright © 2023 Apostrophe Entertainment All rights reserved.',
    },
  },
  fr: {
    lang: 'fr',
    metaTitle: 'Apostrophe Entertainment Agence de Communication Marketing',
    metaDescription:
      'Apostrophe Entertainment est une agence de communication marketing pour les entreprises dans l’industrie mondiale du divertissement et des médias.',
    nav: {
      home: 'Accueil',
      about: 'Notre Agence',
      services: 'Nos Services',
      fields: 'Nos Domaines',
      contact: 'Contactez-nous',
    },
    languageLabels: {
      en: 'English',
      fr: 'Français',
    },
    heroTitle: 'Agence de Communication Marketing pour le Divertissement International et les Médias',
    aboutHtml:
      'Apostrophe Entertainment est une agence de communication marketing pour les entreprises dans l’industrie mondiale du divertissement et des médias.<br /><br />Notre équipe est composée d\'experts, en particulier de professionnels de l\'industrie du contenu de divertissement international. Avec des équipes à Londres, Paris et Istanbul, nous offrons à nos clients un large éventail de services de communication marketing intégrée, ainsi qu\'une aide stratégique en matière de conseil, pour aider leurs entreprises à prospérer, à grandir et à se faire connaître de la manière la plus efficace dans le monde entier.',
    services: [
      {
        id: sharedServices[0][0],
        image: sharedServices[0][1],
        title: 'Communications Stratégiques et Relations Publiques',
        content:
          'Chez Apostrophe Entertainment, nous assistons les entreprises à déterminer leurs objectifs, comprendre leur public cible, élaborer des messages clés et des stratégies. Nous considérons qu’un plan de communication stratégique est crucial pour le succès de toute entreprise et nous commençons par mettre en place ce plan pour nos clients. Par la suite, nous concevons des campagnes de relations publiques alignées sur les stratégies et les objectifs marketing de nos clients.',
      },
      {
        id: sharedServices[1][0],
        image: sharedServices[1][1],
        title: 'Marketing Digitale',
        content:
          'À Apostrophe Entertainment, nous utilisons des tactiques clés telles que le référencement naturel (SEO), les médias payants, la gestion des médias sociaux et le marketing par e-mail pour établir des plans de communication marketing intégrés en fonction de notre approche d’affaires globale. Nous mettons en œuvre et gérons des stratégies innovantes pour promouvoir les produits et services de nos clients dans le secteur du contenu de divertissement afin d’augmenter leurs ventes et leur chiffre d’affaires.',
      },
      {
        id: sharedServices[2][0],
        image: sharedServices[2][1],
        title: 'Marketing et Gestion d’Événements B2B',
        content:
          'Chez Apostrophe Entertainment, nous sommes spécialisés dans la conception d’événements sur mesure, en fournissant également une consultation en matière de marketing et de gestion d’événements pour les grands marchés de contenu et festivals. De l’arrangement de la participation d’une entreprise à un panel, à un séminaire, à une conférence, jusqu’à l’organisation de projections de contenu privées et publiques, en passant par la mise en place d’événements spéciaux pour l’entreprise tels que des cocktails, des fêtes privées, des dîners VIP, des événements presse et médias et des cérémonies sur tapis rouge, nous offrons une gestion complète des événements B2B pour aider nos clients à atteindre leurs objectifs commerciaux souhaités.',
      },
      {
        id: sharedServices[3][0],
        image: sharedServices[3][1],
        title: 'Services Créatifs de Marketing à 360°',
        content:
          'Nous offrons à nos clients des services de marketing créatif étendus en nous concentrant sur la création d’idées perturbatrices et la construction de stratégies pour maximiser leur impact marketing. La création de contenu ingénieux et la conception de concepts, la publicité, la création de marques et de designs, la production de photographies et de vidéos, ainsi que la production de contenu pour les médias sociaux sont les services au cœur de notre agence pour permettre à nos clients de se distinguer.',
      },
      {
        id: sharedServices[4][0],
        image: sharedServices[4][1],
        title: 'Consultance Stratégique',
        content:
          'Apostrophe Entertainment offre également des prestations de conseil pour une sélection de clients en matière de ventes et d’acquisitions de contenus, de distribution de contenus, de co-productions et de partenariats, de tendances du secteur, et des grands marchés de contenu de divertissement mondiaux. Grâce à nos relations de longue date, notre réseau mondial et notre expertise dans le domaine, nous sommes heureux d’aider les petites et moyennes entreprises dans le secteur du contenu de divertissement international.',
      },
    ],
    fields: [
      'Télévision',
      'Plateformes Digitales',
      'Cinéma',
      'Festivals de Films',
      'Marchés de Contenu',
      'Salons Professionnels & Récompenses',
      'Cérémonies de Tapis Rouge',
    ],
    footer: {
      addressesLabel: 'Addresses',
      shortHtml:
        'Apostrophe Entertainment est une agence de communication marketing pour les entreprises dans l’industrie mondiale du divertissement et des médias.',
      copyright: 'Copyright © 2023 Apostrophe Entertainment Tous droits réservés.',
    },
  },
};
