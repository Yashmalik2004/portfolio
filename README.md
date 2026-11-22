# Yash Malik — Developer Portfolio

Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, React Three Fiber.

## Run locally
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start
```

## Update content
All content lives in `src/data/portfolio.ts`. Project case studies (Chef, Voice AI Agent, Cropie) are the `projects` array there; add real repo/demo URLs to each project's `links` field and the buttons appear automatically. Showcase components live in `src/components/projects/`. Replace `public/Yash_Malik_Resume.pdf` to update the resume download.

## Contact form
Without configuration the form opens your email client (mailto). To send directly, create a Formspree form
and set `NEXT_PUBLIC_FORM_ENDPOINT` in `.env.local` (see `.env.example`). Never put secret API keys in this variable.

## Deploy
Push to GitHub, import the repo on Vercel, add `NEXT_PUBLIC_FORM_ENDPOINT` if used, and deploy.
