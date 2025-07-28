import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Clock, Calendar, Star, ChevronLeft, Heart, Share2, ExternalLink } from "lucide-react";
import { Destination, Review } from "@/types";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function DestinationDetail() {
  const { id } = useParams();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch destination details
        const destinationsResponse = await fetch("/data/destinations.json");
        const destinations = await destinationsResponse.json();
        const found = destinations.find((dest: Destination) => dest.id === id);
        setDestination(found || null);
        
        // Fetch reviews
        const reviewsResponse = await fetch("/data/reviews.json");
        const allReviews = await reviewsResponse.json();
        // Filter reviews related to this destination
        const destinationReviews = allReviews.filter(
          (review: Review) => review.destinationId === id
        );
        setReviews(destinationReviews);
      } catch (error) {
        console.error("Error fetching destination details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: destination?.name || "Gujarat Destination",
        text: destination?.shortDescription || "Check out this amazing place in Gujarat!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      toast.success("Added to your favorites!");
    } else {
      toast.info("Removed from your favorites");
    }
  };

  if (loading) {
    return (
      <div className="container py-10 space-y-8 animate-pulse">
        <div className="h-8 w-64 bg-muted rounded-lg"></div>
        <div className="aspect-video bg-muted rounded-xl"></div>
        <div className="space-y-4">
          <div className="h-8 w-full max-w-md bg-muted rounded-lg"></div>
          <div className="h-4 w-full bg-muted rounded-lg"></div>
          <div className="h-4 w-3/4 bg-muted rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="container py-10">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-2">Destination not found</h2>
          <p className="text-muted-foreground mb-6">The destination you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/destinations">Back to Destinations</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-[50vh] relative">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className="container">
            <Link to="/destinations" className="inline-flex items-center text-white/80 hover:text-white mb-4">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to all destinations
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{destination.name}</h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {destination.location}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {destination.bestTimeToVisit}
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                <span>{destination.rating} ({destination.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="inline-flex gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {destination.category}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleLike}
              className={liked ? "text-rose-500" : ""}
            >
              <Heart className={`w-5 h-5 ${liked ? "fill-rose-500" : ""}`} />
              <span className="sr-only">Like</span>
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="about" className="mt-6">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
            <TabsTrigger value="attractions" className="flex-1">Attractions</TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
            <TabsTrigger value="location" className="flex-1">Location</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="prose dark:prose-invert max-w-none">
                    <h3>Description</h3>
                    <p>{destination.description}</p>
                    
                    <h3 className="mt-8">History</h3>
                    <p>{destination.history}</p>
                  </div>
                  
                  {destination.tips && destination.tips.length > 0 && (
                    <div className="bg-muted/50 p-4 rounded-lg mt-6">
                      <h3 className="text-lg font-medium mb-2">Travel Tips</h3>
                      <ul className="space-y-2">
                        {destination.tips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </div>
              
              <motion.div 
                className="lg:border-l lg:pl-8 lg:border-border"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Best Time to Visit</h3>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <span>{destination.bestTimeToVisit}</span>
                    </div>
                  </div>
                  
                  {destination.entryFee && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Entry Fee</h3>
                      <p>{destination.entryFee}</p>
                    </div>
                  )}
                  
                  {destination.howToReach && destination.howToReach.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">How to Reach</h3>
                      <div className="space-y-3">
                        {destination.howToReach.map((item, index) => (
                          <div key={index}>
                            <span className="font-medium">{item.mode}: </span>
                            <span className="text-muted-foreground">{item.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-6">
                    <Button className="w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white" 
                      onClick={() => document.dispatchEvent(new CustomEvent('open-enquiry'))}
                    >
                      Plan Your Visit
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="attractions" className="mt-6">
            {destination.attractions && destination.attractions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destination.attractions.map((attraction, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl overflow-hidden shadow-md border bg-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="aspect-video">
                    <img
                      src={attraction.image || destination.image} 
                      alt={attraction.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg">{attraction.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{attraction.description}</p>
                    {attraction.timings && (
                      <div className="flex items-center mt-3 text-sm">
                        <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                        <span>Timings: {attraction.timings}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No attractions listed for this destination</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Visitor Reviews</h3>
                  <p className="text-muted-foreground">{reviews.length} reviews for this destination</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => toast.success("Coming soon! This feature will be available in future updates.")}
                >
                  Write a Review
                </Button>
              </div>
              
              <div className="space-y-4">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <motion.div 
                      key={review.id}
                      className="border rounded-lg p-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{review.name}</div>
                            <div className="text-xs text-muted-foreground">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm mt-2">{review.comment}</p>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No reviews yet for this destination</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="location" className="mt-6">
            <div className="space-y-4">
              <div className="aspect-[16/9] bg-muted rounded-lg overflow-hidden border">
                <iframe
                  title={`Map of ${destination.name}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    destination.name + ", " + destination.location + ", Gujarat, India"
                  )}&output=embed`}
                  className="w-full h-full"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Address</h3>
                  <p className="text-muted-foreground">{destination.name}, {destination.location}, Gujarat, India</p>
                  
                  <div className="mt-4">
                    <Button variant="outline" size="sm" className="gap-2" asChild>
                      <a href={`https://maps.google.com/maps?q=${encodeURIComponent(
                        destination.name + ", " + destination.location + ", Gujarat, India"
                      )}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Open in Google Maps
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Nearby</h3>
                  <ul className="space-y-2">
                    {destination.nearbyPlaces && destination.nearbyPlaces.length > 0 ? 
                      destination.nearbyPlaces.map((place, index) => (
                        <li key={index} className="flex items-start">
                          <MapPin className="w-4 h-4 mr-2 text-primary mt-1" />
                          <div>
                            <span className="font-medium">{place.name}</span>
                            <span className="text-sm text-muted-foreground block">
                              {place.distance} away
                            </span>
                          </div>
                        </li>
                      )) : (
                        <li className="text-muted-foreground">No nearby places listed</li>
                      )
                    }
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}