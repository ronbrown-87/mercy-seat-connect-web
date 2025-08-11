import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Heart, 
  Download, 
  Share2, 
  MessageCircle, 
  Upload, 
  Plus, 
  X, 
  Facebook, 
  Instagram, 
  MessageCircle as WhatsApp,
  Copy,
  Check,
  Reply,
  Eye,
  Filter,
  Camera
} from "lucide-react";
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  likes: number;
  downloads: number;
  isLiked: boolean;
  isDownloaded: boolean;
}

interface Comment {
  id: number;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  replies: Reply[];
}

interface Reply {
  id: number;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
}

interface UserPhoto {
  id: number;
  userId: string;
  userName: string;
  userAvatar: string;
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  timestamp: string;
}

const categories = ['All', 'Nature', 'Architecture', 'People', 'Events', 'Ministry'];

const staticGalleryData: GalleryItem[] = [
  {
    id: 1,
    title: "Sunday Service",
    description: "Beautiful moments from our Sunday service",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
    category: "Ministry",
    likes: 0,
    downloads: 0,
    isLiked: false,
    isDownloaded: false
  },
  {
    id: 2,
    title: "Community Gathering",
    description: "Our church community coming together",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=300&fit=crop",
    category: "Events",
    likes: 0,
    downloads: 0,
    isLiked: false,
    isDownloaded: false
  },
  {
    id: 3,
    title: "Prayer Time",
    description: "Devoted moments of prayer and reflection",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    category: "Ministry",
    likes: 0,
    downloads: 0,
    isLiked: false,
    isDownloaded: false
  },
  {
    id: 4,
    title: "Youth Ministry",
    description: "Engaging with our young members",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop",
    category: "People",
    likes: 0,
    downloads: 0,
    isLiked: false,
    isDownloaded: false
  },
  {
    id: 5,
    title: "Church Building",
    description: "Our beautiful church architecture",
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=300&fit=crop",
    category: "Architecture",
    likes: 0,
    downloads: 0,
    isLiked: false,
    isDownloaded: false
  },
  {
    id: 6,
    title: "Nature Walk",
    description: "Exploring God's creation together",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop",
    category: "Nature",
    likes: 0,
    downloads: 0,
    isLiked: false,
    isDownloaded: false
  }
];

const Gallery: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [staticGallery, setStaticGallery] = useState<GalleryItem[]>(staticGalleryData);
  const [userPhotos, setUserPhotos] = useState<UserPhoto[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | UserPhoto | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    imageFile: null as File | null,
    imagePreview: ''
  });
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<{ commentId: number; userName: string } | null>(null);
  const [newReply, setNewReply] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Handle static gallery like
  const handleStaticLike = (item: GalleryItem) => {
    if (!isAuthenticated) {
      toast.error('Please log in to like photos');
      return;
    }
    
    setStaticGallery(prev => prev.map(photo => 
      photo.id === item.id 
        ? { ...photo, likes: photo.isLiked ? photo.likes - 1 : photo.likes + 1, isLiked: !photo.isLiked }
        : photo
    ));
    
    toast.success(item.isLiked ? 'Photo unliked' : 'Photo liked!');
  };

  // Handle static gallery download
  const handleStaticDownload = (item: GalleryItem) => {
    if (!isAuthenticated) {
      toast.error('Please log in to download photos');
      return;
    }
    
    setStaticGallery(prev => prev.map(photo => 
      photo.id === item.id 
        ? { ...photo, downloads: photo.downloads + 1, isDownloaded: true }
        : photo
    ));
    
    // Simulate download
    const link = document.createElement('a');
    link.href = item.imageUrl;
    link.download = `${item.title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Photo downloaded successfully!');
  };

  // Handle static gallery share
  const handleStaticShare = (item: GalleryItem) => {
    setSelectedImage(item);
    setShowShare(true);
  };

  // Handle user photo like
  const handleUserPhotoLike = (photo: UserPhoto) => {
    if (!isAuthenticated) {
      toast.error('Please log in to like photos');
      return;
    }
    
    setUserPhotos(prev => prev.map(p => 
      p.id === photo.id 
        ? { ...p, likes: p.isLiked ? p.likes - 1 : p.likes + 1, isLiked: !p.isLiked }
        : p
    ));
    
    toast.success(photo.isLiked ? 'Photo unliked' : 'Photo liked!');
  };

  // Handle user photo share
  const handleUserPhotoShare = (photo: UserPhoto) => {
    setSelectedImage(photo);
    setShowShare(true);
  };

  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !selectedImage) return;

    const comment: Comment = {
      id: Date.now(),
      userId: user?.id || '',
      userName: user?.user_metadata?.name || 'Anonymous',
      userAvatar: user?.user_metadata?.avatar_url || '',
      content: newComment,
      timestamp: new Date().toLocaleDateString(),
      replies: []
    };

    if ('comments' in selectedImage) {
      // User photo
      setUserPhotos(prev => prev.map(photo => 
        photo.id === selectedImage.id 
          ? { ...photo, comments: [...photo.comments, comment] }
          : photo
      ));
    }

    setNewComment('');
    toast.success('Comment added successfully!');
  };

  // Handle reply submission
  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim() || !replyTo || !selectedImage) return;

    const reply: Reply = {
      id: Date.now(),
      userId: user?.id || '',
      userName: user?.user_metadata?.name || 'Anonymous',
      userAvatar: user?.user_metadata?.avatar_url || '',
      content: newReply,
      timestamp: new Date().toLocaleDateString()
    };

    if ('comments' in selectedImage) {
      // User photo
      setUserPhotos(prev => prev.map(photo => 
        photo.id === selectedImage.id 
          ? {
              ...photo,
              comments: photo.comments.map(comment => 
                comment.id === replyTo.commentId 
                  ? { ...comment, replies: [...comment.replies, reply] }
                  : comment
              )
            }
          : photo
      ));
    }

    setNewReply('');
    setReplyTo(null);
    toast.success('Reply added successfully!');
  };

  // Handle photo upload
  const handlePhotoUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadData.title.trim() || !uploadData.imageFile) return;

    const newPhoto: UserPhoto = {
      id: Date.now(),
      userId: user?.id || '',
      userName: user?.user_metadata?.name || 'Anonymous',
      userAvatar: user?.user_metadata?.avatar_url || '',
      title: uploadData.title,
      description: uploadData.description,
      imageUrl: uploadData.imagePreview,
      likes: 0,
      comments: [],
      isLiked: false,
      timestamp: new Date().toLocaleDateString()
    };

    setUserPhotos(prev => [newPhoto, ...prev]);
    setUploadData({ title: '', description: '', imageFile: null, imagePreview: '' });
    setShowUpload(false);
    toast.success('Photo uploaded successfully!');
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadData(prev => ({ ...prev, imageFile: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadData(prev => ({ ...prev, imagePreview: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle social media sharing
  const handleSocialShare = (platform: string) => {
    if (!selectedImage) return;
    
    const url = window.location.href;
    const text = `Check out this photo: ${selectedImage.title}`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'instagram':
        toast.info('Copy the image and share it on Instagram');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
    }
  };

  // Handle copy link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  // Filter static gallery by category
  const filteredStaticGallery = selectedCategory === 'All' 
    ? staticGallery 
    : staticGallery.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Photo Gallery</h1>
          <p className="text-lg text-gray-600">Explore our ministry moments and share your own photos</p>
        </div>

        <Tabs defaultValue="static" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="static">Ministry Gallery</TabsTrigger>
            <TabsTrigger value="user">User Gallery</TabsTrigger>
          </TabsList>

          {/* Static Gallery Tab */}
          <TabsContent value="static" className="space-y-6">
            <div className="flex items-center justify-between">
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
              {filteredStaticGallery.map((item) => (
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
                          onClick={() => handleStaticLike(item)}
                          className="bg-white text-gray-800 hover:bg-gray-100"
                        >
                          <Heart className={`h-4 w-4 mr-1 ${item.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                          {item.likes}
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleStaticDownload(item)}
                          className="bg-white text-gray-800 hover:bg-gray-100"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          {item.downloads}
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleStaticShare(item)}
                          className="bg-white text-gray-800 hover:bg-gray-100"
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{item.category}</Badge>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Heart className={`h-4 w-4 mr-1 ${item.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                          {item.likes}
                        </span>
                        <span className="flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          {item.downloads}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* User Gallery Tab */}
          <TabsContent value="user" className="space-y-6">
            {isAuthenticated ? (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Your Photos</h2>
                  <Button onClick={() => setShowUpload(true)} className="bg-amber-600 hover:bg-amber-700">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                </div>

                {userPhotos.length === 0 ? (
                  <div className="text-center py-12">
                    <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No photos yet</h3>
                    <p className="text-gray-500 mb-4">Start sharing your ministry moments with the community</p>
                    <Button onClick={() => setShowUpload(true)} className="bg-amber-600 hover:bg-amber-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Upload Your First Photo
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userPhotos.map((photo) => (
                      <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative group">
                          <img
                            src={photo.imageUrl}
                            alt={photo.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => handleUserPhotoLike(photo)}
                                className="bg-white text-gray-800 hover:bg-gray-100"
                              >
                                <Heart className={`h-4 w-4 mr-1 ${photo.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                                {photo.likes}
                              </Button>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => {
                                  setSelectedImage(photo);
                                  setShowComments(true);
                                }}
                                className="bg-white text-gray-800 hover:bg-gray-100"
                              >
                                <MessageCircle className="h-4 w-4 mr-1" />
                                {photo.comments.length}
                              </Button>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => handleUserPhotoShare(photo)}
                                className="bg-white text-gray-800 hover:bg-gray-100"
                              >
                                <Share2 className="h-4 w-4 mr-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3 mb-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={photo.userAvatar} />
                              <AvatarFallback>{photo.userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{photo.title}</h3>
                              <p className="text-sm text-gray-500">by {photo.userName}</p>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{photo.description}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{photo.timestamp}</span>
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center">
                                <Heart className={`h-4 w-4 mr-1 ${photo.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                                {photo.likes}
                              </span>
                              <span className="flex items-center">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                {photo.comments.length}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Join our community</h3>
                <p className="text-gray-500 mb-4">Log in to upload photos and interact with others</p>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  Login / Sign Up
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Upload Dialog */}
      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Photo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePhotoUpload} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={uploadData.title}
                onChange={(e) => setUploadData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter photo title"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={uploadData.description}
                onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your photo"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="image">Photo</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                required
              />
            </div>
            {uploadData.imagePreview && (
              <div>
                <Label>Preview</Label>
                <img
                  src={uploadData.imagePreview}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-md"
                />
              </div>
            )}
            <div className="flex space-x-2">
              <Button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700">
                Upload
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowUpload(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Comments Dialog */}
      <Dialog open={showComments} onOpenChange={setShowComments}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <div className="text-center">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="w-full max-h-64 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold mt-2">{selectedImage.title}</h3>
              </div>
              
              <div className="border-t pt-4">
                <form onSubmit={handleCommentSubmit} className="mb-4">
                  <div className="flex space-x-2">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1"
                      rows={2}
                    />
                    <Button type="submit" size="sm" className="bg-amber-600 hover:bg-amber-700">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </form>

                <div className="space-y-4">
                  {('comments' in selectedImage ? selectedImage.comments : []).map((comment) => (
                    <div key={comment.id} className="border rounded-lg p-3">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.userAvatar} />
                          <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm">{comment.userName}</span>
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                          
                          {comment.replies.length > 0 && (
                            <div className="ml-4 border-l-2 border-gray-200 pl-3 space-y-2">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="flex items-start space-x-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={reply.userAvatar} />
                                    <AvatarFallback>{reply.userName.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-medium text-xs">{reply.userName}</span>
                                      <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                    </div>
                                    <p className="text-xs text-gray-700">{reply.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-2 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setReplyTo({ commentId: comment.id, userName: comment.userName })}
                              className="text-xs text-gray-500 hover:text-gray-700"
                            >
                              <Reply className="h-3 w-3 mr-1" />
                              Reply
                            </Button>
                            {comment.replies.length > 0 && (
                              <span className="text-xs text-gray-500 flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {replyTo?.commentId === comment.id && (
                        <form onSubmit={handleReplySubmit} className="mt-3 ml-11">
                          <div className="flex space-x-2">
                            <Textarea
                              value={newReply}
                              onChange={(e) => setNewReply(e.target.value)}
                              placeholder={`Reply to ${replyTo.userName}...`}
                              className="flex-1 text-sm"
                              rows={1}
                            />
                            <Button type="submit" size="sm" className="bg-amber-600 hover:bg-amber-700">
                              <Reply className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => setReplyTo(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={showShare} onOpenChange={setShowShare}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Share Photo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleSocialShare('facebook')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button
                onClick={() => handleSocialShare('instagram')}
                className="bg-pink-600 hover:bg-pink-700 text-white"
              >
                <Instagram className="h-4 w-4 mr-2" />
                Instagram
              </Button>
              <Button
                onClick={() => handleSocialShare('whatsapp')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <WhatsApp className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                onClick={() => handleSocialShare('twitter')}
                className="bg-black hover:bg-gray-800 text-white"
              >
                <X className="h-4 w-4 mr-2" />
                X (Twitter)
              </Button>
            </div>
            
            <div className="border-t pt-4">
              <Button
                onClick={handleCopyLink}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery; 