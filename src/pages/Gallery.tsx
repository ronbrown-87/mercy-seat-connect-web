import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, Download, Share2 } from "lucide-react";
import React, { useState } from 'react';
import { toast } from 'sonner';
import { ScrollToTop } from '@/components/ScrollToTop';
import { SocialShareDialog } from '@/components/SocialShareDialog';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

const categories = ['All', 'Nature', 'Architecture', 'People', 'Events', 'Ministry'];

const staticGalleryData: GalleryItem[] = [
  {
    id: 1,
    title: "Sunday Service",
    description: "Beautiful moments from our Sunday service",
    imageUrl: "/images/crowd.jpg",
    category: "Ministry"
  },
  {
    id: 2,
    title: "Church Building",
    description: "Our church community coming together",
    imageUrl: "/images/church.jpg",
    category: "Architecture"
  },
  {
    id: 3,
    title: "Prayer Time",
    description: "Devoted moments of prayer and reflection",
    imageUrl: "/images/crowd2.jpg",
    category: "Ministry"
  },
  {
    id: 4,
    title: "Youth Ministry",
    description: "Engaging with our young members",
    imageUrl: "/images/youth.jpg",
    category: "People"
  },
  {
    id: 5,
    title: "Chamboli Cell Meeting",
    description: "Our cell meetings ",
    imageUrl: "/images/community3.jpg",
    category: "Community Gathering"
  },
  {
    id: 6,
    title: "Children's Ministry",
    description: "engaging with our children",
    imageUrl: "/images/children4.jpg",
    category: "Ministry"
  }
];

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [gallery] = useState<GalleryItem[]>(staticGalleryData);
  const [shareDialog, setShareDialog] = useState<{ isOpen: boolean; item: GalleryItem | null }>({
    isOpen: false,
    item: null
  });

  // Handle download
  const handleDownload = (item: GalleryItem) => {
    const link = document.createElement('a');
    link.href = item.imageUrl;
    link.download = `${item.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Photo downloaded successfully!');
  };

  // Handle share
  const handleShare = (item: GalleryItem) => {
    setShareDialog({ isOpen: true, item });
  };

  // Filter gallery by category
  const filteredGallery = selectedCategory === 'All' 
    ? gallery 
    : gallery.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Photo Gallery</h1>
          <p className="text-lg text-gray-600">Explore our ministry moments</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative group">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDownload(item)}
                      className="bg-white text-gray-800 hover:bg-gray-100"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleShare(item)}
                      className="bg-white text-gray-800 hover:bg-gray-100"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{item.category}</Badge>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleShare(item)}
                      className="text-gray-600 hover:text-primary"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <ScrollToTop />
      
      <SocialShareDialog
        isOpen={shareDialog.isOpen}
        onClose={() => setShareDialog({ isOpen: false, item: null })}
        title={shareDialog.item?.title || ''}
        url={`${window.location.origin}/gallery`}
      />
    </div>
  );
};

export default Gallery;