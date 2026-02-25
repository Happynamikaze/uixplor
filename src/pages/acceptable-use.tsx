import PageSEO from '@/components/seo/PageSEO';
import Link from 'next/link';
import { motion } from 'motion/react';

const fadeUp = (delay = 0) => ({
	initial: { opacity: 0, y: 20 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5, delay },
});

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
	<motion.section className="mb-12" {...fadeUp(0.05)}>
		<h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
			<span className="w-1.5 h-6 rounded-full bg-[#B8FB3C] shrink-0" />
			{title}
		</h2>
		<div className="text-white/55 leading-relaxed space-y-3 text-sm sm:text-base pl-5">
			{children}
		</div>
	</motion.section>
);

const prohibited = [
	{ icon: '🤖', title: 'Automated Scraping', desc: 'Using bots, crawlers, or automated scripts to mass-download content, images, or code snippets from UIXplor without prior written consent.' },
	{ icon: '🔓', title: 'Unauthorized Access', desc: 'Attempting to access restricted areas, bypass security controls, or probe the site for vulnerabilities.' },
	{ icon: '📋', title: 'Content Cloning', desc: 'Reproducing UIXplor\'s collections, blog content, or overall design to create a competing service.' },
	{ icon: '💣', title: 'Malicious Code', desc: 'Attempting to inject malware, XSS payloads, or any other malicious code into the site or its users.' },
	{ icon: '📧', title: 'Spam & Phishing', desc: 'Using UIXplor as a platform or vector for spam, phishing, or fraudulent communications.' },
	{ icon: '⚡', title: 'Denial of Service', desc: 'Flooding the site with excessive requests intended to degrade performance or cause outages.' },
	{ icon: '🎭', title: 'Impersonation', desc: 'Impersonating UIXplor, its team, or other users in any context.' },
	{ icon: '📜', title: 'IP Violation', desc: 'Removing copyright notices, misrepresenting ownership of UIXplor content, or violating our intellectual property rights.' },
];

export default function AcceptableUse() {
	return (
		<>
			<PageSEO
				title="Acceptable Use Policy – UIXplor"
				description="UIXplor's Acceptable Use Policy — what you can and cannot do with our UI snippets and website. Copyright and fair use guidelines."
				path="/acceptable-use"
			/>

			<main className="min-h-screen px-4 sm:px-6 py-16 sm:py-24">
				<div className="max-w-3xl mx-auto">

					{/* Header */}
					<motion.div className="mb-14" {...fadeUp()}>
						<Link href="/" className="inline-flex items-center gap-2 text-sm text-white/35 hover:text-[#B8FB3C] transition-colors mb-8 group">
							<svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
							Back to Home
						</Link>
						<p className="text-xs font-semibold uppercase tracking-widest text-[#B8FB3C] mb-3">Legal</p>
						<h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">Acceptable Use Policy</h1>
						<p className="text-white/40 text-sm">Last updated: February 25, 2026</p>
						<div className="mt-6 p-4 rounded-xl bg-[#B8FB3C]/5 border border-[#B8FB3C]/15">
							<p className="text-sm text-white/60">UIXplor is a free, open resource. To keep it that way, we ask that everyone uses it responsibly and with good intent. This policy defines what is and isn&apos;t acceptable.</p>
						</div>
					</motion.div>

					<div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-12" />

					<Section title="1. Overview">
						<p>This Acceptable Use Policy (&quot;AUP&quot;) applies to all users accessing UIXplor. By using the website, you agree to abide by this policy in addition to our <Link href="/terms" className="text-[#B8FB3C] hover:underline">Terms & Conditions</Link>.</p>
						<p>The goal of this policy is to protect UIXplor, its users, and the broader community from harmful, abusive, or illegal behavior.</p>
					</Section>

					<Section title="2. Permitted Use">
						<p>You are welcome to use UIXplor for:</p>
						<ul className="list-disc list-inside space-y-1.5 mt-2 text-white/50">
							<li>Browsing and copying CSS snippets for personal or commercial projects</li>
							<li>Reading blog articles for learning and reference</li>
							<li>Sharing UIXplor links with friends, colleagues, or on social media</li>
							<li>Using the site as a design reference tool during development</li>
						</ul>
					</Section>

					<Section title="3. Prohibited Actions">
						<p>The following actions are strictly prohibited:</p>
						<div className="mt-4 space-y-3">
							{prohibited.map(p => (
								<div key={p.title} className="flex items-start gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
									<span className="text-xl shrink-0">{p.icon}</span>
									<div>
										<p className="text-sm font-semibold text-white/80 mb-0.5">{p.title}</p>
										<p className="text-xs text-white/45">{p.desc}</p>
									</div>
								</div>
							))}
						</div>
					</Section>

					<Section title="4. Security & Integrity">
						<p>We take the security of UIXplor and its users seriously. If you discover a security vulnerability in our platform, please <strong className="text-white/80">do not exploit it</strong>. Instead, contact us at <span className="text-[#B8FB3C]">hello@uixplor.com</span> with a responsible disclosure.</p>
						<p>We appreciate good-faith security research and will acknowledge contributors who help us improve our security posture.</p>
					</Section>

					<Section title="5. Enforcement">
						<p>Violations of this AUP may result in:</p>
						<ul className="list-disc list-inside space-y-1.5 mt-2 text-white/50">
							<li>Immediate IP-level blocking or rate limiting</li>
							<li>Reporting to relevant authorities where illegal activity is suspected</li>
							<li>Legal action where warranted by the severity of the violation</li>
						</ul>
						<p className="mt-3">We reserve the right to update this policy at any time and will not provide advance notice for enforcement actions against active abuse.</p>
					</Section>

					<Section title="6. Contact">
						<p>To report abuse, security issues, or policy concerns:</p>
						<div className="mt-3 p-4 rounded-xl bg-white/3 border border-white/6">
							<p className="text-sm font-semibold text-white/70 mb-1">Report Abuse</p>
							<p className="text-sm text-[#B8FB3C]">hello@uixplor.com</p>
							<p className="text-xs text-white/35 mt-1">Include as much detail as possible. We take all reports seriously.</p>
						</div>
					</Section>

				</div>
			</main>
		</>
	);
}
