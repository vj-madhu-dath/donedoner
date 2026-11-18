import type { Metadata } from 'next';
import { GuideLayout } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'How to keep an accomplishment log',
  description:
    'A low-pressure way to record finished work and make progress easier to see.',
  alternates: { canonical: '/guides/keeping-an-accomplishment-log/' },
};

export default function AccomplishmentLogGuide() {
  return (
    <GuideLayout
      title="How to keep an accomplishment log"
      summary="A done list is a record, not a contract. Use it to make completed work visible without turning every day into a productivity score."
      related={[
        {
          href: '/guides/using-the-scratchpad/',
          title: 'Using the DoneDoner scratchpad',
          description: 'Keep rough thoughts and unfinished notes out of the completed list.',
        },
        {
          href: '/guides/understanding-your-exports/',
          title: 'What your DoneDoner exports include',
          description: 'Make a separate copy of the task list when you need one.',
        },
      ]}
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Write down the finished thing</h2>
        <p>
          Most task lists begin with work that still needs to happen. An accomplishment log
          starts from the other end: it is a place to record what is already complete. That
          can be a project milestone, a small errand, a difficult conversation, or the
          ordinary work that would otherwise disappear into the day.
        </p>
        <p>
          In DoneDoner, add a task after doing it. A useful entry is specific enough to
          recognize later, but it does not need to be polished. “Sent the first draft” says
          more than “work”; “made time for lunch” can matter just as much as a work deliverable.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Keep the bar low</h2>
        <p>
          The list is not a measure of your worth or a promise to repeat the same amount
          tomorrow. Some days produce a long list; some days call for rest, care, or handling
          one important thing. There is no required number of entries and no streak to protect.
        </p>
        <p>
          If writing every item becomes another chore, make the log smaller. You could note
          one thing at the end of the day, or add an item only when you want a record of it.
          The point is to help you see what happened—not to create another system to maintain.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Separate done from next</h2>
        <p>
          An unfinished idea can be useful without belonging in a completed list. Put loose
          thoughts in the DoneDoner scratchpad, then add a task to the done list when it is
          finished. Keeping the two spaces distinct makes each one easier to read.
        </p>
        <p>
          You can delete an entry that no longer belongs. The list is yours to edit; it
          does not need to be a perfect history.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Review only when it helps</h2>
        <p>
          A quick look back can make invisible work easier to notice. You might scan the
          list before planning a week, before writing a project update, or simply when the
          day feels like it vanished. There is no special review schedule built into the app.
        </p>
        <p>
          DoneDoner keeps its list in the current browser. If you want a separate copy, use
          the CSV export and keep that file somewhere you control. The app does not import
          the file back or synchronize it across devices.
        </p>
      </section>
    </GuideLayout>
  );
}
