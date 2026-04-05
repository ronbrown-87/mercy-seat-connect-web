import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Filter, Download, Share2, ChevronDown, ChevronUp, Church } from "lucide-react";
import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { ScrollToTop } from '@/components/ScrollToTop';
import { SocialShareDialog } from '@/components/SocialShareDialog';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryItem, categories, staticGalleryData, youthSundayImages } from '@/data/galleryData';

const ITEMS_PER_PAGE = 24;

const GalleryCard: React.FC<{ item: GalleryItem; onDownload: (item: GalleryItem) => void; onShare: (item: GalleryItem) => void }> = ({ item, onDownload, onShare }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <div className="relative">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
              <Badge className="bg-primary/90 text-primary-foreground text-xs">{item.category}</Badge>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" className="h-8 w-8 bg-white/20 backdrop-blur-sm text-white hover:bg-white/40" onClick={(e) => { e.stopPropagation(); onDownload(item); }}>
                  <Download className="h-3.5 w-3.5" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 bg-white/20 backdrop-blur-sm text-white hover:bg-white/40" onClick={(e) => { e.stopPropagation(); onShare(item); }}>
                  <Share2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-base mb-1 text-foreground">{item.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
        </CardContent>
      </Card>
    </DialogTrigger>
    <DialogContent className="max-w-4xl max-h-[90vh] p-0">
      <img src={item.imageUrl} alt={item.title} className="w-full h-auto max-h-[80vh] object-contain" />
      <div className="p-4">
        <Badge className="mb-2">{item.category}</Badge>
        <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
        <p className="text-muted-foreground mt-1">{item.description}</p>
      </div>
    </DialogContent>
  </Dialog>
);

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [youthSundayOpen, setYouthSundayOpen] = useState(false);
  const [youthVisibleCount, setYouthVisibleCount] = useState(ITEMS_PER_PAGE);
  const [shareDialog, setShareDialog] = useState<{ isOpen: boolean; item: GalleryItem | null }>({ isOpen: false, item: null });

  const allGallery = useMemo(() => [...staticGalleryData, ...youthSundayImages], []);

  const handleDownload = (item: GalleryItem) => {
    const link = document.createElement('a');
    link.href = item.imageUrl;
    link.download = `${item.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Photo downloaded successfully!');
  };

  const handleShare = (item: GalleryItem) => {
    setShareDialog({ isOpen: true, item });
  };

  const filteredGallery = useMemo(() => {
    if (selectedCategory === 'All') return staticGalleryData;
    if (selectedCategory === 'Youth Sunday') return youthSundayImages;
    return allGallery.filter(item => item.category === selectedCategory);
  }, [selectedCategory, allGallery]);

  const visibleYouthImages = youthSundayImages.slice(0, youthVisibleCount);
  const hasMoreYouth = youthVisibleCount < youthSundayImages.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Photo Gallery</h1>
          <p className="text-lg text-muted-foreground">Explore our ministry moments — {youthSundayImages.length}+ Youth Sunday photos</p>
        </div>

        {/* Youth Sunday Featured Showcase */}
        <div className="mb-10">
          <button
            onClick={() => {
              setYouthSundayOpen(!youthSundayOpen);
              if (!youthSundayOpen) {
                setSelectedCategory('All');
                setYouthVisibleCount(ITEMS_PER_PAGE);
              }
            }}
            className="w-full relative overflow-hidden rounded-2xl group cursor-pointer"
          >
            <div className="relative h-48 md:h-64 overflow-hidden rounded-2xl">
              <img
                src="/images/youth-congregation.jpg"
                alt="Youth Sunday Waiting on God"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-between px-6 md:px-10">
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <Church className="h-5 w-5 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Featured Event</span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">Youth Sunday</h2>
                  <p className="text-white/80 text-sm md:text-lg font-medium">Waiting on God — Hebrews 10:24</p>
                  <p className="text-white/60 text-xs md:text-sm mt-1">{youthSundayImages.length} photos from this blessed event</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transition-transform duration-300 group-hover:scale-110">
                  {youthSundayOpen ? <ChevronUp className="h-6 w-6 text-white" /> : <ChevronDown className="h-6 w-6 text-white" />}
                </div>
              </div>
            </div>
          </button>

          <AnimatePresence>
            {youthSundayOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-6">
                  {visibleYouthImages.map(item => (
                    <GalleryCard key={item.id} item={item} onDownload={handleDownload} onShare={handleShare} />
                  ))}
                </div>
                {hasMoreYouth && (
                  <div className="text-center mt-6">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setYouthVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                    >
                      Load More Photos ({youthSundayImages.length - youthVisibleCount} remaining)
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Category filter */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Main gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map(item => (
            <GalleryCard key={item.id} item={item} onDownload={handleDownload} onShare={handleShare} />
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
