import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownRight, ArrowRight, Check } from 'lucide-react';
import { SiteFrame } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'A simple place to keep a done list',
  description:
    'Record the work you finished, keep a separate scratchpad, and take your list with you. DoneDoner saves your data in this browser.',
  alternates: { canonical: '/' },
};

const features = [
  {
    number: '01',
    title: 'Record what is finished',
    body: 'Add a task after you have done it. The list is for noticing completed work, not collecting another set of reminders.',
  },
  {
    number: '02',
    title: 'Keep next thoughts separate',
    body: 'Open the scratchpad for loose notes and quick bullets. It stays distinct from the things you have already completed.',
  },
  {
    number: '03',
    title: 'Keep a copy when you want one',
    body: 'Export the task list as CSV or share a PNG snapshot. The app does not sync those entries to an account.',
  },
];

export default function Home() {
  return (
    <SiteFrame>
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute -left-48 bottom-[-18rem] h-[36rem] w-[36rem] rounded-full bg-indigo-500/10 blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/20 bg-violet-200/[0.07] px-3 py-1.5 text-xs font-medium text-violet-100">
              <Image src="/logo.png" alt="" width={18} height={18} className="rounded" />
              A quieter kind of task list
            </div>
            <h1 className="mt-7 max-w-2xl text-5xl font-semibold leading-[1.06] tracking-tight text-white sm:text-6xl">
              Keep a record of what you <span className="text-violet-200">finished.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              DoneDoner is a small place to note completed work, keep a separate scratchpad,
              and see the shape of your day without turning it into a score.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/app/"
                data-link-type="cta"
                className="inline-flex items-center gap-2 rounded-full bg-violet-200 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-white"
              >
                Open DoneDoner <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link href="/guides/" data-link-type="contextual" className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-slate-300 hover:text-white">
                Browse the guides <ArrowDownRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-5 text-sm text-slate-500">
              No account. Your task list stays in this browser.
            </p>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="rounded-[1.75rem] border border-white/10 bg-[#10111a] p-5 shadow-2xl shadow-black/40 sm:p-7">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-200">An example list</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">A few things that moved</h2>
                </div>
                <span aria-hidden="true" className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">Today</span>
              </div>
              <ul className="mt-2 divide-y divide-white/[0.07]">
                {[
                  'Sent the first draft',
                  'Sorted the notes from the call',
                  'Took a proper lunch break',
                ].map((task) => (
                  <li key={task} className="flex items-center gap-3 py-4 text-sm text-slate-200">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-200/15 text-violet-100">
                      <Check aria-hidden="true" className="h-3.5 w-3.5" />
                    </span>
                    {task}
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-2xl bg-white/[0.035] p-4">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">A note for later</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">Keep tomorrow’s first thought somewhere safe.</p>
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-500">
                A sample for illustration—not a real user’s list.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-200">Small on purpose</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            A done list, not another productivity system.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            Add a line when something is complete. Use the scratchpad for everything still
            taking shape. There are no streaks, rankings, or automatic suggestions to keep up with.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.number} className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-7">
              <p className="text-xs font-semibold tracking-[0.16em] text-violet-200">{feature.number}</p>
              <h3 className="mt-5 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-[1fr_auto] md:items-center md:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-200">Your browser, your list</p>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Made to work without an account.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              Tasks and scratchpad notes are saved in this browser’s local storage. They are
              not synced between devices, so export the task list if you want a separate copy.
            </p>
          </div>
          <Link href="/about/" data-link-type="contextual" className="inline-flex items-center gap-2 text-sm font-semibold text-violet-100 hover:text-white">
            Read how data is handled <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8 sm:py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-white">Start with one line.</h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-400">
          Open your list and write down something you have already finished.
        </p>
        <Link href="/app/" data-link-type="cta" className="mt-7 inline-flex items-center gap-2 rounded-full bg-violet-200 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-white">
          Open the app <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </section>
    </SiteFrame>
  );
}
