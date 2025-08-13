import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen,
  Camera,
  Clock,
  Cross,
  Drum,
  Guitar,
  Heart,
  Mail,
  Mic,
  Music,
  Piano,
  Target,
  Users,
  Video
} from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewAbout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Mercy Seat Ministries
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            A place of hope, healing, and transformation where God's love meets human need
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700"
          >
            Back to Home
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-600" />
              Our Mission & Vision
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To spread the Gospel of Jesus Christ, make disciples, and serve our community with love and compassion, 
                  bringing hope and transformation to all who seek it.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-600 mb-2">Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be a beacon of light in our community, fostering spiritual growth, building strong families, 
                  and creating a legacy of faith for future generations.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-2xl">
            <div className="text-center space-y-4">
              <Cross className="h-16 w-16 text-blue-600 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800">Building God's Kingdom</h3>
              <p className="text-gray-600">
                Together, we're building a community that reflects God's love and grace
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-2" />
                <CardTitle>Love & Compassion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We demonstrate God's love through acts of kindness, compassion, and service to others.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                <CardTitle>Biblical Teaching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We are committed to teaching God's Word faithfully and applying it to our daily lives.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center"><Users className="h-12 w-12 text-green-500" /></div>
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We foster meaningful relationships and support one another in our faith journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed">
              Mercy Seat Ministries began as a small prayer group in 2010, meeting in homes and sharing the love of Christ. 
              What started with just a handful of faithful believers has grown into a vibrant community of faith.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Through God's grace and the dedication of our members, we've been able to reach out to our community, 
              provide spiritual guidance, and create a place where people can experience God's transforming love.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Today, we continue to grow and serve, always remembering our humble beginnings and the faithfulness of God 
              who has brought us this far.
            </p>
          </div>
        </section>

        {/* Leadership */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Leadership</h2>
          
          {/* Senior Pastor */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Senior Pastor</h3>
            <div className="flex justify-center">
              <Card className="max-w-md text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-16 w-16 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Pastor Gavu Nyirongo</CardTitle>
                  <CardDescription>Senior Pastor & Founder</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Leading our congregation with wisdom, compassion, and a deep commitment to God's Word.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Pastors List */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Our Pastors</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-blue-600" />
                  </div>
                  <CardTitle>Pastor Maston Musowoya</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-blue-600" />
                  </div>
                  <CardTitle>Pastor Catherine Chewe</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-blue-600" />
                  </div>
                  <CardTitle>Pastor Eric Tady</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-blue-600" />
                  </div>
                  <CardTitle>Pastor Eric Nyundi</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-blue-600" />
                  </div>
                  <CardTitle>Pastor Emmanuel Chindawi</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>


                
        </section>

        {/* Praise Team */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Praise & Worship Team</h2>
          
          {/* Praise Team Leader */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Praise Team Leader</h3>
            <div className="flex justify-center">
              <Card className="max-w-md text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Music className="h-16 w-16 text-yellow-600" />
                  </div>
                  <CardTitle className="text-xl">Boyd Daka</CardTitle>
                  <CardDescription>Praise Team Leader</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Leading our congregation in worship with passion and musical excellence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Instrumentalists and Mixing Team */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Instrumentalists & Mixing Team</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Guitar className="h-12 w-12 text-yellow-600" />
                  </div>
                  <CardTitle>Sydney Mutondo</CardTitle>
                  <CardDescription>Instrumentalist</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Drum className="h-12 w-12 text-yellow-600" />
                  </div>
                  <CardTitle>Samson Silungwe</CardTitle>
                  <CardDescription>Instrumentalist</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Piano className="h-12 w-12 text-yellow-600" />
                  </div>
                  <CardTitle>Paul Nyirongo</CardTitle>
                  <CardDescription>Mixing Team</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

                {/* Media Team */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Media Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-green-200 to-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Camera className="h-12 w-12 text-green-600" />
                </div>
                <CardTitle>Wanipa Musowoya</CardTitle>
                <CardDescription>Media Team</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-green-200 to-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Video className="h-12 w-12 text-green-600" />
                </div>
                <CardTitle>Shadreck Silungwe</CardTitle>
                <CardDescription>Media Team</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-green-200 to-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Mic className="h-12 w-12 text-green-600" />
                </div>
                <CardTitle>Seth Musakanya</CardTitle>
                <CardDescription>Media Team</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
        

       
        {/* Service Times */}
        <section className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Service Times</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Sunday Service</h3>
              <p className="text-gray-600">9:00 AM - 12:00 PM</p>
            </div>
            
            <div className="text-center">
                              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Prayer Meeting</h3>
              <p className="text-gray-600">Wednesday 6:00 PM</p>
            </div>
            
            <div className="text-center">
                              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Bible Study</h3>
              <p className="text-gray-600">Friday 7:00 PM</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Youth Group</h3>
              <p className="text-gray-600">Saturday 3:00 PM</p>
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get Involved</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            There are many ways to get involved in our ministry. Whether you're interested in serving, 
            joining a small group, or just want to learn more, we'd love to connect with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/volunteer')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Users className="h-5 w-5 mr-2" />
              Volunteer Opportunities
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/contact')}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Mail className="h-5 w-5 mr-2" />
              Contact Us
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewAbout;