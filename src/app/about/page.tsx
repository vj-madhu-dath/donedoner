import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { SiteFrame } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'About and data notes',
  description:
    'How DoneDoner works, where it saves your tasks, and what its exports include.',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <SiteFrame>
      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-200">About DoneDoner</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            A place to notice what is already done.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            DoneDoner keeps a simple record of completed tasks and a separate scratchpad
            for loose notes. It is intentionally small: no account, no streaks, and no score.
          </p>
        </header>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
            <h2 className="text-xl font-semibold text-white">Where your data lives</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Your task list and scratchpad are saved in this browser’s local storage.
              The app does not sync them to a DoneDoner account or a cloud database. They
              are available only in the same browser profile and origin.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Clearing this site’s browser data, switching browsers, or using another device
              can make the saved list unavailable. Export a CSV if you want a separate copy
              of the task list.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
            <h2 className="text-xl font-semibold text-white">What the exports do</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The CSV includes each task, its current status, and its created date. The PNG
              makes an image of the visible done list. Neither export is an import or restore
              feature, and the scratchpad is not included in either one.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Keep exported files somewhere you control. DoneDoner currently has no way to
              import them back into the app.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
            <h2 className="text-xl font-semibold text-white">A note about connections</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The site is delivered using Firebase Hosting and loads the PT Sans typeface
              from Google Fonts. The current app does not send task text or scratchpad notes
              to a DoneDoner server.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
            <h2 className="text-xl font-semibold text-white">Questions or corrections</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              DoneDoner is an independent project. The source repository and issue tracker
              are the best places to review the implementation or report a problem.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium">
              <a
                href="https://github.com/vj-madhu-dath/donedoner"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-violet-100 hover:text-white"
              >
                Source repository <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://github.com/vj-madhu-dath/donedoner/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-violet-100 hover:text-white"
              >
                Report an issue <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </div>
          </section>
        </div>

        <div className="mt-12 rounded-3xl border border-violet-200/15 bg-violet-200/[0.06] p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
          <div>
            <h2 className="text-xl font-semibold text-white">Want to try it?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">Your first list is saved in this browser.</p>
          </div>
          <Link href="/app/" data-link-type="cta" className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-full bg-violet-200 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-white sm:mt-0">
            Open DoneDoner <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </SiteFrame>
  );
}
