import { Post } from './components/Post';
import { CommentSheet } from './components/CommentSheet';
import { useBottomSheet } from './hooks/useBottomSheet';
import { ShareSheet } from './components/ShareSheet';
import { Instagram } from 'lucide-react';

function App() {
  const { 
    isCommentOpen, 
    isShareOpen, 
    openComment, 
    openShare, 
    close 
  } = useBottomSheet();

  return (
    <div className=" bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Instagram className="w-8 h-8 text-pink-500" />
              <h1 className="text-xl font-bold text-gray-900">Instagram</h1>
            </div>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              iOS Bottom Sheet Demo
            </div>
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

      {/* Bottom Sheet */}
      <CommentSheet isOpen={isCommentOpen} onClose={close} />
      <ShareSheet isOpen={isShareOpen} onClose={close} />
    </div>
  );
}

export default App;