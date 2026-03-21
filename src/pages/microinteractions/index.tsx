'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import PageSEO from '@/components/seo/PageSEO';

// ————— Magnetic Button —————
function MagneticButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setPos({ x: (e.clientX - cx) * 0.35, y: (e.clientY - cy) * 0.35 });
    };
    const reset = () => setPos({ x: 0, y: 0 });
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', reset);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', reset); };
  }, []);

  return (
    <motion.button
      ref={ref}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 18, mass: 0.5 }}
      className="px-8 py-3 rounded-full font-semibold text-white text-sm cursor-pointer border"
      style={{ background: 'rgba(108,99,255,0.12)', borderColor: 'rgba(108,99,255,0.4)' }}
    >
      Magnetic Button 🧲
    </motion.button>
  );
}

// ————— Ripple Button —————
function RippleButton() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  };

  return (
    <button
      onClick={handleClick}
      className="relative px-8 py-3 rounded-full font-semibold text-white text-sm overflow-hidden cursor-pointer border"
      style={{ background: 'rgba(244, 114, 182, 0.1)', borderColor: 'rgba(244,114,182,0.4)' }}
    >
      <span className="relative z-10">Click for Ripple 💧</span>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: r.x - 60,
            top: r.y - 60,
            width: 120,
            height: 120,
            background: 'rgba(244,114,182,0.35)',
            animation: 'ripple-expand 0.65s ease-out forwards',
          }}
        />
      ))}
      <style>{`@keyframes ripple-expand { from { transform: scale(0); opacity: 1; } to { transform: scale(3); opacity: 0; } }`}</style>
    </button>
  );
}

// ————— Cursor Glow —————
function CursorGlow() {
  const boxRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const glow = glowRef.current;
    if (!box || !glow) return;
    const move = (e: MouseEvent) => {
      const rect = box.getBoundingClientRect();
      glow.style.left = `${e.clientX - rect.left}px`;
      glow.style.top = `${e.clientY - rect.top}px`;
      glow.style.opacity = '1';
    };
    const leave = () => { glow.style.opacity = '0'; };
    box.addEventListener('mousemove', move);
    box.addEventListener('mouseleave', leave);
    return () => { box.removeEventListener('mousemove', move); box.removeEventListener('mouseleave', leave); };
  }, []);

  return (
    <div
      ref={boxRef}
      className="relative w-64 h-20 rounded-2xl border flex items-center justify-center text-sm font-semibold overflow-hidden cursor-crosshair"
      style={{ background: '#0D0D0D', borderColor: '#2A2A2A', color: 'rgba(255,255,255,0.5)' }}
    >
      <div
        ref={glowRef}
        className="absolute pointer-events-none rounded-full"
        style={{ width: 140, height: 140, marginLeft: -70, marginTop: -70, background: 'radial-gradient(circle, rgba(108,99,255,0.35) 0%, transparent 70%)', transition: 'opacity 0.3s ease', opacity: 0 }}
      />
      <span className="relative z-10">Move cursor here ✦</span>
    </div>
  );
}

// ————— Blob Morph Button —————
function BlobMorphButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-8 py-3 font-semibold text-white text-sm cursor-pointer transition-all duration-500"
      style={{
        background: 'linear-gradient(135deg, #6C63FF, #8b5cf6)',
        borderRadius: hovered ? '60% 40% 30% 70% / 60% 30% 70% 40%' : '12px',
        transition: 'border-radius 0.6s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? '0 0 30px rgba(108,99,255,0.5)' : 'none',
      }}
    >
      Blob Morph 🫧
    </button>
  );
}

// ————— Hover Tilt Card —————
function TiltCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ rx: -y * 16, ry: x * 16 });
    };
    const reset = () => setTilt({ rx: 0, ry: 0 });
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', reset);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', reset); };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transform: `perspective(600px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: 'transform 0.15s ease',
        background: 'linear-gradient(135deg, #151515 0%, #1e1a2e 100%)',
        border: '1px solid rgba(108,99,255,0.3)',
        borderRadius: 16,
        padding: '24px 28px',
        cursor: 'pointer',
        width: 200,
      }}
    >
      <div className="text-2xl mb-2">⚡</div>
      <h3 className="text-white font-bold text-sm">Tilt Card</h3>
      <p className="text-white/40 text-xs mt-1">Hover to feel the 3D</p>
    </div>
  );
}

// ————— Text Scramble —————
function TextScramble() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%';
  const target = 'UIXplor ✦';
  const [text, setText] = useState(target);
  const running = useRef(false);

  const scramble = () => {
    if (running.current) return;
    running.current = true;
    let iteration = 0;
    const interval = setInterval(() => {
      setText(target.split('').map((ch, i) =>
        i < iteration ? target[i] : chars[Math.floor(Math.random() * chars.length)]
      ).join(''));
      iteration += 0.4;
      if (iteration >= target.length) { clearInterval(interval); setText(target); running.current = false; }
    }, 40);
  };

  return (
    <button
      onMouseEnter={scramble}
      className="px-6 py-3 rounded-xl border font-bold text-lg tracking-wider cursor-pointer transition-all duration-200 font-mono"
      style={{ background: 'rgba(184,251,60,0.05)', borderColor: 'rgba(184,251,60,0.3)', color: '#B8FB3C' }}
    >
      {text}
    </button>
  );
}

const MICRO_INTERACTIONS = [
  {
    id: 'magnetic',
    name: 'Magnetic Button',
    description: 'Button follows cursor with spring physics',
    tag: 'React',
    tagColor: '#60a5fa',
    css: `// Use motion/react for spring animation
import { motion } from 'motion/react';
// Track mouse position relative to button center,
// apply x/y offset with spring transition`,
    component: <MagneticButton />,
  },
  {
    id: 'ripple',
    name: 'Ripple Effect',
    description: 'Click creates an expanding ripple wave',
    tag: 'React',
    tagColor: '#f472b6',
    css: `// On click: record (x, y) relative to button
// Add absolute <span> with scale animation
// Remove after 700ms`,
    component: <RippleButton />,
  },
  {
    id: 'cursor-glow',
    name: 'Cursor Glow',
    description: 'Radial gradient follows cursor inside element',
    tag: 'Vanilla JS',
    tagColor: '#fbbf24',
    css: `el.addEventListener('mousemove', (e) => {
  const rect = el.getBoundingClientRect();
  glow.style.left = e.clientX - rect.left + 'px';
  glow.style.top = e.clientY - rect.top + 'px';
});`,
    component: <CursorGlow />,
  },
  {
    id: 'blob-morph',
    name: 'Blob Morph',
    description: 'Button border-radius morphs into organic blob',
    tag: 'CSS',
    tagColor: '#34d399',
    css: `.blob:hover {
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  transition: border-radius 0.6s ease;
}`,
    component: <BlobMorphButton />,
  },
  {
    id: 'tilt-card',
    name: '3D Tilt Card',
    description: 'Card tilts in 3D following mouse position',
    tag: 'Vanilla JS',
    tagColor: '#a78bfa',
    css: `const x = (mouseX / width - 0.5) * 16; // degrees
const y = -(mouseY / height - 0.5) * 16;
el.style.transform =
  \`perspective(600px) rotateX(\${y}deg) rotateY(\${x}deg)\`;`,
    component: <TiltCard />,
  },
  {
    id: 'text-scramble',
    name: 'Text Scramble',
    description: 'Text reveals itself through random character scrambling',
    tag: 'React',
    tagColor: '#B8FB3C',
    css: `// Iterate over characters, for each position:
// show random char until iteration reaches that index
// setInterval at ~40ms, increment by 0.4 per tick`,
    component: <TextScramble />,
  },
];

function MicroCard({ item }: { item: typeof MICRO_INTERACTIONS[0] }) {
  const [copied, setCopied] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border overflow-hidden"
      style={{ background: '#151515', borderColor: '#2A2A2A' }}
    >
      <div className="h-36 flex items-center justify-center" style={{ background: '#0D0D0D' }}>
        {item.component}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-semibold text-white">{item.name}</h3>
          <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${item.tagColor}18`, color: item.tagColor }}>
            {item.tag}
          </span>
        </div>
        <p className="text-xs text-white/40 mb-3">{item.description}</p>
        <div className="relative rounded-xl overflow-hidden" style={{ background: '#0D0D0D', border: '1px solid #2A2A2A' }}>
          <pre className="text-[10px] p-3 overflow-x-auto text-white/50 font-mono leading-relaxed max-h-24"><code>{item.css}</code></pre>
          <button
            onClick={() => { navigator.clipboard.writeText(item.css).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }}
            className="absolute top-2 right-2 p-1.5 rounded-lg transition-all duration-200"
            style={{ background: copied ? 'rgba(108,99,255,0.3)' : 'rgba(255,255,255,0.06)', color: copied ? '#a78bfa' : 'rgba(255,255,255,0.4)' }}
          >
            {copied
              ? <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              : <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            }
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function MicroInteractionsPage() {
  return (
    <>
      <PageSEO
        title="Micro Interactions Gallery — UIXplor"
        description="Live previews of magnetic buttons, ripple effects, cursor glow, blob morphing, 3D tilt cards and text scramble effects."
        path="/microinteractions"
        keywords={['micro interactions', 'magnetic button', 'ripple effect', 'cursor glow', 'blob morph', '3D tilt card']}
      />
      <main className="min-h-screen" style={{ background: '#0D0D0D' }}>
        <section className="container px-4 sm:px-6 pt-28 pb-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
            style={{ background: 'rgba(244,114,182,0.08)', borderColor: 'rgba(244,114,182,0.25)', color: '#f472b6' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f472b6] animate-pulse" />
            Micro Interactions
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Micro <span style={{ color: '#f472b6' }}>Interactions</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto text-base">
            Delightful physics, effects, and interactions. Hover, click, and move your cursor to see them in action.
          </motion.p>
        </section>

        <section className="container px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MICRO_INTERACTIONS.map((item) => <MicroCard key={item.id} item={item} />)}
          </div>
        </section>
      </main>
    </>
  );
}
