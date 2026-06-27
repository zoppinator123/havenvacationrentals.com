# Self-hosted property photos

Drop optimized image files in **this folder** and the build will use them
automatically (no code change). If a file is missing, the site falls back to the
live WordPress URL. Self-hosted files load faster, never break on cross-origin
hotlink rules, and are best for Core Web Vitals.

## How to add them
- Easiest: on GitHub, open this folder → **Add file → Upload files**, drop the
  images in (named exactly as below), commit. Vercel redeploys automatically.
- Format: **WebP or JPEG**, sRGB. Compress before uploading.
- Any of these extensions work (first match wins): `.webp`, `.avif`, `.jpg`, `.jpeg`, `.png`.

## Filenames the site looks for

| Filename (any ext)         | What it is                                   | Where it shows                                  | Suggested size |
|----------------------------|----------------------------------------------|-------------------------------------------------|----------------|
| `cabin-fall-aframe`        | Fall A-frame cabin in autumn foliage         | Homepage hero                                   | 1600×2000 (4:5) |
| `cabin-aerial-dusk`        | Twilight aerial of the big multi-gable cabin | Hub hero, Pigeon Forge hero, home market card   | 1600×1200 (4:3) |
| `cabin-craftsman-sunset`   | Green craftsman cabin, wrap porch, sunset    | Gatlinburg hero + market cards                  | 1600×1200 (4:3) |
| `interior-great-room`      | Great room: blue sofa, stone fireplace       | Homepage "Haven difference" collage + galleries | 1600×1200 (4:3) |
| `interior-detail`          | Interior detail / second living shot         | Collage inset, galleries                        | 1200×1200 (1:1) |
| `interior-kitchen`         | Kitchen                                       | Galleries, "how it works"                       | 1600×1200 (4:3) |
| `deck-view`                | Deck / mountain view                          | Galleries, "how it works"                       | 1600×2000 (4:5) |
| `cabin-exterior-alt`       | Alternate exterior (Sevierville)              | Sevierville hero + market cards                 | 1600×1200 (4:3) |
| `cabin-exterior-dusk`      | Alternate dusk exterior                       | Spare                                           | 1600×2000 (4:5) |
| `contact-bg`               | Wide lifestyle/exterior for the contact band  | Homepage contact CTA background                 | 2000×1200 (5:3) |
| `smokies-stock`            | Scenic Smoky Mountains                        | Spare                                           | 1600×1000 |

Example: add `cabin-fall-aframe.webp` here and the homepage hero uses it on the
next deploy.
