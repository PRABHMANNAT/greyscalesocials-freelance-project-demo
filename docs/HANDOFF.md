# Greyscale Socials — a different perspective

A portfolio concept for a local client demonstration, built with Next.js App Router, TypeScript, locally hosted licensed fonts, and custom CSS motion. Three routes: `/`, `/about`, `/work`. No backend or external services are required at runtime. The source is archived on GitHub at the repository owner's request. See the [visual project overview](../README.md).

## Run locally

Requires Node.js 20.9+.

```powershell
npm install
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000). The server binds only to the local machine.

For a clean recording without development overhead:

```powershell
npm run build
npm run start
```

Stop the development server before starting the production server on the same port.

```powershell
npm run lint
npm run typecheck
```

## What is real, and what is proposed

Research source: [the exact supplied Instagram profile](https://www.instagram.com/greyscalesocials.in/), inspected publicly on 18 October 2026.

- Profile display name: **Greyscale Studios | Socials**.
- Bio: “We Create Something Extraordinary!”
- Listed services: **Brand Collaterals | Digital Marketing | Consultation**.
- Listed regions: **Punjab • Chandigarh • Delhi**.
- Observed identity: ivory serif `g` on an indigo circular profile image.
- Public feed: food, hospitality and retail reels. The six portfolio groups use names shown in this feed: Kesar Da Dhaba, Countryside Factory Outlets, Galini Café, Lovely Sweets Amritsar, Golden Sarovar Portico and Spicy Hut.
- Twelve authentic public reel covers and the small profile mark were saved using the browser's normal media download. The post viewer prompted for login; no private content, video streams, APIs or restrictions were bypassed.

The display headlines, short art-direction labels, service descriptions, philosophy and process copy are proposed website copy. They are not verified client slogans or claims about an established internal process. The About philosophy is explicitly labelled as proposed. No client results, awards, founders, dates of establishment or testimonials are invented. The categories organise the observed subjects; they do not claim the exact scope of a commission.

The presentation is a gallery of authentic covers, not a fabricated case study. Every cover links to its original Instagram reel. Instagram may ask the viewer to log in. No production website has been deployed. Search indexing is disabled in metadata. Sharing the repository does not grant rights to third-party media.

## Original media needed before recording the final client demo

Please supply the following in this repository:

| Needed | Folder and suggested name |
| --- | --- |
| SVG logo, or transparent PNG | `public/assets/brand/logo.svg` or `logo.png` |
| 8–12 high-resolution visuals | `public/assets/projects/project-01.jpg` through `project-12.jpg` |
| 3–5 MP4 reels (H.264, ideally 1080 × 1920) | `public/assets/reels/reel-01.mp4` through `reel-05.mp4` |
| Reel posters | `public/assets/thumbnails/reel-01.jpg` through `reel-05.jpg` |
| Optional team/studio photographs | `public/assets/about/studio-01.jpg`, `team-01.jpg` |
| Optional approved hero image | `public/assets/hero/hero-01.jpg` |
| Names, descriptions, original URLs, approved service copy and permission notes | `public/assets/project-notes.txt` |

Use assets the studio has approved for this private demonstration. Preserve original colour and framing. The present 360/361 × 640 covers are genuine but cannot replace full-resolution photography for close-up recording. The 150px profile mark is appropriate only for its small navigation placement. Team photos, original videos, brand guidelines, project scope, email and phone are unavailable.

All records are in `public/assets/asset-manifest.json`. Update `src/lib/projects.ts` to integrate supplied media. Every media item has `src`, `alt`, `width`, `height`, `source`, `date` and an optional `video` property. Set `video: "/assets/reels/reel-01.mp4"` on a media item to show the native video player in its overlay. Video is muted by default, uses the cover as its poster, and auto-plays in the presentation unless reduced motion is preferred. The page uses no fake play buttons or nonexistent video sources.

## Design and interaction

Ivory, charcoal and the profile mark's indigo. Manrope paired with Instrument Serif, both distributed under SIL OFL and served locally. No remote font calls. No stock or generated portfolio imagery.

- An interactive contact sheet with individually selectable frames and restrained pointer movement.
- A floating rounded navigation capsule that contracts on scroll, with route indication, page progress and a back-to-top control.
- A locally rendered 11-second concept motion film on Home and Work, with muted autoplay, visibility-based pausing, pause/resume and an expanded native player.
- A keyboard-accessible portfolio-world selector, a new collaboration chapter, and a creative brief invitation.
- Gallery and Index portfolio layouts, plus image thumbnails inside multi-image presentations.
- Asymmetrical gallery compositions with original portrait imagery.
- Category filters derived from the six available brand groups.
- Native modal project presentations with image paging, keyboard arrows, next story, Escape dismissal, focus restoration and original reel links.
- Service accordions, working route navigation and an accessible mobile menu.
- Sequenced title entrance, restrained image reveals and route entrance transitions.
- Reduced-motion support; no scroll interception, custom cursor or audio autoplay.

## 55-second recording sequence

1. **0–8s:** Reload Home at 1440 × 900. Let the title reveal settle; scroll into the autoplay film.
2. **8–15s:** Expand the film, let its cover composition crossfade, then close.
3. **15–26s:** Scroll through the selected work and indigo studio statement. Briefly select another portfolio world.
4. **26–40s:** Navigate to Work using the floating navbar. Switch to Index, select Retail, open Countryside and select another image thumbnail.
5. **40–49s:** Navigate to About. Scroll through its editorial imagery and collaboration chapter.
6. **49–55s:** Finish on the footer's **Let’s make something matter** composition.

For the final recording, replace the preview covers with original media first. Do not rely on the external Instagram site opening inside the recording.

## Project map

`src/app/` holds the routes and global art direction. `src/components/` holds navigation, gallery, overlay, contact sheet, capabilities, footer and the reveal observer. `src/lib/projects.ts` is the editable portfolio data. `public/assets/` contains local media and provenance.

## Verification and screenshots

Lint, explicit TypeScript checks, and the production build passed. All three production routes returned HTTP 200. Browser checks covered category filtering, gallery paging, next story, Escape dismissal, focus restoration, mobile menu keyboard navigation, service accordions and source links. The final production browser session had no console errors or warnings.

All three routes were checked at 320, 390, 768, 1280, 1440 and 1920px widths, with no horizontal page overflow observed. Curated desktop and mobile screenshots are included in [docs/screenshots](screenshots/). Additional local captures in `.qa/` are excluded from Git. The final polish pass improved mobile close-control placement, touch targets, tablet typography, small-screen artwork labels and Next.js route scrolling.

Reduced-motion styles are implemented; OS-level reduced-motion emulation was not available in the browser tools. The local concept MP4 has been verified playing muted in the browser. Original studio reel footage remains unavailable.

## The local concept film

`public/assets/reels/studio-cover-edit.mp4` is an original motion composition of nine authentic public Instagram cover images. It is explicitly labelled as a concept edit in the interface. It does not contain original reel footage, simulated events, invented campaign metrics or unrelated imagery. The file is 1280 × 720, 30fps, H.264, silent, approximately 1.35 MB and 11 seconds long. It auto-plays only while visible, pauses behind modal presentations and when the tab is hidden, and does not auto-play when reduced motion is preferred.

The source list is in `public/assets/reels/studio-cover-edit-provenance.json`. Rebuild it with `node scripts/build-motion-edit.mjs` if FFmpeg is installed. The website requires no FFmpeg at runtime. Replace the concept film and poster with an approved original studio showreel for the strongest final recording.
