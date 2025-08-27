import React from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

interface InstagramPostProps {
  onCommentClick: () => void;
}

export function InstagramPost({ onCommentClick }: InstagramPostProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <img
            src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
            alt="User avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm text-gray-900">nature_explorer</p>
            <p className="text-xs text-gray-500">Golden Gate Park, CA</p>
          </div>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded-full">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Post Image */}
      <div className="relative">
        <img
          src="https://images.pexels.com/photos/1559821/pexels-photo-1559821.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop"
          alt="Beautiful landscape"
          className="w-full aspect-square object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button className="hover:scale-110 transition-transform">
              <Heart className="w-6 h-6 text-gray-700 hover:text-red-500" />
            </button>
            <button 
              onClick={onCommentClick}
              className="hover:scale-110 transition-transform"
            >
              <MessageCircle className="w-6 h-6 text-gray-700" />
            </button>
            <button className="hover:scale-110 transition-transform">
              <Send className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <button className="hover:scale-110 transition-transform">
            <Bookmark className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm text-gray-900 mb-2">2,847 likes</p>

        {/* Caption */}
        <div className="text-sm text-gray-900">
          <span className="font-semibold">nature_explorer</span>
          <span className="ml-2">
            Caught the perfect golden hour at this hidden gem 🌅 The way the light hits the mountains is absolutely magical!
            <span className="text-blue-900"> #goldenhour #landscape #photography #nature</span>
          </span>
        </div>

        {/* View Comments */}
        <button 
          onClick={onCommentClick}
          className="text-sm text-gray-500 hover:text-gray-700 mt-2 transition-colors"
        >
          View all 127 comments
        </button>

        {/* Time */}
        <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
      </div>
    </div>
  );
}