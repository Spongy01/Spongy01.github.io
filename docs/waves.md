# Wave panel

The animated rectangle under the "Currently" note on the home page (right rail).

## Where it lives

| What | File |
|---|---|
| Markup (`<div class="waves"><canvas></canvas></div>`) | `src/pages/index.astro`, inside `.rail--note`, loads `waves.js` at the bottom |
| Renderer and the **live settings** (`var config`) | `public/waves.js` |
| Static box styling (fallback size and radius before JS runs) | `.waves` in `public/styles.css` |
| Live-tuning editors (not shipped) | `tools/waves-editor.js` (waves), `tools/waves-text-editor.js` (caption) |

The caption at the top of the box is a plain `<p class="waves__text">` in `index.astro`, styled by `.waves__text` in `styles.css` (see "Caption" below).

## How it draws

Each wave is a filled curve: `y = base% * height + amp * f((x - dir * speed * t) * 2π / len + phase)`,
where `f` is `sin` or `cos`, filled down to the bottom of the box. Waves are painted from the
last item in `waves` to the first, so **index 0 is the front-most wave**. Animation pauses when
the box is off-screen, and reduced-motion users get a still frame.

## Settings reference

Top level: `bgLight`, `bgDark` (box background per theme), `height` (px), `radius` (px).

Per wave:

| Field | Meaning |
|---|---|
| `color` | fill colour (hex), same in both themes |
| `opacity` | 0 to 1 |
| `fn` | `sin` or `cos` |
| `dir` | `1` moves left to right, `-1` right to left |
| `speed` | px per second |
| `amp` | magnitude: wave height in px |
| `len` | wavelength in px |
| `base` | vertical position, % from the top of the box |
| `phase` | horizontal offset in radians (0 to 6.28) |

## Current settings (chosen 2026-11-11)

```json
{
  "bgLight": "#f8ecd3",
  "bgDark": "#232830",
  "height": 360,
  "radius": 24,
  "waves": [
    { "color": "#c2a366", "opacity": 0.6, "fn": "sin", "dir": -1, "speed": 40,  "amp": 13, "len": 175, "base": 59, "phase": 0 },
    { "color": "#776746", "opacity": 0.6, "fn": "sin", "dir": 1,  "speed": 129, "amp": 14, "len": 225, "base": 74, "phase": 0 },
    { "color": "#8a7a5a", "opacity": 1,   "fn": "sin", "dir": 1,  "speed": 71,  "amp": 9,  "len": 260, "base": 87, "phase": 6.25 },
    { "color": "#ddc28d", "opacity": 0.6, "fn": "sin", "dir": 1,  "speed": 40,  "amp": 9,  "len": 120, "base": 48, "phase": 0 },
    { "color": "#f5e0b3", "opacity": 1,   "fn": "sin", "dir": -1, "speed": 40,  "amp": 10, "len": 150, "base": 39, "phase": 0 }
  ]
}
```

This is the same object as `var config` in `public/waves.js`. To change the look by hand,
edit that object. If you also change `height` or `radius`, update `.waves` in `styles.css` to
match so there is no jump before the script runs.

## Re-tuning with the editor

`tools/waves-editor.js` is a floating panel with colour pickers, hex boxes, per-wave sliders,
direction and sin/cos toggles, add/duplicate/delete, drag-to-reorder, and a "Copy settings" button.
It is kept out of `public/` so it never ships.

1. Copy it in: `cp tools/waves-editor.js public/waves-editor.js`
2. Add after the `waves.js` script in `src/pages/index.astro`:
   `<script is:inline src="waves-editor.js"></script>`
3. Run `npm run dev`, tune, click **Copy settings**, and paste the JSON into `var config`
   in `public/waves.js` (and into the block above).
4. Remove the script tag and delete `public/waves-editor.js`. The editor stores its edits in
   the browser's localStorage (`wavesConfig`); clear that key or use **Reset** if old edits
   seem to override new defaults.

## Caption

Text: `Something coming here soon!` (the `<p class="waves__text">` in `src/pages/index.astro`).

Chosen settings (2026-11-11), exactly as exported by the caption editor:

```json
{
  "text": "Something coming here soon!",
  "font": "Caveat (handwritten)",
  "size": 30,
  "weight": 600,
  "italic": false,
  "tcase": "none",
  "tracking": 0,
  "align": "center",
  "colorMode": "auto",
  "color": "#3a3226",
  "opacity": 0.65,
  "top": 30,
  "pad": 24,
  "lh": 0.9,
  "anim": "none"
}
```

How the fields map to `.waves__text` in `public/styles.css`:

| Setting | CSS |
|---|---|
| `font` | `font-family: "Caveat", cursive` (Caveat 600 is loaded in the font link in `src/layouts/Base.astro`) |
| `size`, `weight`, `lh` | `font-size: 30px; font-weight: 600; line-height: 0.9` |
| `italic`, `tcase`, `tracking` | defaults, so no rule (`italic` false, no `text-transform`, no `letter-spacing`) |
| `align` | `text-align: center` |
| `colorMode: auto` | `color: var(--text)`, so it follows the theme. A `custom` colour would be a fixed hex in both themes |
| `opacity` | `opacity: 0.65` |
| `top`, `pad` | `top: 30px; left: 1.5rem; right: 1.5rem` (24px = 1.5rem) |
| `anim` | `none`. Other effects (fade-up, letters, pulse, float, shimmer) exist only in the editor and would need CSS keyframes added by hand |

To re-tune: use `tools/waves-text-editor.js` the same way as the wave editor (copy it to `public/`, add
`<script is:inline src="waves-text-editor.js"></script>` after `waves.js` in `src/pages/index.astro`, tune, click
**Copy settings**, update the CSS above and the table, then remove the script tag and the copy in `public/`). Its
**Reset** button returns to the settings above. It loads extra Google Fonts only while it is active, so if you
pick a different font, add that font to the link in `Base.astro`. Edits are kept in localStorage (`wavesTextCfg`).

## Not done yet

- Wave colours are shared by both themes. Per-theme wave colours would need a second colour
  field per wave.
