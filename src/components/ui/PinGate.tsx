'use client';
import { usePinLock } from '@/hooks/usePinLock';

interface PinGateProps {
	storageKey: string;
	correctPin: string;
	title?: string;
	subtitle?: string;
	children: React.ReactNode;
}

export function PinGate({
	storageKey,
	correctPin,
	title = 'Restricted Access',
	subtitle = 'This page is restricted. Enter the access PIN.',
	children,
}: PinGateProps) {
	const {
		pin,
		setPin,
		unlocked,
		setUnlocked,
		error,
		isLocked,
		countdown,
		formatCountdown,
		handleSubmit,
		attempts,
		remainingAttempts,
	} = usePinLock(storageKey);

	if (unlocked) {
		return (
			<>
				{children}
				{/* Lock button always visible at bottom-right */}
				<div className="fixed bottom-6 right-6 z-50">
					<button
						onClick={() => setUnlocked(false)}
						className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/30 text-xs font-medium hover:text-white/60 hover:border-white/20 transition-all"
					>
						<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
						</svg>
						Lock
					</button>
				</div>
			</>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="w-full max-w-md text-center">

				{/* Icon */}
				<div className={`inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-6 mx-auto border transition-all ${isLocked ? 'bg-red-500/10 border-red-500/20' : 'bg-[#B8FB3C]/10 border-[#B8FB3C]/20'}`}>
					<svg className={`w-7 h-7 ${isLocked ? 'text-red-400' : 'text-[#B8FB3C]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
					</svg>
				</div>

				<h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
				<p className="text-white/40 text-sm mb-6">{subtitle}</p>

				{/* Locked state */}
				{isLocked ? (
					<div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/15">
						<p className="text-red-400 font-semibold text-sm mb-2">Access temporarily blocked</p>
						<p className="text-white/40 text-xs mb-4">
							Too many incorrect attempts ({attempts} total). Try again in:
						</p>
						<div className="text-3xl font-mono font-bold text-red-400 mb-3">
							{formatCountdown(countdown)}
						</div>
						<p className="text-white/25 text-xs">
							Repeated failures result in longer lockout periods.
						</p>
					</div>
				) : (
					<form onSubmit={(e) => handleSubmit(e, correctPin)} className="flex flex-col items-center gap-4">
						<input
							type="password"
							value={pin}
							onChange={e => setPin(e.target.value)}
							placeholder="Enter PIN"
							className={`w-full max-w-xs text-center text-lg font-mono px-4 py-3 rounded-xl bg-white/5 border text-white outline-none transition-all ${error
									? 'border-red-500/50 focus:border-red-500/70 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]'
									: 'border-white/10 focus:border-[#B8FB3C]/50 focus:shadow-[0_0_0_3px_rgba(184,251,60,0.1)]'
								}`}
							maxLength={8}
							autoFocus
							autoComplete="off"
						/>

						{error && (
							<p className="text-red-400 text-sm">
								Incorrect PIN.{' '}
								{remainingAttempts > 0
									? `${remainingAttempts} attempt${remainingAttempts === 1 ? '' : 's'} before lockout.`
									: 'Account will be locked on next failure.'}
							</p>
						)}

						{attempts > 0 && !error && (
							<p className="text-white/25 text-xs">{attempts} failed attempt{attempts !== 1 ? 's' : ''} recorded.</p>
						)}

						<button
							type="submit"
							className="px-8 py-2.5 rounded-full bg-[#B8FB3C] text-[#0a0a0f] font-semibold text-sm hover:shadow-[0_0_20px_rgba(184,251,60,0.25)] transition-all"
						>
							Unlock
						</button>
					</form>
				)}
			</div>
		</div>
	);
}
