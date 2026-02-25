import { useState, useEffect, useCallback } from 'react';

const MAX_ATTEMPTS = 5;
const LOCKOUT_LEVELS = [
	{ after: 5, duration: 30 },   // 30 seconds after 5 fails
	{ after: 8, duration: 300 },  // 5 minutes after 8 fails
	{ after: 12, duration: 1800 }, // 30 minutes after 12 fails
];

interface PinLockState {
	attempts: number;
	lockedUntil: number | null; // epoch ms
}

export function usePinLock(storageKey: string) {
	const [pin, setPin] = useState('');
	const [unlocked, setUnlocked] = useState(false);
	const [error, setError] = useState(false);
	const [lockState, setLockState] = useState<PinLockState>({ attempts: 0, lockedUntil: null });
	const [countdown, setCountdown] = useState(0);

	// Load persisted lock state from localStorage
	useEffect(() => {
		try {
			const stored = localStorage.getItem(storageKey);
			if (stored) {
				const parsed: PinLockState = JSON.parse(stored);
				setLockState(parsed);
			}
		} catch {
			// ignore parse errors
		}
	}, [storageKey]);

	// Countdown timer when locked
	useEffect(() => {
		if (!lockState.lockedUntil) return;
		const remaining = Math.ceil((lockState.lockedUntil - Date.now()) / 1000);
		if (remaining <= 0) {
			// Lockout expired — clear lockedUntil but keep attempt count
			const next = { ...lockState, lockedUntil: null };
			setLockState(next);
			setCountdown(0);
			localStorage.setItem(storageKey, JSON.stringify(next));
			return;
		}
		setCountdown(remaining);
		const timer = setInterval(() => {
			const rem = Math.ceil((lockState.lockedUntil! - Date.now()) / 1000);
			if (rem <= 0) {
				clearInterval(timer);
				const next = { ...lockState, lockedUntil: null };
				setLockState(next);
				setCountdown(0);
				localStorage.setItem(storageKey, JSON.stringify(next));
			} else {
				setCountdown(rem);
			}
		}, 1000);
		return () => clearInterval(timer);
	}, [lockState, storageKey]);

	const isLocked = lockState.lockedUntil !== null && lockState.lockedUntil > Date.now();

	const getLockoutDuration = (attempts: number): number => {
		let duration = 0;
		for (const level of [...LOCKOUT_LEVELS].reverse()) {
			if (attempts >= level.after) {
				duration = level.duration;
				break;
			}
		}
		return duration;
	};

	const formatCountdown = (seconds: number): string => {
		if (seconds >= 3600) return `${Math.ceil(seconds / 3600)}h`;
		if (seconds >= 60) return `${Math.ceil(seconds / 60)}m ${seconds % 60}s`;
		return `${seconds}s`;
	};

	const handleSubmit = useCallback((e: React.FormEvent, correctPin: string) => {
		e.preventDefault();

		if (isLocked) return;

		if (pin === correctPin) {
			// ✅ Correct — reset lock state and unlock
			const reset = { attempts: 0, lockedUntil: null };
			setLockState(reset);
			localStorage.removeItem(storageKey);
			setUnlocked(true);
			setError(false);
		} else {
			// ❌ Wrong — increment attempts and maybe lock
			const newAttempts = lockState.attempts + 1;
			const lockDuration = getLockoutDuration(newAttempts);
			const lockedUntil = lockDuration > 0 ? Date.now() + lockDuration * 1000 : null;
			const next: PinLockState = { attempts: newAttempts, lockedUntil };
			setLockState(next);
			localStorage.setItem(storageKey, JSON.stringify(next));
			setError(true);
			setPin('');
		}
	}, [pin, isLocked, lockState, storageKey]);

	const remainingAttempts = Math.max(0, MAX_ATTEMPTS - (lockState.attempts % MAX_ATTEMPTS || MAX_ATTEMPTS));

	return {
		pin,
		setPin,
		unlocked,
		setUnlocked,
		error,
		isLocked,
		countdown,
		formatCountdown,
		handleSubmit,
		attempts: lockState.attempts,
		remainingAttempts,
	};
}
