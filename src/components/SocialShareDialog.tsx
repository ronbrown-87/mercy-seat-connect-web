import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, Link } from 'lucide-react';
import { toast } from 'sonner';

interface SocialShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url?: string;
}

export const SocialShareDialog: React.FC<SocialShareDialogProps> = ({
  isOpen,
  onClose,
  title,
  url
}) => {
  const currentUrl = url || window.location.href;
  const shareText = `Check out: ${title}`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(currentUrl);

  const socialPlatforms = [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-blue-700 hover:bg-blue-800'
    }
  ];

  const handleSocialShare = (platform: typeof socialPlatforms[0]) => {
    window.open(platform.url, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    toast.success('Link copied to clipboard!');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this content</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {socialPlatforms.map((platform) => (
              <Button
                key={platform.name}
                onClick={() => handleSocialShare(platform)}
                className={`${platform.color} text-white w-full`}
              >
                {platform.name}
              </Button>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <Button
              onClick={handleCopyLink}
              variant="outline"
              className="w-full"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};