import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Search, Clock, ChevronRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Itinerary } from "@/types";
import { motion } from "framer-motion";

export default function Itineraries() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [filteredItineraries, setFilteredItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [durationRange, setDurationRange] = useState([1, 14]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/itineraries.json");
        const data = await response.json();
        setItineraries(data);
        setFilteredItineraries(data);
        // Find max duration for slider
        const maxDuration = Math.max(...data.map((item: Itinerary) => item.duration));
        setDurationRange([1, maxDuration]);
      } catch (error) {
        console.error("Error fetching itineraries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...itineraries];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((itinerary) => 
        itinerary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        itinerary.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        itinerary.destinations.some(dest => 
          dest.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by duration range
    filtered = filtered.filter(
      (itinerary) => 
        itinerary.duration >= durationRange[0] && 
        itinerary.duration <= durationRange[1]
    );

    setFilteredItineraries(filtered);
  }, [searchTerm, durationRange, itineraries]);

  const resetFilters = () => {
    setSearchTerm("");
    const maxDuration = Math.max(...itineraries.map((item) => item.duration));
    setDurationRange([1, maxDuration]);
  };

  return (
    <div className="container py-10">
      <motion.div 
        className="text-center max-w-3xl mx-auto mb-8 space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold">Gujarat Itineraries</h1>
        <p className="text-muted-foreground">
          Discover curated travel plans for exploring Gujarat's wonders
        </p>
      </motion.div>

      <div className="bg-background/80 backdrop-blur-md shadow-md rounded-lg p-6 mb-8 border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-full md:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search itineraries..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="col-span-full md:col-span-2">
            <Label htmlFor="duration-range" className="mb-2 block">
              Duration: {durationRange[0]} - {durationRange[1]} days
            </Label>
            <Slider
              id="duration-range"
              defaultValue={[1, 14]}
              min={1}
              max={Math.max(...itineraries.map((item) => item.duration) || [14])}
              step={1}
              value={durationRange}
              onValueChange={setDurationRange}
              className="my-4"
            />
          </div>
          
          <div className="col-span-full flex justify-end">
            <Button variant="outline" onClick={resetFilters} className="ml-auto">
              Reset Filters
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl bg-muted/30 animate-pulse h-96"></div>
          ))}
        </div>
      ) : filteredItineraries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItineraries.map((itinerary, idx) => (
            <motion.div
              key={itinerary.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <GlassCard
                title={itinerary.title}
                description={itinerary.description.substring(0, 150) + '...'}
                imageSrc={itinerary.coverImage}
                link={`/itineraries/${itinerary.id}`}
                aspectRatio="wide"
                className="h-full"
                hoverEffect={false}
              >
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {itinerary.duration} {itinerary.duration === 1 ? 'day' : 'days'}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {itinerary.destinations.length} places
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground col-span-2">
                    <Clock className="w-4 h-4 mr-1" />
                    Best time: {itinerary.bestTime}
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full gap-1">
                    <Link to={`/itineraries/${itinerary.id}`}>
                      View Itinerary <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium mb-2">No itineraries found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
          <Button variant="outline" onClick={resetFilters} className="mt-4">
            Reset Filters
          </Button>
        </div>
      )}
      
      <div className="mt-16 p-8 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 border text-center">
        <h2 className="text-2xl font-bold mb-4">Need a Custom Itinerary?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Not finding what you're looking for? We can create a personalized itinerary
          tailored to your preferences, budget, and schedule.
        </p>
        <Button 
          className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white"
          onClick={() => document.dispatchEvent(new CustomEvent('open-enquiry'))}
        >
          Request Custom Itinerary
        </Button>
      </div>
    </div>
  );
}