import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Itinerary, Destination } from "@/types";
import {
  ChevronLeft,
  Calendar,
  MapPin,
  Clock,
  Download,
  Share2,
  Printer,
  Car,
  Bus,
  Utensils,
  Hotel,
  Coffee,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function ItineraryDetail() {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [destinations, setDestinations] = useState<Record<string, Destination>>(
    {}
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch itinerary details
        const itinerariesResponse = await fetch("/data/itineraries.json");
        const itineraries = await itinerariesResponse.json();
        const found = itineraries.find((item: Itinerary) => item.id === id);
        setItinerary(found || null);

        // Fetch all destinations for reference
        const destinationsResponse = await fetch("/data/destinations.json");
        const destinationsData = await destinationsResponse.json();

        // Create a lookup map for destinations
        const destinationMap: Record<string, Destination> = {};
        destinationsData.forEach((dest: Destination) => {
          destinationMap[dest.id] = dest;
        });

        setDestinations(destinationMap);
      } catch (error) {
        console.error("Error fetching itinerary details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    toast.success("Itinerary will be downloaded as PDF (feature coming soon)");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: itinerary?.title || "Gujarat Itinerary",
        text:
          itinerary?.description || "Check out this amazing Gujarat itinerary!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  // Function to render icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case "transport":
        return <Car className="w-4 h-4" />;
      case "sightseeing":
        return <MapPin className="w-4 h-4" />;
      case "meal":
        return <Utensils className="w-4 h-4" />;
      case "accommodation":
        return <Hotel className="w-4 h-4" />;
      case "break":
        return <Coffee className="w-4 h-4" />;
      case "bus":
        return <Bus className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
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

  if (!itinerary) {
    return (
      <div className="container py-10">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-2">Itinerary not found</h2>
          <p className="text-muted-foreground mb-6">
            The itinerary you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/itineraries">Back to Itineraries</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <Link
            to="/itineraries"
            className="inline-flex items-center text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to all itineraries
          </Link>
          <h1 className="text-3xl font-bold mt-2">{itinerary.title}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handlePrint}
          >
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-xl overflow-hidden mb-6">
            <img
              src={itinerary.coverImage}
              alt={itinerary.title}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>

          <div className="prose dark:prose-invert max-w-none mb-8">
            <p>{itinerary.description}</p>
          </div>

          <Tabs defaultValue="itinerary">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="itinerary">Day by Day</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>

            <TabsContent value="itinerary" className="mt-6 space-y-6">
              {itinerary.days.map((day, dayIndex) => (
                <motion.div
                  key={dayIndex}
                  className="border rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: dayIndex * 0.1 }}
                >
                  <div className="bg-muted/50 p-4 border-b">
                    <h3 className="text-lg font-medium">
                      Day {day.day}: {day.title}
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="relative">
                      {day.activities.map((activity, activityIndex) => (
                        <div
                          key={activityIndex}
                          className="mb-6 last:mb-0 pl-6 border-l border-muted-foreground/20 relative"
                        >
                          <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="mb-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              {activity.time}
                            </span>
                            <h4 className="text-base font-medium">
                              {activity.title}
                            </h4>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {activity.description}
                          </p>

                          {activity.destinationId &&
                            destinations[activity.destinationId] && (
                              <div className="mt-2">
                                <Button
                                  variant="link"
                                  className="p-0 h-auto text-primary"
                                  asChild
                                >
                                  <Link
                                    to={`/destinations/${activity.destinationId}`}
                                  >
                                    View destination details
                                  </Link>
                                </Button>
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="map" className="mt-6">
              <Card>
                <CardContent className="p-0">
                  <div className="aspect-[16/9] bg-muted rounded-lg overflow-hidden border">
                    <iframe
                      title={`Map of ${itinerary.title}`}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        itinerary.destinations.join(", ") + ", Gujarat, India"
                      )}&output=embed`}
                      className="w-full h-full"
                      loading="lazy"
                      allowFullScreen
                    ></iframe>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2">
                      Destinations Covered
                    </h3>
                    <ul className="space-y-2">
                      {itinerary.destinations.map((destination, index) => (
                        <li key={index} className="flex items-start">
                          <MapPin className="w-4 h-4 mr-2 text-primary mt-1" />
                          <span>{destination}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Itinerary Overview
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <div>
                        <span className="font-medium">Duration:</span>
                        <span className="ml-1">{itinerary.duration} days</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      <div>
                        <span className="font-medium">Destinations:</span>
                        <span className="ml-1">
                          {itinerary.destinations.length}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      <div>
                        <span className="font-medium">Best Time:</span>
                        <span className="ml-1">{itinerary.bestTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {itinerary.highlights && (
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-2">Highlights</h3>
                    <ul className="space-y-2">
                      {itinerary.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {itinerary.includes && (
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-2">
                      What's Included
                    </h3>
                    <ul className="space-y-2">
                      {itinerary.includes.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {itinerary.excludes && (
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-2">
                      What's Excluded
                    </h3>
                    <ul className="space-y-2">
                      {itinerary.excludes.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-500 mr-2">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-6">
                  <Button
                    className="w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white"
                    onClick={() =>
                      document.dispatchEvent(new CustomEvent("open-enquiry"))
                    }
                  >
                    Book This Trip
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Fill our enquiry form and our team will contact you
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
