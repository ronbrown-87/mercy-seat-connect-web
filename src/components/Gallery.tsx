import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      id: 1,
      src: "/lovable-uploads/526056a4-9b79-4588-baaa-38c60c79a716.png",
      alt: "Pastor Gavu Nyirongo delivering a sermon",
      category: "Leadership",
      title: "Pastor Gavu Nyirongo"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      alt: "Church worship service",
      category: "Worship",
      title: "Sunday Worship"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&h=600&fit=crop",
      alt: "Church congregation in prayer",
      category: "Prayer",
      title: "Prayer Meeting"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
      alt: "Church community fellowship",
      category: "Fellowship",
      title: "Community Fellowship"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=600&fit=crop",
      alt: "Youth ministry gathering",
      category: "Youth",
      title: "Youth Ministry"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop",
      alt: "Church baptism ceremony",
      category: "Baptism",
      title: "Baptism Service"
    }
  ];

  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Gallery</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Capturing precious moments of worship, fellowship, and community at Mercy Seat Ministries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <Dialog key={image.id}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 overflow-hidden">
                  <CardContent className="p-0 relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className="mb-2 bg-yellow-500 text-black">
                          {image.category}
                        </Badge>
                        <h3 className="text-white font-semibold text-lg">
                          {image.title}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
                <div className="p-4 bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-yellow-500 text-black">
                      {image.category}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {image.title}
                  </h3>
                  <p className="text-gray-600">{image.alt}</p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            More photos from our church activities and events coming soon!
          </p>
        </div>
      </div>
    </section>
  );
};