'use client';

import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import PageSEO from '@/components/seo/PageSEO';

type ElementType = 'button' | 'card' | 'input';
type HoverEffect = 'none' | 'lift' | 'glow' | 'scale' | 'border';

interface BuilderState {
  element: ElementType;
  primaryColor: string;
  bgColor: string;
  textColor: string;
  borderRadius: number;
  fontSize: number;
  paddingX: number;
  paddingY: number;
  shadow: 'none' | 'sm' | 'md' | 'lg' | 'glow';
  hoverEffect: HoverEffect;
  gradient: boolean;
  gradientEnd: string;
  border: boolean;
  borderColor: string;
  text: string;
}

const DEFAULTS: BuilderState = {
  element: 'button',
  primaryColor: '#6C63FF',
  bgColor: '#6C63FF',
  textColor: '#ffffff',
  borderRadius: 12,
  fontSize: 15,
  paddingX: 24,
  paddingY: 12,
  shadow: 'md',
  hoverEffect: 'glow',
  gradient: false,
  gradientEnd: '#8b5cf6',
  border: false,
  borderColor: '#6C63FF',
  text: 'Click Me',
};

const shadowMap = {
  none: 'none',
  sm: '0 2px 8px rgba(0,0,0,0.3)',
  md: '0 4px 16px rgba(0,0,0,0.4)',
  lg: '0 8px 32px rgba(0,0,0,0.5)',
  glow: '0 0 24px rgba(108,99,255,0.45)',
};

function buildCSS(s: BuilderState): string {
  const bg = s.gradient
    ? `background: linear-gradient(135deg, ${s.bgColor}, ${s.gradientEnd});`
    : `background: ${s.bgColor};`;

  let hover = '';
  if (s.hoverEffect === 'lift') hover = `  transform: translateY(-4px);\n  box-shadow: 0 12px 30px rgba(0,0,0,0.4);`;
  else if (s.hoverEffect === 'glow') hover = `  box-shadow: 0 0 0 3px ${s.bgColor}44, 0 0 24px ${s.bgColor}66;\n  transform: translateY(-2px);`;
  else if (s.hoverEffect === 'scale') hover = `  transform: scale(1.06);`;
  else if (s.hoverEffect === 'border') hover = `  border-color: ${s.bgColor};\n  box-shadow: inset 0 0 0 2px ${s.bgColor};`;

  const borderLine = s.border ? `border: 1px solid ${s.borderColor};` : 'border: none;';

  return `.my-element {
  ${bg}
  color: ${s.textColor};
  font-size: ${s.fontSize}px;
  font-weight: 600;
  padding: ${s.paddingY}px ${s.paddingX}px;
  border-radius: ${s.borderRadius}px;
  ${borderLine}
  box-shadow: ${shadowMap[s.shadow]};
  cursor: pointer;
  transition: all 0.25s ease;
  display: inline-block;
}${hover ? `\n.my-element:hover {\n${hover}\n}` : ''}`;
}

function buildTailwind(s: BuilderState): string {
  const rMap: Record<number, string> = { 0: 'rounded-none', 4: 'rounded', 8: 'rounded-lg', 12: 'rounded-xl', 16: 'rounded-2xl', 24: 'rounded-full' };
  const r = rMap[s.borderRadius] || `rounded-[${s.borderRadius}px]`;
  const bg = s.gradient ? `bg-gradient-to-r from-[${s.bgColor}] to-[${s.gradientEnd}]` : `bg-[${s.bgColor}]`;
  const shadow = s.shadow === 'glow' ? `shadow-[0_0_24px_${s.bgColor}66]` : s.shadow === 'none' ? '' : `shadow-${s.shadow}`;
  const hover = s.hoverEffect === 'lift' ? 'hover:-translate-y-1 hover:shadow-xl' : s.hoverEffect === 'scale' ? 'hover:scale-105' : '';
  return `<button class="${bg} text-[${s.textColor}] text-[${s.fontSize}px] font-semibold py-[${s.paddingY}px] px-[${s.paddingX}px] ${r} ${shadow} ${hover} transition-all duration-250 ${s.border ? `border border-[${s.borderColor}]` : ''}">
  ${s.text}
</button>`.replace(/\s+/g, ' ').replace('> <', '>\n  <').trim();
}

function LivePreview({ s, hovered }: { s: BuilderState; hovered: boolean }) {
  const style: React.CSSProperties = {
    background: s.gradient ? `linear-gradient(135deg, ${s.bgColor}, ${s.gradientEnd})` : s.bgColor,
    color: s.textColor,
    fontSize: s.fontSize,
    fontWeight: 600,
    padding: `${s.paddingY}px ${s.paddingX}px`,
    borderRadius: s.borderRadius,
    border: s.border ? `1px solid ${s.borderColor}` : 'none',
    boxShadow: shadowMap[s.shadow],
    cursor: 'pointer',
    display: 'inline-block',
    transition: 'all 0.25s ease',
    userSelect: 'none',
  };

  if (hovered) {
    if (s.hoverEffect === 'lift') { style.transform = 'translateY(-4px)'; style.boxShadow = '0 12px 30px rgba(0,0,0,0.4)'; }
    if (s.hoverEffect === 'glow') { style.boxShadow = `0 0 0 3px ${s.bgColor}44, 0 0 24px ${s.bgColor}66`; style.transform = 'translateY(-2px)'; }
    if (s.hoverEffect === 'scale') { style.transform = 'scale(1.06)'; }
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div style={style}>{s.text}</div>
    </div>
  );
}

function Slider({ label, value, min, max, step = 1, onChange }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs text-white/50">{label}</span>
        <span className="text-xs text-white/70 font-mono">{value}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ background: `linear-gradient(to right, #6C63FF ${((value - min) / (max - min)) * 100}%, #2A2A2A ${((value - min) / (max - min)) * 100}%)` }}
      />
    </div>
  );
}

export default function BuilderPage() {
  const [s, setS] = useState<BuilderState>(DEFAULTS);
  const [tab, setTab] = useState<'css' | 'tailwind'>('css');
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const update = useCallback(<K extends keyof BuilderState>(key: K, val: BuilderState[K]) => {
    setS((prev) => ({ ...prev, [key]: val }));
  }, []);

  const code = tab === 'css' ? buildCSS(s) : buildTailwind(s);

  const copy = () => {
    navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <>
      <PageSEO
        title="Component Builder — UIXplor"
        description="Visually build UI components and generate clean CSS and Tailwind code instantly. Customize colors, shadows, border radius, and hover effects."
        path="/builder"
        keywords={['component builder', 'UI builder', 'CSS generator', 'Tailwind generator', 'button designer']}
      />
      <main className="min-h-screen" style={{ background: '#0D0D0D' }}>
        <section className="container px-4 sm:px-6 pt-28 pb-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Component <span style={{ color: '#6C63FF' }}>Builder</span>
          </motion.h1>
          <p className="text-white/40 text-sm">Tweak controls → get clean CSS and Tailwind output instantly</p>
        </section>

        <section className="container px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5">

            {/* Controls Panel */}
            <div className="rounded-2xl border p-5 space-y-5 h-fit" style={{ background: '#151515', borderColor: '#2A2A2A' }}>
              {/* Element type */}
              <div>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Element</p>
                <div className="flex gap-2">
                  {(['button', 'card', 'input'] as ElementType[]).map((el) => (
                    <button key={el} onClick={() => { update('element', el); update('text', el === 'button' ? 'Click Me' : el === 'card' ? 'Card Title' : 'Type here...'); }}
                      className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all capitalize"
                      style={{ background: s.element === el ? '#6C63FF' : 'rgba(255,255,255,0.05)', color: s.element === el ? '#fff' : 'rgba(255,255,255,0.4)' }}>
                      {el}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text */}
              <div>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Label Text</p>
                <input value={s.text} onChange={(e) => update('text', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
                  style={{ background: '#0D0D0D', border: '1px solid #2A2A2A' }} />
              </div>

              {/* Colors */}
              <div>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Colors</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input type="color" value={s.bgColor} onChange={(e) => update('bgColor', e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer border-0" style={{ background: 'none' }} />
                    <div className="flex-1">
                      <p className="text-xs text-white/50">Background</p>
                      <p className="text-xs font-mono text-white/70">{s.bgColor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="color" value={s.textColor} onChange={(e) => update('textColor', e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer" />
                    <div className="flex-1">
                      <p className="text-xs text-white/50">Text Color</p>
                      <p className="text-xs font-mono text-white/70">{s.textColor}</p>
                    </div>
                  </div>
                </div>
                <label className="flex items-center gap-2 mt-3 cursor-pointer">
                  <div onClick={() => update('gradient', !s.gradient)}
                    className="w-9 h-5 rounded-full transition-colors relative"
                    style={{ background: s.gradient ? '#6C63FF' : '#2A2A2A' }}>
                    <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                      style={{ left: s.gradient ? '18px' : '2px' }} />
                  </div>
                  <span className="text-xs text-white/50">Gradient</span>
                </label>
                {s.gradient && (
                  <div className="flex items-center gap-3 mt-2">
                    <input type="color" value={s.gradientEnd} onChange={(e) => update('gradientEnd', e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer" />
                    <p className="text-xs text-white/50">Gradient End</p>
                  </div>
                )}
              </div>

              {/* Shape */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">Shape</p>
                <Slider label="Border Radius" value={s.borderRadius} min={0} max={40} onChange={(v) => update('borderRadius', v)} />
                <Slider label="Font Size" value={s.fontSize} min={11} max={22} onChange={(v) => update('fontSize', v)} />
                <Slider label="Padding X" value={s.paddingX} min={8} max={48} onChange={(v) => update('paddingX', v)} />
                <Slider label="Padding Y" value={s.paddingY} min={6} max={28} onChange={(v) => update('paddingY', v)} />
              </div>

              {/* Shadow */}
              <div>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Shadow</p>
                <div className="flex flex-wrap gap-2">
                  {(['none', 'sm', 'md', 'lg', 'glow'] as const).map((sh) => (
                    <button key={sh} onClick={() => update('shadow', sh)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold transition-all capitalize"
                      style={{ background: s.shadow === sh ? 'rgba(108,99,255,0.2)' : 'rgba(255,255,255,0.04)', color: s.shadow === sh ? '#a78bfa' : 'rgba(255,255,255,0.4)', border: `1px solid ${s.shadow === sh ? 'rgba(108,99,255,0.4)' : '#2A2A2A'}` }}>
                      {sh}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hover Effect */}
              <div>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Hover Effect</p>
                <div className="flex flex-wrap gap-2">
                  {(['none', 'lift', 'glow', 'scale'] as HoverEffect[]).map((ef) => (
                    <button key={ef} onClick={() => update('hoverEffect', ef)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold transition-all capitalize"
                      style={{ background: s.hoverEffect === ef ? 'rgba(108,99,255,0.2)' : 'rgba(255,255,255,0.04)', color: s.hoverEffect === ef ? '#a78bfa' : 'rgba(255,255,255,0.4)', border: `1px solid ${s.hoverEffect === ef ? 'rgba(108,99,255,0.4)' : '#2A2A2A'}` }}>
                      {ef}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview + Code */}
            <div className="space-y-4">
              {/* Preview */}
              <div className="rounded-2xl border overflow-hidden" style={{ background: '#151515', borderColor: '#2A2A2A' }}>
                <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: '#2A2A2A' }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                  <span className="text-xs text-white/30 ml-2">Live Preview</span>
                </div>
                <div className="h-52" style={{ background: '#0A0A0A' }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}>
                  <LivePreview s={s} hovered={hovered} />
                </div>
                <p className="text-center text-white/20 text-xs py-2">Hover over the preview to see hover effects</p>
              </div>

              {/* Code Output */}
              <div className="rounded-2xl border overflow-hidden" style={{ background: '#151515', borderColor: '#2A2A2A' }}>
                <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: '#2A2A2A' }}>
                  <div className="flex gap-1">
                    {(['css', 'tailwind'] as const).map((t) => (
                      <button key={t} onClick={() => setTab(t)}
                        className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
                        style={{ background: tab === t ? 'rgba(108,99,255,0.15)' : 'transparent', color: tab === t ? '#a78bfa' : 'rgba(255,255,255,0.35)' }}>
                        {t === 'css' ? 'CSS' : 'Tailwind'}
                      </button>
                    ))}
                  </div>
                  <button onClick={copy}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{ background: copied ? 'rgba(108,99,255,0.2)' : 'rgba(255,255,255,0.06)', color: copied ? '#a78bfa' : 'rgba(255,255,255,0.5)', border: `1px solid ${copied ? 'rgba(108,99,255,0.4)' : '#2A2A2A'}` }}>
                    {copied ? '✓ Copied!' : 'Copy Code'}
                  </button>
                </div>
                <pre className="p-4 text-[12px] text-white/70 font-mono leading-relaxed overflow-x-auto" style={{ background: '#0D0D0D', minHeight: 160 }}>
                  <code>{code}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
