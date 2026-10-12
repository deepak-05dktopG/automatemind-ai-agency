import { useLayoutEffect, useRef } from 'react'
import agencyLogo from '../../assets/agency_logo.png'

const markup = `
  <div class="services-motion-graphic">
    <div class="stage-viewport">
      <div class="stage" id="st">
        <div class="panel a" style="--d:0"></div>
        <div class="logo a" style="--d:.4">
          <img src="${agencyLogo}" alt="AutomateMind"/>
        </div>
        <div class="rail pls a" style="--d:.8"></div>
        <div id="deco"></div>
        <div class="cards" id="cards"></div>
        <svg class="trail" viewBox="0 0 100 56.25">
          <path class="tr" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100" d="M18 35 Q34 19 50 35 T82 35" fill="none" stroke="#d4a95a" stroke-width=".35" stroke-linecap="round" style="filter:drop-shadow(0 0 .6px #d4a95a)"/>
        </svg>
        <div class="orb oA" style="--d:14.2s"></div>
        <div class="orb oB" style="--d:15.2s"></div>
        <div class="orb oA" style="--d:16.2s"></div>
        <div class="ring"></div>
      </div>
    </div>
  </div>
`

const styles = `
  .services-motion-graphic-host {
    width: 100%;
    min-width: 0;
  }

  .services-motion-graphic {
    --gold: #d4a95a;
    width: min(100%, 760px);
    max-width: 100%;
    margin: 0 auto;
    color: #e8e4da;
    font-family: Manrope, system-ui, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  .services-motion-graphic .stage {
    container-type: inline-size;
    position: relative;
    width: min(100%, calc((100vh - 90px) * 16 / 9));
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: 2cqw;
    background: #0d131c;
    box-shadow: 0 0 0 1px #ffffff12, 0 20px 60px #000a;
  }

  .services-motion-graphic.is-offscreen * {
    animation-play-state: paused !important;
  }

  .services-motion-graphic .stage-viewport {
    width: 100%;
    min-width: 0;
  }

  .services-motion-graphic .panel {
    position: absolute;
    inset: 1.5cqw;
    border-radius: 2cqw;
    border: 1px solid #ffffff14;
    background: radial-gradient(circle at 76% 6%, #d4a95a40 0, #d4a95a00 14%), linear-gradient(#ffffff08 1px, transparent 1px) 0 0 / 2.4cqw 2.4cqw, linear-gradient(90deg, #ffffff08 1px, transparent 1px) 0 0 / 2.4cqw 2.4cqw, linear-gradient(160deg, #1c232d, #141a23);
  }

  .services-motion-graphic .logo {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 3.4cqw;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20cqw;
  }

  .services-motion-graphic .logo img {
    width: 19cqw;
    height: 11.4cqw;
    object-fit: cover;
    object-position: center 46%;
  }

  .services-motion-graphic .rail {
    position: absolute;
    left: 17.9cqw;
    width: 64.2cqw;
    top: 12.1cqw;
    height: 1px;
    background: linear-gradient(90deg, transparent, #d4a95a99, transparent);
  }

  .services-motion-graphic .node {
    position: absolute;
    top: 11.7cqw;
    width: .9cqw;
    height: .9cqw;
    margin-left: -.45cqw;
    border-radius: 50%;
    background: #10161e;
    border: .15cqw solid var(--gold);
  }

  .services-motion-graphic .stem {
    position: absolute;
    top: 12.5cqw;
    width: 1px;
    height: 3.4cqw;
    background: #d4a95a77;
  }

  .services-motion-graphic .cards {
    position: absolute;
    left: 2.5cqw;
    right: 2.5cqw;
    top: 15.9cqw;
    bottom: 2.4cqw;
    display: flex;
    gap: 1.2cqw;
  }

  .services-motion-graphic .card {
    flex: 1;
    display: flex;
    flex-direction: column;
    border-radius: 1.2cqw;
    background: linear-gradient(#202833, #18202a);
    border: 1px solid #ffffff12;
    padding: 1.1cqw 1.3cqw .9cqw;
  }

  .services-motion-graphic .hd {
    font-weight: 700;
    font-size: 1.05cqw;
    letter-spacing: .08em;
    color: #efe9da;
  }

  .services-motion-graphic .hd s {
    text-decoration: none;
    color: var(--gold);
    font-size: .8cqw;
    margin-right: .6cqw;
  }

  .services-motion-graphic .ul {
    height: .18cqw;
    background: #ffffff15;
    margin: .7cqw 0 .3cqw;
    position: relative;
    overflow: hidden;
  }

  .services-motion-graphic .ul:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 35%;
    background: var(--gold);
    transform-origin: left;
  }

  .services-motion-graphic .zone {
    position: relative;
    flex: 1;
  }

  .services-motion-graphic .mw {
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 10.5cqw;
    margin-left: -5.25cqw;
    z-index: 3;
  }

  .services-motion-graphic .mw svg {
    width: 100%;
    display: block;
    overflow: visible;
  }

  .services-motion-graphic .pills {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .6cqw;
    padding-bottom: .2cqw;
  }

  .services-motion-graphic .pill {
    font-weight: 700;
    font-size: 1.05cqw;
    color: #efe9da;
    background: #ffffff10;
    border-radius: .6cqw;
    padding: .6cqw 1.3cqw;
    border-left: .22cqw solid var(--gold);
    min-width: 11cqw;
    text-align: center;
  }

  .services-motion-graphic .p {
    position: absolute;
  }

  .services-motion-graphic .bub {
    width: 8cqw;
    height: 3.6cqw;
  }

  .services-motion-graphic .bub i,
  .services-motion-graphic .bub u {
    position: absolute;
    inset: 0;
    border-radius: 1.2cqw;
    display: flex;
    align-items: center;
    gap: .7cqw;
    padding: 0 1cqw;
    text-decoration: none;
  }

  .services-motion-graphic .bub u {
    background: linear-gradient(#d4a95a33, #d4a95a1a);
    border: 1px solid #d4a95acc;
  }

  .services-motion-graphic .bub em {
    width: 1.8cqw;
    height: 1.8cqw;
    border-radius: 50%;
    flex: none;
    font: 700 1.1cqw/1.8cqw Manrope;
    font-style: normal;
    text-align: center;
    background: radial-gradient(circle at 35% 30%, #aef0ff, #2b6fe0);
  }

  .services-motion-graphic .bub u em {
    background: radial-gradient(circle at 35% 30%, #f4d58c, #b98a38);
    color: #1a1405;
  }

  .services-motion-graphic .bub span {
    flex: 1;
    height: .5cqw;
    border-radius: 9px;
    background: #aef0ffaa;
    box-shadow: 0 .9cqw 0 -.05cqw #aef0ff55;
    margin-bottom: .9cqw;
  }

  .services-motion-graphic .bub u span {
    background: #f4d58caa;
    box-shadow: 0 .9cqw 0 -.05cqw #f4d58c55;
  }

  .services-motion-graphic .go .bub i {
    animation: fadeOut .5s calc((var(--d) + 1.6) * 1s) both;
  }

  .services-motion-graphic .bub i {
    background: #2b6fe033;
    border: 1px solid #7fc4ffaa;
  }

  .services-motion-graphic .blk {
    width: 7.4cqw;
    height: 3cqw;
    border-radius: .8cqw;
    background: linear-gradient(135deg, #f4e27a, #a8b82a);
    color: #1d2208;
    font: 700 1cqw/3cqw Manrope;
    text-align: center;
    box-shadow: 0 .4cqw 1cqw #0006;
  }

  .services-motion-graphic .con {
    width: 1.6cqw;
    height: .25cqw;
    background: var(--gold);
    transform-origin: left;
  }

  .services-motion-graphic .win {
    left: 3cqw;
    top: 0;
    width: 22cqw;
    height: 9cqw;
    display: grid;
    grid-template: 2cqw 1fr / 4cqw 1fr 1fr;
    gap: .5cqw;
  }

  .services-motion-graphic .win div {
    border-radius: .5cqw;
    background: linear-gradient(#ff9d8566, #e0553f55);
    border: 1px solid #ff9d85aa;
    transform-origin: top;
  }

  .services-motion-graphic .win .h {
    grid-column: 1 / 4;
    display: flex;
    align-items: center;
    gap: .4cqw;
    padding: 0 .7cqw;
  }

  .services-motion-graphic .win .h b {
    width: .55cqw;
    height: .55cqw;
    border-radius: 50%;
    background: #ffd0c2;
  }

  .services-motion-graphic .win .h i {
    margin-left: auto;
    width: 6cqw;
    height: .5cqw;
    border-radius: 9px;
    background: #ffd0c2aa;
  }

  .services-motion-graphic .win .s {
    grid-row: 2;
    padding: .8cqw .6cqw;
    display: flex;
    flex-direction: column;
    gap: .8cqw;
  }

  .services-motion-graphic .win .s i {
    height: .5cqw;
    border-radius: 9px;
    background: #ffd0c2aa;
  }

  .services-motion-graphic .win .t {
    padding: .7cqw;
    display: flex;
  }

  .services-motion-graphic .win .bars {
    display: block;
    width: 100%;
    height: 100%;
    background: linear-gradient(#ffd0c2, #ffd0c2) 6% 100% / 14% 40% no-repeat, linear-gradient(#ffd0c2, #ffd0c2) 30% 100% / 14% 70% no-repeat, linear-gradient(#ffd0c2, #ffd0c2) 54% 100% / 14% 55% no-repeat, linear-gradient(#f4d58c, #f4d58c) 78% 100% / 14% 90% no-repeat;
  }

  .services-motion-graphic .win .don {
    display: block;
    width: 3.8cqw;
    height: 3.8cqw;
    margin: auto;
    border-radius: 50%;
    background: conic-gradient(#f4d58c 0 62%, #ffd0c255 0);
    -webkit-mask: radial-gradient(circle, transparent 38%, #000 40%);
    mask: radial-gradient(circle, transparent 38%, #000 40%);
  }

  .services-motion-graphic .dia {
    left: 22.2cqw;
    top: 11.5cqw;
    width: 4.6cqw;
    height: 4.6cqw;
    perspective: 30cqw;
  }

  .services-motion-graphic .dia b {
    display: block;
    width: 100%;
    height: 100%;
    border: .25cqw solid #ffb59f;
    background: radial-gradient(#ff9d8577, #ff9d8511);
    box-shadow: 0 0 1.5cqw #ff7a5c88;
    transform: rotateX(60deg);
  }

  .services-motion-graphic .orb {
    position: absolute;
    width: 1.7cqw;
    height: 1.7cqw;
    margin: -.85cqw;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, #fff3c6, #d4a95a 60%, #9a6f22);
    box-shadow: 0 0 1.6cqw #d4a95acc;
    opacity: 0;
    z-index: 6;
  }

  .services-motion-graphic .trail {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }

  .services-motion-graphic .ring {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 10cqw;
    height: 10cqw;
    margin: -5cqw;
    border-radius: 50%;
    border: .2cqw solid var(--gold);
    opacity: 0;
    z-index: 5;
    pointer-events: none;
  }

  .services-motion-graphic .a {
    opacity: 0;
  }

  .services-motion-graphic .go .a {
    animation: var(--k, fadeUp) var(--t, .8s) cubic-bezier(.3, 1.4, .5, 1) calc(var(--d) * 1s) both;
  }

  .services-motion-graphic .go .panel {
    animation: fadeUp 1s both;
  }

  .services-motion-graphic .go .ul:after {
    animation: grow .9s calc(var(--d) * 1s) both;
  }

  .services-motion-graphic .go .eye {
    animation: blink 3.4s infinite;
  }

  .services-motion-graphic .eye {
    transform-box: fill-box;
    transform-origin: center;
  }

  .services-motion-graphic .go .hop {
    animation: hop 1s cubic-bezier(.3, 1.3, .5, 1) 18.6s both;
  }

  .services-motion-graphic .go .m {
    animation: bob 2.4s ease-in-out infinite alternate;
  }

  .services-motion-graphic .al,
  .services-motion-graphic .ar {
    transform-box: fill-box;
    transform-origin: 50% 10%;
  }

  .services-motion-graphic .go .al {
    animation: up 1s 18.6s both;
  }

  .services-motion-graphic .go .ar {
    animation: up 1s 18.6s both;
    --r: -150deg;
  }

  .services-motion-graphic .go .pls {
    animation: fadeUp .8s calc(var(--d) * 1s) both, pulse 1.6s 18.6s both;
  }

  .services-motion-graphic .go .card {
    animation: cg 1.2s 18.7s both;
  }

  .services-motion-graphic .go .ring {
    animation: ring 2.2s 18.7s ease-out both;
  }

  .services-motion-graphic .go .tr {
    animation: draw 2.6s 14s ease-in-out both;
  }

  .services-motion-graphic .go .oA {
    animation: oA 3s linear var(--d) both;
  }

  .services-motion-graphic .go .oB {
    animation: oB 3s linear var(--d) both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(1.5cqw); }
    to { opacity: 1; transform: none; }
  }

  @keyframes grow {
    from { opacity: 1; transform: scaleX(0); }
    to { opacity: 1; transform: none; }
  }

  @keyframes blink {
    0%, 92%, 100% { transform: none; }
    95% { transform: scaleY(.1); }
  }

  @keyframes bob {
    to { transform: translateY(-.5cqw) rotate(1.5deg); }
  }

  @keyframes jump {
    0% { opacity: 0; transform: translateY(-22cqw) scale(.9, 1.2); }
    55% { opacity: 1; transform: scale(1.28, .72); }
    72% { transform: scale(.92, 1.14); }
    86% { transform: scale(1.04, .97); }
    100% { opacity: 1; transform: none; }
  }

  @keyframes slide {
    0% { opacity: 0; transform: translateX(-30cqw) skewX(-18deg); }
    60% { opacity: 1; transform: translateX(1cqw) skewX(8deg) scale(1.1, .9); }
    100% { opacity: 1; transform: none; }
  }

  @keyframes spinIn {
    0% { opacity: 0; transform: translateX(26cqw) rotate(-540deg) scale(.2); }
    80% { opacity: 1; transform: rotate(12deg) scale(1.1); }
    100% { opacity: 1; transform: none; }
  }

  @keyframes pop {
    0% { opacity: 0; transform: translate(var(--x, 0), var(--y, 0)) rotate(var(--r, 0)) scale(.4); }
    100% { opacity: 1; transform: none; }
  }

  @keyframes flt {
    0% { opacity: 0; transform: translateY(4cqw) scale(.4); }
    100% { opacity: 1; transform: none; }
  }

  @keyframes unfold {
    from { opacity: 0; transform: scaleY(0); }
    to { opacity: 1; transform: none; }
  }

  @keyframes spin3 {
    from { opacity: 1; transform: rotateX(60deg) rotateY(0deg); }
    to { opacity: 1; transform: rotateX(60deg) rotateY(360deg); }
  }

  @keyframes label {
    0% { opacity: 0; transform: translateX(-3cqw) scale(.8); letter-spacing: .35em; filter: blur(4px); }
    60% { opacity: 1; transform: translateX(.4cqw) scale(1.07); filter: none; }
    100% { opacity: 1; transform: none; letter-spacing: 0; }
  }

  @keyframes swap {
    0%, 100% { opacity: 1; }
  }

  @keyframes fadeOut {
    to { opacity: 0; transform: scale(.3); }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(.3); }
    to { opacity: 1; transform: none; }
  }

  @keyframes run {
    from { left: 3cqw; }
    to { left: 25cqw; }
  }

  @keyframes oA {
    0% { left: 18%; top: 54%; opacity: 0; }
    5% { opacity: 1; }
    25% { left: 34%; top: 42%; }
    50% { left: 50%; top: 54%; }
    75% { left: 66%; top: 42%; }
    95% { opacity: 1; }
    100% { left: 82%; top: 54%; opacity: 0; }
  }

  @keyframes oB {
    0% { left: 82%; top: 54%; opacity: 0; }
    5% { opacity: 1; }
    25% { left: 66%; top: 42%; }
    50% { left: 50%; top: 54%; }
    75% { left: 34%; top: 42%; }
    95% { opacity: 1; }
    100% { left: 18%; top: 54%; opacity: 0; }
  }

  @keyframes draw {
    from { stroke-dashoffset: 100; opacity: 1; }
    to { stroke-dashoffset: 0; opacity: .9; }
  }

  @keyframes hop {
    0% { transform: none; }
    30% { transform: translateY(-3cqw) scale(.94, 1.08); }
    55% { transform: scale(1.15, .85); }
    100% { transform: none; }
  }

  @keyframes up {
    to { transform: rotate(var(--r, 150deg)); }
  }

  @keyframes pulse {
    0%, 100% { box-shadow: none; }
    40% { box-shadow: 0 0 1.5cqw #d4a95a; }
  }

  @keyframes cg {
    to { border-color: #d4a95acc; box-shadow: 0 0 2.5cqw #d4a95a44; }
  }

  @keyframes ring {
    0% { opacity: .9; transform: scale(.2); }
    100% { opacity: 0; transform: scale(9); }
  }

  .services-motion-graphic .go .dot {
    animation: fadeIn .3s 8.4s both, run 2s 8.7s ease-in-out infinite alternate;
  }

  @media (max-width: 800px) {
    .services-motion-graphic {
      width: calc(100% + 32px);
      max-width: none;
      margin-inline: -16px;
    }

    .services-motion-graphic .stage {
      width: 100%;
    }

    .services-motion-graphic .hd {
      font-size: 2.1cqw;
    }

    .services-motion-graphic .hd s {
      font-size: 1.6cqw;
    }

    .services-motion-graphic .pill {
      font-size: 2.2cqw;
    }

    .services-motion-graphic .blk {
      font-size: 2cqw;
      line-height: 3cqw;
    }
  }

  @media (max-width: 640px) {
    .services-motion-graphic .stage {
      aspect-ratio: 4 / 3;
    }
  }
`

export function ServicesMotionGraphic() {
  const wrapperRef = useRef(null)

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return undefined

    const stage = wrapper.querySelector('#st')
    const graphic = wrapper.querySelector('.services-motion-graphic')
    if (!stage || !graphic) return undefined

    const M = (c1, c2, e, i) => `
      <svg viewBox="0 0 100 120">
        <defs>
          <radialGradient id="g${i}" cx=".35" cy=".3" r=".85">
            <stop offset="0" stop-color="${c1}"/>
            <stop offset="1" stop-color="${c2}"/>
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="116" rx="26" ry="3.5" fill="#000" opacity=".4"/>
        <line x1="50" y1="22" x2="50" y2="9" stroke="${c2}" stroke-width="2.5"/>
        <circle cx="50" cy="7" r="4.5" fill="#f1c978"/>
        <rect class="al" x="12" y="72" width="11" height="25" rx="5.5" fill="url(#g${i})"/>
        <rect class="ar" x="77" y="72" width="11" height="25" rx="5.5" fill="url(#g${i})"/>
        <ellipse cx="40" cy="111" rx="9" ry="5" fill="${c2}"/>
        <ellipse cx="60" cy="111" rx="9" ry="5" fill="${c2}"/>
        <ellipse cx="50" cy="92" rx="25" ry="21" fill="url(#g${i})"/>
        <circle cx="50" cy="92" r="6" fill="#0f1722"/>
        <circle cx="50" cy="92" r="2.5" fill="#f1c978"/>
        <circle cx="14" cy="47" r="6" fill="${c2}"/>
        <circle cx="86" cy="47" r="6" fill="${c2}"/>
        <rect x="16" y="20" width="68" height="54" rx="26" fill="url(#g${i})"/>
        <ellipse cx="36" cy="28" rx="11" ry="4" fill="#fff" opacity=".28" transform="rotate(-20 36 28)"/>
        <rect x="24" y="33" width="52" height="28" rx="14" fill="#0c121b"/>
        <ellipse class="eye" cx="40" cy="46" rx="4.5" ry="6" fill="${e}"/>
        <ellipse class="eye" cx="60" cy="46" rx="4.5" ry="6" fill="${e}"/>
        <path d="M44 55 Q50 60 56 55" stroke="${e}" fill="none" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    `

    const mw = (k, d, s) => `
      <div class="mw a" style="--k:${k};--d:${d};--t:1.1s">
        <div class="hop"><div class="m">${s}</div></div>
      </div>
    `

    const bub = (l, t, d) => `
      <div class="p bub a" style="left:${l}cqw;top:${t}cqw;--k:flt;--d:${d}">
        <i><em></em><span></span></i>
        <u class="a" style="--k:fadeIn;--d:${d + 1.7}"><em>✓</em><span></span></u>
      </div>
    `

    const blk = (l, t, x, y, r, d, n) => `
      <div class="p blk a" style="left:${l}cqw;top:${t}cqw;--k:pop;--x:${x};--y:${y};--r:${r};--d:${d};--t:.9s">${n || ''}</div>
    `

    const wr = (c, w) => `<div class="card" style="--d:${w}">${c}</div>`

    const cards = [
      {
        n: '01',
        t: 'AI SYSTEMS',
        x: 1,
        m: M('#8fd0ff', '#2b6fe0', '#aef0ff', 1),
        k: 'jump',
        d: 1.2,
        L: ['AI Agents', 'AI Assistants', 'Agentic AI'],
        ld: 3.6,
        p: bub(.3, 1.2, 2.2) + bub(20, 1.2, 2.7) + bub(10.1, 6.3, 3.2),
      },
      {
        n: '02',
        t: 'AUTOMATION',
        x: 2,
        m: M('#f4e27a', '#9fb52a', '#fff6b0', 2),
        k: 'slide',
        d: 5.8,
        L: ['Smart Workflows', 'Process Automation', 'Intelligent Tasks'],
        ld: 8.2,
        p: blk(1.2, 3.5, '3cqw', '3cqw', '-18deg', 6.8, 'Input') + blk(10.2, 3.5, '-2cqw', '5cqw', '14deg', 7.1, 'Process') + blk(19.2, 3.5, '-4cqw', '-2cqw', '-9deg', 7.4, 'Output') + [0, 1].map((i) => `<div class="p con a" style="left:${8.6 + i * 9}cqw;top:4.8cqw;--k:grow;--d:${7.9 + i * .3}"></div>`).join('') + `<div class="p orb dot" style="width:1cqw;height:1cqw;left:3cqw;top:5cqw;margin:0"></div>`,
      },
      {
        n: '03',
        t: 'CUSTOM SOFTWARE',
        x: 3,
        m: M('#ffa58e', '#e0553f', '#ffe0d6', 3),
        k: 'spinIn',
        d: 10.4,
        L: ['Business Systems', 'Custom Platforms', 'AI-Powered Apps'],
        ld: 12.8,
        p: `<div class="p dia a" style="--k:fadeIn;--d:11.4"><b style="animation:spin3 3s linear infinite"></b></div><div class="p win">` + [['h', '<b></b><b></b><b></b><i></i>'], ['s', '<i></i><i></i><i></i>'], ['t', '<span class="bars"></span>'], ['t', '<span class="don"></span>']].map(([c, h], i) => `<div class="${c} a" style="--k:unfold;--d:${12 + i * .3}">${h}</div>`).join('') + `</div>`,
      },
    ]

    const cardsContainer = wrapper.querySelector('#cards')
    const deco = wrapper.querySelector('#deco')

    cardsContainer.innerHTML = cards.map((card) => wr(`
      <div class="hd a" style="--d:${card.d - .5}"><s>${card.n}</s>${card.t}</div>
      <div class="ul" style="--d:${card.d - .3}"></div>
      <div class="zone">${card.p}${mw(card.k, card.d, card.m)}</div>
      <div class="pills">${card.L.map((label, j) => `<div class="pill a" style="--k:label;--d:${card.ld + j * .5};--t:.7s">${label}</div>`).join('')}</div>
    `, card.d)).join('')

    deco.innerHTML = [17.93, 50, 82.07].map((x) => `
      <div class="node pls a" style="left:${x}cqw;--d:.9"></div>
      <div class="stem a" style="left:${x}cqw;--d:1"></div>
    `).join('')

    let timer = null
    let isVisible = false
    const play = () => {
      if (!isVisible) return

      stage.classList.remove('go', 'paused')
      void stage.offsetWidth
      stage.classList.add('go')
      clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        play()
      }, 24500)
    }

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      graphic.classList.toggle('is-offscreen', !isVisible)
      if (isVisible && !timer) play()
    }, {
      rootMargin: '120px 0px',
      threshold: 0,
    })
    observer.observe(graphic)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <style>{styles}</style>
      <div className="services-motion-graphic-host" ref={wrapperRef} dangerouslySetInnerHTML={{ __html: markup }} />
    </>
  )
}
