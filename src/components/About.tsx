
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, Users, Church, Sparkles, Star } from "lucide-react";

export const About = () => {
  const beliefs = [
    { title: "The Bible", description: "The inspired, infallible Word of God and our ultimate authority for faith and life.", icon: BookOpen },
    { title: "Salvation", description: "By grace through faith in Jesus Christ alone, not by works.", icon: Heart },
    { title: "Trinity", description: "One God eternally existing in three persons: Father, Son, and Holy Spirit.", icon: Sparkles },
    { title: "Jesus Christ", description: "Fully God and fully man, who died for our sins and rose again.", icon: Star },
    { title: "Holy Spirit", description: "Empowers believers for Christian living and service.", icon: Sparkles },
    { title: "Church", description: "The body of Christ, called to worship, fellowship, and serve.", icon: Church },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-muted/50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
            Know More About Us
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight">
            A Community Built on <br />
            <span className="text-primary">Faith & Love</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            For over 25 years, Mercy Seat Ministries has been a home for believers in Kitwe — 
            a place to grow, connect, and make an impact together.
          </p>
        </div>

        {/* Impact Stats - Modern cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto">
          {[
            { number: "500+", label: "Church Members", sublabel: "Growing family" },
            { number: "10+", label: "Ministries", sublabel: "Serving together" },
            { number: "25+", label: "Years of Service", sublabel: "Faithful since 1999" },
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative bg-card border border-border rounded-2xl p-8 text-center hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
            >
              <div className="text-5xl md:text-6xl font-black text-primary mb-2 tracking-tight">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Mission & Vision - Side by side modern layout */}
        <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-5xl mx-auto">
          <div className="bg-primary text-primary-foreground rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-primary-foreground/90 leading-relaxed text-lg">
                To be a place where people encounter God's mercy, experience authentic fellowship, 
                and are equipped to serve in God's kingdom — locally and globally.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To raise a generation of believers who are rooted in God's Word, passionate about worship, 
                and committed to transforming their communities through love and service.
              </p>
            </div>
          </div>
        </div>

        {/* Leadership Preview */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
            Our Leadership
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Led by Faithful Servants
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Our pastoral team is dedicated to shepherding, teaching, and equipping 
            every member to walk in their God-given purpose.
          </p>
          <div className="flex justify-center">
            <div className="bg-card border border-border rounded-3xl p-8 max-w-md w-full hover:shadow-lg hover:border-primary/30 transition-all duration-500">
              <div className="w-28 h-28 mx-auto mb-5 overflow-hidden rounded-2xl ring-4 ring-primary/20">
                <img
                  src="/lovable-uploads/526056a4-9b79-4588-baaa-38c60c79a716.png"
                  alt="Pastor Gavu Nyirongo"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold text-foreground">Pastor Gavu Nyirongo</h4>
              <p className="text-primary font-semibold text-sm mb-3">Senior Pastor</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Leading Mercy Seat Ministries with passion and dedication for over 15 years, 
                committed to spreading God's love throughout the Kitwe community.
              </p>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => window.location.href = '/about'}>
                Meet the Team
              </Button>
            </div>
          </div>
        </div>

        {/* Statement of Faith */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
              Statement of Faith
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
              What We Believe
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {beliefs.map((belief, index) => {
              const Icon = belief.icon;
              return (
                <div
                  key={index}
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-2">{belief.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{belief.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
