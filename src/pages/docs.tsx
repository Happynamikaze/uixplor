import Link from 'next/link';
import { motion } from 'motion/react';
import PageSEO from '@/components/seo/PageSEO';
import { PinGate } from '@/components/ui/PinGate';

const PIN = '2025';


const techStack = [
	{ name: 'Next.js 16', role: 'Framework', desc: 'Pages Router + static export (output: "export")', color: '#ffffff' },
	{ name: 'TypeScript', role: 'Language', desc: 'Strict typing across all components and data', color: '#3178c6' },
	{ name: 'Tailwind CSS 4', role: 'Styling', desc: 'Utility-first CSS with custom design tokens', color: '#38bdf8' },
	{ name: 'Framer Motion', role: 'Animations', desc: 'motion/react for page and scroll animations', color: '#bb86fc' },
	{ name: 'JSON Data Files', role: 'Content', desc: 'Static data in /data/*.json — no database', color: '#B8FB3C' },
];

const pages = [
	{ path: '/', label: 'Home', desc: 'Hero, collection preview grid, blog preview strip', file: 'src/pages/Home/home.tsx' },
	{ path: '/collections', label: 'Collections Index', desc: 'Grid of all CSS categories', file: 'src/pages/collections/index.tsx' },
	{ path: '/collections/[slug]', label: 'Collection Detail', desc: 'Per-category component grids with code viewer overlay', file: 'src/pages/collections/*.tsx' },
	{ path: '/blog', label: 'Blog Index', desc: 'Featured post + tag filter grid', file: 'src/pages/blog/index.tsx' },
	{ path: '/blog/[slug]', label: 'Blog Article', desc: 'Full article with sticky ToC and next/related posts', file: 'src/pages/blog/[slug].tsx' },
	{ path: '/about', label: 'About', desc: 'Team, mission, tech stack section', file: 'src/pages/about.tsx' },
	{ path: '/seo-docs', label: 'SEO Docs', desc: 'Internal — PIN gated, noindex', file: 'src/pages/seo-docs.tsx' },
	{ path: '/docs', label: 'Docs', desc: 'This page — project documentation for contributors', file: 'src/pages/docs.tsx' },
];

const dataFiles = [
	{ file: 'data/blog.json', desc: 'All 26 blog posts — slug, title, excerpt, author, date, readingTime, tags, sections[]' },
	{ file: 'data/buttons.json', desc: '40 CSS button styles — id, name, credits, css (full CSS string)' },
	{ file: 'data/shadows.json', desc: 'CSS box shadow tokens — id, name, value, category' },
	{ file: 'data/cards.json', desc: 'Card component variants with CSS' },
	{ file: 'data/text.json', desc: 'Tech stack skills list and other text content' },
];

const collections = [
	{ slug: 'box-shadows', label: 'Box Shadows', count: '33+', data: 'shadows.json' },
	{ slug: 'buttons', label: 'Buttons', count: '40', data: 'buttons.json' },
	{ slug: 'cards', label: 'Cards', count: '20+', data: 'cards.json' },
	{ slug: 'glass-effects', label: 'Glass Effects', count: '15+', data: 'inline' },
	{ slug: 'hover-effects', label: 'Hover Effects', count: '20+', data: 'inline' },
	{ slug: 'inputs', label: 'Inputs', count: '20+', data: 'inline' },
	{ slug: 'loaders', label: 'Loaders', count: '30+', data: 'inline' },
	{ slug: 'gradients', label: 'Gradients', count: '40+', data: 'inline' },
	{ slug: 'microinteractions', label: 'Microinteractions', count: '15+', data: 'inline' },
	{ slug: 'text-animations', label: 'Text Animations', count: '20+', data: 'inline' },
];

const Section = ({ id, n, title, children }: { id: string; n: string; title: string; children: React.ReactNode }) => (
	<section id={id} className="mb-16 scroll-mt-24">
		<div className="flex items-center gap-3 mb-6">
			<span className="w-8 h-8 rounded-xl bg-[#B8FB3C]/10 border border-[#B8FB3C]/20 flex items-center justify-center text-xs font-bold text-[#B8FB3C]">{n}</span>
			<h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
		</div>
		{children}
	</section>
);

export default function Docs() {
	return (
		<>
			<PageSEO
				title="Project Documentation — UIXplor Internal"
				description="Internal developer reference for UIXplor."
				path="/docs"
				noindex
			/>
			<PinGate
				storageKey="uixplor__docs_lock"
				correctPin={PIN}
				title="Developer Docs"
				subtitle="This page is restricted to the UIXplor team. Enter your access PIN."
			>
				<main className="min-h-screen px-4 sm:px-6 py-10">
					<div className="max-w-5xl mx-auto">

						{/* Header */}
						<motion.div className="mb-14" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
							<nav className="mb-8">
								<ol className="flex items-center gap-2 text-sm text-white/40">
									<li><Link href="/" className="hover:text-[#B8FB3C] transition-colors">Home</Link></li>
									<li>/</li>
									<li className="text-white font-medium">Docs</li>
								</ol>
							</nav>
							<div className="flex items-center justify-between mb-3">
								<p className="text-[10px] uppercase tracking-widest font-semibold text-[#B8FB3C]">Developer Reference · Internal</p>
								<span className="px-3 py-1 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 uppercase tracking-widest">NOINDEX</span>
							</div>
							<h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">Project Documentation</h1>
							<p className="text-white/50 text-lg max-w-2xl">
								Everything you need to understand, contribute to, and extend UIXplor — a premium CSS snippets and UI component library.
							</p>
						</motion.div>

						{/* Quick nav */}
						<motion.div
							className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16 p-1"
							initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
						>
							{[
								{ href: '#tech-stack', label: 'Tech Stack' },
								{ href: '#architecture', label: 'Architecture' },
								{ href: '#data-system', label: 'Data System' },
								{ href: '#adding-content', label: 'Adding Content' },
								{ href: '#collections', label: 'Collections' },
								{ href: '#blog', label: 'Blog System' },
								{ href: '#seo', label: 'SEO Setup' },
								{ href: '#build', label: 'Build & Deploy' },
							].map(link => (
								<a key={link.href} href={link.href} className="text-xs text-white/50 font-medium px-3 py-2 rounded-lg bg-white/3 border border-white/6 hover:text-[#B8FB3C] hover:border-[#B8FB3C]/20 hover:bg-[#B8FB3C]/5 transition-all text-center">
									{link.label}
								</a>
							))}
						</motion.div>

						{/* ── 1. Tech Stack */}
						<Section id="tech-stack" n="1" title="Tech Stack">
							<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
								{techStack.map(t => (
									<div key={t.name} className="p-4 rounded-xl bg-white/3 border border-white/6">
										<div className="flex items-center gap-2 mb-2">
											<div className="w-2 h-2 rounded-full" style={{ background: t.color }} />
											<span className="text-sm font-bold text-white">{t.name}</span>
											<span className="text-[10px] text-white/25 font-medium uppercase tracking-wider ml-auto">{t.role}</span>
										</div>
										<p className="text-xs text-white/50">{t.desc}</p>
									</div>
								))}
							</div>
						</Section>

						{/* ── 2. Architecture */}
						<Section id="architecture" n="2" title="Architecture & Routing">
							<div className="mb-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/15">
								<p className="text-xs text-amber-300 font-semibold mb-1">⚡ Important: Static Export</p>
								<p className="text-xs text-white/50">UIXplor uses <code className="text-[#B8FB3C] font-mono">output: &quot;export&quot;</code> in next.config.ts — fully static site. Security headers handled by <code className="text-[#B8FB3C] font-mono">vercel.json</code>.</p>
							</div>
							<div className="space-y-2 mb-6">
								{pages.map(p => (
									<div key={p.path} className="flex items-start gap-4 p-3 rounded-xl bg-white/2 border border-white/5">
										<code className="text-[#B8FB3C] font-mono text-xs min-w-[160px] shrink-0">{p.path}</code>
										<div className="flex-1 min-w-0">
											<span className="text-xs font-semibold text-white/80">{p.label}</span>
											<span className="text-xs text-white/35 ml-2">{p.desc}</span>
										</div>
										<code className="text-[10px] text-white/25 font-mono hidden sm:block shrink-0">{p.file}</code>
									</div>
								))}
							</div>
						</Section>

						{/* ── 3. Data System */}
						<Section id="data-system" n="3" title="Data & Content System">
							<p className="text-white/50 text-sm mb-4">UIXplor is data-driven — all content lives in JSON files under <code className="text-[#B8FB3C] font-mono">/data/</code>. No database or CMS.</p>
							<div className="space-y-2">
								{dataFiles.map(d => (
									<div key={d.file} className="flex gap-4 items-start p-3 rounded-xl bg-white/2 border border-white/5">
										<code className="text-[#B8FB3C] font-mono text-xs min-w-[175px] shrink-0">{d.file}</code>
										<p className="text-xs text-white/50">{d.desc}</p>
									</div>
								))}
							</div>
						</Section>

						{/* ── 4. Adding Content */}
						<Section id="adding-content" n="4" title="How to Add New Content">
							<div className="grid sm:grid-cols-2 gap-4">
								<div className="p-5 rounded-xl bg-white/3 border border-white/6">
									<p className="text-sm font-bold text-white mb-3">➕ New Blog Post</p>
									<ol className="space-y-2 text-xs text-white/50">
										<li><span className="text-[#B8FB3C] font-bold">1.</span> Add an object to <code className="text-[#B8FB3C] font-mono">data/blog.json</code></li>
										<li><span className="text-[#B8FB3C] font-bold">2.</span> Use a lowercase, hyphenated slug</li>
										<li><span className="text-[#B8FB3C] font-bold">3.</span> Run <code className="font-mono text-white/70">npm run build</code></li>
										<li><span className="text-[#B8FB3C] font-bold">4.</span> Update <code className="font-mono text-white/70">public/sitemap.xml</code></li>
									</ol>
								</div>
								<div className="p-5 rounded-xl bg-white/3 border border-white/6">
									<p className="text-sm font-bold text-white mb-3">➕ New CSS Component</p>
									<ol className="space-y-2 text-xs text-white/50">
										<li><span className="text-[#B8FB3C] font-bold">1.</span> Add CSS to <code className="font-mono text-white/70">data/*.json</code></li>
										<li><span className="text-[#B8FB3C] font-bold">2.</span> Collection page renders preview automatically</li>
										<li><span className="text-[#B8FB3C] font-bold">3.</span> For a new category: create <code className="font-mono text-white/70">src/pages/collections/[name].tsx</code></li>
									</ol>
								</div>
							</div>
						</Section>

						{/* ── 5. Collections */}
						<Section id="collections" n="5" title="Collections System">
							<p className="text-white/50 text-sm mb-4">10 CSS categories under <code className="text-[#B8FB3C] font-mono">/collections/</code>.</p>
							<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
								{collections.map(c => (
									<Link key={c.slug} href={`/collections/${c.slug}`} className="p-3 rounded-xl bg-white/3 border border-white/6 hover:border-[#B8FB3C]/25 hover:bg-[#B8FB3C]/5 transition-all group">
										<p className="text-xs font-semibold text-white group-hover:text-[#B8FB3C] transition-colors mb-1">{c.label}</p>
										<p className="text-[10px] text-white/30">{c.count} items</p>
										<p className="text-[10px] text-white/20 font-mono mt-0.5">{c.data}</p>
									</Link>
								))}
							</div>
						</Section>

						{/* ── 6. Blog */}
						<Section id="blog" n="6" title="Blog System">
							<div className="grid sm:grid-cols-3 gap-4 mb-5">
								{[
									{ label: 'Blog Index', path: '/blog', desc: 'Featured post hero, tag filter pills, AnimatePresence grid' },
									{ label: 'Blog Article', path: '/blog/[slug]', desc: 'Sticky ToC, IntersectionObserver heading tracking, Article JSON-LD' },
									{ label: 'Blog Data', path: 'data/blog.json', desc: '26 posts with full sections. getStaticPaths generates all routes at build time' },
								].map(b => (
									<div key={b.label} className="p-4 rounded-xl bg-white/3 border border-white/6">
										<p className="text-xs font-bold text-white mb-1">{b.label}</p>
										<p className="text-[10px] font-mono text-[#B8FB3C] mb-2">{b.path}</p>
										<p className="text-xs text-white/45">{b.desc}</p>
									</div>
								))}
							</div>
						</Section>

						{/* ── 7. SEO */}
						<Section id="seo" n="7" title="SEO Setup">
							<div className="grid sm:grid-cols-2 gap-4">
								<div className="space-y-2">
									{[
										{ file: 'src/components/seo/PageSEO.tsx', desc: 'title, description, canonical, OG, Twitter card, JSON-LD, noindex' },
										{ file: 'public/sitemap.xml', desc: '55+ URLs, priorities, lastmod dates' },
										{ file: 'public/robots.txt', desc: 'Allows all public routes, blocks /admin, /seo-docs, /docs' },
										{ file: 'vercel.json', desc: 'Security headers + route redirects' },
									].map(s => (
										<div key={s.file} className="p-3 rounded-xl bg-white/2 border border-white/5">
											<code className="text-[10px] font-mono text-[#B8FB3C] block mb-1">{s.file}</code>
											<p className="text-xs text-white/45">{s.desc}</p>
										</div>
									))}
								</div>
								<div className="p-4 rounded-xl bg-white/3 border border-white/6 self-start">
									<p className="text-xs font-bold text-white mb-3">PIN Security</p>
									<p className="text-xs text-white/45">Both /docs and /seo-docs use <code className="text-[#B8FB3C] font-mono">PinGate</code> with localStorage-persisted lockout: 5 fails → 30s, 8 fails → 5min, 12 fails → 30min.</p>
								</div>
							</div>
						</Section>

						{/* ── 8. Build & Deploy */}
						<Section id="build" n="8" title="Build & Deploy">
							<div className="grid sm:grid-cols-2 gap-4">
								<div className="p-4 rounded-xl bg-white/3 border border-white/6 font-mono text-xs">
									<p className="text-white/40 mb-3"># Development</p>
									<p className="text-[#B8FB3C]">npm run dev</p>
									<p className="text-white/25 mt-1 mb-4">→ localhost:3000</p>
									<p className="text-white/40 mb-1"># Production build</p>
									<p className="text-[#B8FB3C]">npm run build</p>
									<p className="text-white/25 mt-1">→ static export to /out</p>
								</div>
								<div className="p-4 rounded-xl bg-white/3 border border-white/6 text-xs">
									<p className="text-sm font-bold text-white mb-3">Deploy checklist</p>
									<ul className="space-y-1.5 text-white/50">
										{[
											'Update sitemap.xml when adding pages/posts',
											'Blog slugs auto-generate via getStaticPaths',
											'vercel.json handles security headers at CDN edge',
											'No server — everything is static HTML + JS',
											'Contact: uixplor@gmail.com',
										].map(item => (
											<li key={item} className="flex items-start gap-2">
												<span className="text-[#B8FB3C] shrink-0 mt-0.5">✓</span>
												{item}
											</li>
										))}
									</ul>
								</div>
							</div>
						</Section>

						<div className="pt-8 border-t border-white/6">
							<p className="text-xs text-white/25">UIXplor Developer Docs · Last updated Feb 2026 · Contact: uixplor@gmail.com</p>
						</div>
					</div>
				</main>
			</PinGate>
		</>
	);
}

