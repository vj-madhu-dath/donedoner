import type { Metadata } from 'next';
import { GuideLayout } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'What your DoneDoner exports include',
  description:
    'Understand what DoneDoner’s CSV and PNG exports contain, and why they are not restore files.',
  alternates: { canonical: '/guides/understanding-your-exports/' },
};

export default function ExportsGuide() {
  return (
    <GuideLayout
      title="What your DoneDoner exports include"
      summary="DoneDoner can download a task CSV or create an image of the visible done list. Neither option is a full backup or an import file."
      related={[
        {
          href: '/guides/keeping-an-accomplishment-log/',
          title: 'How to keep an accomplishment log',
          description: 'A low-pressure way to record what is already complete.',
        },
        {
          href: '/guides/using-the-scratchpad/',
          title: 'Using the DoneDoner scratchpad',
          description: 'Keep rough thoughts separate from the done list.',
        },
      ]}
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">The CSV is a readable task export</h2>
        <p>
          Choose <em>Export as CSV</em> to download a spreadsheet-friendly file of the
          current tasks. It contains three columns: Task, Status, and Created Date. The
          date is written as a timestamp in the format year-month-day and time.
        </p>
        <p>
          The CSV includes task entries only. It does not include scratchpad notes, and
          DoneDoner has no import function for putting an exported CSV back into the app.
          Keep a copy of the file if you want a separate record, but do not treat it as a
          restore point.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">The PNG is a snapshot to share</h2>
        <p>
          <em>Share as PNG</em> creates an image of the task list as it appears in the app.
          It is useful for sharing or keeping a visual snapshot. The scratchpad drawer and
          export controls are left out of that image.
        </p>
        <p>
          An image is not structured data: it cannot be searched or loaded back as tasks.
          Review it before sharing, especially if your list contains personal or work
          details.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Keep another copy before clearing browser data</h2>
        <p>
          DoneDoner saves tasks and scratchpad notes in this browser’s local storage. The
          app does not sync them to a DoneDoner account, so another browser or device will
          not automatically have the same list. Clearing site data can remove saved entries.
        </p>
        <p>
          Export the task list if you want a separate copy, and copy scratchpad notes
          elsewhere if you need them. Neither export restores the app’s saved state.
        </p>
      </section>
    </GuideLayout>
  );
}
