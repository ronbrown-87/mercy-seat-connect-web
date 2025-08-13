import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Download, Share2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { LoginDialog } from './LoginDialog';
import { toast } from 'sonner';

interface PhotoInteractionProps {
  imageUrl: string;
  imageTitle: string;
  className?: string;
}

export const PhotoInteraction: React.FC<PhotoInteractionProps> = ({ 
  imageUrl, 
  imageTitle, 
  className = '' 
}) => {
  const { isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [loginReason, setLoginReason] = useState('');

  const handleAuthRequired = (action: string) => {
    if (!isAuthenticated) {
      setLoginReason(`Please sign up or log in to ${action}`);
      setShowLoginDialog(true);
      return false;
    }
    return true;
  };

  const handleLike = () => {
    if (!handleAuthRequired('like photos')) return;
    
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
      toast.success('Like removed');
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
      toast.success('Photo liked!');
    }
  };

  const handleDownload = () => {
    if (!handleAuthRequired('download photos')) return;
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${imageTitle.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Download started!');
  };

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}`;
    navigator.clipboard.writeText(url);
    toast.success('Page link copied to clipboard!');
  };

  return (
    <>
      <div className={`flex items-center justify-center space-x-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-md mt-4 ${className}`}>
        <Button
          variant="ghost"
          size="lg"
          onClick={handleLike}
          className={`flex flex-col items-center space-y-1 p-3 rounded-lg transition-all duration-200 ${
            isLiked 
              ? 'text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100' 
              : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
          }`}
        >
          <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
          <span className="text-sm font-medium">{likes} Likes</span>
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          onClick={handleShare}
          className="flex flex-col items-center space-y-1 p-3 rounded-lg text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200"
        >
          <Share2 className="w-6 h-6" />
          <span className="text-sm font-medium">Share</span>
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          onClick={handleDownload}
          className="flex flex-col items-center space-y-1 p-3 rounded-lg text-gray-600 hover:text-green-500 hover:bg-green-50 transition-all duration-200"
        >
          <Download className="w-6 h-6" />
          <span className="text-sm font-medium">Download</span>
        </Button>
      </div>
      
      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        reason={loginReason}
      />
    </>
  );
};