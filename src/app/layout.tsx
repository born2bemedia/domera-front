import { Plus_Jakarta_Sans, Syne } from 'next/font/google';
import localFont from 'next/font/local';

import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers/styles';

import 'react-toastify/dist/ReactToastify.css';
import '@/shared/lib/styles/null.scss';
import '@/shared/lib/styles/base.scss';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const cabinetGrotesk = localFont({
  src: [
    { path: './fonts/CabinetGrotesk-Light.woff', weight: '300', style: 'normal' },
    { path: './fonts/CabinetGrotesk-Regular.woff', weight: '400', style: 'normal' },
    { path: './fonts/CabinetGrotesk-Medium.woff', weight: '500', style: 'normal' },
    { path: './fonts/CabinetGrotesk-Bold.woff', weight: '700', style: 'normal' },
    { path: './fonts/CabinetGrotesk-Extrabold.woff', weight: '800', style: 'normal' },
  ],
  variable: '--font-cabinet-grotesk',
  display: 'swap',
});

const gambetta = localFont({
  src: [
    { path: './fonts/Gambetta/Gambetta-Light.woff2', weight: '300', style: 'normal' },
    { path: './fonts/Gambetta/Gambetta-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Gambetta/Gambetta-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Gambetta/Gambetta-Semibold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/Gambetta/Gambetta-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-gambetta',
  display: 'swap',
});

const clashGrotesk = localFont({
  src: [
    { path: './fonts/ClashGrotesk-Extralight.ttf', weight: '200', style: 'normal' },
    { path: './fonts/ClashGrotesk-Light.ttf', weight: '300', style: 'normal' },
    { path: './fonts/ClashGrotesk-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/ClashGrotesk-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/ClashGrotesk-Semibold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/ClashGrotesk-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-clash-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Doméra - Expertly Crafted Home Plans for Every Vision',
  description:
    'Discover Doméra’s range of premium home plans, designed to match your style and needs. Find the perfect layout with professional guidance from our architectural studio.',
  openGraph: {
    title: 'Doméra - Expertly Crafted Home Plans for Every Vision',
    description:
      'Discover Doméra’s range of premium home plans, designed to match your style and needs. Find the perfect layout with professional guidance from our architectural studio.',
    //images: 'https://domeraglobal.com/images/meta.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (

    <html lang={locale}>
      <GoogleAnalytics gaId="G-8556Y8CBFX" />
      <body
        className={cn(
          plusJakartaSans.variable,
          syne.variable,
          cabinetGrotesk.variable,
          gambetta.variable,
          clashGrotesk.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
