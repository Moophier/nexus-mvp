import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Nexus · 知识资产循环',
  description: '由评价驱动的知识资产循环经济体',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono&family=Noto+Serif+SC:wght@400;600;700&family=Syne:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-canvas text-ink font-serif antialiased">
        {children}
      </body>
    </html>
  );
}
