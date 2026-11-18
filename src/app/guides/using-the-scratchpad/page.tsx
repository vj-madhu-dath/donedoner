import type { Metadata } from 'next';
import { GuideLayout } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'Using the DoneDoner scratchpad',
  description:
    'Use DoneDoner’s separate scratchpad for quick notes, loose thoughts, and unfinished ideas.',
  alternates: { canonical: '/guides/using-the-scratchpad/' },
};

export default function ScratchpadGuide() {
  return (
    <GuideLayout
      title="Using the DoneDoner scratchpad"
      summary="The scratchpad is a small, editable list for thoughts that are not finished tasks yet. It stays separate from your done list."
      related={[
        {
          href: '/guides/keeping-an-accomplishment-log/',
          title: 'How to keep an accomplishment log',
          description: 'Make the done list a useful record instead of another target.',
        },
        {
          href: '/guides/understanding-your-exports/',
          title: 'What your DoneDoner exports include',
          description: 'Learn what the CSV and PNG leave out.',
        },
      ]}
    >
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Open it when a thought arrives</h2>
        <p>
          The Scratchpad button opens a side panel with a simple list of editable notes.
          Use it for a next step, a reminder to look something up, or a thought you do not
          want to turn into a task yet. The notes do not appear in the completed-task list.
        </p>
        <p>
          The app starts with a few example prompts if the scratchpad has never been used.
          Replace them with your own notes, or clear them and begin with a blank line.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">A few editing shortcuts</h2>
        <ul className="list-disc space-y-3 pl-6 marker:text-violet-200">
          <li>Press Enter to add a bullet below the current line.</li>
          <li>Paste several lines of text to turn them into separate bullets.</li>
          <li>Use Backspace on an empty line to remove it when another line remains.</li>
          <li>Use the arrow keys to move between notes when the caret is at the start or end of a line.</li>
        </ul>
        <p>
          Scratchpad notes save automatically in this browser. There is no separate save
          button. The current app does not include a scratchpad export or import, so copy
          out anything you need to keep elsewhere.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Move items to the done list when they are done</h2>
        <p>
          The scratchpad is for loose and unfinished notes. When something is complete,
          write it in the done list as a short record of what happened. That keeps the
          scratchpad from becoming a second task manager and makes the done list easier to
          review later.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Know where the notes are saved</h2>
        <p>
          Scratchpad content is stored in local storage for this site in the current browser
          profile. It is not synced to another device or included in the task CSV and PNG
          exports. Clearing browser site data can remove it.
        </p>
      </section>
    </GuideLayout>
  );
}
