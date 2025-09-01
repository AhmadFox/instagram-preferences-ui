import { Post } from './components/Post';
import { CommentSheet } from './components/CommentSheet';
import { useBottomSheet } from './hooks/useBottomSheet';
import { ShareSheet } from './components/ShareSheet';
import { Instagram, Menu } from 'lucide-react';
import { SwipeableDrawer } from './components/SwipeableDrawer';
import { useSwipeableDrawer } from './hooks/useSwipeableDrawer';
import { DrawerMenu } from './components/DrawerMenu';

function App() {
	const {
		isCommentOpen,
		isShareOpen,
		openComment,
		openShare,
		close
	} = useBottomSheet();
	const drawer = useSwipeableDrawer({ width: 300 });

	return (
		<div className=" bg-gray-50">
			{/* Header */}
			<header className="bg-white border-b border-gray-200 sticky top-0 z-40">
				<div className="max-w-lg mx-auto px-4 py-3">
					<div className="flex items-center justify-between">
						{/* Menu Button */}
						<button
							onClick={drawer.open}
							className="p-2 hover:bg-gray-100 rounded-full transition-colors"
						>
							<Menu className="w-6 h-6 text-gray-700" />
						</button>

						<div className="flex items-center space-x-2">
							<Instagram className="w-8 h-8 text-pink-500" />
							<h1 className="text-xl font-bold text-gray-900">Instagram</h1>
						</div>

						{/* Spacer for centering */}
						<div className="w-10"></div>
					</div>
				</div>
			</header>
			{/* Main Content */}
			<main className="max-w-lg mx-auto pb-20">

				{/* Instagram Post */}
				<div className="p-4">
					<Post onCommentClick={openComment} onShareClick={openShare} />
				</div>

			</main>
			{/* Swipeable Drawer */}
			<SwipeableDrawer
				isOpen={drawer.isOpen}
				isDragging={drawer.isDragging}
				dragPosition={drawer.dragPosition}
				isEdgeHover={drawer.isEdgeHover}
				onClose={drawer.close}
				width={drawer.width}
			>
				<DrawerMenu />
			</SwipeableDrawer>
			{/* Bottom Sheet */}
			<CommentSheet isOpen={isCommentOpen} onClose={close} />
			<ShareSheet isOpen={isShareOpen} onClose={close} />
		</div>
	);
}

export default App;