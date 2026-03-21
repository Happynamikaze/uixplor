'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import PageSEO from '@/components/seo/PageSEO';

type CodeTab = 'css' | 'tailwind';

interface Animation {
  id: string;
  name: string;
  description: string;
  category: string;
  css: string;
  tailwind: string;
}

const ANIMATIONS: Animation[] = [
  {
    id: 'btn-slide-fill',
    name: 'Slide Fill',
    description: 'Background slides in from left on hover',
    category: 'Button Hover',
    css: `.btn-slide-fill {
  position: relative;
  padding: 10px 24px;
  border: 1px solid #6C63FF;
  border-radius: 8px;
  color: #6C63FF;
  background: transparent;
  font-weight: 600;
  overflow: hidden;
  cursor: pointer;
  transition: color 0.35s ease;
}
.btn-slide-fill::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #6C63FF;
  transform: translateX(-100%);
  transition: transform 0.35s ease;
  z-index: -1;
}
.btn-slide-fill:hover { color: #fff; }
.btn-slide-fill:hover::before { transform: translateX(0); }`,
    tailwind: `<button class="relative px-6 py-2.5 border border-[#6C63FF] rounded-lg text-[#6C63FF] font-semibold overflow-hidden group transition-colors hover:text-white">
  <span class="absolute inset-0 bg-[#6C63FF] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-10"></span>
  Hover me
</button>`,
  },
  {
    id: 'btn-glow-pulse',
    name: 'Glow Pulse',
    description: 'Pulsing neon glow on hover',
    category: 'Button Hover',
    css: `.btn-glow-pulse {
  padding: 10px 24px;
  border-radius: 8px;
  background: #6C63FF;
  color: #fff;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-glow-pulse:hover {
  box-shadow: 0 0 0 4px rgba(108,99,255,0.25), 0 0 20px rgba(108,99,255,0.5);
  transform: translateY(-2px);
}`,
    tailwind: `<button class="px-6 py-2.5 rounded-lg bg-[#6C63FF] text-white font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(108,99,255,0.25),0_0_20px_rgba(108,99,255,0.5)]">
  Glow
</button>`,
  },
  {
    id: 'btn-scale',
    name: 'Scale Bounce',
    description: 'Springy scale on hover with shadow depth',
    category: 'Button Hover',
    css: `.btn-scale {
  padding: 10px 24px;
  border-radius: 8px;
  background: linear-gradient(135deg, #6C63FF, #8b5cf6);
  color: #fff;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
}
.btn-scale:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 28px rgba(108,99,255,0.4);
}`,
    tailwind: `<button class="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#6C63FF] to-[#8b5cf6] text-white font-semibold transition-transform duration-200 hover:scale-110 hover:shadow-xl">
  Scale
</button>`,
  },
  {
    id: 'card-lift',
    name: 'Card Lift',
    description: 'Card lifts vertically with accent shadow on hover',
    category: 'Card Hover',
    css: `.card-lift {
  padding: 24px;
  border-radius: 16px;
  background: #151515;
  border: 1px solid #2A2A2A;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  cursor: pointer;
}
.card-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(108,99,255,0.2);
  border-color: rgba(108,99,255,0.4);
}`,
    tailwind: `<div class="p-6 rounded-2xl bg-[#151515] border border-[#2A2A2A] transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(108,99,255,0.2)] hover:border-[#6C63FF]/40">
  Card Content
</div>`,
  },
  {
    id: 'card-glow-border',
    name: 'Glow Border',
    description: 'Glowing gradient border appears on hover',
    category: 'Card Hover',
    css: `.card-glow-border {
  position: relative;
  padding: 24px;
  border-radius: 16px;
  background: #151515;
  border: 1px solid #2A2A2A;
  cursor: pointer;
  z-index: 0;
}
.card-glow-border::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 17px;
  background: linear-gradient(135deg, #6C63FF, #8b5cf6, #f472b6);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}
.card-glow-border:hover::before { opacity: 1; }`,
    tailwind: `<div class="relative p-6 rounded-2xl bg-[#151515] border border-[#2A2A2A] cursor-pointer group z-0">
  <div class="absolute -inset-px rounded-[17px] bg-gradient-to-br from-[#6C63FF] via-[#8b5cf6] to-[#f472b6] opacity-0 group-hover:opacity-100 transition-opacity -z-[1]"></div>
  Glow Border
</div>`,
  },
  {
    id: 'text-shimmer',
    name: 'Text Shimmer',
    description: 'Animated gradient shimmer sweeps across text',
    category: 'Text Animation',
    css: `.text-shimmer {
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(90deg, #6C63FF 0%, #a78bfa 25%, #fff 50%, #a78bfa 75%, #6C63FF 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s linear infinite;
}
@keyframes shimmer { to { background-position: 200% center; } }`,
    tailwind: `/* Add to tailwind.config.js keyframes: shimmer: { to: { backgroundPosition: '200% center' } } */
<span class="text-4xl font-extrabold bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_3s_linear_infinite]"
  style="background-image:linear-gradient(90deg,#6C63FF,#a78bfa,#fff,#a78bfa,#6C63FF)">
  UIXplor
</span>`,
  },
  {
    id: 'text-typewriter',
    name: 'Typewriter',
    description: 'Classic blinking cursor typewriter reveal',
    category: 'Text Animation',
    css: `.typewriter {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  border-right: 2px solid #6C63FF;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
  animation: typing 3s steps(16) forwards, blink 0.7s step-end infinite;
}
@keyframes typing { to { width: 16ch; } }
@keyframes blink { 50% { border-color: transparent; } }`,
    tailwind: `/* Requires custom keyframes in tailwind.config.js */
<p class="text-2xl font-bold text-white border-r-2 border-[#6C63FF] whitespace-nowrap overflow-hidden w-0 animate-[typing_3s_steps(16)_forwards,blink_0.7s_step-end_infinite]">
  Build UI faster_
</p>`,
  },
  {
    id: 'loader-dots',
    name: 'Bouncing Dots',
    description: 'Three dots that bounce in sequence',
    category: 'Loader',
    css: `.dots { display: flex; gap: 8px; align-items: center; }
.dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #6C63FF;
  animation: bounce 1.2s ease-in-out infinite;
}
.dot:nth-child(2) { animation-delay: 0.2s; background: #8b5cf6; }
.dot:nth-child(3) { animation-delay: 0.4s; background: #a78bfa; }
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}`,
    tailwind: `<div class="flex gap-2 items-center">
  <div class="w-2.5 h-2.5 rounded-full bg-[#6C63FF] animate-bounce [animation-delay:0s]"></div>
  <div class="w-2.5 h-2.5 rounded-full bg-[#8b5cf6] animate-bounce [animation-delay:0.2s]"></div>
  <div class="w-2.5 h-2.5 rounded-full bg-[#a78bfa] animate-bounce [animation-delay:0.4s]"></div>
</div>`,
  },
  {
    id: 'loader-ring',
    name: 'Spin Ring',
    description: 'Smooth multi-layer spinning ring',
    category: 'Loader',
    css: `.ring {
  width: 40px; height: 40px;
  border-radius: 50%;
  border: 3px solid rgba(108,99,255,0.15);
  border-top-color: #6C63FF;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }`,
    tailwind: `<div class="w-10 h-10 rounded-full border-[3px] border-[#6C63FF]/15 border-t-[#6C63FF] animate-spin"></div>`,
  },
];

const CATEGORIES = ['All', 'Button Hover', 'Card Hover', 'Text Animation', 'Loader'];

function AnimationPreview({ id }: { id: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <style>{`
        .p-sf{position:relative;padding:10px 24px;border:1px solid #6C63FF;border-radius:8px;color:#6C63FF;background:transparent;font-weight:600;overflow:hidden;cursor:pointer;transition:color 0.35s ease;}
        .p-sf::before{content:'';position:absolute;inset:0;background:#6C63FF;transform:translateX(-100%);transition:transform 0.35s ease;z-index:0;}
        .p-sf:hover{color:#fff;}
        .p-sf:hover::before{transform:translateX(0);}
        .p-sf span{position:relative;z-index:1;}
        .p-gp{padding:10px 24px;border-radius:8px;background:#6C63FF;color:#fff;font-weight:600;border:none;cursor:pointer;transition:all 0.3s ease;}
        .p-gp:hover{box-shadow:0 0 0 4px rgba(108,99,255,0.3),0 0 20px rgba(108,99,255,0.5);transform:translateY(-2px);}
        .p-sc{padding:10px 24px;border-radius:8px;background:linear-gradient(135deg,#6C63FF,#8b5cf6);color:#fff;font-weight:600;border:none;cursor:pointer;transition:transform 0.2s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.2s ease;}
        .p-sc:hover{transform:scale(1.1);box-shadow:0 12px 28px rgba(108,99,255,0.4);}
        .p-cl{padding:16px 20px;border-radius:14px;background:#1a1a1a;border:1px solid #2A2A2A;transition:transform 0.3s ease,box-shadow 0.3s ease,border-color 0.3s ease;cursor:pointer;color:rgba(255,255,255,0.6);font-size:13px;font-weight:600;}
        .p-cl:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(108,99,255,0.2);border-color:rgba(108,99,255,0.4);}
        .p-gb{position:relative;padding:16px 20px;border-radius:14px;background:#1a1a1a;border:1px solid #2A2A2A;cursor:pointer;color:rgba(255,255,255,0.6);font-size:13px;font-weight:600;z-index:0;}
        .p-gb::before{content:'';position:absolute;inset:-1px;border-radius:15px;background:linear-gradient(135deg,#6C63FF,#8b5cf6,#f472b6);opacity:0;transition:opacity 0.4s ease;z-index:-1;}
        .p-gb:hover::before{opacity:1;}
        .p-ts{font-size:24px;font-weight:800;background:linear-gradient(90deg,#6C63FF 0%,#a78bfa 25%,#fff 50%,#a78bfa 75%,#6C63FF 100%);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmerp 3s linear infinite;}
        @keyframes shimmerp{to{background-position:200% center;}}
        .p-tw{font-size:16px;font-weight:700;color:#fff;border-right:2px solid #6C63FF;white-space:nowrap;overflow:hidden;width:0;animation:typingp 3s steps(13) forwards,blinkp 0.7s step-end infinite;}
        @keyframes typingp{to{width:13ch;}}
        @keyframes blinkp{50%{border-color:transparent;}}
        .p-db{display:flex;gap:8px;align-items:center;}
        .p-d1{width:10px;height:10px;border-radius:50%;background:#6C63FF;animation:bouncep 1.2s ease-in-out infinite;}
        .p-d2{width:10px;height:10px;border-radius:50%;background:#8b5cf6;animation:bouncep 1.2s ease-in-out 0.2s infinite;}
        .p-d3{width:10px;height:10px;border-radius:50%;background:#a78bfa;animation:bouncep 1.2s ease-in-out 0.4s infinite;}
        @keyframes bouncep{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
        .p-sr{width:36px;height:36px;border-radius:50%;border:3px solid rgba(108,99,255,0.15);border-top-color:#6C63FF;animation:spinp 0.8s linear infinite;}
        @keyframes spinp{to{transform:rotate(360deg);}}
      `}</style>
      {id === 'btn-slide-fill' && <button className="p-sf"><span>Hover me</span></button>}
      {id === 'btn-glow-pulse' && <button className="p-gp">Glow</button>}
      {id === 'btn-scale' && <button className="p-sc">Scale</button>}
      {id === 'card-lift' && <div className="p-cl">Hover Card</div>}
      {id === 'card-glow-border' && <div className="p-gb">Glow Border</div>}
      {id === 'text-shimmer' && <div className="p-ts">UIXplor</div>}
      {id === 'text-typewriter' && <div className="p-tw">Build UI fast</div>}
      {id === 'loader-dots' && <div className="p-db"><div className="p-d1"/><div className="p-d2"/><div className="p-d3"/></div>}
      {id === 'loader-ring' && <div className="p-sr"/>}
    </div>
  );
}

function AnimationCard({ anim }: { anim: Animation }) {
  const [tab, setTab] = useState<CodeTab>('css');
  const [copied, setCopied] = useState(false);
  const code = tab === 'css' ? anim.css : anim.tailwind;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl overflow-hidden border flex flex-col"
      style={{ background: '#151515', borderColor: '#2A2A2A' }}
    >
      <div className="h-32" style={{ background: '#0D0D0D' }}>
        <AnimationPreview id={anim.id} />
      </div>
      <div className="px-4 pt-3 pb-2 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-white">{anim.name}</h3>
          <p className="text-xs text-white/40 mt-0.5">{anim.description}</p>
        </div>
        <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border"
          style={{ background: 'rgba(108,99,255,0.08)', borderColor: 'rgba(108,99,255,0.2)', color: '#a78bfa' }}>
          {anim.category}
        </span>
      </div>
      <div className="px-4 flex gap-1 mb-2">
        {(['css', 'tailwind'] as CodeTab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className="px-3 py-1 rounded-md text-xs font-semibold transition-all"
            style={{ background: tab === t ? 'rgba(108,99,255,0.15)' : 'transparent', color: tab === t ? '#a78bfa' : 'rgba(255,255,255,0.35)' }}>
            {t === 'css' ? 'CSS' : 'Tailwind'}
          </button>
        ))}
      </div>
      <div className="relative mx-4 mb-4 rounded-xl overflow-hidden" style={{ background: '#0D0D0D', border: '1px solid #2A2A2A' }}>
        <pre className="text-[11px] p-3 overflow-x-auto text-white/60 font-mono leading-relaxed max-h-32"><code>{code}</code></pre>
        <button onClick={() => { navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }}
          className="absolute top-2 right-2 p-1.5 rounded-lg transition-all duration-200"
          style={{ background: copied ? 'rgba(108,99,255,0.3)' : 'rgba(255,255,255,0.06)', color: copied ? '#a78bfa' : 'rgba(255,255,255,0.4)' }}>
          {copied
            ? <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
            : <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          }
        </button>
      </div>
    </motion.div>
  );
}

export default function AnimationsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? ANIMATIONS : ANIMATIONS.filter((a) => a.category === activeCategory);

  return (
    <>
      <PageSEO
        title="UI Animation Library — UIXplor"
        description="Browse button hover, card hover, text animations and loaders. CSS and Tailwind code ready to copy."
        path="/animations"
        keywords={['UI animations', 'CSS animations', 'button hover', 'card animation', 'text animation']}
      />
      <main className="min-h-screen" style={{ background: '#0D0D0D' }}>
        <section className="container px-4 sm:px-6 pt-28 pb-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
            style={{ background: 'rgba(108,99,255,0.08)', borderColor: 'rgba(108,99,255,0.2)', color: '#a78bfa' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-pulse" />
            Animation Library
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4">
            UI <span style={{ color: '#6C63FF' }}>Animations</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto text-base">
            Copy-paste CSS and Tailwind animations. Hover to preview, click to copy.
          </motion.p>
        </section>

        <div className="container px-4 sm:px-6 pb-8 flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border"
              style={{ background: activeCategory === cat ? '#6C63FF' : 'rgba(255,255,255,0.04)', borderColor: activeCategory === cat ? '#6C63FF' : '#2A2A2A', color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.5)' }}>
              {cat}
            </button>
          ))}
        </div>

        <section className="container px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((anim) => <AnimationCard key={anim.id} anim={anim} />)}
          </div>
          <div className="mt-16 text-center">
            <p className="text-white/30 text-sm mb-4">Try animations live in the editor</p>
            <Link href="/playground"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 border"
              style={{ background: 'rgba(108,99,255,0.1)', borderColor: 'rgba(108,99,255,0.3)', color: '#a78bfa' }}>
              Open Playground
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
