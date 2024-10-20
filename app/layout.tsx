import '@/styles/globals.css';

import { appConfig } from '@/config/app';
import { createTheme, MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';
import { Work_Sans, Inter } from 'next/font/google';
import Navbar from './ui/navbar';
import { Providers } from './provider';

const font = Work_Sans({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trip App',
  description: 'Trip manager Application',
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
        <Providers>
          <MantineProvider theme={theme}>
            <Navbar />
            <main>{children}</main>
          </MantineProvider>
        </Providers>
      </body>
    </html>
  );
}
