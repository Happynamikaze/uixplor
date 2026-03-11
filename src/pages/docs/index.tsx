import PageSEO from '@/components/seo/PageSEO';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';

const sections = [
	{
		id: 'overview',
		title: 'Platform Overview',
		icon: '◈',
		color: '#6C63FF',
		content: [
			{
				type: 'p',
				text: 'UIXplor is a **Next.js 15** (Pages Router) application with **Tailwind CSS v4**. All component data lives in JSON files under `/data`. Pages live under `src/pages`. Shared components live under `src/components`.',
			},
			{
				type: 'structure',
				items: [
					{ label: '`/data/*.json`', desc: 'All UI component data (buttons, shadows, loaders, blog posts…)' },
					{ label: '`/src/pages/`', desc: 'Next.js pages (one file = one route)' },
					{ label: '`/src/components/`', desc: 'Shared React components (Header, CodeViewer, SEO…)' },
					{ label: '`/public/`', desc: 'Static assets (images, fonts, ads.txt…)' },
				],
			},
		],
	},
	{
		id: 'add-components',
		title: 'Adding UI Components',
		icon: '⊞',
		color: '#B8FB3C',
		content: [
			{
				type: 'p',
				text: 'Components are stored as JSON objects in files under `/data/`. Each collection has its own JSON file (e.g. `buttons.json`, `shadows.json`, `loaders.json`).',
			},
			{
				type: 'steps',
				items: [
					{ step: '1', title: 'Open the JSON file', desc: 'Navigate to `/data/buttons.json` (or any collection file).' },
					{ step: '2', title: 'Add your component object', desc: 'Copy an existing entry and change the `id`, `name`, `category`, and `css` fields.' },
					{ step: '3', title: 'Save and verify', desc: 'Run `npm run dev` and open the collection page. Your component appears instantly.' },
				],
			},
			{
				type: 'code',
				lang: 'json',
				code: `// /data/buttons.json — add an object to the array
{
  "id": "my-new-button",
  "name": "My Custom Button",
  "category": "gradient",
  "css": ".my-new-button {\\n  background: linear-gradient(135deg, #6C63FF, #f472b6);\\n  color: white;\\n  padding: 10px 24px;\\n  border-radius: 8px;\\n  border: none;\\n  font-weight: 600;\\n  cursor: pointer;\\n  transition: transform 0.2s;\\n}\\n.my-new-button:hover {\\n  transform: translateY(-2px);\\n}"
}`,
			},
		],
	},
	{
		id: 'add-blog',
		title: 'Writing Blog Posts',
		icon: '✦',
		color: '#a78bfa',
		content: [
			{
				type: 'p',
				text: 'Blog posts live entirely in `/data/blog.json`. Each post is a JSON object with sections, tags, and optional interactive editor blocks.',
			},
			{
				type: 'steps',
				items: [
					{ step: '1', title: 'Open `/data/blog.json`', desc: 'Add a new object to the top-level array.' },
					{ step: '2', title: 'Fill in metadata', desc: 'Set `slug`, `title`, `excerpt`, `tags`, `readingTime`, `publishedAt`, `category`.' },
					{ step: '3', title: 'Write sections', desc: 'Add a `sections` array. Each section has `heading`, `level` (1 or 2), and `body` (plain text with markdown bold **word**  and code fences).' },
					{ step: '4', title: 'Tags drive Related Components', desc: 'Use tags like "Buttons", "Glassmorphism", "Animations" — the blog post will automatically show related collection links.' },
				],
			},
			{
				type: 'code',
				lang: 'json',
				code: `// /data/blog.json — minimal post example
{
  "slug": "my-post",
  "title": "My Post Title",
  "excerpt": "Short description shown in listing.",
  "tags": ["Buttons", "CSS"],
  "category": "Tutorial",
  "readingTime": 4,
  "publishedAt": "2026-03-11",
  "sections": [
    {
      "heading": "Introduction",
      "level": 1,
      "body": "Welcome to the post. **Bold text** works inline.\\n\\n\`\`\`css\\n.example { color: red; }\\n\`\`\`"
    }
  ]
}`,
			},
			{
				type: 'p',
				text: 'To include a **live interactive editor** inside a section body, use the `:::editor` fence syntax:',
			},
			{
				type: 'code',
				lang: 'text',
				code: `:::editor
<button class="btn">Click Me</button>
---css
.btn {
  background: #6C63FF;
  color: white;
  padding: 10px 24px;
  border-radius: 8px;
}
:::`,
			},
		],
	},
	{
		id: 'add-tool',
		title: 'Adding a New Tool',
		icon: '⚙',
		color: '#fbbf24',
		content: [
			{
				type: 'p',
				text: 'Tools live in `/src/pages/toolkit/index.tsx`. Each tool is a self-contained React component.',
			},
			{
				type: 'steps',
				items: [
					{ step: '1', title: 'Create a component', desc: 'Add a new function like `function MyTool() { ... }` in the file.' },
					{ step: '2', title: 'Add to TOOLS array', desc: 'Append `{ id: "mytool", label: "My Tool", icon: "🔧", desc: "..." }` to the `TOOLS` const.' },
					{ step: '3', title: 'Render it', desc: 'Add `{active === "mytool" && <MyTool />}` in the Tool Panel section.' },
					{ step: '4', title: 'Link it from homepage', desc: 'In `src/pages/Home/home.tsx`, add a card entry for the tool with its href `/toolkit?tool=mytool`.' },
				],
			},
		],
	},
	{
		id: 'add-page',
		title: 'Adding a New Page',
		icon: '</> ',
		color: '#34d399',
		content: [
			{
				type: 'steps',
				items: [
					{ step: '1', title: 'Create the file', desc: 'Add `src/pages/my-page.tsx` — it automatically becomes `/my-page`.' },
					{ step: '2', title: 'Add SEO', desc: 'Import and use `<PageSEO title="..." description="..." path="/my-page" />` at the top.' },
					{ step: '3', title: 'Add to nav', desc: 'In `src/components/common/header/header.tsx`, add to the `navGroups` array with label, icon, color, desc.' },
					{ step: '4', title: 'Add to homepage', desc: 'Optionally add a card in the homepage dev tools section (`src/pages/Home/home.tsx`).' },
				],
			},
		],
	},
	{
		id: 'deploy',
		title: 'Deploying',
		icon: '⬆',
		color: '#38bdf8',
		content: [
			{
				type: 'p',
				text: 'UIXplor is deployed on **Vercel**. Every push to `main` auto-deploys. New features should be developed on the `newfeatures-testing` branch first.',
			},
			{
				type: 'steps',
				items: [
					{ step: '1', title: 'Work on newfeatures-testing', desc: '`git checkout newfeatures-testing` → make changes → `git push`.' },
					{ step: '2', title: 'Test on Vercel preview', desc: 'Vercel automatically builds preview URLs for every branch push.' },
					{ step: '3', title: 'Merge to main', desc: 'Once verified, open a PR from `newfeatures-testing` → `main` and merge to trigger production deployment.' },
					{ step: '4', title: 'Verify sitemap', desc: 'Visit `https://uixplor.com/sitemap.xml` to confirm new pages appear.' },
				],
			},
			{
				type: 'code',
				lang: 'bash',
				code: `# Local dev
npm run dev        # Start dev server at localhost:3000
npm run build      # Verify production build (catches type errors)
npm run lint       # Run ESLint

# Branch workflow
git checkout newfeatures-testing
git pull origin newfeatures-testing
# ... make your changes ...
git add .
git commit -m "feat: describe your change"
git push origin newfeatures-testing`,
			},
		],
	},
];

function renderContent(item: { type: string; text?: string; items?: { label?: string; desc?: string; step?: string; title?: string }[]; code?: string; lang?: string }) {
	if (item.type === 'p') {
		const parts = (item.text || '').split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
		return (
			<p className="text-white/55 text-sm leading-relaxed mb-4">
				{parts.map((part, i) => {
					if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="text-white/85 font-semibold">{part.slice(2, -2)}</strong>;
					if (part.startsWith('`') && part.endsWith('`')) return <code key={i} className="px-1.5 py-0.5 rounded text-[12px] font-mono" style={{ background: 'rgba(255,255,255,0.06)', color: '#B8FB3C' }}>{part.slice(1, -1)}</code>;
					return part;
				})}
			</p>
		);
	}
	if (item.type === 'structure') {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
				{item.items?.map((s, i) => (
					<div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
						<div className="min-w-0">
							<code className="text-[11px] font-mono" style={{ color: '#B8FB3C' }}>{s.label}</code>
							<p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.desc}</p>
						</div>
					</div>
				))}
			</div>
		);
	}
	if (item.type === 'steps') {
		return (
			<div className="space-y-2 mb-4">
				{item.items?.map((s, i) => (
					<div key={i} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
						<div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: 'rgba(108,99,255,0.15)', color: '#6C63FF' }}>{s.step}</div>
						<div>
							<p className="text-sm font-semibold text-white/80">{s.title}</p>
							<p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.desc}</p>
						</div>
					</div>
				))}
			</div>
		);
	}
	if (item.type === 'code') {
		return (
			<div className="rounded-xl overflow-hidden mb-4" style={{ background: '#0a0a0f', border: '1px solid #2A2A2A' }}>
				<div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: '#2A2A2A' }}>
					<span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#B8FB3C' }}>{item.lang}</span>
				</div>
				<pre className="p-4 overflow-x-auto">
					<code className="text-[12px] leading-6 font-mono" style={{ color: 'rgba(255,255,255,0.65)' }}>{item.code}</code>
				</pre>
			</div>
		);
	}
	return null;
}

type SectionDef = {
	id: string;
	title: string;
	icon: string;
	color: string;
	content: { type: string; text?: string; items?: { label?: string; desc?: string; step?: string; title?: string }[]; code?: string; lang?: string }[];
};

export default function DocsPage() {
	const [activeSection, setActiveSection] = useState(sections[0].id);

	return (
		<>
			<PageSEO
				title="Docs — How to Update UIXplor"
				description="Developer guide for UIXplor: how to add components, write blog posts, create new pages, add tools, and deploy to production."
				path="/docs"
				keywords={['UIXplor docs', 'how to update UIXplor', 'UIXplor developer guide', 'add UI components', 'UIXplor blog']}
			/>

			<main className="min-h-screen" style={{ background: '#0D0D0D' }}>
				{/* Header */}
				<section className="container px-4 sm:px-6 pt-28 pb-8">
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<div className="flex items-center gap-2 mb-3">
							<span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: 'rgba(56,189,248,0.1)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.2)' }}>
								Developer Guide
							</span>
						</div>
						<h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
							UIXplor <span style={{ color: '#38bdf8' }}>Docs</span>
						</h1>
						<p className="text-white/45 text-lg max-w-xl">How to add components, write blog posts, create tools, and deploy updates to UIXplor.</p>
					</motion.div>
				</section>

				{/* Content */}
				<section className="container px-4 sm:px-6 pb-20">
					<div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
						{/* Sidebar */}
						<aside className="lg:w-56 shrink-0">
							<div className="sticky top-24 space-y-1">
								{sections.map((s) => (
									<button
										key={s.id}
										onClick={() => setActiveSection(s.id)}
										className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all"
										style={{
											background: activeSection === s.id ? `${s.color}12` : 'transparent',
											color: activeSection === s.id ? s.color : 'rgba(255,255,255,0.45)',
											border: `1px solid ${activeSection === s.id ? `${s.color}30` : 'transparent'}`,
										}}
									>
										<span className="text-base">{s.icon}</span>
										<span className="font-medium">{s.title}</span>
									</button>
								))}
							</div>
						</aside>

						{/* Main content */}
						<div className="flex-1 min-w-0">
							{sections.map((section: SectionDef) => (
								<motion.div
									key={section.id}
									initial={{ opacity: 0, y: 16 }}
									animate={{ opacity: activeSection === section.id ? 1 : 0.0, y: activeSection === section.id ? 0 : 8 }}
									style={{ display: activeSection === section.id ? 'block' : 'none' }}
									transition={{ duration: 0.25 }}
								>
									{/* Section header */}
									<div className="flex items-center gap-3 mb-6 pb-5 border-b" style={{ borderColor: '#2A2A2A' }}>
										<div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `${section.color}15`, border: `1px solid ${section.color}25`, color: section.color }}>
											{section.icon}
										</div>
										<h2 className="text-2xl font-bold text-white">{section.title}</h2>
									</div>

									{section.content.map((item, i) => (
										<div key={i}>{renderContent(item)}</div>
									))}

									{/* Navigation between sections */}
									<div className="flex items-center justify-between mt-10 pt-6 border-t" style={{ borderColor: '#2A2A2A' }}>
										{sections.findIndex(s => s.id === section.id) > 0 ? (
											<button
												onClick={() => setActiveSection(sections[sections.findIndex(s => s.id === section.id) - 1].id)}
												className="flex items-center gap-2 text-sm font-semibold transition-all"
												style={{ color: 'rgba(255,255,255,0.4)' }}
												onMouseEnter={e => (e.currentTarget.style.color = 'white')}
												onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
											>
												← {sections[sections.findIndex(s => s.id === section.id) - 1].title}
											</button>
										) : <div />}
										{sections.findIndex(s => s.id === section.id) < sections.length - 1 ? (
											<button
												onClick={() => setActiveSection(sections[sections.findIndex(s => s.id === section.id) + 1].id)}
												className="flex items-center gap-2 text-sm font-semibold transition-all"
												style={{ color: '#38bdf8' }}
											>
												{sections[sections.findIndex(s => s.id === section.id) + 1].title} →
											</button>
										) : (
											<Link href="/collections" className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl" style={{ background: 'rgba(184,251,60,0.1)', color: '#B8FB3C', border: '1px solid rgba(184,251,60,0.2)' }}>
												Browse Components →
											</Link>
										)}
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
