import '@/styles/globals.css';

import { appConfig } from '@/config/app';
import { createTheme, MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';
import { Work_Sans, Inter } from 'next/font/google';
import Navbar from './ui/navbar';
import { ItineraryProvider } from './ItineraryContext';

const font = Work_Sans({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trip App',
};

const theme = createTheme({
  colors: {
    primary: [
      appConfig.colors.primary[50],
      appConfig.colors.primary[100],
      appConfig.colors.primary[200],
      appConfig.colors.primary[300],
      appConfig.colors.primary[500],
      appConfig.colors.primary[600],
      appConfig.colors.primary[700],
      appConfig.colors.primary[800],
      appConfig.colors.primary[900],
      appConfig.colors.primary[950],
    ],
  },
  fontFamily: 'inherit',
  primaryColor: 'primary',
  primaryShade: 4,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-mantine-color-scheme="light" lang="en">
      <body className={font.className}>
        <ItineraryProvider>
          <MantineProvider theme={theme}>
            <Navbar />
            <main>{children}</main>
          </MantineProvider>
        </ItineraryProvider>
      </body>
    </html>
  );
}

{
  /* <ItineraryProvider>
      <Component {...pageProps} />
    </ItineraryProvider> */
}
