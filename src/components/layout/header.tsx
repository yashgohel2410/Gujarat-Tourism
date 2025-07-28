import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MainNav } from "./main-nav";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

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
          <span className="font-bold text-xl bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">Discover Gujarat</span>
        </Link>
        <div className="flex items-center gap-6">
          <MainNav />
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button size="sm" className="bg-gradient-to-r from-teal-400 to-blue-500 text-white hover:from-teal-500 hover:to-blue-600 shadow-md">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}