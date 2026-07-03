# Deploying The Young Creatives

This gets your code onto GitHub, then live on the internet with a real URL.

## Part 1 — Push to GitHub

1. Create a free account at [github.com](https://github.com) if you don't have one.
2. Click the **+** in the top right → **New repository**. Name it `the-young-creatives`, leave it empty (no README/gitignore — you already have those), and click **Create repository**.
3. In VS Code, open a terminal in the project folder and run:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/the-young-creatives.git
   git push -u origin main
   ```

   Replace `YOUR-USERNAME` with your actual GitHub username (GitHub shows you this exact command on the empty repo page too — you can copy it from there instead).

   The first push will ask you to sign in to GitHub in your browser — follow the prompt.

Your code is now on GitHub. **It is not running anywhere yet** — this step only stores it.

## Part 2 — Host the backend + database (Render)

[Render](https://render.com) runs your Node server and gives you a free Postgres database.

1. Sign up at render.com, choose **"Sign up with GitHub"** so it can see your repos.
2. Click **New +** → **Blueprint**.
3. Select your `the-young-creatives` repo. Render will detect the `render.yaml` file already included in this project and set up both the web service and the database automatically.
4. Click **Apply**. It'll build and deploy — takes a few minutes the first time.
5. Once live, Render gives you a URL like `https://the-young-creatives-api.onrender.com`. **Copy this** — you'll need it in Part 3.
6. In the Render dashboard for your web service, go to **Environment** and set `CLIENT_ORIGIN` to your frontend's URL (you'll get this in Part 3 — you can come back and fill it in after).
7. Seed the database: in the Render dashboard, open the **Shell** tab for your web service and run:
   ```bash
   npm run db:seed
   ```
   This prints your admin login — save it.

## Part 3 — Host the frontend (Vercel)

[Vercel](https://vercel.com) is built for React/Vite apps and deploys in about a minute.

1. Sign up at vercel.com with **"Continue with GitHub"**.
2. Click **Add New** → **Project**, select your `the-young-creatives` repo, click **Import**.
3. Vercel will detect it's a Vite project automatically (the `vercel.json` in this project confirms the settings).
4. Before deploying, add an environment variable:
   - Name: `VITE_API_URL`
   - Value: `https://the-young-creatives-api.onrender.com/api` (your Render URL from Part 2, step 5, with `/api` on the end)
5. Click **Deploy**.
6. Once done, Vercel gives you a live URL like `https://the-young-creatives.vercel.app`.

## Part 4 — Connect the two

Go back to Render (Part 2, step 6) and set `CLIENT_ORIGIN` to your Vercel URL exactly (e.g. `https://the-young-creatives.vercel.app`, no trailing slash). Save — Render will redeploy automatically.

## Checking it's live

- Visit your Vercel URL — the site should load.
- Visit `https://your-render-url.onrender.com/api/health` — should return `{"status":"ok"}`.
- Try submitting the Booking or Contact form, then log in at `your-vercel-url/admin/login` and confirm it shows up.

## Notes

- Render's free tier spins the backend down after inactivity — the first request after idle can take ~30 seconds while it wakes up. This is normal on the free plan, not a bug.
- Every time you `git push` to `main`, both Render and Vercel redeploy automatically.
- Keep your `.env` files out of GitHub — the `.gitignore` in this project already excludes them; you set the real values directly in Render/Vercel's dashboard instead.
