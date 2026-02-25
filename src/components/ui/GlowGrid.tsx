'use client';
import { useRef, useCallback } from 'react';

/**
 * GlowGrid
 * Tracks mouse position across the grid and sets --mouse-x / --mouse-y
 * CSS custom properties on each [data-glow-card] child (as % within that card).
 *
 * GlowCard uses those variables to show a glowing BORDER gradient — the card
 * border edge nearest the cursor lights up with the brand green color.
 */

interface GlowGridProps {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

export function GlowGrid({ children, className = '', style }: GlowGridProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		const container = containerRef.current;
		if (!container) return;
		const cards = container.querySelectorAll<HTMLElement>('[data-glow-card]');
		cards.forEach(card => {
			const rect = card.getBoundingClientRect();
			const x = ((e.clientX - rect.left) / rect.width) * 100;
			const y = ((e.clientY - rect.top) / rect.height) * 100;
			card.style.setProperty('--mouse-x', `${x}%`);
			card.style.setProperty('--mouse-y', `${y}%`);
			card.style.setProperty('--glow-opacity', '1');
		});
	}, []);

	const handleMouseLeave = useCallback(() => {
		const container = containerRef.current;
		if (!container) return;
		const cards = container.querySelectorAll<HTMLElement>('[data-glow-card]');
		cards.forEach(card => {
			card.style.setProperty('--glow-opacity', '0');
		});
	}, []);

	return (
		<div
			ref={containerRef}
			className={className}
			style={style}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</div>
	);
}

/**
 * GlowCard
 * A 1px-padded wrapper whose gradient background shows through as a glowing border.
 * The inner content sits on the card background — only the 1px "border" reveals the glow.
 *
 * Effect: as you move the cursor, the nearest card BORDER edge glows green/custom color.
 */

interface GlowCardProps {
	children: React.ReactNode;
	className?: string;
	cardBg?: string;      // background of the card content area (default: dark)
	glowColor?: string;   // glow border color (default: #B8FB3C brand green)
	borderRadius?: string;
	onClick?: () => void;
	style?: React.CSSProperties;
}

export function GlowCard({
	children,
	className = '',
	cardBg = '#0a0a0f',
	glowColor = '#B8FB3C',
	borderRadius = '1rem',
	onClick,
	style,
}: GlowCardProps) {
	return (
		<div
			data-glow-card
			onClick={onClick}
			className={`glow-card-outer ${className}`}
			style={{
				'--glow-color': glowColor,
				'--card-bg': cardBg,
				'--mouse-x': '50%',
				'--mouse-y': '50%',
				'--glow-opacity': '0',
				position: 'relative',
				padding: '1px',
				borderRadius,
				backgroundImage: `radial-gradient(
					400px circle at var(--mouse-x) var(--mouse-y),
					color-mix(in srgb, var(--glow-color) 70%, transparent),
					transparent 70%
				)`,
				backgroundOrigin: 'border-box',
				...style,
			} as React.CSSProperties}
		>
			{/* This sits on top covering the wrapper — only the 1px gap is the glowing border */}
			<div
				className="glow-card-inner"
				style={{
					borderRadius: `calc(${borderRadius} - 1px)`,
					height: '100%',
					overflow: 'hidden',
				}}
			>
				{children}
			</div>
		</div>
	);
}
