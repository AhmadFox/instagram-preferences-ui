import { useState, useCallback } from 'react';

type SheetType = 'comment' | 'share' | null;

interface UseBottomSheetReturn {
  activeSheet: SheetType;
  openComment: () => void;
  openShare: () => void;
  close: () => void;
  isCommentOpen: boolean;
  isShareOpen: boolean;
}

export function useBottomSheet(): UseBottomSheetReturn {
  const [activeSheet, setActiveSheet] = useState<SheetType>(null);

  const openComment = useCallback(() => {
    setActiveSheet('comment');
  }, []);

  const openShare = useCallback(() => {
    setActiveSheet('share');
  }, []);

  const close = useCallback(() => {
    setActiveSheet(null);
  }, []);

  return {
    activeSheet,
    openComment,
    openShare,
    close,
    isCommentOpen: activeSheet === 'comment',
    isShareOpen: activeSheet === 'share',
  };
}
