# Publish — two paths, pick one

Everything is committed and ready. The résumé PDF is already at
public/resume.pdf (the Data/BI version — swap the file anytime).

## Path A — GitHub Pages (free, the URL already on your resume)
1. On github.com: New repository → name it EXACTLY `raveesh-rajg.github.io`
   → Public → create EMPTY (no README).
2. In this folder:
       git remote add origin git@github.com:Raveesh-rajg/raveesh-rajg.github.io.git
       git push -u origin main
3. Repo → Settings → Pages → Source: **GitHub Actions**.
The included workflow builds and deploys automatically. Live at
https://raveesh-rajg.github.io in ~2 minutes. Future edits: commit + push.

## Path B — Vercel (custom domain friendly)
1. Push this folder to any GitHub repo (any name).
2. vercel.com → Add New Project → import the repo → deploy (zero config).
3. Update SITE_URL in lib/content.ts to the Vercel URL and push again.

## After it's live
- Verify /resume.pdf downloads and all 6 case pages load.
- The 20 project links point at github.com/Raveesh-rajg/<repo> — push those
  repos so the links resolve (PORTFOLIO_STATUS.md has the list).
- Optional: set NEXT_PUBLIC_FORM_ENDPOINT (Formspree) in repo/Vercel env for
  the contact form; without it, the form falls back to mailto.
