'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Redirect App Router 404s to our custom Pages Router 404 page
export default function NotFound() {
	const router = useRouter();

	useEffect(() => {
		router.replace('/404');
	}, [router]);

	// Minimal fallback while redirect happens
	return (
		<div style={{
			minHeight: '100vh',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			background: '#0a0a0f',
			color: 'rgba(255,255,255,0.4)',
			fontFamily: 'system-ui, sans-serif',
			fontSize: '14px',
		}}>
			Redirecting...
		</div>
	);
}
