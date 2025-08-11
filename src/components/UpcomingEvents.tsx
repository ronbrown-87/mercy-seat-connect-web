
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

export const UpcomingEvents = () => {
  const events = [
    {
      title: "Pastor's Basket",
      date: "August 2024",
      time: "TBA",
      location: "Main Sanctuary",
      description: "A special event featuring our pastoral team sharing insights and blessings.",
      category: "Special Event",
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Men's Overnight",
      date: "August 2024", 
      time: "Evening - Morning",
      location: "Church Grounds",
      description: "A night of fellowship, prayer, and spiritual bonding for all men in our congregation.",
      category: "Men's Ministry",
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Youth Camp",
      date: "December 2024",
      time: "Multi-day Event",
      location: "Camp Location TBA", 
      description: "An exciting camp experience for our youth filled with activities, worship, and growth.",
      category: "Youth Event",
      color: "bg-purple-100 text-purple-800"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Upcoming <span className="text-blue-600">Events</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't miss these exciting opportunities to connect, grow, and serve together as a church community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-600">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <Badge className={event.color}>{event.category}</Badge>
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {event.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600">
            More details about these events will be announced soon. Stay connected with us for updates!
          </p>
        </div>
      </div>
    </section>
  );
};
