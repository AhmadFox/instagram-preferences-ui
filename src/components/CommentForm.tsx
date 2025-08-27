import { Smile } from 'lucide-react'

const CommentForm = () => {
	return (
		<div className="bg-white w-full border-t border-gray-200 px-4 py-3">
			<div className="flex items-center space-x-3">
				<img
					src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
					alt="Your avatar"
					className="w-8 h-8 rounded-full object-cover"
				/>
				<div className="flex-1 relative">
					<input
						type="text"
						placeholder="Add a comment..."
						className="w-full py-2 px-3 pr-20 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
					<div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
						<button className="p-1 text-gray-400 hover:text-gray-600">
							<Smile className="w-4 h-4" />
						</button>
					</div>
				</div>
				<button className="px-4 py-2 text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors">
					Post
				</button>
			</div>
		</div>
	)
}

export default CommentForm
