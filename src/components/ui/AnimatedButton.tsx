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
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			<motion.div
				className="relative"
				whileHover="hover"
				initial="initial"
			>
				{/* Glow effect on hover */}
				<motion.div
					className="absolute inset-0 rounded-md blur-xl opacity-0"
					style={{
						background: 'radial-gradient(circle, rgba(184, 251, 60, 0.4) 0%, transparent 70%)',
					}}
					variants={{
						initial: { opacity: 0, scale: 0.8 },
						hover: {
							opacity: 1,
							scale: 1.2,
							transition: { duration: 0.3 }
						}
					}}
				/>

				{/* Button with shadow animation */}
				<motion.div
					variants={{
						initial: {
							boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.1)'
						},
						hover: {
							boxShadow: '0 8px 24px 0 rgba(184, 251, 60, 0.3), 0 0 0 1px rgba(184, 251, 60, 0.2)',
							transition: { duration: 0.3 }
						}
					}}
					className="rounded-md relative"
				>
					<Button className={className} {...props}>
						{children}
					</Button>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}
