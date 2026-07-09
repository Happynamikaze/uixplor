'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import PageSEO from '@/components/seo/PageSEO';

/* -------------------------------------------------------------------------
   TYPES & UTILS
   ------------------------------------------------------------------------- */

type Unit = 'px' | 'rem' | 'em';

interface FluidConfig {
  minViewport: number;
  maxViewport: number;
  minFontSize: number;
  maxFontSize: number;
  rootSize: number;
  unit: Unit;
}

const DEFAULT_CONFIG: FluidConfig = {
  minViewport: 375,
  maxViewport: 1440,
  minFontSize: 16,
  maxFontSize: 22,
  rootSize: 16,
  unit: 'rem',
};

// Math
function round(value: number, decimals: number = 4): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

function generateClamp(config: FluidConfig): string {
  const { minViewport, maxViewport, minFontSize, maxFontSize, rootSize, unit } = config;
  
  // Calculate relative sizes based on unit
  let minV = minFontSize;
  let maxV = maxFontSize;
  let minW = minViewport;
  let maxW = maxViewport;

  if (unit === 'rem' || unit === 'em') {
    minV = minFontSize / rootSize;
    maxV = maxFontSize / rootSize;
    minW = minViewport / rootSize;
    maxW = maxViewport / rootSize;
  }

  const slope = (maxV - minV) / (maxW - minW);
  const yInt = minV - slope * minW;
  const vw = slope * 100;

  const minStr = `${round(minV)}${unit}`;
  const maxStr = `${round(maxV)}${unit}`;
  const valStr = `${round(yInt)}${unit} + ${round(vw)}vw`;

  return `clamp(${minStr}, ${valStr}, ${maxStr})`;
}

function valueAtViewport(viewport: number, config: FluidConfig): number {
  if (viewport <= config.minViewport) return config.minFontSize;
  if (viewport >= config.maxViewport) return config.maxFontSize;
  return config.minFontSize + ((viewport - config.minViewport) / (config.maxViewport - config.minViewport)) * (config.maxFontSize - config.minFontSize);
}

// Icons
const IconInfo = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);
const IconCopy = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
);
const IconSettings = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

/* -------------------------------------------------------------------------
   COMPONENTS
   ------------------------------------------------------------------------- */

// Premium Tooltip
const Tooltip = ({ text, children }: { text: string; children: React.ReactNode }) => {
  const [show, setShow] = useState(false);
  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-neutral-900 text-neutral-200 text-[11px] font-medium rounded-lg shadow-xl border border-neutral-800 whitespace-nowrap z-50 pointer-events-none"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-neutral-800" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Form Input
const Field = ({ 
  label, helper, value, onChange, min, max, icon, tooltip 
}: { 
  label: string; helper: string; value: number; onChange: (v: number) => void; min?: number; max?: number; icon?: string; tooltip?: string;
}) => {
  return (
    <div className="flex flex-col gap-1.5 mb-5">
      <div className="flex items-center justify-between">
        <label className="text-[13px] font-semibold text-neutral-200 flex items-center gap-1.5">
          {icon && <span className="opacity-70">{icon}</span>}
          {label}
        </label>
        {tooltip && (
          <Tooltip text={tooltip}>
            <button className="text-neutral-500 hover:text-neutral-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-0.5">
              <IconInfo />
            </button>
          </Tooltip>
        )}
      </div>
      <p className="text-[11px] text-neutral-500 mb-1">{helper}</p>
      <div className="relative group">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-neutral-100 font-mono transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 hover:border-neutral-700"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-neutral-600 font-mono pointer-events-none group-hover:text-neutral-500 transition-colors">px</span>
      </div>
    </div>
  );
};

// Output Tabs
const OUTPUT_TABS = ['CSS', 'Tailwind', 'SCSS Variable', 'CSS Variable', 'Clamp Formula'] as const;
type OutputTab = typeof OUTPUT_TABS[number];

const OutputGenerator = ({ config }: { config: FluidConfig }) => {
  const [activeTab, setActiveTab] = useState<OutputTab>('CSS');
  const [copied, setCopied] = useState(false);
  const clampStr = generateClamp(config);

  const getCode = () => {
    switch (activeTab) {
      case 'CSS': return `font-size: ${clampStr};`;
      case 'Tailwind': return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      fontSize: {\n        fluid: '${clampStr}',\n      }\n    }\n  }\n}`;
      case 'SCSS Variable': return `$font-size-fluid: ${clampStr};`;
      case 'CSS Variable': return `:root {\n  --font-size-fluid: ${clampStr};\n}`;
      case 'Clamp Formula': return clampStr;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden backdrop-blur-xl">
      <div className="flex overflow-x-auto hide-scrollbar border-b border-neutral-800 p-1.5 gap-1">
        {OUTPUT_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 text-[11px] font-medium rounded-lg transition-all whitespace-nowrap ${activeTab === tab ? 'bg-neutral-800 text-neutral-100 shadow-sm' : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50'}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-5 relative group">
        <pre className="text-[13px] font-mono text-neutral-300 overflow-x-auto">
          <code>{getCode()}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-neutral-700 hover:text-white shadow-lg flex items-center gap-2 focus:opacity-100"
        >
          {copied ? <><IconCheck /><span className="text-[11px] font-medium">Copied</span></> : <><IconCopy /><span className="text-[11px] font-medium">Copy</span></>}
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   MAIN PAGE
   ------------------------------------------------------------------------- */

export default function FluidCalculator() {
  const [config, setConfig] = useState<FluidConfig>(DEFAULT_CONFIG);
  const [advanced, setAdvanced] = useState(false);
  const [currentVw, setCurrentVw] = useState(768);

  // Validation
  const hasError = config.maxFontSize < config.minFontSize;

  const fixError = () => {
    setConfig(c => ({ ...c, minFontSize: c.maxFontSize, maxFontSize: c.minFontSize }));
  };

  const applyPreset = (minF: number, maxF: number) => {
    setConfig(c => ({ ...c, minFontSize: minF, maxFontSize: maxF }));
  };

  // Derived
  const liveSize = valueAtViewport(currentVw, config);

  return (
    <>
      <PageSEO
        title="Fluid Typography Calculator & PX to REM Converter — UIXplor"
        description="A beautiful, intuitive fluid typography calculator and PX to REM converter. Generate CSS clamp() values effortlessly for responsive web design."
        path="/toolkit/fluid"
        keywords={['fluid typography', 'css clamp generator', 'px to rem converter', 'responsive font size', 'tailwind clamp', 'rem calculator', 'css clamp formula']}
      />
      <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 selection:bg-blue-500/30 font-sans pb-32">
        {/* Header */}
        <header className="max-w-6xl mx-auto px-6 pt-24 pb-12 border-b border-neutral-900">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-[11px] font-medium text-neutral-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Toolkit / Fluid Typography
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-50 mb-4">
            Fluid Typography Calculator
          </h1>
          <p className="text-neutral-400 text-lg max-w-xl leading-relaxed">
            Generate responsive typography that scales smoothly across devices. Use our PX to REM converter and CSS clamp() generator without the math.
          </p>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* LEFT: Inputs */}
          <section className="lg:col-span-5 space-y-8">
            
            {/* Presets */}
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-3">Quick Presets</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { l: 'Display', min: 48, max: 80 },
                  { l: 'H1', min: 32, max: 48 },
                  { l: 'H2', min: 24, max: 36 },
                  { l: 'H3', min: 20, max: 28 },
                  { l: 'Body', min: 16, max: 20 },
                  { l: 'Caption', min: 14, max: 16 },
                  { l: 'Small Text', min: 12, max: 14 },
                  { l: 'Button', min: 14, max: 18 },
                ].map(p => (
                  <button 
                    key={p.l}
                    onClick={() => applyPreset(p.min, p.max)}
                    className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-lg text-[12px] font-medium text-neutral-300 transition-colors"
                  >
                    {p.l}
                  </button>
                ))}
              </div>
            </div>

            {/* Core Settings */}
            <div className="p-1 rounded-2xl bg-neutral-900/30 border border-neutral-800/50">
              <div className="p-5">
                <Field
                  icon="📱"
                  label="Font size on Mobile"
                  helper="How large should this text appear on a phone?"
                  value={config.minFontSize}
                  onChange={(v) => setConfig(c => ({ ...c, minFontSize: v }))}
                  tooltip="The font size applied when the screen is at or below the mobile screen width."
                />
                <Field
                  icon="💻"
                  label="Font size on Desktop"
                  helper="How large should it appear on a large monitor?"
                  value={config.maxFontSize}
                  onChange={(v) => setConfig(c => ({ ...c, maxFontSize: v }))}
                  tooltip="The font size applied when the screen is at or above the desktop screen width."
                />
                
                <AnimatePresence>
                  {hasError && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }} 
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
                        <div className="text-amber-500 mt-0.5"><IconInfo /></div>
                        <div className="flex-1">
                          <p className="text-[12px] text-amber-200/90 font-medium leading-relaxed">Desktop font size is smaller than Mobile. Typically, text scales up on larger screens.</p>
                          <button onClick={fixError} className="mt-2 text-[11px] font-bold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 px-3 py-1.5 rounded-lg transition-colors">Fix automatically</button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Advanced Toggle */}
              <div className="border-t border-neutral-800/50">
                <button 
                  onClick={() => setAdvanced(!advanced)}
                  className="w-full p-4 flex items-center justify-center gap-2 text-[12px] font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  <IconSettings /> {advanced ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
                </button>
                <AnimatePresence>
                  {advanced && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-2 border-t border-neutral-800/50 space-y-5 bg-neutral-900/50 rounded-b-2xl">
                        <div className="grid grid-cols-2 gap-4">
                          <Field
                            icon="📱"
                            label="Screen Width (Mobile)"
                            helper="Start scaling at"
                            value={config.minViewport}
                            onChange={(v) => setConfig(c => ({ ...c, minViewport: v }))}
                            tooltip="What is viewport width? It's the width of the screen. Mobile is typically 375px or 320px."
                          />
                          <Field
                            icon="🖥️"
                            label="Screen Width (Desktop)"
                            helper="Stop scaling at"
                            value={config.maxViewport}
                            onChange={(v) => setConfig(c => ({ ...c, maxViewport: v }))}
                            tooltip="Desktop viewport width. Usually 1024px, 1280px, or 1440px."
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-t border-neutral-800 pt-5">
                          <div>
                            <label className="text-[13px] font-semibold text-neutral-200 flex items-center justify-between mb-1">
                              Output Unit
                              <Tooltip text="What is REM? Rem is a CSS unit relative to the root font size, crucial for accessibility.">
                                <button className="text-neutral-500 hover:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-0.5">
                                  <IconInfo />
                                </button>
                              </Tooltip>
                            </label>
                            <p className="text-[11px] text-neutral-500 mb-2">CSS unit for clamp</p>
                            <select
                              value={config.unit}
                              onChange={(e) => setConfig(c => ({ ...c, unit: e.target.value as Unit }))}
                              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-100 font-mono transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none"
                            >
                              <option value="rem">rem (Recommended)</option>
                              <option value="px">px</option>
                              <option value="em">em</option>
                            </select>
                          </div>
                          <Field
                            label="Root Font Size"
                            helper="Used for rem calc"
                            value={config.rootSize}
                            onChange={(v) => setConfig(c => ({ ...c, rootSize: v }))}
                            tooltip="Default browser root font size is usually 16px."
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </section>

          {/* RIGHT: Visuals & Output */}
          <section className="lg:col-span-7 space-y-6 lg:sticky lg:top-8">
            
            {/* Live Preview Area */}
            <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-3xl p-1 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
              
              <div className="p-8 min-h-[220px] flex items-center justify-center border-b border-neutral-800/50 relative overflow-hidden">
                {/* Background grid */}
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.3 }} />
                
                <motion.div 
                  layout
                  className="relative z-10 text-center font-bold tracking-tight text-neutral-50 transition-all"
                  style={{ fontSize: `${liveSize}px`, lineHeight: 1.2 }}
                >
                  The quick brown fox
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    jumps over the lazy dog.
                  </span>
                </motion.div>
              </div>

              {/* Viewport Slider */}
              <div className="p-6 bg-neutral-900/50">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h4 className="text-[12px] font-bold text-neutral-300">Live Preview</h4>
                    <p className="text-[11px] text-neutral-500">Drag to resize viewport</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-mono font-bold text-neutral-100">{Math.round(currentVw)}<span className="text-[12px] text-neutral-500 ml-1">px</span></div>
                    <div className="text-[11px] font-mono text-blue-400">Font size: {round(liveSize, 1)}px</div>
                  </div>
                </div>

                <div className="relative h-12 flex items-center mb-2">
                  <input
                    type="range"
                    min={320}
                    max={1920}
                    value={currentVw}
                    onChange={(e) => setCurrentVw(Number(e.target.value))}
                    className="w-full absolute z-10 opacity-0 cursor-ew-resize h-full"
                  />
                  <div className="w-full h-2 bg-neutral-800 rounded-full relative overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-blue-500" 
                      style={{ width: `${((currentVw - 320) / (1920 - 320)) * 100}%` }}
                    />
                  </div>
                  {/* Custom Thumb */}
                  <div 
                    className="absolute w-5 h-5 bg-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] border-2 border-blue-500 pointer-events-none transition-transform group-active:scale-110"
                    style={{ left: `calc(${((currentVw - 320) / (1920 - 320)) * 100}% - 10px)` }}
                  />
                  
                  {/* Breakpoint markers */}
                  {[
                    { l: 'Mobile', v: config.minViewport }, 
                    { l: 'Tablet', v: (config.minViewport + config.maxViewport) / 2 }, 
                    { l: 'Desktop', v: config.maxViewport }
                  ].map((bp, i) => {
                    const pos = ((bp.v - 320) / (1920 - 320)) * 100;
                    if (pos < 0 || pos > 100) return null;
                    return (
                      <div key={i} className="absolute pointer-events-none flex flex-col items-center" style={{ left: `${pos}%`, transform: 'translateX(-50%)', top: '100%', marginTop: '4px' }}>
                        <div className="w-0.5 h-1.5 bg-neutral-600 mb-1 rounded-full" />
                        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest whitespace-nowrap">{bp.l}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Visual Scale Cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { l: 'Mobile', size: config.minFontSize, sub: `< ${config.minViewport}px` },
                { l: 'Tablet', size: valueAtViewport((config.minViewport + config.maxViewport) / 2, config), sub: 'Fluid' },
                { l: 'Desktop', size: config.maxFontSize, sub: `> ${config.maxViewport}px` },
              ].map((c, i) => (
                <div key={i} className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-4 text-center relative overflow-hidden group hover:border-neutral-700 transition-colors">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-1">{c.l}</div>
                  <motion.div 
                    key={c.size}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-xl font-mono font-bold text-neutral-100 mb-2"
                  >
                    {round(c.size, 1)}<span className="text-[11px] text-neutral-500 ml-0.5">px</span>
                  </motion.div>
                  <div className="text-[10px] text-neutral-600 font-mono bg-neutral-950/50 inline-block px-2 py-0.5 rounded-md">{c.sub}</div>
                </div>
              ))}
            </div>

            {/* Visual Clamp Explainer */}
            <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-2xl p-5 flex flex-col items-center">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 w-full mb-4 flex items-center gap-1.5">
                How clamp() works
                <Tooltip text="What is clamp()? It's a CSS function that clamps a value between an upper and lower bound, allowing responsive scaling without media queries.">
                  <button className="text-neutral-500 hover:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-0.5">
                    <IconInfo />
                  </button>
                </Tooltip>
              </h4>
              <div className="flex items-center justify-between w-full max-w-sm gap-2">
                <div className="flex-1 text-center bg-neutral-800/50 py-2 rounded-lg border border-neutral-700/50">
                  <div className="text-[9px] uppercase tracking-widest text-neutral-500 mb-0.5">Min Size</div>
                  <div className="text-[12px] font-mono text-neutral-300">{round(config.unit === 'rem' ? config.minFontSize / config.rootSize : config.minFontSize)}{config.unit}</div>
                </div>
                <div className="text-neutral-600 text-sm">→</div>
                <div className="flex-[1.5] text-center bg-blue-500/10 py-2 rounded-lg border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                  <div className="text-[9px] uppercase tracking-widest text-blue-400 mb-0.5">Fluid Scaling</div>
                  <div className="text-[12px] font-mono text-blue-300">vw based</div>
                </div>
                <div className="text-neutral-600 text-sm">→</div>
                <div className="flex-1 text-center bg-neutral-800/50 py-2 rounded-lg border border-neutral-700/50">
                  <div className="text-[9px] uppercase tracking-widest text-neutral-500 mb-0.5">Max Size</div>
                  <div className="text-[12px] font-mono text-neutral-300">{round(config.unit === 'rem' ? config.maxFontSize / config.rootSize : config.maxFontSize)}{config.unit}</div>
                </div>
              </div>
            </div>

            {/* Generated Output */}
            <OutputGenerator config={config} />

          </section>
        </main>
      </div>
      
      {/* Mobile Sticky CTA (Only visible on small screens) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-neutral-950/80 backdrop-blur-xl border-t border-neutral-900 z-50">
        <button 
          onClick={() => {
            navigator.clipboard.writeText(generateClamp(config));
            alert('CSS Clamp copied to clipboard!');
          }}
          className="w-full py-3.5 bg-neutral-100 hover:bg-white text-neutral-900 rounded-xl text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-colors flex items-center justify-center gap-2"
        >
          <IconCopy /> Copy CSS Clamp
        </button>
      </div>
    </>
  );
}
