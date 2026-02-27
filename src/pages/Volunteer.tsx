import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
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
  ArrowLeft,
  Phone
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
    title: "Children's Ministry",
    description: 'Help nurture and teach children during Sunday services and events.',
    icon: <Baby className="w-6 h-6" />,
    category: 'Children',
    timeCommitment: '1-2 hours/week',
    location: "Children's Wing",
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
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<VolunteerOpportunity | null>(null);

  const handleApply = (opportunity: VolunteerOpportunity) => {
    setSelectedOpportunity(opportunity);
    setShowApplyDialog(true);
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
              Back to Home
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
      </div>

      {/* Apply Dialog - Artistic "Not Available Yet" */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Volunteer Application
            </DialogTitle>
            <DialogDescription className="text-center">
              Application feature coming soon
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-6 space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-100 to-orange-200 rounded-full flex items-center justify-center">
              <HandHeart className="w-10 h-10 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              This feature is not available yet
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
              We're working on making volunteer applications available online. In the meantime, please contact us directly for more information.
            </p>
            <div className="pt-4 space-y-3">
              <Button 
                onClick={() => {
                  setShowApplyDialog(false);
                  navigate('/contact');
                }}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Phone className="w-4 h-4 mr-2" />
                Go to Contact Page
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowApplyDialog(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Volunteer;