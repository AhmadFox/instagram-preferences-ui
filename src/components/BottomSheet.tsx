import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { X } from 'lucide-react';

interface BottomSheetProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title?: string;
	initialSnap?: 'collapsed' | 'half' | 'full';
	showCloseButton?: boolean;
	className?: string;
	footer?: React.ReactNode;
}

type SnapPoint = 'collapsed' | 'half' | 'full' | 'dismissed';

const SNAP_POINTS = {
	dismissed: 1,
	collapsed: 0.85, // 85% from top
	half: 0.5,       // 50% from top  
	full: 0.1        // 10% from top (almost full screen)
};

const VELOCITY_THRESHOLD = 800;
const DRAG_THRESHOLD = 50;
const HEADER_HEIGHT = 73;
const FOOTER_HEIGHT = 73;

export function BottomSheet({
	isOpen,
	onClose,
	children,
	title,
	initialSnap = 'half',
	showCloseButton = true,
	className = '',
	footer
}: BottomSheetProps) {
	const [currentSnap, setCurrentSnap] = useState<SnapPoint>(initialSnap);
	const y = useMotionValue(0);
	const controls = useAnimation();

	const backgroundOpacity = useTransform(y, [0, 1000], [0.8, 0]);

	const getSnapPointValue = useCallback((snapPoint: SnapPoint) => {
		if (typeof window === 'undefined') return 0;
		const windowHeight = window.innerHeight;
		return windowHeight * SNAP_POINTS[snapPoint];
	}, []);

	const animateToSnap = useCallback(async (snapPoint: SnapPoint) => {
		const targetY = getSnapPointValue(snapPoint);

		await controls.start({
			y: targetY,
			transition: {
				type: 'spring',
				damping: 25,
				stiffness: 300,
				mass: 0.8,
				velocity: y.getVelocity()
			}
		});

		y.set(targetY);
	}, [controls, y, getSnapPointValue]);

	const handleDragEnd = useCallback(async (info: PanInfo) => {
		const velocity = info.velocity.y;
		const currentY = y.get();

		let targetSnap: SnapPoint = currentSnap;

		// Fast velocity-based snapping (more sensitive like iOS)
		if (Math.abs(velocity) > VELOCITY_THRESHOLD) {
			if (velocity > 0) {
				// Dragging down
				if (currentSnap === 'full') targetSnap = 'half';
				else if (currentSnap === 'half') targetSnap = 'collapsed';
				else targetSnap = 'dismissed';
			} else {
				// Dragging up
				if (currentSnap === 'collapsed') targetSnap = 'half';
				else if (currentSnap === 'half') targetSnap = 'full';
			}
		} else {
			// Position-based snapping
			const fullPoint = getSnapPointValue('full');
			const halfPoint = getSnapPointValue('half');
			const collapsedPoint = getSnapPointValue('collapsed');

			if (currentY < (fullPoint + halfPoint) / 2) {
				targetSnap = 'full';
			} else if (currentY < (halfPoint + collapsedPoint) / 2) {
				targetSnap = 'half';
			} else if (currentY < collapsedPoint + DRAG_THRESHOLD) {
				targetSnap = 'collapsed';
			} else {
				targetSnap = 'dismissed';
			}
		}

		if (targetSnap === 'dismissed') {
			onClose();
		} else {
			setCurrentSnap(targetSnap);
			await animateToSnap(targetSnap);
		}
	}, [currentSnap, y, getSnapPointValue, onClose, animateToSnap]);

	// Initialize position when opening
	useEffect(() => {
		if (isOpen) {
			const initialY = getSnapPointValue(initialSnap);
			y.set(window.innerHeight); // Start from bottom
			setCurrentSnap(initialSnap);

			// Animate in
			controls.start({
				y: initialY,
				transition: {
					type: 'spring',
					damping: 30,
					stiffness: 400,
					mass: 0.8
				}
			});
		}
	}, [isOpen, initialSnap, y, controls, getSnapPointValue]);

	// Update position when snap changes
	useEffect(() => {
		if (isOpen && currentSnap !== 'dismissed') {
			animateToSnap(currentSnap);
		}
	}, [currentSnap, isOpen, animateToSnap]);

	const handleBackdropClick = useCallback(() => {
		onClose();
	}, [onClose]);

	// Prevent body scroll when sheet is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
			document.body.style.touchAction = 'none';
		} else {
			document.body.style.overflow = '';
			document.body.style.touchAction = '';
		}

		return () => {
			document.body.style.overflow = '';
			document.body.style.touchAction = '';
		};
	}, [isOpen]);

	const footerY = useTransform(
		y,
		[
			window.innerHeight - HEADER_HEIGHT - FOOTER_HEIGHT,
			window.innerHeight - HEADER_HEIGHT
		],
		[0, FOOTER_HEIGHT],
		{ clamp: true }
	);

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 overflow-hidden">
					{/* Background Scrim */}
					<motion.div
						className="absolute inset-0 bg-black"
						style={{ opacity: backgroundOpacity }}
						initial={{ opacity: 0.1 }}
						animate={{ opacity: 0.6 }}
						exit={{ opacity: 0 }}
						onClick={handleBackdropClick}
						transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
					/>

					{/* Bottom Sheet */}
					<motion.div
						className={`fixed left-0 right-0 bg-white ${className}`}
						style={{
							y,
							top: 20,
							borderTopLeftRadius: 24,
							borderTopRightRadius: 24,
							touchAction: 'none',
							willChange: 'transform'
						}}
						initial={{ y: '100%' }}
						animate={controls}
						exit={{ y: '100%', transition: { type: 'spring', damping: 30, stiffness: 400, mass: 0.6 } }}
						drag="y"
						dragConstraints={{
							top: getSnapPointValue('full'),
							bottom: window.innerHeight
						}}
						dragElastic={{ top: 0.05, bottom: 0.2 }}
						onDragEnd={(_, info) => handleDragEnd(info)}
						dragMomentum={false}
					>
						{/* Header */}
						<div>
							{/* Grab Handle */}
							<div className="flex justify-center pt-2 pb-1">
								<div className="w-9 h-[3px] bg-gray-500 rounded-full" />
							</div>

							{/* Header */}
							{(title || showCloseButton) && (
								<div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
									<div className="flex-1">
										{title && (
											<h2 className="font-semibold text-gray-900 text-center">
												{title}
											</h2>
										)}
									</div>
									{showCloseButton && (
										<button
											onClick={onClose}
											className="absolute right-4 top-5 p-2 hover:bg-gray-100 rounded-full transition-colors"
											aria-label="Close"
										>
											<X className="w-5 h-5 text-gray-500" />
										</button>
									)}
								</div>
							)}
						</div>

						{/* Content */}
						<div
							className="flex-1 overflow-y-auto overscroll-contain pb-[80px] "
							style={{
								maxHeight: `calc(100vh - ${title || showCloseButton ? '80px' : '20px'})`,
								WebkitOverflowScrolling: 'touch'
							}}
						>
							{children}
						</div>
					</motion.div>

					{/* Footer OUTSIDE motion.div */}
					{footer && (
						<motion.div
							className="absolute bottom-0 left-0 right-0"
							style={{ y: footerY }}
						>
							{footer}
						</motion.div>
					)}
				</div>

			)}
		</AnimatePresence>
	);
}