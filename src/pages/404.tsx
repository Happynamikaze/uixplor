import Link from 'next/link';
import { motion } from 'motion/react';
import PageSEO from '@/components/seo/PageSEO';

const suggestedLinks = [
	{ href: '/collections', label: 'Browse Collections', icon: '⬡', desc: '11 CSS categories' },
	{ href: '/blog', label: 'Read the Blog', icon: '✦', desc: '26 design guides' },
	{ href: '/collections/box-shadows', label: 'Box Shadows', icon: '◼', desc: '33 shadow styles' },
	{ href: '/collections/buttons', label: 'CSS Buttons', icon: '⬭', desc: '15 button styles' },
];

const glitchChars = ['4', '0', '4'];

export default function Custom404() {
	return (
		<>
			<PageSEO
				title="404 — Page Not Found"
				description="This page doesn't exist on UIXplor. Browse our CSS collections or read our design blog."
				path="/404"
				noindex
			/>

			<div className="min-h-[90vh] flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
				{/* Background glow */}
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#B8FB3C]/[0.03] blur-[100px]" />
				</div>

				{/* Big 404 */}
				<motion.div
					className="relative flex items-center justify-center gap-2 sm:gap-4 mb-6"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: 'easeOut' }}
				>
					{glitchChars.map((char, i) => (
						<motion.span
							key={i}
							className="text-[100px] sm:text-[160px] font-black leading-none tracking-tighter select-none"
							style={{
								color: i === 1 ? '#B8FB3C' : 'rgba(255,255,255,0.06)',
								textShadow: i === 1 ? '0 0 80px rgba(184,251,60,0.3)' : 'none',
							}}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: i * 0.12 }}
						>
							{char}
						</motion.span>
					))}
				</motion.div>

				{/* Separator */}
				<motion.div
					className="w-12 h-px bg-[#B8FB3C] mb-6"
					initial={{ scaleX: 0 }}
					animate={{ scaleX: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				/>

				{/* Message */}
				<motion.div
					className="mb-10"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.5 }}
				>
					<h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Page not found</h1>
					<p className="text-white/40 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
						The page you&apos;re looking for doesn&apos;t exist or has been moved. Here are some places to explore:
					</p>
				</motion.div>

				{/* Suggested links grid */}
				<motion.div
					className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 w-full max-w-2xl"
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.65 }}
				>
					{suggestedLinks.map(link => (
						<Link key={link.href} href={link.href} className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/[0.03] border border-white/6 hover:border-[#B8FB3C]/30 hover:bg-[#B8FB3C]/[0.04] transition-all duration-300">
							<span className="text-2xl">{link.icon}</span>
							<span className="text-xs font-semibold text-white group-hover:text-[#B8FB3C] transition-colors">{link.label}</span>
							<span className="text-[10px] text-white/30">{link.desc}</span>
						</Link>
					))}
				</motion.div>

				{/* Primary CTA */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.8 }}
				>
					<Link
						href="/"
						className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#B8FB3C] text-[#0a0a0f] font-semibold text-sm hover:shadow-[0_0_30px_rgba(184,251,60,0.3)] transition-all duration-300"
					>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
						Back to Home
					</Link>
				</motion.div>
			</div>
		</>
	);
}
