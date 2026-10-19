/**
 * Génère des illustrations JPEG (paysages stylisés aux couleurs du Maroc) avec sharp,
 * déjà présent via Strapi. Aucune image n'est téléchargée : elles servent de visuels
 * provisoires à remplacer par de vraies photos depuis la médiathèque Strapi.
 */
const sharp = require('sharp');

const W = 1600;
const H = 1000;

/** Mélange deux couleurs hex (t entre 0 et 1). */
function mix(a, b, t) {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ch = (shift) => Math.round(((pa >> shift) & 255) * (1 - t) + ((pb >> shift) & 255) * t);
  return `#${((1 << 24) | (ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).slice(1)}`;
}

const sky = ([dark, mid, light], v) => `
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${mix(light, mid, 0.15 + v * 0.12)}"/>
      <stop offset="1" stop-color="${mix(light, '#ffffff', 0.35)}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <circle cx="${1150 - v * 260}" cy="${230 + v * 40}" r="${90 + v * 10}" fill="${mix(mid, '#fff6d8', 0.55)}" opacity="0.9"/>`;

const motifs = {
  desert: (p, v) => `${sky(p, v)}
    <path d="M0 ${620 - v * 20} Q 400 ${470 + v * 30} 800 ${600} T 1600 ${560 - v * 20} V1000 H0Z" fill="${mix(p[1], p[2], 0.3)}"/>
    <path d="M0 ${740} Q 350 ${600 - v * 20} 760 ${720} T 1600 ${690 + v * 15} V1000 H0Z" fill="${p[1]}"/>
    <path d="M0 ${860} Q 500 ${740 + v * 20} 1000 ${850} T 1600 ${820} V1000 H0Z" fill="${p[0]}"/>
    ${[0, 1, 2].map((i) => `<g transform="translate(${420 + i * 70 + v * 120} ${700 - i * 4})" fill="${mix(p[0], '#2b1a10', 0.6)}"><ellipse cx="0" cy="0" rx="26" ry="14"/><rect x="-18" y="8" width="5" height="28"/><rect x="14" y="8" width="5" height="28"/><path d="M20 -4 Q 34 -30 40 -34 L 46 -30 Q 40 -20 30 2Z"/></g>`).join('')}`,

  mountain: (p, v) => `${sky(p, v)}
    <path d="M0 640 L 260 ${360 + v * 20} L 520 600 L 820 ${300 - v * 15} L 1120 620 L 1380 ${400 + v * 10} L 1600 560 V1000 H0Z" fill="${mix(p[1], p[2], 0.35)}"/>
    <path d="M820 ${300 - v * 15} L 760 ${370 - v * 10} L 800 360 L 840 380 L 880 ${365 - v * 10}Z" fill="#ffffff" opacity="0.85"/>
    <path d="M0 760 L 300 ${520 + v * 20} L 600 740 L 960 ${500 + v * 15} L 1300 760 L 1600 ${600} V1000 H0Z" fill="${p[1]}"/>
    <path d="M0 900 Q 400 ${800 + v * 20} 800 880 T 1600 860 V1000 H0Z" fill="${p[0]}"/>
    ${[0, 1, 2, 3].map((i) => `<rect x="${980 + i * 46 + v * 30}" y="${830 - (i % 2) * 16}" width="40" height="${36 + (i % 2) * 16}" fill="${mix(p[0], '#d9b48a', 0.5)}"/>`).join('')}`,

  beach: (p, v) => `${sky(p, v)}
    <rect y="${560 + v * 10}" width="${W}" height="${H}" fill="${p[0]}"/>
    ${[0, 1, 2, 3].map((i) => `<path d="M0 ${610 + i * 55 + v * 10} q 100 -18 200 0 t 200 0 t 200 0 t 200 0 t 200 0 t 200 0 t 200 0 t 200 0" stroke="${mix(p[1], '#ffffff', 0.4)}" stroke-width="6" fill="none" opacity="${0.7 - i * 0.12}"/>`).join('')}
    <path d="M0 860 Q 600 ${790 - v * 20} 1600 830 V1000 H0Z" fill="${mix(p[2], '#e8c98a', 0.6)}"/>
    <g fill="${mix(p[0], '#0b2238', 0.5)}" transform="translate(${260 + v * 300} 520)"><rect x="0" y="-140" width="70" height="140"/><rect x="-8" y="-158" width="86" height="22"/><rect x="18" y="-110" width="16" height="30" fill="${p[2]}"/></g>`,

  imperial: (p, v) => `${sky(p, v)}
    <rect y="620" width="${W}" height="380" fill="${mix(p[2], p[1], 0.25)}"/>
    <g transform="translate(${1180 - v * 120} 0)" fill="${p[1]}">
      <rect x="0" y="240" width="110" height="420"/><rect x="-10" y="225" width="130" height="24"/>
      <rect x="30" y="170" width="50" height="60"/><circle cx="55" cy="155" r="12"/>
    </g>
    ${[0, 1, 2, 3, 4].map((i) => `
      <g transform="translate(${120 + i * 210} 470)">
        <path d="M0 230 V 80 A 85 95 0 0 1 170 80 V 230Z" fill="${mix(p[0], p[1], 0.15)}"/>
        <path d="M24 230 V 92 A 61 72 0 0 1 146 92 V 230Z" fill="${mix(p[2], '#ffffff', 0.25)}"/>
      </g>`).join('')}
    <rect y="700" width="${W}" height="20" fill="${p[0]}"/>`,

  culture: (p, v) => {
    const houses = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 9; col++) {
        const x = col * 190 - 40 + (row % 2) * 80 + v * 15;
        const y = 420 + row * 120 - Math.abs(col - 4) * 18;
        const w = 150 + ((col * 7 + row * 3) % 4) * 15;
        const h = 150;
        const shade = mix(p[(row + col) % 2 === 0 ? 1 : 2], '#ffffff', 0.1 + ((col + row + v) % 3) * 0.12);
        houses.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${shade}"/>
          <rect x="${x + w / 2 - 14}" y="${y + 70}" width="28" height="44" rx="14" fill="${p[0]}"/>
          <rect x="${x + 22}" y="${y + 30}" width="20" height="24" fill="${mix(p[0], '#000000', 0.2)}"/>`);
      }
    }
    return `${sky(p, v)}${houses.join('')}`;
  },
};

/** Retourne un Buffer JPEG pour une destination (variant 0 = couverture, 1-3 = galerie). */
async function renderPlaceholder({ palette, motif }, variant = 0) {
  const draw = motifs[motif] ?? motifs.culture;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${draw(palette, variant)}</svg>`;
  return sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
}

module.exports = { renderPlaceholder };
