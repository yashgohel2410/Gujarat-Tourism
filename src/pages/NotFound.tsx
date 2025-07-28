import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-16 text-center">
      <motion.div 
        className="space-y-6 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
          <span className="text-5xl font-bold">404</span>
        </div>
        
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        
        <p className="text-muted-foreground">
          The page you are looking for doesn't exist or has been moved.
          Let's get you back on track to discover beautiful Gujarat.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild>
            <Link to="/">Go to Homepage</Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="/destinations">Explore Destinations</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}