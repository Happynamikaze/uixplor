import PageSEO from '@/components/seo/PageSEO';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function UITokens() {
	return (
		<>
			<PageSEO
				title="CSS Design Tokens – Colors, Typography & Spacing Scale – UIXplor"
				description="UI design tokens reference — brand colors, typography scale, spacing system, border radius, shadow tokens and opacity values for your design system."
				path="/collections/ui-tokens"
				keywords={['design tokens CSS', 'CSS design system', 'UI tokens', 'color palette CSS', 'typography scale CSS', 'spacing system', 'CSS variables design']}
				jsonLd={[
					{
						'@context': 'https://schema.org',
						'@type': 'CollectionPage',
						name: 'CSS Design Tokens – UIXplor',
						description: 'UI design tokens including brand colors, typography scale, spacing system, border radius, shadow tokens, and opacity values for design systems.',
						url: 'https://uixplor.com/collections/ui-tokens',
						isPartOf: { '@type': 'WebSite', name: 'UIXplor', url: 'https://uixplor.com' },
					},
					{
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: [
							{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uixplor.com' },
							{ '@type': 'ListItem', position: 2, name: 'Collections', item: 'https://uixplor.com/collections' },
							{ '@type': 'ListItem', position: 3, name: 'UI Tokens', item: 'https://uixplor.com/collections/ui-tokens' },
						],
					},
				]}
			/>
			<main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
				<div className="max-w-7xl mx-auto">
					<nav className="mb-8">
						<ol className="flex items-center gap-2 text-sm text-white/40">
							<li><Link href="/" className="hover:text-[#B8FB3C] transition-colors">Home</Link></li>
							<li>/</li>
							<li><Link href="/collections" className="hover:text-[#B8FB3C] transition-colors">Collections</Link></li>
							<li>/</li>
							<li className="text-white font-medium">UI Tokens</li>
						</ol>
					</nav>

					<motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">UI Tokens</h1>
						<p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-6">Design tokens — colors, spacing, typography, shadows, and radius for your design system.</p>
					</motion.div>

					{/* Color Palette */}
					<section className="mb-12">
						<h2 className="text-lg font-semibold text-white mb-4">Brand Colors</h2>
						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
							{[
								{ name: 'Lime', hex: '#B8FB3C', var: '--color-lime' },
								{ name: 'Purple', hex: '#a855f7', var: '--color-purple' },
								{ name: 'Cyan', hex: '#06b6d4', var: '--color-cyan' },
								{ name: 'Ink', hex: '#0a0a0f', var: '--color-ink' },
								{ name: 'Surface', hex: '#111118', var: '--color-surface' },
								{ name: 'White/60', hex: 'rgba(255,255,255,0.6)', var: '--color-text' },
							].map(c => (
								<div key={c.name} className="rounded-2xl overflow-hidden bg-white/4 border border-white/6">
									<div className="h-16 w-full" style={{ background: c.hex }} />
									<div className="p-3">
										<p className="text-xs font-semibold text-white">{c.name}</p>
										<p className="text-[10px] text-white/40 font-mono mt-0.5">{c.hex}</p>
										<p className="text-[10px] text-white/25 font-mono">{c.var}</p>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* Typography Scale */}
					<section className="mb-12">
						<h2 className="text-lg font-semibold text-white mb-4">Typography Scale</h2>
						<div className="rounded-2xl bg-white/4 border border-white/6 divide-y divide-white/6">
							{[
								{ name: 'Display', size: '60px', weight: '800', line: '1.1', sample: 'The quick fox' },
								{ name: 'Heading 1', size: '48px', weight: '700', line: '1.2', sample: 'The quick fox' },
								{ name: 'Heading 2', size: '36px', weight: '700', line: '1.3', sample: 'The quick fox' },
								{ name: 'Heading 3', size: '24px', weight: '600', line: '1.4', sample: 'The quick brown fox' },
								{ name: 'Body', size: '16px', weight: '400', line: '1.6', sample: 'The quick brown fox jumps over' },
								{ name: 'Small', size: '13px', weight: '400', line: '1.5', sample: 'The quick brown fox jumps over the lazy dog' },
								{ name: 'Label', size: '11px', weight: '600', line: '1.4', sample: 'UPPERCASE LABEL SMALL CAPS' },
							].map(t => (
								<div key={t.name} className="flex items-center justify-between px-5 py-3 gap-4">
									<div className="flex items-center gap-6 min-w-0">
										<div className="w-24 shrink-0">
											<p className="text-xs font-semibold text-white">{t.name}</p>
											<p className="text-[10px] text-white/30 font-mono">{t.size} / {t.weight}</p>
										</div>
										<p className="text-white/70 truncate" style={{ fontWeight: t.weight, lineHeight: t.line, fontSize: `clamp(13px, ${t.size}, 20px)` }}>{t.sample}</p>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* Spacing Scale */}
					<section className="mb-12">
						<h2 className="text-lg font-semibold text-white mb-4">Spacing Scale</h2>
						<div className="rounded-2xl bg-white/4 border border-white/6 p-5">
							<div className="flex flex-wrap gap-4 items-end">
								{[
									{ name: 'xs', px: 4 }, { name: 'sm', px: 8 }, { name: 'md', px: 16 },
									{ name: 'lg', px: 24 }, { name: 'xl', px: 32 }, { name: '2xl', px: 48 },
									{ name: '3xl', px: 64 }, { name: '4xl', px: 96 },
								].map(s => (
									<div key={s.name} className="flex flex-col items-center gap-2">
										<div className="bg-[#B8FB3C]/20 border border-[#B8FB3C]/30 rounded" style={{ width: s.px, height: s.px }} />
										<p className="text-[10px] text-white/40 font-mono">{s.name}</p>
										<p className="text-[10px] text-white/25 font-mono">{s.px}px</p>
									</div>
								))}
							</div>
						</div>
					</section>

					{/* Border Radius */}
					<section className="mb-12">
						<h2 className="text-lg font-semibold text-white mb-4">Border Radius</h2>
						<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
							{[
								{ name: 'none', r: '0px' }, { name: 'sm', r: '4px' }, { name: 'md', r: '8px' },
								{ name: 'lg', r: '12px' }, { name: 'xl', r: '16px' }, { name: '2xl', r: '20px' },
								{ name: '3xl', r: '24px' }, { name: 'full', r: '9999px' },
							].map(r => (
								<div key={r.name} className="flex flex-col items-center gap-2">
									<div className="w-14 h-14 bg-white/8 border border-white/12" style={{ borderRadius: r.r }} />
									<p className="text-[10px] text-white/50">{r.name}</p>
									<p className="text-[10px] text-white/25 font-mono">{r.r}</p>
								</div>
							))}
						</div>
					</section>

					{/* Shadows */}
					<section className="mb-12">
						<h2 className="text-lg font-semibold text-white mb-4">Shadow Tokens</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
							{[
								{ name: 'sm', shadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)', var: '--shadow-sm' },
								{ name: 'md', shadow: '0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.1)', var: '--shadow-md' },
								{ name: 'lg', shadow: '0 12px 40px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)', var: '--shadow-lg' },
								{ name: 'glow', shadow: '0 0 0 2px #B8FB3C, 0 0 20px rgba(184,251,60,0.3)', var: '--shadow-glow' },
							].map(s => (
								<div key={s.name} className="rounded-2xl bg-white/4 border border-white/6 p-5 flex flex-col gap-4">
									<div className="h-14 rounded-xl bg-white/8" style={{ boxShadow: s.shadow }} />
									<div>
										<p className="text-sm font-semibold text-white">{s.name}</p>
										<p className="text-[10px] text-white/30 font-mono mt-0.5">{s.var}</p>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* Opacity Scale */}
					<section className="mb-12">
						<h2 className="text-lg font-semibold text-white mb-4">Opacity Scale</h2>
						<div className="flex flex-wrap gap-6 items-center">
							{[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(o => (
								<div key={o} className="flex flex-col items-center gap-2">
									<div className="w-10 h-10 rounded-lg bg-[#B8FB3C]" style={{ opacity: o / 100 }} />
									<p className="text-[10px] text-white/40">{o}%</p>
								</div>
							))}
						</div>
					</section>
				</div>
			</main>
		</>
	);
}
