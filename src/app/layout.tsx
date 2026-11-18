import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  metadataBase: new URL('https://donedoner.web.app'),
  title: {
    default: 'DoneDoner — keep a record of what you finish',
    template: '%s | DoneDoner',
  },
  description:
    'A quiet place to record completed tasks, keep a scratchpad, and notice what you got done. Your lists stay in this browser.',
  applicationName: 'DoneDoner',
  openGraph: {
    type: 'website',
    siteName: 'DoneDoner',
    title: 'DoneDoner — keep a record of what you finish',
    description:
      'Record completed tasks, keep a scratchpad, and notice what you got done.',
    url: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
