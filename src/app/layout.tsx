// ✅ layout.tsx — this must be a server component (NO "use client")

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Physiology Shelf',
  description: 'Where Physiology Meets Knowledge.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Add this line */}
        <meta property="og:title" content="PhysioShelf , Digital Physiology Library" />
        <meta property="og:description" content="Access hundreds of physiology books for free. Designed for students and professionals." />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:url" content="https://physioshelf.vercel.app/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
