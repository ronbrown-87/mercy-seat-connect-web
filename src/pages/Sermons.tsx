import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Play, 
  Download, 
  Share2, 
  Heart, 
  MessageSquare, 
  Clock, 
  User,
  X
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { LoginDialog } from '@/components/LoginDialog';
import { SermonComments } from '@/components/SermonComments';
import { Footer } from '@/components/Footer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Sermon {
  id: number;
  title: string;
  speaker: string;
  date: string;
  category: string;
  url: string;
  description: string;
  duration?: string;
  tags?: string[];
}

const Sermons = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedSermon, setSelectedSermon] = useState<number | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [loginReason, setLoginReason] = useState('');
  const [showCommentsDialog, setShowCommentsDialog] = useState(false);
  const [likedSermons, setLikedSermons] = useState<Set<number>>(new Set());
  const [sermonLikes, setSermonLikes] = useState<{ [key: number]: number }>({});

  const sermonsData: Sermon[] = [
    {
      id: 1,
      title: "Walking in Faith",
      speaker: "Pastor Gavu Nyirongo",
      date: "2024-12-15",
      category: "Faith",
      url: "#",
      description: "A powerful message about walking in faith through life's challenges.",
      duration: "45:30",
      tags: ["Faith", "Encouragement", "Life"]
    },
    {
      id: 2,
      title: "The Power of Prayer",
      speaker: "Pastor Maston Musowoya",
      date: "2024-12-08",
      category: "Prayer",
      url: "#",
      description: "Discovering the transformative power of prayer in our daily lives.",
      duration: "52:15",
      tags: ["Prayer", "Spiritual Growth", "Transformation"]
    },
    {
      id: 3,
      title: "Building Strong Families",
      speaker: "Pastor Catherine Chewe",
      date: "2024-12-01",
      category: "Family",
      url: "#",
      description: "Biblical principles for building strong, God-centered families.",
      duration: "48:20",
      tags: ["Family", "Relationships", "Biblical Principles"]
    },
    {
      id: 4,
      title: "Youth on Fire for God",
      speaker: "Pastor Eric Tady",
      date: "2024-11-24",
      category: "Youth",
      url: "#",
      description: "Empowering young people to live passionately for Christ.",
      duration: "41:35",
      tags: ["Youth", "Passion", "Empowerment"]
    },
    {
      id: 5,
      title: "Nurturing Young Hearts",
      speaker: "Pastor Eric Nyundi",
      date: "2024-11-17",
      category: "Children",
      url: "#",
      description: "Teaching children about God's love in age-appropriate ways.",
      duration: "35:45",
      tags: ["Children", "Education", "God's Love"]
    },
    {
      id: 6,
      title: "Reaching Our Community",
      speaker: "Pastor Emmanuel Chindawi",
      date: "2024-11-10",
      category: "Outreach",
      url: "#",
      description: "Strategies for effective community outreach and evangelism.",
      duration: "55:10",
      tags: ["Outreach", "Evangelism", "Community"]
    }
  ];

  // Initialize likes for each sermon
  useEffect(() => {
    const initialLikes: { [key: number]: number } = {};
    sermonsData.forEach(sermon => {
      initialLikes[sermon.id] = 0; // Start with 0 likes
    });
    setSermonLikes(initialLikes);
  }, []);

  const handleAuthRequired = (action: string) => {
    if (!isAuthenticated) {
      setLoginReason(`Please log in to ${action}`);
      setShowLoginDialog(true);
      return false;
    }
    return true;
  };

  const handleLike = (sermonId: number) => {
    if (!handleAuthRequired('like sermons')) return;
    
    setLikedSermons(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(sermonId)) {
        newLiked.delete(sermonId);
        setSermonLikes(prevLikes => ({
          ...prevLikes,
          [sermonId]: Math.max(0, prevLikes[sermonId] - 1)
        }));
      } else {
        newLiked.add(sermonId);
        setSermonLikes(prevLikes => ({
          ...prevLikes,
          [sermonId]: prevLikes[sermonId] + 1
        }));
      }
      return newLiked;
    });
  };

  const handleWatch = (sermon: Sermon) => {
    if (!handleAuthRequired('watch sermons')) return;
    // Open sermon in new tab or modal
    window.open(sermon.url, '_blank');
  };

  const handleDownload = (sermon: Sermon) => {
    if (!handleAuthRequired('download sermons')) return;
    // Simulate download
    alert(`Downloading: ${sermon.title}`);
  };

  const handleShare = (sermon: Sermon) => {
    if (!handleAuthRequired('share sermons')) return;
    // Simulate share
    if (navigator.share) {
      navigator.share({
        title: sermon.title,
        text: sermon.description,
        url: sermon.url
      });
    } else {
      alert(`Sharing: ${sermon.title}`);
    }
  };

  const handleViewComments = (sermonId: number) => {
    if (!handleAuthRequired('view comments')) return;
    setSelectedSermon(sermonId);
    setShowCommentsDialog(true);
  };

  const filteredSermons = sermonsData.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || sermon.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Faith', 'Prayer', 'Family', 'Youth', 'Children', 'Outreach'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sermons</h1>
              <p className="text-gray-600 mt-1">Listen to inspiring messages from our pastors</p>
            </div>
            <Button 
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search sermons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sermons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSermons.map((sermon) => (
            <Card key={sermon.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {sermon.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{sermon.speaker}</p>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {sermon.category}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {sermon.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{sermon.duration}</span>
                  <span>•</span>
                  <span>{new Date(sermon.date).toLocaleDateString()}</span>
                </div>

                {sermon.tags && (
                  <div className="flex flex-wrap gap-2">
                    {sermon.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(sermon.id)}
                      className={`flex items-center gap-2 ${
                        likedSermons.has(sermon.id) 
                          ? 'text-red-500 hover:text-red-600' 
                          : 'text-gray-500 hover:text-gray-600'
                      }`}
                    >
                      <Heart 
                        className={`h-5 w-5 ${
                          likedSermons.has(sermon.id) ? 'fill-current' : ''
                        }`} 
                      />
                      <span>{sermonLikes[sermon.id] || 0}</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewComments(sermon.id)}
                      className="flex items-center gap-2 text-gray-500 hover:text-gray-600"
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span>Comments</span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleWatch(sermon)}
                      className="text-gray-500 hover:text-gray-600"
                    >
                      <Play className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(sermon)}
                      className="text-gray-500 hover:text-gray-600"
                    >
                      <Download className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(sermon)}
                      className="text-gray-500 hover:text-gray-600"
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => window.open(sermon.url, '_blank')}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Listen Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSermons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No sermons found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Comments Dialog */}
      <Dialog open={showCommentsDialog} onOpenChange={setShowCommentsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Comments
              {selectedSermon && (
                <span className="text-sm text-gray-500 font-normal">
                  - {sermonsData.find(s => s.id === selectedSermon)?.title}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedSermon && (
            <SermonComments 
              sermonId={selectedSermon} 
              sermonTitle={sermonsData.find(s => s.id === selectedSermon)?.title || ''} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Login Dialog */}
      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog}
        reason={loginReason}
      />

      <Footer />
    </div>
  );
};

export default Sermons;