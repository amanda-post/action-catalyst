import clsx from 'clsx';
import { Inter, Lexend } from 'next/font/google';

import { type Metadata } from 'next';
import SessionProviderWrapper from '~/components/SessionProviderWrapper';
import { Toaster } from '~/components/ui/toaster';
import '~/styles/tailwind.css';

export const metadata: Metadata = {
  title: 'Action Catalyst',
  description: 'Find motivation, get stuff done, and earn rewards.',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <Toaster />
      <SessionProviderWrapper>
        <body className='flex h-full flex-col'>{children}</body>
      </SessionProviderWrapper>
    </html>
  );
}
