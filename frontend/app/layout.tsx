import type { Metadata } from 'next';
import { Baloo_2 } from 'next/font/google';
import './globals.css';

const baloo = Baloo_2({
  subsets: ['latin'],
  variable: '--font-baloo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Solfedjio',
    template: '%s · Solfedjio',
  },
  description: "Bolalar musiqa va san'at maktablari uchun interaktiv solfedjio platformasi.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz">
      <body className={baloo.variable}>{children}</body>
    </html>
  );
}
