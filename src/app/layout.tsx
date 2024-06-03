import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import './globals.css';
import Provider from '@/components/Provider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FormContextProvider from './dashboard/form/[formId]/edit/(components)/FormContext';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FormAI',
  description:
    'Created and Customize forms with AI help. Publish and get submissions from your audience.',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo-light.png',
        href: '/logo-light.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo-dark.png',
        href: '/logo-dark.png',
      },
    ],
  },
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
        <Navbar />
        <FormContextProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <main className='flex flex-col min-h-[calc(100vh-3.5rem-1px)] bg-background'>
              <div className='flex-1 flex flex-col h-full'>
                <Provider>{children}</Provider>
              </div>
            </main>
            <Footer />
          </ThemeProvider>
        </FormContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
