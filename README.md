# Purely Payton Cleaning Co. — website

One-page marketing site for Purely Payton Cleaning Co. (house cleaning in Ardmore, OK).
Plain HTML, CSS and a little vanilla JS: no framework and no build step.

```
index.html      page markup
styles.css      all styles (design tokens at the top)
script.js       reviews, mobile menu, quote form
assets/         photos, favicon, work photos, reference flyer
vercel.json     static hosting config for Vercel
```

## Preview locally

Open `index.html` in a browser, or serve the folder (recommended, so the form's `fetch` works):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Set up the quote form (Formspree)

1. Create a free account at https://formspree.io using **purelypaytoncleans@gmail.com**.
2. Create a new form. Formspree gives you an ID like `xyzabcd`.
3. In `index.html`, replace `FORM_ID` in `action="https://formspree.io/f/FORM_ID"` with that ID.
4. Submit a test request from the live site and confirm the email arrives.

Until this is done, submitting the form shows a friendly "please call or text" message.

## Add "Our Work" photos

Save up to six photos as `assets/work/work-1.jpg` … `assets/work/work-6.jpg`
(square-ish, about 800px wide, compressed). Each tile shows "Photo coming soon" until its file exists.
Update the `alt` text in `index.html` to describe each photo.

## Add reviews

Edit the `REVIEWS` array at the top of `script.js`:

```js
var REVIEWS = [
  { text: "They did an amazing job on our move-out clean!", name: "Jane D." },
  ...
];
```

Only use real reviews (for example, copied from the Facebook page with permission).

## Other TODOs

- Facebook page URL: search `facebook.com/` in `index.html` (two links) and replace with the real page URL.

## Deploy

### GitHub Pages
Repo → Settings → Pages → "Deploy from a branch" → pick the branch and `/ (root)`. The site goes live at
`https://<user>.github.io/purelypayton/`.

### Vercel
```bash
npx vercel login
npx vercel --prod     # project name: purely-payton-cleaning, directory ./, no build settings
```
Run `npx vercel --prod` again after any change. Or import the GitHub repo in the Vercel dashboard so every push deploys automatically.
