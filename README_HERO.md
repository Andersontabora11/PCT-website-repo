Hero image instructions

Place a single optimized hero image at one of these paths (the site will use the existing image if `hero.jpg` isn't present):

- Preferred: Web Images/hero.jpg
- Fallback (already in the repo): Web Images/pct-home-image.jpg

Recommended sizes and formats
- Desktop (landscape): 2000–2500px wide, height cropped as needed (e.g. 1400px tall). Use JPEG or WebP.
- Mobile: 800–1200px wide, height cropped to focus on the subject.
- Provide a WebP version if possible: `Web Images/hero.webp`.

Example ImageMagick commands (macOS / Linux)

1) Resize and optimize a large source image to a desktop hero JPG (2000px wide):

```bash
magick input.jpg -resize 2000x -strip -interlace Plane -quality 85 "Web Images/hero.jpg"
```

2) Create a smaller mobile-optimized JPG (1000px wide):

```bash
magick input.jpg -resize 1000x -strip -interlace Plane -quality 80 "Web Images/hero-mobile.jpg"
```

3) Create a WebP alternative (smaller file size):

```bash
magick input.jpg -resize 2000x -strip -quality 80 "Web Images/hero.webp"
```

How to use
- Drop `hero.jpg` into the `Web Images/` folder.
- The site already references `Web Images/hero.jpg` in `main.css` for the `.title-section`.
- If you want device-specific images, replace the `.title-section` rules or add a media query to swap `background-image` to `hero-mobile.jpg` for small screens.

Note: the site currently uses `Web Images/pct-home-image.jpg` by default so you'll see a hero immediately. If you prefer to use a custom `hero.jpg`, add it to `Web Images/hero.jpg` and it will be used by the preview helper and (if present) referenced CSS.

Previewing and adjusting the crop
- There's a helper file `hero-preview.html` in the repo root. Open it in your browser (double-click or drag to the browser) to see three side-by-side previews: Desktop, Tablet, Mobile. The preview reads `Web Images/hero.jpg` so make sure the file exists before opening.
- The preview includes a dashed "safe area" rectangle. Adjust the "Focal point (background-position)" input (for example: `center top`, `center center`, `30% 45%`) and click Apply until the faces/important subjects fall inside the dashed box on all three views.

Changing the focal point in production CSS
- In `main.css` you'll find a CSS variable `--hero-position` (at the top in `:root`). Change its value to shift the crop site-wide. Example values:
  - `center center` (default)
  - `center top` (shift crop upward)
  - `40% 35%` (use numeric offsets if you need precise control)

Example: to keep faces higher in the frame you might set:

  :root { --hero-position: center 35%; }

This will keep the important area toward the upper center of the image across devices.

Notes
- `background-size: cover` is used so the image will fill the viewport while preserving aspect ratio; crop the image so the focal point remains visible at various aspect ratios.
- If you prefer automatic responsive loading, consider switching to an inline `<picture>`/`<img>` approach in `index.html` so the browser selects the best format/size.
