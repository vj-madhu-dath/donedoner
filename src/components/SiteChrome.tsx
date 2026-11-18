import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

const navLinkClass =
  'text-sm text-slate-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300';

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-[#0b0b12]/95">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
          aria-label="DoneDoner home"
        >
          <Image
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-xl"
            priority
          />
          <span className="leading-tight">
            <span className="block font-semibold tracking-tight text-white">DoneDoner</span>
            <span className="block text-xs text-slate-400">A record of what got done</span>
          </span>
        </Link>

        <Link
          href="/app/"
          data-link-type="cta"
          className="order-2 rounded-full bg-violet-200 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 sm:order-3"
        >
          Open the app
        </Link>

        <nav
          aria-label="Main navigation"
          className="order-3 flex w-full items-center gap-5 overflow-x-auto pb-1 sm:order-2 sm:w-auto"
        >
          <Link href="/" className={navLinkClass}>Home</Link>
          <Link href="/guides/" className={navLinkClass}>Guides</Link>
          <Link href="/about/" className={navLinkClass}>About</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0b12]">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 text-sm text-slate-400 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-medium text-slate-200">DoneDoner</p>
          <p className="mt-1 max-w-md">
            A small browser-based done list. Tasks and scratchpad notes are saved in this browser.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/" className={navLinkClass}>Home</Link>
          <Link href="/app/" className={navLinkClass}>Open the app</Link>
          <Link href="/guides/" className={navLinkClass}>Guides</Link>
          <Link href="/about/" className={navLinkClass}>About</Link>
        </nav>
      </div>
    </footer>
  );
}

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#090910] text-slate-100">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function GuideLayout({
  title,
  summary,
  children,
  related,
}: {
  title: string;
  summary: string;
  children: ReactNode;
  related: { href: string; title: string; description: string }[];
}) {
  return (
    <SiteFrame>
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-400">
          <Link href="/guides/" className="hover:text-white">Guides</Link>
          <span aria-hidden="true" className="px-2 text-slate-600">/</span>
          <span className="text-slate-200">{title}</span>
        </nav>
        <article>
          <header className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-200">
              DoneDoner guide
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">{summary}</p>
          </header>
          <div className="prose-done mt-10 max-w-3xl space-y-7 text-base leading-8 text-slate-300">
            {children}
          </div>
        </article>

        <section aria-labelledby="related-guides" className="mt-14 border-t border-white/10 pt-8">
          <h2 id="related-guides" className="text-lg font-semibold text-white">More from the guides</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-link-type="related"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-violet-200/40 hover:bg-white/[0.06]"
              >
                <span className="font-medium text-white">{item.title}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-400">{item.description}</span>
              </Link>
            ))}
          </div>
          <Link
            href="/app/"
            data-link-type="cta"
            className="mt-7 inline-flex rounded-full bg-violet-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
          >
            Start a done list
          </Link>
        </section>
      </div>
    </SiteFrame>
  );
}
