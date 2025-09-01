import React from 'react';
import {
	Home,
	User,
	Settings,
	MessageCircle,
	Bell,
	Search,
	Bookmark,
	Heart,
	Camera,
	Users
} from 'lucide-react';

const menuItems = [
	{ icon: Home, label: 'Home', badge: null },
	{ icon: MessageCircle, label: 'Messages', badge: '3' },
	{ icon: Bell, label: 'Notifications', badge: '12' },
	{ icon: Search, label: 'Search', badge: null },
	{ icon: Bookmark, label: 'Saved', badge: null },
	{ icon: Heart, label: 'Liked Posts', badge: null },
	{ icon: Camera, label: 'Camera', badge: null },
	{ icon: Users, label: 'Friends', badge: '2' },
	{ icon: User, label: 'Profile', badge: null },
	{ icon: Settings, label: 'Settings', badge: null },
];

export function DrawerMenu() {
	return (
		<div className="py-2">
			{/* User Profile Section */}
			<div className="px-4 py-6 border-b border-gray-100">
				<div className="flex items-center space-x-3">
					<img
						src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
						alt="Profile"
						className="w-12 h-12 rounded-full object-cover"
					/>
					<div>
						<h3 className="font-semibold text-gray-900">John Doe</h3>
						<p className="text-sm text-gray-500">@johndoe</p>
					</div>
				</div>
			</div>

			{/* Menu Items */}
			<nav className="py-2">
				{menuItems.map((item, index) => (
					<button
						key={index}
						className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
					>
						<div className="flex items-center space-x-3">
							<item.icon className="w-5 h-5 text-gray-600" />
							<span className="text-gray-900 font-medium">{item.label}</span>
						</div>
						{item.badge && (
							<span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
								{item.badge}
							</span>
						)}
					</button>
				))}
			</nav>

			{/* Footer */}
			<div className="px-4 py-4 border-t border-gray-100 mt-4">
				<p className="text-xs text-gray-500 text-center">
					Version 1.0.0
				</p>
			</div>
		</div>
	);
}