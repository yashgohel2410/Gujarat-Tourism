import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlassCard } from "@/components/ui/glass-card";
import { Destination } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, MapPin, SlidersHorizontal, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const categories = ["Heritage", "Wildlife", "Religious", "Coastal", "Adventure"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/destinations.json");
        const data = await response.json();
        setDestinations(data);
        setFilteredDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterDestinations();
  }, [searchTerm, selectedCategory, minRating, activeTab, destinations]);

  const filterDestinations = () => {
    let filtered = [...destinations];

    // Filter by category tab
    if (activeTab !== "all") {
      filtered = filtered.filter((destination) => destination.category.toLowerCase() === activeTab.toLowerCase());
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((destination) =>
        destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category dropdown (additional filtering)
    if (selectedCategory) {
      filtered = filtered.filter((destination) => destination.category === selectedCategory);
    }

    // Filter by minimum rating
    if (minRating > 0) {
      filtered = filtered.filter((destination) => destination.rating >= minRating);
    }

    setFilteredDestinations(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setMinRating(0);
    setFilteredDestinations(destinations);
  };

  return (
    <div className="container py-10">
      <motion.div 
        className="text-center max-w-3xl mx-auto mb-8 space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold">Explore Gujarat's Destinations</h1>
        <p className="text-muted-foreground">Discover the most beautiful places across Gujarat</p>
      </motion.div>

      <div className="bg-background/80 backdrop-blur-md shadow-md rounded-lg mb-8 border">
        <div className="p-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search destinations..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="md:w-auto w-full gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>
        
        {showFilters && (
          <div className="p-4 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <Select value={selectedCategory || ""} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Min Rating ({minRating}+)</label>
              <Slider
                value={[minRating]}
                min={0}
                max={5}
                step={0.5}
                onValueChange={(value) => setMinRating(value[0])}
                className="py-4"
              />
            </div>
            
            <div className="flex items-end">
              <Button variant="secondary" onClick={resetFilters} className="gap-2">
                <X className="h-4 w-4" />
                Reset Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="w-full max-w-lg mx-auto grid grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="heritage">Heritage</TabsTrigger>
          <TabsTrigger value="wildlife">Wildlife</TabsTrigger>
          <TabsTrigger value="religious">Religious</TabsTrigger>
          <TabsTrigger value="coastal">Coastal</TabsTrigger>
          <TabsTrigger value="adventure">Adventure</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-xl bg-muted/30 animate-pulse h-80"></div>
          ))}
        </div>
      ) : filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((destination) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard
                title={destination.name}
                description={destination.shortDescription}
                imageSrc={destination.image}
                link={`/destinations/${destination.id}`}
                badge={destination.category}
                rating={destination.rating}
                hoverEffect={false}
              >
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {destination.location}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium mb-2">No destinations found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
          <Button variant="outline" onClick={resetFilters} className="mt-4">
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}