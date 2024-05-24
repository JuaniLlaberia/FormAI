import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FormAI',
  description:
    'Created and Customize forms with AI help. Publish and get submissions from your audience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextTopLoader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
