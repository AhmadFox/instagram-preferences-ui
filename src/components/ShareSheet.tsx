import { BottomSheet, SnapPoint } from './BottomSheet';
import MessageForm from './MessageForm';
import SearchForm from './SearchForm';

interface InstagramCommentSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_SHARES = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
  {
    id: 2,
    name: 'Mike Adventures',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
  {
    id: 3,
    name: 'Travel Emma',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
  {
    id: 4,
    name: 'Photography Pro',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
  {
    id: 5,
    name: 'Nature Lover',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
  {
    id: 6,
    name: 'Wanderlust Soul',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
  {
    id: 7,
    name: 'Olivia Martinez',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
  {
    id: 8,
    name: 'James Carter',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
  {
    id: 9,
    name: 'Sophie Lee',
    avatar: 'https://images.pexels.com/photos/1239298/pexels-photo-1239298.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
  {
    id: 10,
    name: 'Daniel Kim',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
  {
    id: 11,
    name: 'Isabella Rossi',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
  {
    id: 12,
    name: 'Liam Nguyen',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
  {
    id: 13,
    name: 'Emma Collins',
    avatar: 'https://images.pexels.com/photos/1239298/pexels-photo-1239298.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
  {
    id: 14,
    name: 'Noah Johnson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
  {
    id: 15,
    name: 'Mia Hernandez',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
  {
    id: 16,
    name: 'Ethan Davis',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
  {
    id: 17,
    name: 'Ava Thompson',
    avatar: 'https://images.pexels.com/photos/1181681/pexels-photo-1181681.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
  {
    id: 18,
    name: 'Lucas White',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
  {
    id: 19,
    name: 'Charlotte Evans',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
  {
    id: 20,
    name: 'Benjamin Scott',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
  },
];

const SNAP_POINTS: Record<SnapPoint, number> = {
  dismissed: 1,
  collapsed: 0.6,
  half: 0.5,
  full: 0.2,
};

export function ShareSheet({ isOpen, onClose }: InstagramCommentSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      initialSnap="collapsed"
      snapPoints={SNAP_POINTS}
      showCloseButton={false}
      footer={<MessageForm />}
    >
      {/* Shares List */}
      <div className="">
        <SearchForm />
      <div className="grid grid-cols-3 gap-y-6 gap-x-4 pt-6">
        {MOCK_SHARES.map((share) => (
          <div
            key={share.id}
            className="flex flex-col justify-center items-center space-y-2"
          >
            {/* Avatar */}
            <img
              src={share.avatar}
              alt={share.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {/* Name */}
            <p className="text-sm text-gray-900 text-center truncate w-20">
              {share.name}
            </p>
          </div>
        ))}
      </div>
      </div>
    </BottomSheet>
  );
}
