# DoneDoner

DoneDoner is a small browser-based accomplishment list with a separate scratchpad.
It runs at <https://donedoner.web.app/>.

## Pages

- `/` — overview and links into the app
- `/app/` — the done list and scratchpad
- `/about/` — how the app works and where its data is saved
- `/guides/` — practical notes about the done list, scratchpad, and exports

The guide pages are linked from the Guides index. The site is statically exported
and served by Firebase Hosting.

## Data

Tasks and scratchpad notes are saved in the current browser's local storage. There
is no account or cloud sync. The app can export tasks as CSV or make a PNG of the
visible task list; these are exports, not import or restore files. Scratchpad notes
are not included in either export.

## Develop and build

```bash
npm ci
npm run dev
```

Create the Firebase Hosting output with:

```bash
npm run build
```

Next.js writes the static site to `out/`. The GitHub Actions workflow deploys that
directory to the existing Firebase Hosting project when changes are pushed to
`main`.
