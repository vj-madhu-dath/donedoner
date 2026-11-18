import type { Metadata } from 'next';
import DoneDonerApp from '@/components/DoneDonerApp';

export const metadata: Metadata = {
  title: 'Your done list',
  description: 'Record completed tasks and keep a scratchpad in your browser.',
  alternates: { canonical: '/app/' },
};

export default function AppPage() {
  return <DoneDonerApp />;
}
