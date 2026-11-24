# Class of 2026 Graduation Keepsake

A static Next.js App Router site with a sealed e-card for each graduate. The homepage asks visitors to open the personal link they received.

## Run locally

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. Use a graduate’s path to preview their envelope.

## Build and deploy

```sh
npm run build
```

Publish the generated `out/` directory. It contains the homepage, a 404 page, and an `index.html` for each graduate.

- **Vercel** uses the included `vercel.json` to build and serve the static export.
- **Cloudflare Pages** uses the **Next.js (Static HTML Export)** preset. Set the build command to `npm run build` and the output directory to `out`.

Personal paths are `/andrew`, `/gideon`, `/gerry`, `/erin`, `/ling-hui`, `/tian-kuan`, and `/joseph-ng`. Share each graduate’s URL individually.

## Data and access

To regenerate the dataset after updating the workbook, run:

```sh
python3 scripts/extract-cards.py "/path/to/Messages for Our Graduating Seniors! (Responses).xlsx"
```

Next.js reads `src/data/cards.json` during the build. Each card’s exported payload includes its own messages and the two shared Drive links. The envelope is a visual reveal. Anyone who knows or guesses a card URL can open it on a public deployment. For access controls, configure them with the hosting provider before sharing. Keep source repositories private because the dataset contains every submission. Drive links retain their existing sharing permissions.
