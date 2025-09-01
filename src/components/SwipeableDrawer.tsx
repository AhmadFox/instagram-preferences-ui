import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SwipeableDrawerProps {
	isOpen: boolean;
	isDragging: boolean;
	dragPosition: number;
	isEdgeHover: boolean;
	onClose: () => void;
	width: number;
	children: React.ReactNode;
}

export function SwipeableDrawer({
	isOpen,
	isDragging,
	dragPosition,
	isEdgeHover,
	onClose,
	width,
	children
}: SwipeableDrawerProps) {
	const backdropOpacity = dragPosition / width * 0.5;

	return (
		<>
			{/* Edge Detection Area */}
			<div
				className={`fixed left-0 top-0 w-4 h-full z-40 ${isEdgeHover ? 'cursor-grab' : ''
					}`}
				style={{
					cursor: isEdgeHover ? 'grab' : 'default',
					touchAction: 'none'
				}}
			/>

			{/* Backdrop */}
			<AnimatePresence>
				{(isOpen || isDragging) && (
					<motion.div
						className="fixed inset-0 z-40"
						style={{
							backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`,
							touchAction: 'none'
						}}
						initial={{ opacity: 0 }}
						animate={{ opacity: backdropOpacity }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						transition={{ duration: 0.2 }}
					/>
				)}
			</AnimatePresence>

			{/* Drawer */}
			<AnimatePresence>
				{(isOpen || isDragging || dragPosition > 0) && (
					<motion.div
						className="fixed left-0 top-0 h-full bg-white shadow-2xl z-50 flex flex-col"
						style={{
							width: `${width}px`,
							x: dragPosition - width,
							touchAction: 'none'
						}}
						initial={{ x: -width }}
						animate={{
							x: dragPosition - width,
							transition: isDragging ? { duration: 0 } : {
								type: 'spring',
								damping: 25,
								stiffness: 300,
								mass: 0.8
							}
						}}
						exit={{
							x: -width,
							transition: {
								type: 'spring',
								damping: 25,
								stiffness: 300,
								mass: 0.8
							}
						}}
					>
						{/* Header */}
						<div className="flex items-center justify-between p-4 border-b border-gray-200">
							<h2 className="text-lg font-semibold text-gray-900">Menu</h2>
							<button
								onClick={onClose}
								className="p-2 hover:bg-gray-100 rounded-full transition-colors"
							>
								<X className="w-5 h-5 text-gray-500" />
							</button>
						</div>

						{/* Content */}
						<div className="flex-1 overflow-y-auto">
							{children}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}