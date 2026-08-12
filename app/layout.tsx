import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Apostrophe Entertainment',
  description: 'Apostrophe Entertainment headless frontend migration',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/assets/css/theme-core.css" />
        <link rel="stylesheet" href="/assets/css/theme.css" />
        <link rel="stylesheet" href="/assets/css/custom.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
