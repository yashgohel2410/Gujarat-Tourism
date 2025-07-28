import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MainNav } from "./main-nav";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BookingForm } from "@/components/booking-form";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingFormOpen, setBookingFormOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full transition-all duration-300 backdrop-blur-lg",
      scrolled ? "bg-background/70 shadow-md" : "bg-transparent"
    )}>
      <div className="container flex h-16 items-center justify-between py-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            {isMobile ? "Gujarat" : "Discover Gujarat"}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <MainNav />
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button
              size="sm"
              className="bg-gradient-to-r from-teal-400 to-blue-500 text-white hover:from-teal-500 hover:to-blue-600 shadow-md"
              onClick={() => setBookingFormOpen(true)}
            >
              Book Now
            </Button>
          </div>
        </div>

        {/* Tablet Navigation */}
        <div className="hidden md:flex lg:hidden items-center gap-4">
          <MainNav />
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-4 pt-6">
                <Button
                  className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white hover:from-teal-500 hover:to-blue-600 shadow-md"
                  onClick={() => {
                    setBookingFormOpen(true);
                    // Close the sheet when opening booking form
                  }}
                >
                  Book Now
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <ModeToggle />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <Link
                  to="/"
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/destinations"
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Destinations
                </Link>
                <Link
                  to="/itineraries"
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Itineraries
                </Link>
                <Link
                  to="/reviews"
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reviews
                </Link>
                <div className="pt-4 border-t">
                  <Button
                    className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white hover:from-teal-500 hover:to-blue-600 shadow-md"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setBookingFormOpen(true);
                    }}
                  >
                    Book Now
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Booking Form */}
      <BookingForm open={bookingFormOpen} onOpenChange={setBookingFormOpen} />
    </header>
  );
}