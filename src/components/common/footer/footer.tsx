import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
    { href: '/collections', label: 'Collections' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

const legalLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/disclaimer', label: 'Disclaimer' },
    { href: '/cookies', label: 'Cookie Policy' },
    { href: '/acceptable-use', label: 'Acceptable Use' },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full mt-auto">
            <div className="container px-4 sm:px-6">

                {/* ── Main pill bar — original style ── */}
                <div className="py-8 sm:py-10 px-6 sm:px-10 bg-[#101010] text-center rounded-[28px] sm:rounded-[36px]">

                    {/* Nav links */}
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-5">
                        {navLinks.map(l => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-sm font-medium text-white/50 hover:text-[#B8FB3C] transition-colors"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-white/8 mb-5 max-w-xs mx-auto" />

                    {/* Legal links */}
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mb-6">
                        {legalLinks.map((l, i) => (
                            <span key={l.href} className="flex items-center gap-4">
                                <Link
                                    href={l.href}
                                    className="text-xs text-white/25 hover:text-white/55 transition-colors"
                                >
                                    {l.label}
                                </Link>
                                {i < legalLinks.length - 1 && (
                                    <span className="text-white/10 text-xs select-none">·</span>
                                )}
                            </span>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="text-sm text-white/35">
                        © {year} Copyright UIXplor · All Rights Reserved
                    </p>
                    <p className="text-xs text-white/20 mt-1">
                        <a href="mailto:uixplor@gmail.com" className="hover:text-[#B8FB3C] transition-colors">
                            uixplor@gmail.com
                        </a>
                    </p>
                </div>

                {/* ── Big fade logo — original style ── */}
                <Image
                    src="/images/bgs/fade-logo.svg"
                    className="w-full mt-8 sm:mt-10 mb-0"
                    width={1440}
                    height={160}
                    alt="UIXplor"
                    priority={false}
                />
            </div>
        </footer>
    );
}