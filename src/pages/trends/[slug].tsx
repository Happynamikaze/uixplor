'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'motion/react';
import PageSEO from '@/components/seo/PageSEO';

type TrendSlug = 'glassmorphism' | 'neumorphism' | 'brutalist' | 'gradient-ui' | '3d-ui' | 'cyberpunk';

// Demo HTML for each example — what element to render inside the preview
const DEMO_HTML: Record<string, string> = {
  'gl1': '<div class="glass-card" style="max-width:200px"><p style="color:rgba(255,255,255,0.7);font-size:13px;font-family:sans-serif">Frosted Glass Card</p><p style="color:rgba(255,255,255,0.4);font-size:11px;margin-top:6px;font-family:sans-serif">backdrop-filter: blur</p></div>',
  'gl2': '<button class="glass-btn" style="font-family:sans-serif">Neon Glass Button</button>',
  'gl3': '<div class="dark-glass" style="max-width:200px"><p style="color:rgba(255,255,255,0.6);font-size:13px;font-family:sans-serif">Dark Glass Panel</p></div>',
  'ne1': '<div class="neu-card" style="max-width:200px"><p style="color:#94a3b8;font-size:13px;font-family:sans-serif">Soft Raised Card</p></div>',
  'ne2': '<button class="neu-btn" style="font-family:sans-serif">Pressed Button</button>',
  'ne3': '<input class="neu-input" placeholder="Inset Input" style="font-family:sans-serif" />',
  'br1': '<button class="brutal-btn" style="font-family:sans-serif">BRUTAL BTN</button>',
  'br2': '<div class="brutal-card"><h3>BRUTAL</h3><p>Raw, bold aesthetics</p></div>',
  'br3': '<input class="brutal-input" placeholder="Brutal Input" style="font-family:sans-serif" />',
  'gr1': '<div class="aurora-bg" style="min-height:120px;display:flex;align-items:center;justify-content:center"><span style="color:rgba(255,255,255,0.4);font-size:12px;font-family:sans-serif">Aurora Background</span></div>',
  'gr2': '<button class="grad-btn" style="font-family:sans-serif">Gradient Button</button>',
  'gr3': '<p class="grad-text" style="font-family:sans-serif">UIXplor</p>',
  '3d1': '<button class="btn-3d" style="font-family:sans-serif">3D Button</button>',
  '3d2': '<div class="cube-wrap"><div class="cube-card"><p style="color:#34d399;font-size:12px;font-family:sans-serif">Cube Card</p></div></div>',
  '3d3': '<span class="float-badge" style="font-family:sans-serif">✦ Floating Badge</span>',
  'cy1': '<button class="neon-btn" style="font-family:monospace">NEON BTN</button>',
  'cy2': '<div class="terminal" style="max-width:220px"><div class="prompt">$ uixplor --run</div><div class="text">Loading components...<span class="cursor"></span></div></div>',
  'cy3': '<div class="scanline-wrap" style="width:200px;height:100px;background:#0a0a0a;display:flex;align-items:center;justify-content:center"><span style="color:#B8FB3C;font-family:monospace;font-size:12px">SCAN OVERLAY</span></div>',
};

const TREND_DATA: Record<TrendSlug, {
  name: string; description: string; accentColor: string; icon: string;
  examples: { id: string; name: string; css: string; previewBg: string }[];
}> = {
  glassmorphism: {
    name: 'Glassmorphism',
    description: 'Frosted glass UI using backdrop-filter, translucent backgrounds, and subtle borders.',
    accentColor: '#38bdf8',
    icon: '🧊',
    examples: [
      {
        id: 'gl1', name: 'Frosted Card',
        previewBg: 'linear-gradient(135deg, #0c1a2e 0%, #1a0a2e 100%)',
        css: `.glass-card {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 28px;
}`,
      },
      {
        id: 'gl2', name: 'Neon Glass Button',
        previewBg: 'linear-gradient(135deg, #0a1628 0%, #0d1f3c 100%)',
        css: `.glass-btn {
  background: rgba(56,189,248,0.1);
  border: 1px solid rgba(56,189,248,0.3);
  backdrop-filter: blur(12px);
  color: #38bdf8;
  border-radius: 10px;
  padding: 10px 22px;
  font-weight: 600;
  transition: all 0.3s;
}
.glass-btn:hover {
  background: rgba(56,189,248,0.18);
  box-shadow: 0 0 20px rgba(56,189,248,0.3);
}`,
      },
      {
        id: 'gl3', name: 'Dark Glass Panel',
        previewBg: 'linear-gradient(160deg, #0a0f1a 0%, #101828 100%)',
        css: `.dark-glass {
  background: rgba(0,0,0,0.45);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(24px) saturate(180%);
  border-radius: 16px;
  padding: 24px;
}`,
      },
    ],
  },
  neumorphism: {
    name: 'Neumorphism',
    description: 'Soft UI with extruded elements using dual light/dark box shadows.',
    accentColor: '#94a3b8',
    icon: '⚪',
    examples: [
      {
        id: 'ne1', name: 'Soft Raised Card',
        previewBg: '#1e2535',
        css: `.neu-card {
  background: #1e2535;
  border-radius: 20px;
  padding: 28px;
  box-shadow:
    8px 8px 20px rgba(0,0,0,0.4),
    -8px -8px 20px rgba(255,255,255,0.04);
}`,
      },
      {
        id: 'ne2', name: 'Pressed Button',
        previewBg: '#1e2535',
        css: `.neu-btn {
  background: #1e2535;
  border-radius: 10px;
  padding: 12px 24px;
  box-shadow:
    4px 4px 10px rgba(0,0,0,0.4),
    -4px -4px 10px rgba(255,255,255,0.04);
  color: #94a3b8;
  font-weight: 600;
  border: none;
  cursor: pointer;
}
.neu-btn:active {
  box-shadow:
    inset 4px 4px 10px rgba(0,0,0,0.4),
    inset -4px -4px 10px rgba(255,255,255,0.04);
}`,
      },
      {
        id: 'ne3', name: 'Inset Input',
        previewBg: '#1e2535',
        css: `.neu-input {
  background: #1e2535;
  border-radius: 10px;
  padding: 12px 18px;
  box-shadow:
    inset 4px 4px 10px rgba(0,0,0,0.4),
    inset -4px -4px 10px rgba(255,255,255,0.03);
  color: #cbd5e1;
  border: none;
  outline: none;
  width: 200px;
}`,
      },
    ],
  },
  brutalist: {
    name: 'Brutalist UI',
    description: 'Raw, bold aesthetics — thick black borders, flat colors, intentional roughness.',
    accentColor: '#eab308',
    icon: '🟫',
    examples: [
      {
        id: 'br1', name: 'Brutal Button',
        previewBg: '#fafaf9',
        css: `.brutal-btn {
  background: #eab308;
  border: 3px solid #000;
  box-shadow: 4px 4px 0 #000;
  border-radius: 0;
  padding: 10px 22px;
  font-weight: 800;
  font-size: 15px;
  color: #000;
  cursor: pointer;
  transition: all 0.15s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.brutal-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #000;
}
.brutal-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #000;
}`,
      },
      {
        id: 'br2', name: 'Brutal Card',
        previewBg: '#fafaf9',
        css: `.brutal-card {
  background: #fff;
  border: 3px solid #000;
  box-shadow: 6px 6px 0 #000;
  border-radius: 0;
  padding: 24px;
  max-width: 260px;
}
.brutal-card h3 {
  font-size: 20px;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.brutal-card p { font-size: 13px; color: #444; }`,
      },
      {
        id: 'br3', name: 'Brutal Input',
        previewBg: '#fafaf9',
        css: `.brutal-input {
  border: 3px solid #000;
  border-radius: 0;
  padding: 10px 14px;
  font-size: 15px;
  font-weight: 700;
  background: #fff;
  box-shadow: 4px 4px 0 #000;
  outline: none;
  width: 200px;
}
.brutal-input:focus {
  background: #fef08a;
}`,
      },
    ],
  },
  'gradient-ui': {
    name: 'Gradient UI',
    description: 'Rich multi-stop gradients, aurora backgrounds, and vibrant color blends.',
    accentColor: '#a78bfa',
    icon: '🌈',
    examples: [
      {
        id: 'gr1', name: 'Aurora Background',
        previewBg: '#0D0D0D',
        css: `.aurora-bg {
  background:
    radial-gradient(ellipse at top left, rgba(108,99,255,0.4) 0%, transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(244,114,182,0.3) 0%, transparent 50%),
    radial-gradient(ellipse at center, rgba(56,189,248,0.15) 0%, transparent 60%),
    #0D0D0D;
  min-height: 200px;
  border-radius: 16px;
}`,
      },
      {
        id: 'gr2', name: 'Gradient Button',
        previewBg: '#0D0D0D',
        css: `.grad-btn {
  background: linear-gradient(135deg, #6C63FF 0%, #f472b6 100%);
  border: none;
  border-radius: 12px;
  padding: 12px 28px;
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.grad-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #7c74ff 0%, #f87fb3 100%);
  opacity: 0;
  transition: opacity 0.3s;
}
.grad-btn:hover::before { opacity: 1; }`,
      },
      {
        id: 'gr3', name: 'Gradient Text',
        previewBg: '#0D0D0D',
        css: `.grad-text {
  font-size: 42px;
  font-weight: 900;
  background: linear-gradient(90deg, #6C63FF, #f472b6, #fbbf24);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: grad-move 4s linear infinite;
}
@keyframes grad-move { to { background-position: 200% center; } }`,
      },
    ],
  },
  '3d-ui': {
    name: '3D UI',
    description: 'Depth, transforms, and perspective. CSS 3D without WebGL.',
    accentColor: '#34d399',
    icon: '📦',
    examples: [
      {
        id: '3d1', name: '3D Button Press',
        previewBg: '#0D0D0D',
        css: `.btn-3d {
  padding: 12px 28px;
  background: #34d399;
  border: none;
  border-radius: 10px;
  color: #000;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  box-shadow: 0 6px 0 #059669;
  transform: translateY(0);
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}
.btn-3d:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 0 #059669;
}
.btn-3d:active {
  transform: translateY(4px);
  box-shadow: 0 2px 0 #059669;
}`,
      },
      {
        id: '3d2', name: 'Cube Card',
        previewBg: '#0D0D0D',
        css: `.cube-wrap {
  perspective: 800px;
}
.cube-card {
  padding: 24px;
  background: linear-gradient(135deg, #151515, #1e2535);
  border: 1px solid rgba(52,211,153,0.3);
  border-radius: 16px;
  transform: rotateX(12deg) rotateY(-8deg);
  box-shadow:
    20px 20px 40px rgba(0,0,0,0.5),
    -4px -4px 20px rgba(52,211,153,0.08);
  transition: transform 0.4s ease;
}
.cube-wrap:hover .cube-card {
  transform: rotateX(0deg) rotateY(0deg);
}`,
      },
      {
        id: '3d3', name: 'Floating Badge',
        previewBg: '#0D0D0D',
        css: `.float-badge {
  display: inline-flex;
  align-items: center;
  padding: 8px 18px;
  background: linear-gradient(135deg, #151515, #1a2535);
  border: 1px solid rgba(52,211,153,0.25);
  border-radius: 100px;
  color: #34d399;
  font-weight: 600;
  font-size: 13px;
  box-shadow:
    0 4px 0 rgba(52,211,153,0.15),
    0 8px 20px rgba(0,0,0,0.4);
  animation: float 3s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}`,
      },
    ],
  },
  cyberpunk: {
    name: 'Cyberpunk UI',
    description: 'Neon glows, dark grounds, electric lime accents, and futuristic terminals.',
    accentColor: '#B8FB3C',
    icon: '⚡',
    examples: [
      {
        id: 'cy1', name: 'Neon Button',
        previewBg: '#050505',
        css: `.neon-btn {
  padding: 11px 26px;
  background: transparent;
  border: 1px solid #B8FB3C;
  color: #B8FB3C;
  font-family: monospace;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  transition: all 0.3s ease;
}
.neon-btn:hover {
  background: rgba(184,251,60,0.1);
  box-shadow: 0 0 20px rgba(184,251,60,0.4), inset 0 0 20px rgba(184,251,60,0.05);
  text-shadow: 0 0 10px #B8FB3C;
}`,
      },
      {
        id: 'cy2', name: 'Terminal Card',
        previewBg: '#050505',
        css: `.terminal {
  background: #0a0a0a;
  border: 1px solid #B8FB3C;
  border-radius: 8px;
  padding: 20px;
  font-family: 'Courier New', monospace;
  box-shadow: 0 0 30px rgba(184,251,60,0.1), inset 0 0 30px rgba(184,251,60,0.02);
}
.terminal .prompt { color: #B8FB3C; font-size: 13px; }
.terminal .text { color: rgba(184,251,60,0.6); font-size: 12px; margin-top: 8px; }
.terminal .cursor {
  display: inline-block;
  width: 8px; height: 14px;
  background: #B8FB3C;
  animation: blink 1s step-end infinite;
  vertical-align: middle;
}
@keyframes blink { 50% { opacity: 0; } }`,
      },
      {
        id: 'cy3', name: 'Scanline Overlay',
        previewBg: '#050505',
        css: `.scanline-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}
.scanline-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(184,251,60,0.03) 2px,
    rgba(184,251,60,0.03) 4px
  );
  pointer-events: none;
}`,
      },
    ],
  },
};

function ExamplePreview({ example, accentColor }: { example: { id: string; name: string; css: string; previewBg: string }; accentColor: string }) {
  const [copied, setCopied] = useState(false);

  const demoHtml = DEMO_HTML[example.id] ?? `<div style="color:rgba(255,255,255,0.4);font-family:sans-serif;font-size:12px">${example.name}</div>`;

  const srcdoc = `<!DOCTYPE html><html><head><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${example.previewBg}; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
  ${example.css}
</style></head><body>${demoHtml}</body></html>`;

  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: '#2A2A2A' }}>
      <div className="h-[140px] relative overflow-hidden" style={{ background: example.previewBg }}>
        <iframe
          srcDoc={srcdoc}
          title={example.name}
          className="w-full h-full border-0"
          sandbox="allow-scripts"
          scrolling="no"
          style={{ pointerEvents: 'none' }}
        />
      </div>
      <div className="p-3 border-t flex items-center justify-between gap-2" style={{ background: '#0D0D0D', borderColor: '#2A2A2A' }}>
        <span className="text-xs font-semibold text-white/60">{example.name}</span>
        <button onClick={() => { navigator.clipboard.writeText(example.css).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all"
          style={{ background: copied ? `${accentColor}22` : 'rgba(255,255,255,0.06)', color: copied ? accentColor : 'rgba(255,255,255,0.5)', border: `1px solid ${copied ? accentColor : '#2A2A2A'}` }}>
          {copied ? '✓ Copied' : 'Copy CSS'}
        </button>
      </div>
    </div>
  );
}

export default function TrendSlugPage() {
  const router = useRouter();
  const slug = router.query.slug as TrendSlug;
  const trend = TREND_DATA[slug];

  if (!trend) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: '#0D0D0D' }}>
        <div className="text-center">
          <p className="text-white/40 text-lg mb-4">Trend not found</p>
          <Link href="/trends" className="text-[#6C63FF] hover:underline text-sm">← Back to Trends</Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <PageSEO
        title={`${trend.name} — UI Trends — UIXplor`}
        description={`${trend.description} Live examples and copy-paste CSS code.`}
        path={`/trends/${slug}`}
        keywords={[trend.name.toLowerCase(), 'UI trend', 'CSS examples', 'design inspiration']}
      />
      <main className="min-h-screen" style={{ background: '#0D0D0D' }}>
        <section className="container px-4 sm:px-6 pt-28 pb-10">
          <Link href="/trends" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/60 mb-6 transition-colors">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            UI Trends
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${trend.accentColor}18`, border: `1px solid ${trend.accentColor}30` }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={trend.accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4l3 3" />
              </svg>
            </div>
            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="text-3xl sm:text-4xl font-bold text-white">{trend.name}
            </motion.h1>
          </div>
          <p className="text-white/50 max-w-2xl text-sm">{trend.description}</p>
        </section>

        <section className="container px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trend.examples.map((ex, i) => (
              <motion.div key={ex.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}>
                <ExamplePreview example={ex} accentColor={trend.accentColor} />
              </motion.div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border p-4 flex items-start gap-3" style={{ background: 'rgba(108,99,255,0.05)', borderColor: 'rgba(108,99,255,0.2)' }}>
            <svg width="16" height="16" style={{ color: '#6C63FF', marginTop: 2, flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-xs text-white/40 leading-relaxed">
              These examples show the core CSS techniques. Click{' '}
              <Link href="/playground" className="underline" style={{ color: '#6C63FF' }}>Open Playground</Link>{' '}
              to edit and preview any code live in your browser.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
