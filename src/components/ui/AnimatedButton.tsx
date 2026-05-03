'use client';

import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { ComponentProps } from 'react';

interface AnimatedButtonProps extends ComponentProps<typeof Button> {
	children: React.ReactNode;
}

export default function AnimatedButton({ children, className, ...props }: AnimatedButtonProps) {
	return (
		<motion.div
			className="relative"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: 'easeOut' }}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			{/* Glow effect — CSS transition instead of Framer variant for perf */}
			<div
				className="absolute inset-0 rounded-md blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
				style={{
					background: 'radial-gradient(circle, rgba(184, 251, 60, 0.4) 0%, transparent 70%)',
				}}
			/>

			{/* Button with CSS box-shadow transition */}
			<div
				className="rounded-md relative transition-shadow duration-300"
				style={{ boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.1)' }}
				onMouseEnter={e => {
					(e.currentTarget as HTMLElement).style.boxShadow =
						'0 8px 24px 0 rgba(184, 251, 60, 0.3), 0 0 0 1px rgba(184, 251, 60, 0.2)';
				}}
				onMouseLeave={e => {
					(e.currentTarget as HTMLElement).style.boxShadow =
						'0 2px 8px 0 rgba(0, 0, 0, 0.1)';
				}}
			>
				<Button className={className} {...props}>
					{children}
				</Button>
			</div>
		</motion.div>
	);
}
