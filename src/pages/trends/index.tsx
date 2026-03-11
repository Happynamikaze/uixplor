'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import PageSEO from '@/components/seo/PageSEO';

const TRENDS = [
  {
    slug: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Frosted glass cards with backdrop blur, translucency, and soft borders',
    icon: '🧊',
    gradient: 'from-sky-500/20 to-blue-600/10',
    accentColor: '#38bdf8',
    year: '2021–',
    popularity: 95,
  },
  {
    slug: 'neumorphism',
    name: 'Neumorphism',
    description: 'Extruded elements that appear to rise from the background using dual shadows',
    icon: '⚪',
    gradient: 'from-slate-400/10 to-slate-600/5',
    accentColor: '#94a3b8',
    year: '2020–',
    popularity: 72,
  },
  {
    slug: 'brutalist',
    name: 'Brutalist UI',
    description: 'Raw, unstyled aesthetics — thick borders, visible structure, unapologetic type',
    icon: '🟫',
    gradient: 'from-yellow-500/15 to-orange-500/10',
    accentColor: '#eab308',
    year: '2023–',
    popularity: 68,
  },
  {
    slug: 'gradient-ui',
    name: 'Gradient UI',
    description: 'Vibrant multi-stop gradients, aurora backdrops, and gradient-on-dark designs',
    icon: '🌈',
    gradient: 'from-violet-500/20 to-pink-500/10',
    accentColor: '#a78bfa',
    year: '2022–',
    popularity: 90,
  },
  {
    slug: '3d-ui',
    name: '3D UI',
    description: 'Depth, perspective, and layered Z-axis elements powered by CSS transforms',
    icon: '📦',
    gradient: 'from-emerald-500/15 to-teal-500/10',
    accentColor: '#34d399',
    year: '2023–',
    popularity: 78,
  },
  {
    slug: 'cyberpunk',
    name: 'Cyberpunk UI',
    description: 'Neon glows, dark backgrounds, scanlines, electric accents and futuristic type',
    icon: '⚡',
    gradient: 'from-[#B8FB3C]/15 to-lime-400/5',
    accentColor: '#B8FB3C',
    year: '2020–',
    popularity: 82,
  },
];

export default function TrendsPage() {
  return (
    <>
      <PageSEO
        title="UI Trend Explorer — UIXplor"
        description="Explore trending UI design styles: Glassmorphism, Neumorphism, Brutalist, Gradient, 3D, and Cyberpunk. Live examples with copy-paste code."
        path="/trends"
        keywords={['UI trends', 'glassmorphism', 'neumorphism', 'brutalist UI', 'gradient UI', 'cyberpunk UI', 'design trends']}
      />
      <main className="min-h-screen" style={{ background: '#0D0D0D' }}>
        <section className="container px-4 sm:px-6 pt-28 pb-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
            style={{ background: 'rgba(184,251,60,0.06)', borderColor: 'rgba(184,251,60,0.2)', color: '#B8FB3C' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8FB3C] animate-pulse" />
            Trend Explorer
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4">
            UI <span style={{ color: '#B8FB3C' }}>Trends</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto text-base">
            Explore the design movements shaping modern web UI. Click any trend to see live examples and get the code.
          </motion.p>
        </section>

        <section className="container px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRENDS.map((trend, i) => (
              <motion.div key={trend.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}>
                <Link href={`/trends/${trend.slug}`}>
                  <div className="group rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                    style={{ background: '#151515', borderColor: '#2A2A2A' }}>
                    {/* Top stripe */}
                    <div className={`h-2 bg-gradient-to-r ${trend.gradient}`} />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-3xl">{trend.icon}</span>
                        <span className="text-[10px] font-semibold px-2 py-1 rounded-full border"
                          style={{ background: `${trend.accentColor}12`, borderColor: `${trend.accentColor}30`, color: trend.accentColor }}>
                          {trend.year}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white/90">{trend.name}</h3>
                      <p className="text-white/40 text-sm leading-relaxed mb-4">{trend.description}</p>
                      {/* Popularity bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-[10px] text-white/30 mb-1">
                          <span>Popularity</span><span>{trend.popularity}%</span>
                        </div>
                        <div className="h-1 rounded-full bg-white/8 overflow-hidden">
                          <motion.div className="h-full rounded-full" style={{ background: trend.accentColor }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${trend.popularity}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 + i * 0.07 }} />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-semibold transition-colors"
                        style={{ color: trend.accentColor }}>
                        Explore examples
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
