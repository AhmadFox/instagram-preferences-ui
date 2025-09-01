import { useState, useCallback, useRef, useEffect } from 'react';

interface UseSwipeableDrawerProps {
	width?: number;
	onOpen?: () => void;
	onClose?: () => void;
}

export function useSwipeableDrawer({
	width = 300,
	onOpen,
	onClose
}: UseSwipeableDrawerProps = {}) {
	const [isOpen, setIsOpen] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [dragPosition, setDragPosition] = useState(0);
	const [isEdgeHover, setIsEdgeHover] = useState(false);
	const dragStartRef = useRef<{ x: number; initialPosition: number } | null>(null);

	const open = useCallback(() => {
		setIsOpen(true);
		setDragPosition(width);
		onOpen?.();
	}, [width, onOpen]);

	const close = useCallback(() => {
		setIsOpen(false);
		setDragPosition(0);
		onClose?.();
	}, [onClose]);

	const handleMouseMove = useCallback((e: MouseEvent) => {
		const isNearLeftEdge = e.clientX <= 15;
		setIsEdgeHover(isNearLeftEdge && !isOpen);
	}, [isOpen]);

	const handleDragStart = useCallback((e: MouseEvent | TouchEvent) => {
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;

		// Start drag from left edge when closed, or anywhere on drawer when open
		if (!isOpen && clientX > 15) {
			return;
		}

		setIsDragging(true);
		if (!isOpen) {
			setIsOpen(true); // Show drawer when starting to drag
		}
		dragStartRef.current = {
			x: clientX,
			initialPosition: dragPosition
		};
	}, [isOpen, dragPosition]);

	const handleDrag = useCallback((e: MouseEvent | TouchEvent) => {
		if (!isDragging || !dragStartRef.current) return;

		e.preventDefault(); // Prevent scrolling while dragging

		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const deltaX = clientX - dragStartRef.current.x;

		let newPosition;
		if (dragStartRef.current.initialPosition === 0) {
			// Starting from closed - position follows drag distance from edge
			newPosition = Math.max(0, Math.min(width, deltaX));
		} else {
			// Starting from open - position follows drag delta
			newPosition = Math.max(0, Math.min(width, dragStartRef.current.initialPosition + deltaX));
		}

		setDragPosition(newPosition);
	}, [isDragging, width, isOpen]);

	const handleDragEnd = useCallback(() => {
		if (!isDragging) return;

		setIsDragging(false);
		dragStartRef.current = null;

		const threshold = width * 0.5;

		if (dragPosition > threshold) {
			open();
		} else {
			close();
		}
	}, [isDragging, dragPosition, width, open, close]);

	// Add global event listeners
	useEffect(() => {
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mousedown', handleDragStart);
		document.addEventListener('mousemove', handleDrag);
		document.addEventListener('mouseup', handleDragEnd);

		document.addEventListener('touchstart', handleDragStart);
		document.addEventListener('touchmove', handleDrag);
		document.addEventListener('touchend', handleDragEnd);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mousedown', handleDragStart);
			document.removeEventListener('mousemove', handleDrag);
			document.removeEventListener('mouseup', handleDragEnd);

			document.removeEventListener('touchstart', handleDragStart);
			document.removeEventListener('touchmove', handleDrag);
			document.removeEventListener('touchend', handleDragEnd);
		};
	}, [handleMouseMove, handleDragStart, handleDrag, handleDragEnd]);

	return {
		isOpen,
		isDragging,
		dragPosition,
		isEdgeHover,
		open,
		close,
		width
	};
}