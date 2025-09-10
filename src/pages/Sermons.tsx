import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Download, Search, Share2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Sermon {
  id: number;
  title: string;
  speaker: string;
  date: string;
  category: string;
  videoUrl: string;
  description: string;
  duration?: string;
  tags?: string[];
}

const Sermons = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const sermonsData: Sermon[] = [
    {
      id: 1,
      title: "Walking in Faith",
      speaker: "Pastor Gavu Nyirongo",
      date: "2024-12-15",
      category: "Faith",
      videoUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fweb.facebook.com%2F100068315346662%2Fvideos%2F1079532757672291%2F&show_text=false&width=560&t=0",
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
      videoUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fweb.facebook.com%2F100068315346662%2Fvideos%2F903705225309016%2F&show_text=false&width=560&t=0",
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
      videoUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fweb.facebook.com%2F100068315346662%2Fvideos%2F525254380290613%2F&show_text=false&width=560&t=0",
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
      videoUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fweb.facebook.com%2F100068315346662%2Fvideos%2F593885550076996%2F&show_text=false&width=560&t=0",
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
      videoUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fweb.facebook.com%2F100068315346662%2Fvideos%2F1172976404441094%2F&show_text=false&width=560&t=0",
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
      videoUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fweb.facebook.com%2F100068315346662%2Fvideos%2F1117609872877381%2F&show_text=false&width=560&t=0",
      description: "Strategies for effective community outreach and evangelism.",
      duration: "55:10",
      tags: ["Outreach", "Evangelism", "Community"]
    },
    {
      id: 7,
      title: "Talk with Grace Chipo Nyoni",
      speaker: "Grace Chipo Nyoni",
      date: "2024-12-18",
      category: "Interviews",
      videoUrl: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fweb.facebook.com%2F100068315346662%2Fvideos%2F553233244206378%2F&show_text=false&width=267&t=0",
      description: "An inspiring interview with Grace Chipo Nyoni.",
      duration: "30:00",
      tags: ["Interviews", "Faith", "Inspiration"]
    },
    {
      id: 8,
      title: "Our Praise Team",
      speaker: "Church Praise Team",
      date: "2024-12-12",
      category: "Worship",
      videoUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fweb.facebook.com%2F100068315346662%2Fvideos%2F1409009000069252%2F&show_text=false&width=560&t=0",
      description: "Our talented praise team leading worship.",
      duration: "50:00",
      tags: ["Worship", "Music", "Praise"]
    },
    {
      id: 9,
      title: "Talk with Mr Milanzi",
      speaker: "Mr Milanzi",
      date: "2024-12-05",
      category: "Interviews",
      videoUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fweb.facebook.com%2F100068315346662%2Fvideos%2F1111421133771660%2F&show_text=false&width=560&t=0",
      description: "Interview with Mr Milanzi about faith and community.",
      duration: "40:00",
      tags: ["Interviews", "Faith", "Community"]
    }
  ];

  const handleDownload = (sermon: Sermon) => {
    toast.success(`Downloading: ${sermon.title}`);
    // Implement actual download logic here
  };

  const handleShare = (sermon: Sermon) => {
    const url = `${window.location.origin}/sermons#${sermon.id}`;
    const text = `Check out this sermon: ${sermon.title}`;
    
    if (navigator.share) {
      navigator.share({
        title: sermon.title,
        text: text,
        url: url
      });
    } else {
      navigator.clipboard.writeText(`${text} - ${url}`);
      toast.success('Link copied to clipboard!');
    }
  };

  const filteredSermons = sermonsData.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sermon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || sermon.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Faith', 'Prayer', 'Family', 'Youth', 'Children', 'Outreach', 'Worship', 'Interviews'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sermons</h1>
            <p className="text-gray-600 mt-1">Listen to inspiring messages from our pastors</p>
          </div>
          <Button onClick={() => navigate('/')} variant="outline" className="w-full sm:w-auto">
            Back to Home
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input placeholder="Search sermons..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Sermons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSermons.map(sermon => (
            <Card key={sermon.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="pb-3 flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{sermon.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{sermon.speaker}</p>
                </div>
                <Badge variant="secondary" className="ml-2">{sermon.category}</Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-700 text-sm leading-relaxed">{sermon.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{sermon.duration}</span>
                  <span>•</span>
                  <span>{new Date(sermon.date).toLocaleDateString()}</span>
                </div>
                {sermon.tags && (
                  <div className="flex flex-wrap gap-2">
                    {sermon.tags.map((tag, idx) => <Badge key={idx} variant="outline" className="text-xs">{tag}</Badge>)}
                  </div>
                )}

                {/* Responsive Video */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={sermon.videoUrl}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ border: 'none' }}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    title={sermon.title}
                  ></iframe>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button variant="ghost" size="sm" onClick={() => handleDownload(sermon)} className="text-gray-500 hover:text-gray-600">
                    <Download className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleShare(sermon)} className="text-gray-500 hover:text-gray-600">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
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

      <Footer />
    </div>
  );
};

export default Sermons;