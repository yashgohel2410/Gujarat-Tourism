import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        to="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        to="/destinations"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Destinations
      </Link>
      <Link
        to="/itineraries"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Itineraries
      </Link>
      <Link
        to="/reviews"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Reviews
      </Link>
      <Button variant="ghost" size="icon">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </nav>
  );
}