import { useEffect, useState } from "react";
import { Review, Destination } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Search } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [destinations, setDestinations] = useState<Record<string, Destination>>({});
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const [ratingFilter, setRatingFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch reviews
        const reviewsResponse = await fetch("/data/reviews.json");
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
        setFilteredReviews(reviewsData);
        
        // Fetch destinations for reference
        const destinationsResponse = await fetch("/data/destinations.json");
        const destinationsData = await destinationsResponse.json();
        
        // Create a lookup object for destinations
        const destinationMap: Record<string, Destination> = {};
        destinationsData.forEach((dest: Destination) => {
          destinationMap[dest.id] = dest;
        });
        setDestinations(destinationMap);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterAndSortReviews();
  }, [searchTerm, sortOption, ratingFilter, reviews]);

  const filterAndSortReviews = () => {
    let filtered = [...reviews];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (review) =>
          review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (destinations[review.destinationId]?.name || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply rating filter
    if (ratingFilter) {
      const rating = parseInt(ratingFilter);
      filtered = filtered.filter((review) => review.rating === rating);
    }
    
    // Apply sorting
    switch (sortOption) {
      case "recent":
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "highest":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }
    
    setFilteredReviews(filtered);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const handleRatingFilterChange = (value: string) => {
    setRatingFilter(value);
  };

  const handleAddReview = () => {
    toast.success("Coming soon! This feature will be available in future updates.");
  };

  return (
    <div className="container py-10">
      <motion.div 
        className="max-w-3xl mx-auto text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2">Traveler Reviews</h1>
        <p className="text-muted-foreground">
          Read authentic experiences from travelers who explored Gujarat
        </p>
      </motion.div>

      <div className="bg-background/80 backdrop-blur-md shadow-md rounded-lg p-6 mb-8 border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-full md:col-span-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Select value={ratingFilter} onValueChange={handleRatingFilterChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select value={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="highest">Highest Rated</SelectItem>
                <SelectItem value="lowest">Lowest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-muted-foreground">
            Showing {filteredReviews.length} of {reviews.length} reviews
          </p>
        </div>
        <Button onClick={handleAddReview}>Write a Review</Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-xl bg-muted/30 animate-pulse h-48"></div>
          ))}
        </div>
      ) : filteredReviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="h-full backdrop-blur-md bg-white/20 dark:bg-gray-950/30 shadow-sm">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {review.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.name}</div>
                        <div className="text-xs text-muted-foreground">{review.location}</div>
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
                  
                  {destinations[review.destinationId] && (
                    <div className="mb-3 text-sm">
                      <span className="font-medium">Destination: </span>
                      <span className="text-primary">{destinations[review.destinationId]?.name}</span>
                    </div>
                  )}
                  
                  <div className="relative">
                    <p className="text-sm leading-relaxed">
                      {review.comment.length > 200
                        ? `${review.comment.substring(0, 200)}...`
                        : review.comment}
                    </p>
                    
                    {review.comment.length > 200 && (
                      <Button variant="link" className="p-0 h-auto text-xs">
                        Read more
                      </Button>
                    )}
                  </div>
                  
                  {review.tips && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs font-medium">Traveler's Tip</p>
                      <p className="text-sm mt-1">{review.tips}</p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium mb-2">No reviews found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("");
              setRatingFilter("");
              setSortOption("recent");
            }} 
            className="mt-4"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}