import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Cross,
  Heart,
  Info,
  Mail,
  Target,
  Users
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import team member photos

const NewAbout: React.FC = () => {
  const navigate = useNavigate();
  const [expandedMission, setExpandedMission] = useState(false);
  const [expandedStory, setExpandedStory] = useState(false);

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
                  {expandedMission ? (
                    <>
                      To spread the Gospel of Jesus Christ, make disciples, and serve our community with love and compassion, 
                      bringing hope and transformation to all who seek it. We are committed to creating an environment where 
                      people can encounter God's love, grow in their faith, and discover their God-given purpose. Through worship, 
                      fellowship, service, and biblical teaching, we strive to be the hands and feet of Jesus in our community 
                      and beyond.
                    </>
                  ) : (
                    <>
                      To spread the Gospel of Jesus Christ, make disciples, and serve our community with love and compassion, 
                      bringing hope and transformation to all who seek it.
                    </>
                  )}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedMission(!expandedMission)}
                  className="text-blue-600 hover:text-blue-700 p-0"
                >
                  {expandedMission ? (
                    <>Less <ChevronUp className="h-4 w-4 ml-1" /></>
                  ) : (
                    <>More <ChevronDown className="h-4 w-4 ml-1" /></>
                  )}
                </Button>
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
            {expandedStory && (
              <>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Through God's grace and the dedication of our members, we've been able to reach out to our community, 
                  provide spiritual guidance, and create a place where people can experience God's transforming love.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Today, we continue to grow and serve, always remembering our humble beginnings and the faithfulness of God 
                  who has brought us this far. Our journey has been marked by countless testimonies of lives transformed, 
                  families restored, and communities uplifted through the power of God's love.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We have witnessed God's provision in establishing our permanent place of worship, growing our leadership team, 
                  and expanding our ministry programs. From youth outreach to community service projects, each initiative 
                  reflects our commitment to being the light of Christ in our neighborhood and beyond.
                </p>
              </>
            )}
            <Button
              variant="ghost"
              onClick={() => setExpandedStory(!expandedStory)}
              className="text-blue-600 hover:text-blue-700"
            >
              {expandedStory ? (
                <>Read Less <ChevronUp className="h-4 w-4 ml-1" /></>
              ) : (
                <>Read More <ChevronDown className="h-4 w-4 ml-1" /></>
              )}
            </Button>
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
                  <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden">
                    <img src="/images/gavuoff.jpg" alt="Pastor Gavu Nyirongo" className="w-full h-full object-cover" />
                  </div>
                  <CardTitle className="text-xl">Pastor Gavu Nyirongo</CardTitle>
                  <CardDescription>Senior Pastor & Founder</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Leading our congregation with wisdom, compassion, and a deep commitment to God's Word.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Info className="h-4 w-4 mr-2" />
                        Learn More About Pastor Gavu
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Pastor Gavu Nyirongo - Senior Pastor & Founder</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4">
                          <img src="/images/gavuoof.jpg" alt="Pastor Gavu" className="w-24 h-24 rounded-full object-cover" />
                          <div className="flex-1">
                            <p className="text-gray-600 leading-relaxed">
                              Pastor Gavu Nyirongo is the founding pastor of Mercy Seat Ministries, called by God to establish 
                              this ministry. With over 20  years of ministry experience, he has a heart for evangelism, 
                              discipleship, and community transformation.
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-800">Ministry Focus:</h4>
                          <ul className="space-y-2 text-gray-600">
                            <li>• Expository preaching and biblical teaching</li>
                            <li>• Leadership development and mentoring</li>
                            <li>• Community outreach and evangelism</li>
                            <li>• Marriage and family counseling</li>
                          </ul>
                          <h4 className="font-semibold text-gray-800 mt-4">Education & Training:</h4>
                          <p className="text-gray-600">
                            Bible College graduate with specialized training in pastoral ministry and church leadership.
                          </p>
                          <h4 className="font-semibold text-gray-800 mt-4">Personal:</h4>
                          <p className="text-gray-600">
                            Pastor Gavu is married and a devoted father. He enjoys reading, fellowship, and spending time 
                            with his family. His passion is seeing lives transformed through the power of God's Word.
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
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
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <img src="/images/maston.jpg" alt="Pastor Maston Musowoya" className="w-full h-full object-cover" />
                  </div>
                  <CardTitle>Pastor Maston Musowoya</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <img src="images/catherine.jpg" alt="Pastor Catherine Chewe" className="w-full h-full object-cover" />
                  </div>
                  <CardTitle>Pastor Catherine Chewe</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <img src="images/taddy.jpg" alt="Pastor Eric Tady" className="w-full h-full object-cover" />
                  </div>
                  <CardTitle>Pastor Eric Tady</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <img src="/images/nyundi.jpg" alt="Pastor Eric Nyundi" className="w-full h-full object-cover" />
                  </div>
                  <CardTitle>Pastor Eric Nyundi</CardTitle>
                </CardHeader>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <img src="/images/chindawi.jpg" alt="Pastor Emmanuel Chindawi" className="w-full h-full object-cover" />
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
                  <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden">
                    <img src="/images/boyd.jpg" alt="Boyd Daka" className="w-full h-full object-cover" />
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
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <img src="/images/sydney.jpg" alt="Sydney Mutondo" className="w-full h-full object-cover" />
                  </div>
                  <CardTitle>Sydney Mutondo</CardTitle>
                  <CardDescription>Instrumentalist</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <img src="/images/sulungweOff.jpg" alt="Samson Silungwe" className="w-full h-full object-cover" />
                  </div>
                  <CardTitle>Samson Silungwe</CardTitle>
                  <CardDescription>Instrumentalist</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <img src="/images/paulOff.jpg" alt="Paul Nyirongo" className="w-full h-full object-cover" />
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
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  <img src="/images/wanipa.jpg" alt="Wanipa Musowoya" className="w-full h-full object-cover" />
                </div>
                <CardTitle>Wanipa Musowoya</CardTitle>
                <CardDescription>Media Team</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  <img src="/images/shadreck.jpg" alt="Shadreck Silungwe" className="w-full h-full object-cover" />
                </div>
                <CardTitle>Shadreck Silungwe</CardTitle>
                <CardDescription>Media Team</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  <img src="images/seth.jpg" alt="Seth Musakanya" className="w-full h-full object-cover" />
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