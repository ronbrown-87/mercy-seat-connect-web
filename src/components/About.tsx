
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const About = () => {
  const pastors = [
    {
      name: "Pastor Gavu Nyirongo",
      title: "Senior Pastor",
      bio: "Pastor Gavu has been leading Mercy Seat Ministries with passion and dedication, committed to spreading God's love throughout the Kitwe community.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Assistant Pastor John Mwansa",
      title: "Assistant Pastor",
      bio: "Pastor John focuses on youth ministry and community outreach, bringing fresh energy to our congregation.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Pastor Grace Tembo",
      title: "Assistant Pastor - Women's Ministry",
      bio: "Pastor Grace leads our women's ministry and coordinates community service programs with compassion and wisdom.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    }
  ];

  const beliefs = [
    {
      title: "The Bible",
      description: "We believe the Bible is the inspired, infallible Word of God and our ultimate authority for faith and life."
    },
    {
      title: "Salvation",
      description: "We believe salvation is by grace through faith in Jesus Christ alone, not by works."
    },
    {
      title: "Trinity",
      description: "We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit."
    },
    {
      title: "Jesus Christ",
      description: "We believe Jesus Christ is fully God and fully man, who died for our sins and rose again."
    },
    {
      title: "Holy Spirit",
      description: "We believe the Holy Spirit empowers believers for Christian living and service."
    },
    {
      title: "Church",
      description: "We believe the church is the body of Christ, called to worship, fellowship, and serve."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Mission Statement */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About <span className="text-blue-600">Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Mercy Seat Ministries is a vibrant church community in Kitwe, dedicated to spreading God's love, 
            fostering spiritual growth, and serving our community with compassion and purpose.
          </p>
          
          {/* Stats Section - Removed "Lives Touched" */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center mb-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Church Members</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600">Ministries</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">Years of Service</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-8 shadow-md max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              To be a place where people can encounter God's mercy, experience authentic fellowship, 
              and be equipped to serve in God's kingdom both locally and globally.
            </p>
          </div>
        </div>

        {/* Pastor Profiles */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our <span className="text-blue-600">Leadership</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {pastors.map((pastor, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                    <img 
                      src={index === 0 ? "/lovable-uploads/526056a4-9b79-4588-baaa-38c60c79a716.png" : pastor.image} 
                      alt={pastor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl text-gray-800">{pastor.name}</CardTitle>
                  <p className="text-blue-600 font-semibold">{pastor.title}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed mb-4">{pastor.bio}</p>
                  {index === 0 && (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-500">
                        Pastor Gavu has over 15 years of ministry experience and holds a degree in Theology. 
                        He is passionate about community development and has led numerous outreach programs 
                        throughout Kitwe and surrounding areas.
                      </p>
                      <Button size="sm" variant="outline" className="mt-2">
                        Read Full Bio
                      </Button>
                    </div>
                  )}
                  {index !== 0 && (
                    <Button size="sm" variant="outline" className="mt-2">
                      Read More
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Statement of Faith */}
        <div>
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            What We <span className="text-blue-600">Believe</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beliefs.map((belief, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-600">{belief.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{belief.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};