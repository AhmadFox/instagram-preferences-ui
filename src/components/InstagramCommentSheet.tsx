import { BottomSheet } from './BottomSheet';
import { Heart } from 'lucide-react';
import CommentForm from './CommentForm';

interface InstagramCommentSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_COMMENTS = [
  {
    id: 1,
    username: 'sarah_johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
    comment: 'This is absolutely gorgeous! 😍 Where was this taken?',
    likes: 24,
    timeAgo: '2h',
    isLiked: false
  },
  {
    id: 2,
    username: 'mike_adventures',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
    comment: 'Amazing shot! The lighting is perfect 📸',
    likes: 12,
    timeAgo: '4h',
    isLiked: true
  },
  {
    id: 3,
    username: 'travel_with_emma',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
    comment: 'Added to my travel bucket list! Thanks for sharing ✈️',
    likes: 8,
    timeAgo: '6h',
    isLiked: false
  },
  {
    id: 4,
    username: 'photography_pro',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
    comment: 'The composition and colors are incredible. What camera settings did you use?',
    likes: 31,
    timeAgo: '8h',
    isLiked: true
  },
  {
    id: 5,
    username: 'nature_lover_2024',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
    comment: 'Nature at its finest! 🌿 This makes me want to go hiking',
    likes: 15,
    timeAgo: '12h',
    isLiked: false
  },
  {
    id: 6,
    username: 'wanderlust_soul',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
    comment: 'Stunning view! Is this accessible by car or do you need to hike?',
    likes: 7,
    timeAgo: '1d',
    isLiked: false
  },
  {
    id: 7,
    username: 'photography_pro',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
    comment: 'The composition and colors are incredible. What camera settings did you use?',
    likes: 31,
    timeAgo: '8h',
    isLiked: true
  },
  {
    id: 8,
    username: 'nature_lover_2024',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
    comment: 'Nature at its finest! 🌿 This makes me want to go hiking',
    likes: 15,
    timeAgo: '12h',
    isLiked: false
  },
  {
    id: 9,
    username: 'wanderlust_soul',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
    comment: 'Stunning view! Is this accessible by car or do you need to hike?',
    likes: 7,
    timeAgo: '1d',
    isLiked: false
  },
  {
    id: 10,
    username: 'photography_pro',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
    comment: 'The composition and colors are incredible. What camera settings did you use?',
    likes: 31,
    timeAgo: '8h',
    isLiked: true
  },
  {
    id: 11,
    username: 'nature_lover_2024',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
    comment: 'Nature at its finest! 🌿 This makes me want to go hiking',
    likes: 15,
    timeAgo: '12h',
    isLiked: false
  },
  {
    id: 12,
    username: 'wanderlust_soul',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
    comment: 'Stunning view! Is this accessible by car or do you need to hike?',
    likes: 7,
    timeAgo: '1d',
    isLiked: false
  }
];

export function InstagramCommentSheet({ isOpen, onClose }: InstagramCommentSheetProps) {

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Comments"
      initialSnap="half"
      showCloseButton={true}
      className=""
      footer={
        <CommentForm />
      }
    >
      {/* Comments List */}
      <div className="px-4 pt-4 space-y-4 pb-20">
        {MOCK_COMMENTS.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            {/* Avatar */}
            <img
              src={comment.avatar}
              alt={comment.username}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            
            {/* Comment Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-900 block">{comment.username}</span>
                    <span className="text-gray-700">{comment.comment}</span>
                  </p>
                  
                  <div className="flex items-center mt-1 space-x-4 text-xs text-gray-500">
                    <span>{comment.timeAgo}</span>
                    <span>{comment.likes} likes</span>
                    <button className="font-semibold">Reply</button>
                  </div>
                </div>
                
                {/* Like Button */}
                <button className="p-1 ml-2 flex-shrink-0">
                  <Heart 
                    className={`w-4 h-4 ${
                      comment.isLiked 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Load more comments */}
        {/* <button className="w-full py-3 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          View more comments
        </button> */}
      </div>
    </BottomSheet>
  );
}