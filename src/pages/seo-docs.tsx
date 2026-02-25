'use client';
import { useState } from 'react';
import PageSEO from '@/components/seo/PageSEO';
import Link from 'next/link';

const PIN = '2025'; // Simple deterrent — not production security

const collections = [
	{ path: '/collections/box-shadows/', priority: '0.8' },
	{ path: '/collections/buttons/', priority: '0.8' },
	{ path: '/collections/cards/', priority: '0.8' },
	{ path: '/collections/glass-effects/', priority: '0.8' },
	{ path: '/collections/hover-effects/', priority: '0.8' },
	{ path: '/collections/inputs/', priority: '0.8' },
	{ path: '/collections/loaders/', priority: '0.8' },
	{ path: '/collections/gradients/', priority: '0.8' },
	{ path: '/collections/microinteractions/', priority: '0.8' },
	{ path: '/collections/text-animations/', priority: '0.8' },
];

const blogPosts = [
	'box-shadows-ui-design', 'interactive-buttons-design', 'glassmorphism-ui-guide',
	'css-animations-loaders-guide', 'modern-css-gradients-guide', 'form-input-design-guide',
	'css-variables-design-tokens', 'dark-mode-css-implementation', 'css-grid-mastery-guide',
	'css-flexbox-layout-patterns', 'custom-scrollbars-css-guide', 'responsive-typography-css',
	'css-clip-path-shapes', 'smooth-scroll-css-javascript', 'css-aspect-ratio-responsive',
	'css-container-queries-guide', 'css-scroll-snap-ux', 'native-css-nesting-guide',
	'css-has-selector-guide', 'css-layer-cascade-guide', 'view-transitions-api-css',
	'css-logical-properties-guide', 'css-color-mix-theming', 'scroll-driven-animations-css',
	'css-starting-style-transitions', 'css-backdrop-filter-effects',
];

const slugRules = [
	{ rule: 'Lowercase only', example: 'css-box-shadows', bad: 'CSS-Box-Shadows' },
	{ rule: 'Hyphens as separators', example: 'hover-effects', bad: 'hover_effects' },
	{ rule: 'No special characters', example: 'flex-layout', bad: 'flex&layout' },
	{ rule: 'Human-readable', example: 'glassmorphism-ui-guide', bad: 'post-04x7' },
	{ rule: 'Keyword-first', example: 'css-grid-mastery-guide', bad: 'guide-to-grids' },
];

export default function SEODocs() {
	const [pin, setPin] = useState('');
	const [unlocked, setUnlocked] = useState(false);
	const [error, setError] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (pin === PIN) {
			setUnlocked(true);
			setError(false);
		} else {
			setError(true);
			setPin('');
		}
	};

	return (
		<>
			<PageSEO
				title="SEO Documentation — UIXplor Internal"
				description="Internal SEO strategy, URL structure, sitemap flow, and indexing rules for UIXplor."
				path="/seo-docs"
				noindex
			/>

			{!unlocked ? (
				/* PIN Gate */
				<div className="min-h-screen flex items-center justify-center px-4">
					<div className="w-full max-w-md text-center">
						<div className="inline-flex w-14 h-14 rounded-2xl bg-[#B8FB3C]/10 border border-[#B8FB3C]/20 items-center justify-center mb-6 mx-auto">
							<svg className="w-7 h-7 text-[#B8FB3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
						</div>
						<h1 className="text-2xl font-bold text-white mb-2">Internal Docs</h1>
						<p className="text-white/40 text-sm mb-8">This page is restricted. Enter the access PIN.</p>
						<form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
							<input
								type="password"
								value={pin}
								onChange={e => setPin(e.target.value)}
								placeholder="Enter PIN"
								className="w-full max-w-xs text-center text-lg font-mono px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#B8FB3C]/50 focus:shadow-[0_0_0_3px_rgba(184,251,60,0.1)] transition-all"
								maxLength={8}
							/>
							{error && <p className="text-red-400 text-sm">Incorrect PIN. Try again.</p>}
							<button type="submit" className="px-8 py-2.5 rounded-full bg-[#B8FB3C] text-[#0a0a0f] font-semibold text-sm hover:shadow-[0_0_20px_rgba(184,251,60,0.25)] transition-all">
								Unlock
							</button>
						</form>
					</div>
				</div>
			) : (
				/* Docs Content */
				<main className="min-h-screen px-4 sm:px-6 py-10 max-w-5xl mx-auto">
					<div className="mb-10 flex items-center justify-between">
						<div>
							<p className="text-[10px] font-semibold uppercase tracking-widest text-[#B8FB3C] mb-1">Internal · Not Indexed</p>
							<h1 className="text-4xl font-bold text-white">SEO Documentation</h1>
						</div>
						<span className="px-3 py-1 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 uppercase tracking-widest">NOINDEX</span>
					</div>

					{/* Site Hierarchy Flow */}
					<section className="mb-12">
						<h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
							<span className="w-6 h-6 rounded-lg bg-[#B8FB3C]/10 border border-[#B8FB3C]/20 flex items-center justify-center text-[10px] text-[#B8FB3C] font-bold">1</span>
							Page Hierarchy &amp; Priority
						</h2>
						<div className="overflow-x-auto pb-2">
							<div className="flex items-start gap-6 min-w-max">
								{/* L1 */}
								<div className="flex flex-col gap-2">
									<div className="text-[9px] uppercase tracking-widest text-white/30 font-semibold mb-1">Priority 1.0</div>
									<div className="px-4 py-3 rounded-xl bg-[#B8FB3C]/10 border border-[#B8FB3C]/30 text-sm font-semibold text-[#B8FB3C] text-center min-w-[100px]">/ Home</div>
								</div>
								<div className="flex items-center mt-10 text-white/20 text-xl">→</div>
								{/* L2 */}
								<div className="flex flex-col gap-2">
									<div className="text-[9px] uppercase tracking-widest text-white/30 font-semibold mb-1">Priority 0.9</div>
									{['/collections', '/blog'].map(p => <div key={p} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/70 text-center min-w-[120px]">{p}</div>)}
								</div>
								<div className="flex items-center mt-10 text-white/20 text-xl">→</div>
								{/* L3 */}
								<div className="flex flex-col gap-2">
									<div className="text-[9px] uppercase tracking-widest text-white/30 font-semibold mb-1">Priority 0.8</div>
									{['/collections/box-shadows', '/collections/buttons', '+ 8 more...'].map(p => <div key={p} className="px-3 py-2.5 rounded-xl bg-white/4 border border-white/8 text-xs font-medium text-white/50 min-w-[160px]">{p}</div>)}
								</div>
								<div className="flex items-center mt-10 text-white/20 text-xl">→</div>
								{/* L4 */}
								<div className="flex flex-col gap-2">
									<div className="text-[9px] uppercase tracking-widest text-white/30 font-semibold mb-1">Priority 0.75</div>
									{['/blog/box-shadows-ui-design', '/blog/glassmorphism-ui-guide', '+ 24 more...'].map(p => <div key={p} className="px-3 py-2.5 rounded-xl bg-white/4 border border-white/8 text-xs text-white/40 min-w-[200px]">{p}</div>)}
								</div>
							</div>
						</div>
					</section>

					{/* URL / Slug Rules */}
					<section className="mb-12">
						<h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
							<span className="w-6 h-6 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[10px] text-purple-400 font-bold">2</span>
							Slug Rules
						</h2>
						<div className="grid gap-3">
							{slugRules.map(r => (
								<div key={r.rule} className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/6">
									<div className="w-1.5 h-1.5 rounded-full bg-[#B8FB3C] shrink-0" />
									<div className="flex-1">
										<p className="text-sm font-semibold text-white">{r.rule}</p>
									</div>
									<div className="flex items-center gap-3 text-xs font-mono">
										<span className="px-2 py-1 rounded bg-[#B8FB3C]/10 text-[#B8FB3C] border border-[#B8FB3C]/20">✓ {r.example}</span>
										<span className="px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20">✗ {r.bad}</span>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* Sitemap Coverage */}
					<section className="mb-12">
						<h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
							<span className="w-6 h-6 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-[10px] text-sky-400 font-bold">3</span>
							Sitemap Coverage ({4 + collections.length + blogPosts.length} URLs)
						</h2>
						<div className="grid sm:grid-cols-3 gap-4">
							<div className="p-4 rounded-xl bg-white/3 border border-white/6">
								<p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Core Pages (4)</p>
								{['/', '/collections/', '/blog/', '/about/'].map(p => <p key={p} className="text-xs text-[#B8FB3C] font-mono py-0.5">{p}</p>)}
							</div>
							<div className="p-4 rounded-xl bg-white/3 border border-white/6">
								<p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Collections ({collections.length})</p>
								{collections.map(c => <p key={c.path} className="text-xs text-white/50 font-mono py-0.5">{c.path}</p>)}
							</div>
							<div className="p-4 rounded-xl bg-white/3 border border-white/6">
								<p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Blog Posts ({blogPosts.length})</p>
								{blogPosts.slice(0, 8).map(s => <p key={s} className="text-xs text-white/50 font-mono py-0.5 truncate">/blog/{s}/</p>)}
								<p className="text-xs text-white/25 mt-1">+{blogPosts.length - 8} more...</p>
							</div>
						</div>
					</section>

					{/* Blocked Routes */}
					<section className="mb-12">
						<h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
							<span className="w-6 h-6 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-[10px] text-red-400 font-bold">4</span>
							Blocked &amp; Disallowed Routes
						</h2>
						<div className="grid sm:grid-cols-2 gap-3">
							{[
								{ path: '/admin/', reason: 'Admin panel — not for public indexing' },
								{ path: '/seo-docs/', reason: 'This page — internal only' },
								{ path: '/phpmyadmin', reason: 'Common attack vector — redirected to 404' },
								{ path: '/.git', reason: 'Source control exposure — redirected to 404' },
								{ path: '/config, /env', reason: 'Env/config files — blocked by robots + redirect' },
								{ path: '/wp-admin, /xmlrpc.php', reason: 'WordPress probes — blocked' },
							].map(b => (
								<div key={b.path} className="flex items-start gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
									<span className="text-red-400 font-mono text-xs mt-0.5 shrink-0">✗</span>
									<div>
										<p className="text-xs font-semibold font-mono text-red-300">{b.path}</p>
										<p className="text-[10px] text-white/30 mt-0.5">{b.reason}</p>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* Indexing Strategy */}
					<section className="mb-12">
						<h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
							<span className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[10px] text-amber-400 font-bold">5</span>
							Indexing Strategy
						</h2>
						<div className="grid sm:grid-cols-3 gap-4">
							{[
								{ label: 'Page Metadata', items: ['Unique title per page', 'Meta description 150–160 chars', 'Canonical URL', 'OG + Twitter card tags'], color: 'text-[#B8FB3C]', bg: 'bg-[#B8FB3C]/5 border-[#B8FB3C]/10' },
								{ label: 'JSON-LD Schema', items: ['WebSite on homepage', 'WebPage on collections', 'Article on blog posts', 'BreadcrumbList on articles'], color: 'text-purple-400', bg: 'bg-purple-500/5 border-purple-500/10' },
								{ label: 'Internal Linking', items: ['Blog ↔ Collections cross-links', 'Related posts on articles', 'Breadcrumbs on every page', 'Tag filter links'], color: 'text-sky-400', bg: 'bg-sky-500/5 border-sky-500/10' },
							].map(s => (
								<div key={s.label} className={`p-4 rounded-xl border ${s.bg}`}>
									<p className={`text-xs font-bold uppercase tracking-wider ${s.color} mb-3`}>{s.label}</p>
									{s.items.map(item => <p key={item} className="text-xs text-white/50 py-0.5 flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />{item}</p>)}
								</div>
							))}
						</div>
					</section>

					{/* Security Headers */}
					<section className="mb-12">
						<h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
							<span className="w-6 h-6 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-[10px] text-teal-400 font-bold">6</span>
							Security Headers
						</h2>
						<div className="grid gap-2">
							{[
								{ header: 'X-Frame-Options', value: 'SAMEORIGIN', desc: 'Prevents clickjacking' },
								{ header: 'X-Content-Type-Options', value: 'nosniff', desc: 'Stops MIME sniffing' },
								{ header: 'Referrer-Policy', value: 'strict-origin-when-cross-origin', desc: 'Controls referrer info' },
								{ header: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()', desc: 'Disables sensitive browser APIs' },
							].map(h => (
								<div key={h.header} className="flex items-center gap-4 p-3 rounded-xl bg-white/3 border border-white/6">
									<span className="font-mono text-xs text-teal-300 min-w-[220px]">{h.header}</span>
									<span className="font-mono text-[11px] text-white/50 flex-1 truncate">{h.value}</span>
									<span className="text-[10px] text-white/25">{h.desc}</span>
								</div>
							))}
						</div>
					</section>

					<div className="pt-6 border-t border-white/6 flex items-center justify-between">
						<p className="text-xs text-white/20">UIXplor Internal Docs · Last updated: Feb 2026</p>
						<button onClick={() => setUnlocked(false)} className="text-xs text-white/30 hover:text-white/60 transition-colors">Lock page</button>
					</div>
				</main>
			)}
		</>
	);
}
