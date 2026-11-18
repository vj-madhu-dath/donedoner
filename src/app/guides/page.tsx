import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SiteFrame } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'Guides',
  description:
    'Practical notes on keeping a done list, using the scratchpad, and exporting your DoneDoner tasks.',
  alternates: { canonical: '/guides/' },
};

const guides = [
  {
    href: '/guides/keeping-an-accomplishment-log/',
    number: '01',
    title: 'How to keep an accomplishment log',
    description: 'A simple way to record finished work without turning the list into another target.',
    note: 'A useful habit',
  },
  {
    href: '/guides/using-the-scratchpad/',
    number: '02',
    title: 'Using the DoneDoner scratchpad',
    description: 'Keep unfinished thoughts separate, make quick bullets, and understand what auto-save means.',
    note: 'The scratchpad',
  },
  {
    href: '/guides/understanding-your-exports/',
    number: '03',
    title: 'What your DoneDoner exports include',
    description: 'See what the CSV and PNG contain—and what they cannot restore.',
    note: 'Your data',
  },
];

export default function GuidesPage() {
  return (
    <SiteFrame>
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-200">DoneDoner guides</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Notes for a lighter done list.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Short, practical guides to noticing finished work, keeping next thoughts
            separate, and understanding what stays in your browser.
          </p>
        </header>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {guides.map((guide) => (
            <article key={guide.href} className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-200">
                {guide.note} <span className="px-1 text-slate-600">·</span> {guide.number}
              </p>
              <h2 className="mt-5 text-2xl font-semibold leading-snug text-white">{guide.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">{guide.description}</p>
              <Link href={guide.href} data-link-type="related" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-violet-100 hover:text-white">
                Read the guide <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#10111a] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="text-xl font-semibold text-white">Ready to make your own list?</h2>
            <p className="mt-2 text-sm text-slate-400">Open the app and add something you have already done.</p>
          </div>
          <Link href="/app/" data-link-type="cta" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-violet-200 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-white">
            Open DoneDoner <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </SiteFrame>
  );
}
