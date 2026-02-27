
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Users, Heart, Star, Baby, Crown } from "lucide-react";

export const Services = () => {
  const services = [
    {
      title: "Sunday Worship Service",
      time: "10:00 AM - 1:00 PM",
      day: "Every Sunday",
      description: "Join us for uplifting worship, inspiring messages, and fellowship with our church family.",
      icon: <Users className="h-8 w-8 text-blue-600" />,
      color: "border-blue-200 hover:border-blue-400"
    },
    {
      title: "Tuesday Evening Service",
      time: "5:00 PM - 6:30 PM",
      day: "Every Tuesday",
      description: "Midweek service with prayer, worship, and the Word.",
      icon: <Clock className="h-8 w-8 text-emerald-600" />,
      color: "border-emerald-200 hover:border-emerald-400"
    },
    {
      title: "Cell Meetings",
      time: "",
      day: "Every Wednesday",
      description: "Connect in smaller groups for Bible study, prayer, and deeper fellowship.",
      icon: <MapPin className="h-8 w-8 text-purple-600" />,
      color: "border-purple-200 hover:border-purple-400",
      contactNote: "Contact us for Cell Meetings"
    },
    {
      title: "Friday Evening Service",
      time: "6:00 PM - 8:00 PM",
      day: "Every Friday",
      description: "End your week with prayer, worship, and spiritual refreshment in our evening service.",
      icon: <Clock className="h-8 w-8 text-green-600" />,
      color: "border-green-200 hover:border-green-400"
    }
  ];

  const ministries = [
    {
      title: "Men's Ministry",
      description: "Building strong men of faith through fellowship, mentorship, and spiritual growth.",
      icon: <Crown className="h-8 w-8 text-blue-600" />,
      color: "border-blue-200 hover:border-blue-400"
    },
    {
      title: "Women's Ministry",
      description: "Empowering women to grow in faith, build relationships, and serve the community.",
      icon: <Heart className="h-8 w-8 text-pink-600" />,
      color: "border-pink-200 hover:border-pink-400"
    },
    {
      title: "Youth Ministry",
      description: "Engaging young people in faith, fun, and fellowship through dynamic programs.",
      icon: <Star className="h-8 w-8 text-yellow-600" />,
      color: "border-yellow-200 hover:border-yellow-400"
    },
    {
      title: "Children's Ministry",
      description: "Nurturing the faith of our youngest members through age-appropriate activities.",
      icon: <Baby className="h-8 w-8 text-green-600" />,
      color: "border-green-200 hover:border-green-400"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join us throughout the week for worship, fellowship, and spiritual growth opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className={`text-center transition-all duration-300 hover:shadow-lg ${service.color} border-2`}>
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-lg font-semibold text-gray-700">{service.day}</p>
                  {service.time ? (
                    <p className="text-2xl font-bold text-blue-600 mt-1">{service.time}</p>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">{(service as any).contactNote}</p>
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ministries Section */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Our <span className="text-blue-600">Ministries</span>
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get involved in our various ministries and find your place to serve and grow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {ministries.map((ministry, index) => (
            <Card key={index} className={`text-center transition-all duration-300 hover:shadow-lg ${ministry.color} border-2`}>
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  {ministry.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {ministry.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {ministry.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Coming Soon: Podcasts & Sermons</h3>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            We're working on bringing you our sermons and teachings online. Stay tuned for podcast 
            releases and recorded messages that you can enjoy anytime, anywhere.
          </p>
        </div>
      </div>
    </section>
  );
};