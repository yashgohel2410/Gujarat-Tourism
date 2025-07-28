import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-background/50 backdrop-blur-lg border-t border-border mt-auto">
      <div className="container py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Discover Gujarat</h3>
            <p className="text-sm text-muted-foreground">
              Explore the vibrant culture, heritage, and natural beauty of Gujarat with our curated travel guides and itineraries.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/destinations" className="text-muted-foreground hover:text-foreground transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/itineraries" className="text-muted-foreground hover:text-foreground transition-colors">
                  Itineraries
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-muted-foreground hover:text-foreground transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/destinations?type=Heritage" className="text-muted-foreground hover:text-foreground transition-colors">
                  Heritage
                </Link>
              </li>
              <li>
                <Link to="/destinations?type=Wildlife" className="text-muted-foreground hover:text-foreground transition-colors">
                  Wildlife
                </Link>
              </li>
              <li>
                <Link to="/destinations?type=Religious" className="text-muted-foreground hover:text-foreground transition-colors">
                  Religious
                </Link>
              </li>
              <li>
                <Link to="/destinations?type=Coastal" className="text-muted-foreground hover:text-foreground transition-colors">
                  Coastal
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Discover Gujarat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}