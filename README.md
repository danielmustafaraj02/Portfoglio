# Daniel Mustafaraj · portfolio

Personal site (React + Vite) and CV.

- `npm run dev` / `npm run build` — the site. Facts shown on it live in `src/profile.ts`; add projects there and the Projects section appears.
- `cv/cv.html` (English) and `cv/cv-it.html` (Italian) — the CV source. Open in Chrome and print to PDF (A4, margins none, background graphics on) and save the PDFs over `cv/CV-Daniel-Mustafaraj.pdf` and `cv/CV-Daniel-Mustafaraj-IT.pdf`.
- Email, phone and the CV PDFs are behind an access code (`UNLOCK_CODE` in `vite.config.ts`). The build encrypts them (AES-GCM, key from PBKDF2 of the code); the site only ships ciphertext and decrypts in the browser when the visitor types the code. Don't put the PDFs in `public/`.
- `build_jobs_page.py` — fetches live thesis/internship postings and writes `jobs.html` (the hand-picked shortlist from `shortlist.json`, each posting checked as still listed) and `jobs-all.html` (every scored posting). `prepare.html` is the preparation guide for the shortlisted roles. All private: gitignored and not part of the site build.
