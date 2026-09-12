import type { Metadata } from 'next';
import Script from 'next/script';
import LegacyClientBehavior from '@/components/LegacyClientBehavior';
import './globals.css';
import './site-v2.css';
import './work-case-study.css';
import './work-detail-rich-media.css';
import './media-feature.css';
import './work-listing.css';
import './testimonials-client-revision.css';
import './home-teasers.css';
import './site-shell.css';
import './mobile-header.css';
import './final-mobile-scroll.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://apostropheent.com'),
  title: 'Apostrophe Entertainment',
  description: 'Apostrophe Entertainment',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/assets/css/theme-core.css" />
        <link rel="stylesheet" href="/assets/css/theme.css" />
        <link rel="stylesheet" href="/assets/css/custom.css" />
      </head>
      <body>
        <Script src="https://code.jquery.com/jquery-3.7.1.min.js" strategy="beforeInteractive" />
        {children}
        <LegacyClientBehavior />
      </body>
    </html>
  );
}
