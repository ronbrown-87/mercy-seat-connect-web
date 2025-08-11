import React from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Layout } from 'lucide-react';

interface ThemeSwitcherProps {
  isBookshelfView: boolean;
  onToggleView: () => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ isBookshelfView, onToggleView }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={onToggleView}
        variant="outline"
        size="sm"
        className="bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white"
      >
        {isBookshelfView ? (
          <>
            <Layout className="w-4 h-4 mr-2" />
            Traditional View
          </>
        ) : (
          <>
            <BookOpen className="w-4 h-4 mr-2" />
            Bookshelf View
          </>
        )}
      </Button>
    </div>
  );
}; 