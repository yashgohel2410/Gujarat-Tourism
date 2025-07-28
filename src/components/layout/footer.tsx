import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-background/50 backdrop-blur-lg border-t border-border mt-auto">
      <div className="container py-8 sm:py-10 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-3 sm:col-span-2 md:col-span-1">
            <h3 className="text-lg font-medium">Discover Gujarat</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Explore the vibrant culture, heritage, and natural beauty of Gujarat with our curated travel guides and itineraries.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/destinations" className="text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-1 block">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/itineraries" className="text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-1 block">
                  Itineraries
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-1 block">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/destinations?type=Heritage" className="text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-1 block">
                  Heritage
                </Link>
              </li>
              <li>
                <Link to="/destinations?type=Wildlife" className="text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-1 block">
                  Wildlife
                </Link>
              </li>
              <li>
                <Link to="/destinations?type=Religious" className="text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-1 block">
                  Religious
                </Link>
              </li>
              <li>
                <Link to="/destinations?type=Coastal" className="text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-1 block">
                  Coastal
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-1 block">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-1 block">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-1 block">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors touch-manipulation py-1 block">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Discover Gujarat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}