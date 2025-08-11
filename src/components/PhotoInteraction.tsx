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
      <div className={`flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm ${className}`}>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`${isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-600 hover:text-red-500'}`}
          >
            <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
            {likes}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="text-gray-600 hover:text-blue-500"
          >
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDownload}
          className="text-gray-600 hover:text-green-500"
        >
          <Download className="w-4 h-4 mr-1" />
          Download
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