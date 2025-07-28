import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { BookingForm } from "@/components/booking-form";
import { ChevronRight, MapPin, Calendar, Star } from "lucide-react";
import { Destination, Itinerary, Review } from "@/types";
import { motion } from "framer-motion";

export default function HomePage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingFormOpen, setBookingFormOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch destinations
        const destinationsResponse = await fetch("/data/destinations.json");
        const destinationsData = await destinationsResponse.json();
        setDestinations(destinationsData.slice(0, 4));
        
        // Fetch itineraries
        const itinerariesResponse = await fetch("/data/itineraries.json");
        const itinerariesData = await itinerariesResponse.json();
        setItineraries(itinerariesData.slice(0, 3));
        
        // Fetch reviews
        const reviewsResponse = await fetch("/data/reviews.json");
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData.slice(0, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col section-container">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] md:h-[90vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/10986707/pexels-photo-10986707.jpeg?_gl=1*1yiq9z3*_ga*NDc4MjU0NTkuMTc0NjAwMjc2Nw..*_ga_8JE65Q40S6*czE3NTM3MzA0NDYkbzMkZzEkdDE3NTM3MzMzNDEkajEwJGwwJGgw"
            alt="Statue of Unity"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent dark:from-black/90 dark:via-black/70"></div>
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl space-y-4 sm:space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full bg-gradient-to-r from-teal-400/20 to-blue-500/20 text-teal-400 backdrop-blur-md inline-block border border-teal-400/30">
              ✨ Vibrant Gujarat
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white bg-gradient-to-r from-white via-blue-100 to-teal-200 bg-clip-text text-transparent leading-tight">
              Experience the Land of Legends
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
              From ancient temples to pristine beaches, explore the diverse wonders of Gujarat with our curated travel experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button
                className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-12 sm:h-auto"
                size="lg"
                asChild
              >
                <Link to="/destinations">🏛️ Explore Destinations</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 text-white backdrop-blur-md border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 h-12 sm:h-auto"
                asChild
              >
                <Link to="/itineraries">📋 View Itineraries</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-16 sm:py-20 md:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 section-separator section-stack">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 sm:mb-16 gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Popular Destinations
              </h2>
              <p className="text-muted-foreground mt-2 text-base sm:text-lg">Explore the most visited places in Gujarat</p>
            </div>
            <Button variant="ghost" asChild className="gap-1 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-800 dark:hover:to-indigo-800 self-center md:self-auto">
              <Link to="/destinations">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-xl bg-muted/30 animate-pulse min-h-[320px]"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr">
              {destinations.map((destination) => (
                <GlassCard
                  key={destination.id}
                  title={destination.name}
                  description={`${destination.location} • ${destination.category}`}
                  imageSrc={destination.image}
                  link={`/destinations/${destination.id}`}
                  badge={destination.category}
                  rating={destination.rating}
                  hoverEffect={false}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Itineraries */}
      <section className="py-16 sm:py-20 md:py-32 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-100 dark:from-slate-950 dark:via-gray-900 dark:to-slate-800 section-separator section-stack">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 sm:mb-16 gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Featured Itineraries
              </h2>
              <p className="text-muted-foreground mt-2 text-base sm:text-lg">Plan your perfect Gujarat trip</p>
            </div>
            <Button variant="ghost" asChild className="gap-1 bg-gradient-to-r from-teal-100 to-cyan-100 dark:from-teal-900 dark:to-cyan-900 hover:from-teal-200 hover:to-cyan-200 dark:hover:from-teal-800 dark:hover:to-cyan-800 self-center md:self-auto">
              <Link to="/itineraries">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-xl bg-muted/30 animate-pulse min-h-[400px]"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
              {itineraries.map((itinerary) => (
                <GlassCard
                  key={itinerary.id}
                  title={itinerary.title}
                  description={itinerary.description.length > 100 ? itinerary.description.substring(0, 100) + '...' : itinerary.description}
                  imageSrc={itinerary.coverImage}
                  link={`/itineraries/${itinerary.id}`}
                  aspectRatio="portrait"
                  hoverEffect={false}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {itinerary.duration} days
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {itinerary.destinations.length} places
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Gujarat */}
      <section className="py-16 sm:py-20 md:py-32 bg-background section-separator section-stack">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              className="space-y-4 sm:space-y-6 text-center md:text-left text-container motion-safe"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
                Discover the Essence of Gujarat
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                Gujarat, the westernmost state of India, is a land of diverse cultures, rich history, and natural wonders. From the stunning White Desert of Kutch to the majestic Asiatic Lions of Gir, Gujarat offers a plethora of experiences for every kind of traveler.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 py-4 max-w-md mx-auto md:mx-0">
                <div className="flex flex-col space-y-1 sm:space-y-2 text-center md:text-left">
                  <span className="text-2xl sm:text-3xl font-bold text-primary">12+</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">Heritage Sites</span>
                </div>
                <div className="flex flex-col space-y-1 sm:space-y-2 text-center md:text-left">
                  <span className="text-2xl sm:text-3xl font-bold text-primary">1600+</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">KM Coastline</span>
                </div>
                <div className="flex flex-col space-y-1 sm:space-y-2 text-center md:text-left">
                  <span className="text-2xl sm:text-3xl font-bold text-primary">30+</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">Wildlife Sanctuaries</span>
                </div>
                <div className="flex flex-col space-y-1 sm:space-y-2 text-center md:text-left">
                  <span className="text-2xl sm:text-3xl font-bold text-primary">8+</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">Major Festivals</span>
                </div>
              </div>
              <Button
                className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                size="lg"
                asChild
              >
                <Link to="/destinations">Start Exploring</Link>
              </Button>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 lg:mt-0">
              <motion.div
                className="aspect-square"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://images.pexels.com/photos/672638/pexels-photo-672638.jpeg"
                  alt="Dwarka Temple"
                  className="rounded-lg object-cover w-full h-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </motion.div>
              <motion.div
                className="mt-4 sm:mt-6 aspect-square"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://images.pexels.com/photos/23808904/pexels-photo-23808904.jpeg?_gl=1*15cua2d*_ga*NDc4MjU0NTkuMTc0NjAwMjc2Nw..*_ga_8JE65Q40S6*czE3NTM3MzA0NDYkbzMkZzEkdDE3NTM3MzEwNjUkajI1JGwwJGgw"
                  alt="Rann of Kutch"
                  className="rounded-lg object-cover w-full h-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </motion.div>
              <motion.div
                className="aspect-square"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://images.pexels.com/photos/30894544/pexels-photo-30894544.jpeg?_gl=1*18k7zfn*_ga*NDc4MjU0NTkuMTc0NjAwMjc2Nw..*_ga_8JE65Q40S6*czE3NTM3MzA0NDYkbzMkZzEkdDE3NTM3MzM2MzMkajU5JGwwJGgw"
                  alt="Gir Lion"
                  className="rounded-lg object-cover w-full h-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </motion.div>
              <motion.div
                className="mt-4 sm:mt-6 aspect-square"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://as1.ftcdn.net/v2/jpg/06/52/53/44/1000_F_652534429_DJ6LYdVLCRVHTkbNcC58C9RmD1CoVCwq.jpg"
                  alt="Ahmedabad Heritage"
                  className="rounded-lg object-cover w-full h-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 md:py-32 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-100 dark:from-purple-950 dark:via-slate-900 dark:to-gray-800 section-separator section-stack">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              What Travelers Say
            </h2>
            <p className="text-muted-foreground mt-2 text-base sm:text-lg">Read about experiences from our happy travelers</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-xl bg-muted/30 animate-pulse min-h-[250px]"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  className="backdrop-blur-lg bg-white/70 dark:bg-gray-950/70 p-4 sm:p-6 rounded-xl shadow-lg border border-white/20 dark:border-gray-800/50 flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-3 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mb-3 sm:mb-4 text-sm leading-relaxed flex-1">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center mt-auto">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-medium shadow-lg text-sm sm:text-base">
                      {review.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-sm sm:text-base">{review.name}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-10">
            <Button 
              variant="outline" 
              asChild 
              className="gap-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-800 dark:hover:to-pink-800"
            >
              <Link to="/reviews">
                View All Reviews <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 relative">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/32604468/pexels-photo-32604468.jpeg?_gl=1*gqeo24*_ga*NDc4MjU0NTkuMTc0NjAwMjc2Nw..*_ga_8JE65Q40S6*czE3NTM3MzA0NDYkbzMkZzEkdDE3NTM3MzMyMTIkajU5JGwwJGgw"
            alt="Gujarat Landscape"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 backdrop-blur-sm"></div>
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white space-y-4 sm:space-y-6 md:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-teal-200 bg-clip-text text-transparent leading-tight">
              Ready to Explore Gujarat?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Let us help you plan your perfect Gujarat trip. Get customized itineraries, travel tips, and exclusive deals.
            </p>
            <Button
              className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-medium shadow-lg hover:shadow-xl mt-4 transform hover:scale-105 transition-all duration-300 h-12 sm:h-auto w-full sm:w-auto max-w-xs mx-auto touch-manipulation"
              size="lg"
              onClick={() => setBookingFormOpen(true)}
            >
              🚀 Plan Your Trip Now
            </Button>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <BookingForm open={bookingFormOpen} onOpenChange={setBookingFormOpen} />
    </div>
  );
}