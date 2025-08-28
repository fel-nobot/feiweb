# Felicity Site (Next.js)

## Run locally
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel
1. Initialize a Git repo and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial"
   git branch -M main
   gh repo create felicity-site --public --source=. --remote=origin --push  # or create manually
   ```
2. Go to https://vercel.com/new and **Import Project** from your GitHub repo.
3. Framework preset: **Next.js** (auto).
4. Build Command: `next build` (default). Output: `.next` (default).
5. Click **Deploy**. Done ✅

Tip: If favicon looks cached, hard refresh or append `?v=2` to the icon URL.
