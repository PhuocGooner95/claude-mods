import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Trung Địa: giấy da bản đồ cũ ban ngày, đá đêm dưới ánh lửa ban tối.
// Tranh nền tự vẽ: hoàng hôn trên dãy núi, một đỉnh núi lửa xa, sao và tàn lửa.
const { theme, problems } = makeColors({
  label: 'Trung Địa',
  roles: { accent: '#b08a2e', danger: '#a8382c', success: '#4f7d3a', warning: '#c2622a', pro: '#5d6fa3' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#e8dcc0',
        'surface-1': '#efe5cc',
        'surface-2': '#f6eedb',
        'text-primary': '#2b2116',
        'text-secondary': '#4f402c',
        'text-muted': '#66553d',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#17150f',
        'surface-1': '#1e1b14',
        'surface-2': '#252119',
        'surface-3': '#2b271e',
        'text-primary': '#ece2c6',
        'text-secondary': '#cbbf9f',
        'text-muted': '#a89c7d',
      },
    },
  },
})

const SCENE_NAME = 'trung-dia-hoang-hon'

// Số giả ngẫu nhiên cố định, để tranh lần nào cũng giống nhau.
const rand = (i: number): number => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453

  return x - Math.floor(x)
}

// Một dãy núi lởm chởm chạy ngang khung.
const ridge = (seed: number, base: number, height: number, step: number): string => {
  let d = `M0 1000 L0 ${base}`

  for (let x = 0, i = 0; x <= 1600; x += step, i += 1) {
    const peak = base - height * (0.35 + 0.65 * rand(seed + i))

    d += ` L${x + step / 2} ${Math.round(peak)} L${x + step} ${Math.round(base - height * 0.2 * rand(seed + i + 50))}`
  }

  return `${d} L1600 1000 Z`
}

const stars = Array.from({ length: 46 }, (_, i) => {
  const x = Math.round(rand(i) * 1600)
  const y = Math.round(rand(i + 100) * 380)
  const r = (0.8 + rand(i + 200) * 1.4).toFixed(1)

  return `<circle class="s" style="animation-delay:-${(rand(i + 300) * 6).toFixed(1)}s" cx="${x}" cy="${y}" r="${r}"/>`
}).join('')

const embers = Array.from({ length: 14 }, (_, i) => {
  const x = Math.round(1180 + rand(i + 400) * 220)
  const dur = (9 + rand(i + 500) * 9).toFixed(1)

  return `<circle class="e" style="animation-duration:${dur}s;animation-delay:-${(rand(i + 600) * 14).toFixed(1)}s" cx="${x}" cy="470" r="${(1.2 + rand(i + 700) * 1.6).toFixed(1)}"/>`
}).join('')

// Một bóng người khoác áo choàng đứng trên mỏm đá; `extra` là mũ, gậy, cung, rìu…
const figure = (x: number, g: number, h: number, w: number, extra = ''): string => {
  const head = g - h * 0.86

  return `<g class="f" style="animation-delay:-${(rand(x) * 4).toFixed(1)}s"><path d="M${x - w} ${g} L${x - w * 0.35} ${g - h * 0.74} L${x + w * 0.35} ${g - h * 0.74} L${x + w} ${g} Z"/><circle cx="${x}" cy="${head}" r="${h * 0.11}"/>${extra}</g>`
}

const G = 764

const travellers = [
  // Pháp sư: mũ chóp nhọn, gậy dài.
  figure(120, G, 92, 17, `<path d="M98 ${G - 84} L120 ${G - 132} L142 ${G - 84} Z"/><path d="M146 ${G} L150 ${G - 112}" stroke="#1b1416" stroke-width="3" fill="none"/><circle cx="150" cy="${G - 114}" r="4" fill="#ffe2a0"/>`),
  // Kiếm khách cao.
  figure(186, G, 84, 14, `<path d="M200 ${G - 30} L226 ${G - 70}" stroke="#1b1416" stroke-width="2.5" fill="none"/>`),
  // Cung thủ.
  figure(242, G, 82, 12, `<path d="M258 ${G - 86} Q282 ${G - 50} 258 ${G - 14}" stroke="#1b1416" stroke-width="2.5" fill="none"/>`),
  // Người lùn mang rìu.
  figure(298, G, 56, 17, `<path d="M318 ${G} L318 ${G - 66}" stroke="#1b1416" stroke-width="3" fill="none"/><path d="M306 ${G - 70} L330 ${G - 70} L324 ${G - 54} L312 ${G - 54} Z"/>`),
  // Bốn người tí hon.
  figure(352, G, 46, 11),
  figure(388, G, 44, 11),
  figure(424, G, 47, 11),
  figure(460, G, 43, 11),
].join('')

const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
<style>
.s{fill:#f3e7c4;animation:tw 6s ease-in-out infinite alternate}
.e{fill:#ffb347;animation:rise linear infinite}
.glow{animation:pulse 7s ease-in-out infinite alternate;transform-origin:1290px 470px}
.smoke{animation:drift 60s linear infinite}
.mist{animation:drift 90s linear infinite reverse}
.f{fill:#1b1416;transform-box:fill-box;transform-origin:50% 100%;animation:sway 4s ease-in-out infinite alternate}
.eye{transform-box:fill-box;transform-origin:center;animation:flick 2.6s ease-in-out infinite alternate}
.halo{transform-box:fill-box;transform-origin:center;animation:pulse 5s ease-in-out infinite alternate}
.pupil{animation:look 11s ease-in-out infinite}
.wing{transform-box:fill-box;transform-origin:center;animation:flap 1.6s ease-in-out infinite alternate}
.beast{animation:glide 70s linear infinite}
@keyframes sway{from{transform:rotate(-1.2deg)}to{transform:rotate(1.2deg)}}
@keyframes flick{from{transform:scale(.96,.9)}to{transform:scale(1.04,1.08)}}
@keyframes look{0%,100%{transform:translateX(0)}20%{transform:translateX(-16px)}45%{transform:translateX(14px)}70%{transform:translateX(-6px)}}
@keyframes flap{from{transform:scaleY(1)}to{transform:scaleY(.35)}}
@keyframes glide{from{transform:translateX(0)}to{transform:translateX(1900px)}}
@keyframes tw{from{opacity:.15}to{opacity:.95}}
@keyframes rise{0%{transform:translate(0,0);opacity:0}15%{opacity:.9}100%{transform:translate(-60px,-330px);opacity:0}}
@keyframes pulse{from{opacity:.55;transform:scale(.92)}to{opacity:1;transform:scale(1.08)}}
@keyframes drift{from{transform:translateX(0)}to{transform:translateX(-1600px)}}
@media (prefers-reduced-motion:reduce){.s,.e,.glow,.smoke,.mist,.f,.eye,.halo,.pupil,.wing,.beast{animation:none}}
</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#1a2038"/>
<stop offset=".32" stop-color="#43364f"/>
<stop offset=".52" stop-color="#a65a3a"/>
<stop offset=".64" stop-color="#e0a04e"/>
<stop offset="1" stop-color="#2a2118"/>
</linearGradient>
<radialGradient id="fire">
<stop offset="0" stop-color="#ffd27a" stop-opacity=".95"/>
<stop offset=".35" stop-color="#e8622a" stop-opacity=".55"/>
<stop offset="1" stop-color="#e8622a" stop-opacity="0"/>
</radialGradient>
<linearGradient id="fog" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#e9c48a" stop-opacity="0"/>
<stop offset=".5" stop-color="#e9c48a" stop-opacity=".22"/>
<stop offset="1" stop-color="#e9c48a" stop-opacity="0"/>
</linearGradient>
</defs>
<rect width="1600" height="1000" fill="url(#sky)"/>
${stars}
<path d="${ridge(1, 640, 190, 130)}" fill="#5a4257" fill-opacity=".75"/>
<g transform="translate(-730 0)">
<circle class="glow" cx="1290" cy="470" r="170" fill="url(#fire)"/>
<path d="M1040 700 L1210 500 L1262 470 L1318 470 L1372 505 L1560 700 Z" fill="#33222b"/>
<path d="M1262 470 L1290 482 L1318 470 Z" fill="#ffb347"/>
${embers}
</g>
<g class="smoke" fill="#2a1f2a" fill-opacity=".35">
<ellipse cx="1330" cy="330" rx="210" ry="38"/><ellipse cx="1560" cy="290" rx="260" ry="30"/>
<ellipse cx="2930" cy="330" rx="210" ry="38"/><ellipse cx="3160" cy="290" rx="260" ry="30"/>
</g>
<g class="beast"><g transform="translate(620 170)" fill="#1b1416" fill-opacity=".8">
<path class="wing" d="M0 0 Q-34 -30 -78 -12 Q-44 -8 -30 8 Z"/><path class="wing" d="M0 0 Q34 -30 78 -12 Q44 -8 30 8 Z"/>
<path d="M-6 -2 Q0 -14 10 -4 L30 2 L8 6 L-26 16 Z"/>
</g></g>
<g transform="translate(1010 0)">
<path d="M196 700 L214 520 L232 372 L224 330 L244 352 L260 300 L276 352 L296 330 L288 372 L306 520 L324 700 Z" fill="#1d1519"/>
<path d="M238 520 L260 470 L282 520 Z M246 430 L260 400 L274 430 Z" fill="#2c1e22"/>
<circle class="halo" cx="260" cy="232" r="118" fill="url(#fire)"/>
<g class="eye">
<path d="M186 232 Q260 176 334 232 Q260 288 186 232 Z" fill="#ffb22e"/>
<ellipse cx="260" cy="232" rx="44" ry="30" fill="#e8521a"/>
<ellipse cx="260" cy="232" rx="24" ry="27" fill="#ffd27a" fill-opacity=".55"/>
</g>
<ellipse class="pupil" cx="260" cy="232" rx="6" ry="29" fill="#140a08"/>
</g>
<path d="${ridge(40, 730, 150, 170)}" fill="#3a2a35"/>
<g class="mist"><rect x="0" y="660" width="3200" height="150" fill="url(#fog)"/></g>
<path d="${ridge(90, 850, 120, 230)}" fill="#241b1c"/>
<g transform="translate(1600 0) scale(-1 1)">
<path d="M0 ${G + 2} L70 ${G} L500 ${G} L560 ${G + 14} L640 ${G + 70} L700 1000 L0 1000 Z" fill="#1b1416"/>
${travellers}
</g>
<path d="M0 1000 L0 900 Q300 850 620 905 T1200 890 T1600 915 L1600 1000 Z" fill="#17120f"/>
</svg>`

const LOOK: ThemeSetArgs = {
  colors: theme,
  backdrop: { scene: SCENE_NAME, glass: { blur: 18, opacity: 0.74 } },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.props.scene !== SCENE_NAME || (e.surface !== 'desktop' && e.surface !== 'mobile')) {
      return next(e)
    }

    const { Svg } = $.ui.resolve(e)

    return <Svg source={SCENE} alt="Hoàng hôn trên dãy núi, đỉnh núi lửa xa rực sáng" isInteractive />
  })
}
