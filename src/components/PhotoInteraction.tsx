import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
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
  const handleDownload = () => {
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
    <div className={`flex items-center justify-center space-x-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-md mt-4 ${className}`}>
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
  );
};