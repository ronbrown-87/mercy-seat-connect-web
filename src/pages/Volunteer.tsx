import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  HandHeart, 
  Users, 
  Music, 
  BookOpen, 
  Baby, 
  Heart, 
  Calendar,
  MapPin,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VolunteerOpportunity {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  timeCommitment: string;
  location: string;
  skills: string[];
  isUrgent: boolean;
}

const volunteerOpportunities: VolunteerOpportunity[] = [
  {
    id: 'worship-team',
    title: 'Worship Team',
    description: 'Join our worship team as a musician, vocalist, or technical support.',
    icon: <Music className="w-6 h-6" />,
    category: 'Worship',
    timeCommitment: '2-4 hours/week',
    location: 'Main Sanctuary',
    skills: ['Music', 'Singing', 'Technical'],
    isUrgent: false
  },
  {
    id: 'children-ministry',
    title: 'Children\'s Ministry',
    description: 'Help nurture and teach children during Sunday services and events.',
    icon: <Baby className="w-6 h-6" />,
    category: 'Children',
    timeCommitment: '1-2 hours/week',
    location: 'Children\'s Wing',
    skills: ['Teaching', 'Patience', 'Safety'],
    isUrgent: true
  },
  {
    id: 'greeting-team',
    title: 'Greeting Team',
    description: 'Welcome visitors and members with a warm smile and helpful information.',
    icon: <Heart className="w-6 h-6" />,
    category: 'Hospitality',
    timeCommitment: '1 hour/week',
    location: 'Main Entrance',
    skills: ['Communication', 'Hospitality'],
    isUrgent: false
  },
  {
    id: 'bible-study-leader',
    title: 'Bible Study Leader',
    description: 'Lead small group Bible studies and facilitate meaningful discussions.',
    icon: <BookOpen className="w-6 h-6" />,
    category: 'Education',
    timeCommitment: '2-3 hours/week',
    location: 'Various',
    skills: ['Teaching', 'Leadership', 'Bible Knowledge'],
    isUrgent: false
  },
  {
    id: 'youth-ministry',
    title: 'Youth Ministry',
    description: 'Mentor and guide teenagers in their faith journey.',
    icon: <Users className="w-6 h-6" />,
    category: 'Youth',
    timeCommitment: '3-4 hours/week',
    location: 'Youth Center',
    skills: ['Mentoring', 'Youth Ministry', 'Leadership'],
    isUrgent: true
  },
  {
    id: 'community-outreach',
    title: 'Community Outreach',
    description: 'Serve our local community through various outreach programs.',
    icon: <HandHeart className="w-6 h-6" />,
    category: 'Outreach',
    timeCommitment: '2-5 hours/week',
    location: 'Community',
    skills: ['Service', 'Communication', 'Organization'],
    isUrgent: false
  }
];

const Volunteer = () => {
  const navigate = useNavigate();
  const [selectedOpportunity, setSelectedOpportunity] = useState<VolunteerOpportunity | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    availability: '',
    message: ''
  });

  const handleApply = (opportunity: VolunteerOpportunity) => {
    setSelectedOpportunity(opportunity);
    setShowApplicationForm(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('🚧 Coming Soon!\n\nVolunteer applications are not yet available. Please wait — you will be notified when this feature is ready. Thank you for your patience!');
    setShowApplicationForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-amber-600 hover:text-amber-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Shelf
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Volunteer Opportunities</h1>
              <p className="text-gray-600">Find ways to serve and get involved in our church community</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">150+</p>
                  <p className="text-blue-100">Active Volunteers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <HandHeart className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">25+</p>
                  <p className="text-green-100">Ministries</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-8 h-8" />
                <div>
                  <p className="text-2xl font-bold">1000+</p>
                  <p className="text-purple-100">Hours Served</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {volunteerOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                      {opportunity.icon}
                    </div>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      {opportunity.category}
                    </Badge>
                  </div>
                  {opportunity.isUrgent && (
                    <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{opportunity.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{opportunity.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{opportunity.timeCommitment}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{opportunity.location}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Skills needed:</p>
                  <div className="flex flex-wrap gap-1">
                    {opportunity.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={() => handleApply(opportunity)}
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Application Form Modal */}
        {showApplicationForm && selectedOpportunity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Apply for {selectedOpportunity.title}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowApplicationForm(false)}
                >
                  ×
                </Button>
              </div>

              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="availability">Preferred Availability</Label>
                    <Input
                      id="availability"
                      placeholder="e.g., Sunday mornings, weekdays"
                      value={formData.availability}
                      onChange={(e) => setFormData({...formData, availability: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="experience">Relevant Experience</Label>
                  <Textarea
                    id="experience"
                    placeholder="Tell us about your relevant experience..."
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="message">Why do you want to serve in this ministry?</Label>
                  <Textarea
                    id="message"
                    placeholder="Share your motivation and what you hope to contribute..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-700">
                    Submit Application
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setShowApplicationForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Volunteer; 