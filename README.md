# GDFA — Moments of Our Community

A photo gallery celebrating the people and shared moments of GDFA, a freelancing community from Dinajpur. The site brings event photos together in a responsive, dark themed gallery with an immersive hero image.

> **Built for the moments that bring a community together.**

## Explore

- **GDFA V1 Program** — photos from the program
- **Iftar Event** — community Iftar gathering
- **Tea & Coffee Meetups** — adda, tea, and coffee moments

Browse by album using the navigation pills. Select any photo to open it in the full-screen viewer; use the arrow keys to move between photos and `Esc` to close it.

## A closer look

- Responsive layouts for desktop and mobile
- An animated hero frame featuring the GDFA team
- Varied photo cards, hover effects, and album navigation
- Lazy-loaded gallery photos
- Keyboard-accessible photo viewer
- Reduced-motion support

## Run locally

This is a static site; it has no build step or package installation. From the project folder, start a local server:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Project files

```text
.
├── index.html
├── style.css
├── script.js
└── images/
    ├── teams.webp
    ├── event-photos/webp/
    ├── ifter-photos/webp/
    └── coffie-adda-photos/webp/
```

`index.html` contains the page structure, `style.css` defines the visual design, and `script.js` configures albums and gallery interactions. Original photos are kept alongside the WebP gallery copies.

## Add or update photos

Edit the `albums` list in `script.js`. Each album has an `id`, a display `name`, a color `hue`, and a `photos` array of paths relative to the project root:

```js
{
  id: "example",
  name: "Example Album",
  hue: 38,
  photos: ["images/example-photos/webp/photo.webp"]
}
```

Keep each photo path in sync with a file in `images/`. The gallery displays up to 15 photos per album.

## Credits

Created for the GDFA community. Built and maintained by [Bisnu Kundu](https://bisnukundu.netlify.app).
