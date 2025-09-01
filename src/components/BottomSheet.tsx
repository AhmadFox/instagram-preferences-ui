import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform, useAnimation } from 'framer-motion';

interface BottomSheetProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title?: string;
	initialSnap?: 'collapsed' | 'half' | 'full';
	showCloseButton?: boolean;
	className?: string;
	headerBorder?: boolean;
	footer?: React.ReactNode;
	snapPoints: Record<SnapPoint, number>;
}

export type SnapPoint = 'collapsed' | 'half' | 'full' | 'dismissed';

const SNAP_POINTS = {
	dismissed: 1,
	collapsed: 0.75, // 85% from top
	half: 0.5,       // 50% from top  
	full: 0        // 10% from top (almost full screen)
};

const VELOCITY_THRESHOLD = 800;
const DRAG_THRESHOLD = 50;

export function BottomSheet({
	isOpen,
	onClose,
	children,
	title,
	initialSnap = 'half',
	showCloseButton = true,
	headerBorder = false,
	className = '',
	footer,
	snapPoints
}: BottomSheetProps) {


	const [currentSnap, setCurrentSnap] = useState<SnapPoint>(initialSnap);
	const [isContentScrollable, setIsContentScrollable] = useState(false);
	const [isAtTop, setIsAtTop] = useState(true);
	const contentRef = useRef<HTMLDivElement>(null);
	const footerRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const [footerHeight, setFooterHeight] = useState(0);
	const [headerHeight, setHeaderHeight] = useState(0);

	const y = useMotionValue(0);
	const controls = useAnimation();

	const backgroundOpacity = useTransform(y, [0, 1000], [0.8, 0]);

	const getSnapPointValue = useCallback(
		(snapPoint: SnapPoint) => {
		  if (typeof window === 'undefined') return 0;
		  const windowHeight = window.innerHeight;
		  return windowHeight * snapPoints[snapPoint];
		},
		[snapPoints]
	  );

	  const animateToSnap = useCallback(
		async (snapPoint: SnapPoint) => {
		  const targetY = getSnapPointValue(snapPoint);
	
		  await controls.start({
			y: targetY,
			transition: {
			  type: 'spring',
			  damping: 25,
			  stiffness: 300,
			  mass: 0.8,
			  velocity: y.getVelocity(),
			},
		  });
	
		  y.set(targetY);
		},
		[controls, y, getSnapPointValue]
	  );

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

	useEffect(() => {
		if (!isOpen) return;
	  
		const updateFooterHeight = () => {
		  setFooterHeight(footerRef.current?.getBoundingClientRect().height || 0);
		};
	  
		updateFooterHeight();
		window.addEventListener('resize', updateFooterHeight);
	  
		return () => {
		  window.removeEventListener('resize', updateFooterHeight);
		};
	  }, [isOpen]);
	  

	  useEffect(() => {
		if (!isOpen) return;
	  
		const updateHeaderHeight = () => {
		  setHeaderHeight(headerRef.current?.getBoundingClientRect().height || 0);
		};
	  
		updateHeaderHeight();
		window.addEventListener('resize', updateHeaderHeight);
	  
		return () => {
		  window.removeEventListener('resize', updateHeaderHeight);
		};
	  }, [isOpen]);
	  

	// Check if content is scrollable and at top
	useEffect(() => {
		const checkScroll = () => {
			if (contentRef.current) {
				const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
				setIsContentScrollable(scrollHeight > clientHeight);
				setIsAtTop(scrollTop === 0);
			}
		};

		checkScroll();

		// Add event listener for scroll events
		if (contentRef.current) {
			contentRef.current.addEventListener('scroll', checkScroll);
		}

		// Add resize listener to check when window size changes
		window.addEventListener('resize', checkScroll);

		return () => {
			if (contentRef.current) {
				contentRef.current.removeEventListener('scroll', checkScroll);
			}
			window.removeEventListener('resize', checkScroll);
		};
	}, [isOpen, children]);

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
		  window.innerHeight - ((headerHeight + 19) + footerHeight),
		  window.innerHeight - (headerHeight + 19)
		],
		[0, footerHeight],
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
						className={`fixed left-0 right-0 bg-white overflow-hidden ${className}`}
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
						dragPropagation={false}
						// Only allow dragging down if content is at top or we're not in full mode
						dragListener={currentSnap !== 'full' || isAtTop}
					>
						{/* Header */}
						<div ref={headerRef} className={`${headerBorder ? 'border-b' : ''} border-gray-100`}>
							{/* Grab Handle */}
							<div className="flex justify-center py-2">
								<div className="w-9 h-[3px] bg-gray-500 rounded-full" />
							</div>

							{/* Header */}
							{(title || showCloseButton) && (
								<div className="flex items-center justify-between px-4 py-3">
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
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
												<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
											</svg>
										</button>
									)}
								</div>
							)}
						</div>

						{/* Content */}
						<div
							ref={contentRef}
							className="flex-1 overflow-y-auto overscroll-contain"
							style={{
								paddingBottom: `${footerHeight + 8}px`,
								maxHeight: `calc(100vh - ${title || showCloseButton ? '80px' : '20px'})`,
								WebkitOverflowScrolling: 'touch',
								// Enable scrolling only when in full mode and content is scrollable
								overflowY: (currentSnap === 'full' && isContentScrollable) ? 'auto' : 'hidden',
								// Allow pan-y touch action only when in full mode and content is scrollable
								touchAction: (currentSnap === 'full' && isContentScrollable) ? 'pan-y' : 'none',
								// Show grab cursor when at top to indicate draggability
								cursor: (currentSnap === 'full' && isAtTop) ? 'grab' : 'auto'
							}}
						>
							{children}
						</div>
					</motion.div>

					{/* Footer OUTSIDE motion.div */}
					{footer && (
						<motion.div
							ref={footerRef}
							className="fixed bottom-0 left-0 right-0"
							style={{ y: footerY }}
						>
							{footer}
						</motion.div>
					)}
					{/* Debug overlay */}
				</div>
			)}
		</AnimatePresence>
	);
}