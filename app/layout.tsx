import type { Metadata } from 'next'
import { SITE_URL, GH, EMAIL } from '@/lib/content'
import './globals.css'
import { CursorGlow } from '@/components/cursor'

/* Fonts load via <link> at runtime (build environment can't reach Google
   Fonts). On a networked machine, next/font/google self-hosting is the
   better option — swap per README. */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Raveesh Raj Grandhi — Data & Analytics Professional',
  description:
    '20 tested analytics projects: experimentation statistics, causal inference, LLM systems, and modern data stacks. Turning messy data into trustworthy decisions.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Raveesh Raj Grandhi — Analytics that survive contact with real data',
    description: 'Reproducible analytics, tested metrics, decision-ready insights. Every metric traces to a verifiable run.',
    url: SITE_URL, type: 'website', siteName: 'Raveesh Raj Grandhi',
  },
  twitter: { card: 'summary', title: 'Raveesh Raj Grandhi — Data & Analytics' },
  robots: { index: true, follow: true },
  icons: { icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%2306080e'/%3E%3Ctext x='32' y='44' text-anchor='middle' font-family='monospace' font-size='34' fill='%235eead4'%3ER%3C/text%3E%3C/svg%3E" },
}

const personLd = {
  '@context': 'https://schema.org', '@type': 'Person',
  name: 'Raveesh Raj Grandhi',
  jobTitle: 'Data Analyst',
  url: SITE_URL, email: `mailto:${EMAIL}`, sameAs: [GH, 'https://www.linkedin.com/in/raveeshrajg/'],
  knowsAbout: ['Business Intelligence', 'SQL', 'Experimentation', 'Causal Inference', 'Healthcare Analytics', 'LLM Observability'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <div className="bg-mesh" aria-hidden />
        <div className="aurora" aria-hidden />
        <div className="bg-grid" aria-hidden />
        <div className="bg-noise" aria-hidden />
        <CursorGlow />
        {children}
      </body>
    </html>
  )
}
