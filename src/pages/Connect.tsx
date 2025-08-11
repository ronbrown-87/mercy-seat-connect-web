import React, { useState } from 'react';
import { Users, Heart, BookOpen, Handshake, Mail, User, Phone, ArrowLeft, MessageCircle, Plus, Search, Calendar, Clock, ThumbsUp, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Footer } from "@/components/Footer";
import { useNavigate } from 'react-router-dom';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string;
  category: string;
  likes: number;
  replies: number;
  isPinned: boolean;
  isAnswered: boolean;
}

interface SmallGroup {
  id: string;
  name: string;
  description: string;
  leader: string;
  day: string;
  time: string;
  location: string;
  members: number;
  maxMembers: number;
  category: string;
}

interface Ministry {
  title: string;
  description: string;
  details: string;
  icon: React.ReactNode;
  color: string;
}

const Connect = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'forum' | 'groups' | 'contact'>('forum');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '' });
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const forumPosts: ForumPost[] = [
    {
      id: '1',
      title: 'Prayer Request: Family in Need',
      content: 'Please pray for the Johnson family who lost their home in a recent fire. They need God\'s comfort and provision during this difficult time.',
      author: 'Sarah M.',
      authorAvatar: '/placeholder.svg',
      date: '2025-08-07',
      category: 'Prayer Requests',
      likes: 24,
      replies: 8,
      isPinned: true,
      isAnswered: false,
    },
    {
      id: '2',
      title: 'Bible Study Discussion: Romans 8',
      content: 'What are your thoughts on Romans 8:28? How do you see God working all things together for good in your life?',
      author: 'Pastor John',
      authorAvatar: '/placeholder.svg',
      date: '2025-08-06',
      category: 'Bible Study',
      likes: 15,
      replies: 12,
      isPinned: false,
      isAnswered: true,
    },
    {
      id: '3',
      title: 'Youth Ministry Volunteer Needed',
      content: 'We\'re looking for volunteers to help with our youth ministry on Friday evenings. If you have a heart for young people, please reach out!',
      author: 'Youth Pastor Mike',
      authorAvatar: '/placeholder.svg',
      date: '2025-08-05',
      category: 'Ministry',
      likes: 8,
      replies: 3,
      isPinned: false,
      isAnswered: false,
    },
    {
      id: '4',
      title: 'Community Outreach Ideas',
      content: 'Let\'s brainstorm ways we can better serve our local community. What needs do you see around us?',
      author: 'Lisa Chen',
      authorAvatar: '/placeholder.svg',
      date: '2025-08-01',
      category: 'Outreach',
      likes: 19,
      replies: 15,
      isPinned: false,
      isAnswered: false,
    },
  ];

  const smallGroups: SmallGroup[] = [
    {
      id: '1',
      name: 'Young Adults Bible Study',
      description: 'A dynamic group for young adults to study God\'s Word and build meaningful relationships.',
      leader: 'Pastor Sarah Johnson',
      day: 'Tuesday',
      time: '7:00 PM',
      location: 'Mercy Seat Ministries',
      members: 12,
      maxMembers: 20,
      category: 'Young Adults',
    },
    {
      id: '2',
      name: 'Women\'s Prayer Group',
      description: 'A supportive environment for women to pray together and encourage one another in faith.',
      leader: 'Mary Williams',
      day: 'Wednesday',
      time: '10:00 AM',
      location: 'Mercy Seat Ministries',
      members: 8,
      maxMembers: 15,
      category: 'Women',
    },
    {
      id: '3',
      name: 'Men\'s Accountability Group',
      description: 'Men supporting men in their walk with Christ through accountability and fellowship.',
      leader: 'David Thompson',
      day: 'Thursday',
      time: '6:30 AM',
      location: 'Mercy Seat Ministries',
      members: 6,
      maxMembers: 12,
      category: 'Men',
    },
    {
      id: '4',
      name: 'Family Bible Study',
      description: 'Families studying the Bible together and learning to apply God\'s Word in daily life.',
      leader: 'Pastor John Smith',
      day: 'Sunday',
      time: '5:00 PM',
      location: 'Mercy Seat Ministries',
      members: 15,
      maxMembers: 25,
      category: 'Families',
    },
  ];

  const ministries: Ministry[] = [
    {
      title: 'Children\'s Ministry',
      description: 'Nurturing the next generation in faith and love through engaging programs and activities.',
      details: 'Every Sunday we provide age-appropriate Bible lessons, crafts, and activities for children ages 3-12. We focus on building strong foundations of faith through interactive storytelling and character development.',
      icon: <Heart className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-pink-500 to-rose-600',
    },
    {
      title: 'Youth Ministry',
      description: 'Empowering young people to discover their purpose and grow in faith.',
      details: 'Our youth program meets every Friday evening for teens ages 13-19. We offer leadership development, Bible study, community service projects, and fun fellowship activities to help young people navigate life\'s challenges.',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      title: 'Men\'s Ministry',
      description: 'Building strong men of faith through fellowship and accountability.',
      details: 'Men\'s ministry meets monthly for breakfast fellowship, Bible study, and discussion. We focus on developing godly character, supporting each other through life\'s challenges, and taking leadership in our families and communities.',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
      title: 'Bible Study Groups',
      description: 'Deepening understanding of the Scriptures together in small groups.',
      details: 'We offer multiple small group Bible studies throughout the week at various locations. These intimate settings provide opportunities for deeper discussion, prayer, and building meaningful relationships with fellow believers.',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
      title: 'Outreach Programs',
      description: 'Reaching out to the community with compassion and service.',
      details: 'Our outreach includes feeding programs for the needy, visitation to hospitals and nursing homes, community clean-up projects, and sharing the Gospel in local neighborhoods. We believe in being the hands and feet of Jesus.',
      icon: <Handshake className="h-6 w-6" />,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    },
  ];

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Post submitted successfully!'); // Replace with backend integration
    setNewPost({ title: '', content: '', category: '' });
    setShowNewPostForm(false);
  };

  const handleJoinGroup = (group: SmallGroup) => {
    if (group.members >= group.maxMembers) {
      alert(`Sorry, "${group.name}" is already full.`);
      return;
    }
    alert(`You have joined "${group.name}" successfully!`); // Replace with backend integration
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent successfully!'); // Replace with backend integration
  };

  const filteredPosts = forumPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <header className="container mx-auto px-4 mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center">
              <MessageCircle className="mr-2 h-6 w-6 text-blue-500" /> Community Connect
            </h1>
            <p className="text-gray-600">Connect with fellow members, join small groups, or reach out to us</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8">
          <Button
            variant={activeTab === 'forum' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('forum')}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <MessageCircle className="h-4 w-4 mr-2" /> Discussion Forum
          </Button>
          <Button
            variant={activeTab === 'groups' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('groups')}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <Users className="h-4 w-4 mr-2" /> Small Groups
          </Button>
          <Button
            variant={activeTab === 'contact' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('contact')}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <Mail className="h-4 w-4 mr-2" /> Contact Us
          </Button>
        </div>

        {activeTab === 'forum' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Discussion Forum</h2>
              <p className="text-gray-600">Share, discuss, and connect with our church community</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      <SelectItem value="Prayer Requests">Prayer Requests</SelectItem>
                      <SelectItem value="Bible Study">Bible Study</SelectItem>
                      <SelectItem value="Ministry">Ministry</SelectItem>
                      <SelectItem value="Outreach">Outreach</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={() => setShowNewPostForm(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" /> New Post
              </Button>
            </div>
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.authorAvatar} alt={post.author} />
                        <AvatarFallback>{post.author.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {post.isPinned && <Badge className="bg-blue-100 text-blue-800">Pinned</Badge>}
                          {post.isAnswered && <Badge className="bg-green-100 text-green-800">Answered</Badge>}
                          <Badge variant="outline">{post.category}</Badge>
                        </div>
                        <h3 className="font-semibold text-lg text-gray-800 mb-2">{post.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span>By {post.author}</span>
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{post.replies}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredPosts.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No posts found</h3>
                    <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
                  </CardContent>
                </Card>
              )}
            </div>
            {showNewPostForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Create New Post</CardTitle>
                      <Button variant="ghost" size="icon" onClick={() => setShowNewPostForm(false)}>
                        ×
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitPost} className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={newPost.title}
                          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select value={newPost.category} onValueChange={(value) => setNewPost({ ...newPost, category: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Prayer Requests">Prayer Requests</SelectItem>
                            <SelectItem value="Bible Study">Bible Study</SelectItem>
                            <SelectItem value="Ministry">Ministry</SelectItem>
                            <SelectItem value="Outreach">Outreach</SelectItem>
                            <SelectItem value="General">General</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="content">Content *</Label>
                        <Textarea
                          id="content"
                          value={newPost.content}
                          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                          rows={6}
                          required
                        />
                      </div>
                      <div className="flex space-x-3">
                        <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                          Submit Post
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setShowNewPostForm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Small Groups</h2>
              <p className="text-gray-600">Join a small group to grow deeper in your faith and build meaningful relationships</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {smallGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">{group.category}</Badge>
                    </div>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span>Leader: {group.leader}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{group.day}s at {group.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{group.members}/{group.maxMembers} members</span>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleJoinGroup(group)}
                      disabled={group.members >= group.maxMembers}
                    >
                      {group.members >= group.maxMembers ? 'Group Full' : 'Join Group'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Get Connected</h2>
              <p className="text-gray-600">Join our community and find your place to connect and grow</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {ministries.map((ministry, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${ministry.color} text-white`}>{ministry.icon}</div>
                      <CardTitle className="text-lg">{ministry.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4">{ministry.description}</CardDescription>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => alert(`${ministry.title}\n\n${ministry.details}`)}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Contact Us</CardTitle>
                <CardDescription>Have questions or want to get involved? Send us a message!</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input type="text" id="name" placeholder="Your Name" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input type="email" id="email" placeholder="Your Email" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="ministry">Ministry Information</SelectItem>
                        <SelectItem value="volunteer">Volunteer Opportunities</SelectItem>
                        <SelectItem value="prayer">Prayer Request</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" rows={4} placeholder="Your Message" required />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="subscribe" />
                    <Label htmlFor="subscribe" className="text-sm">Subscribe to our newsletter for updates and events</Label>
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Connect;