
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchBar from "./SearchBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsSearchOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border/60",
        isScrolled
          ? "py-1 bg-background/90 backdrop-blur-lg"
          : "py-2 bg-background"
      )}
    >
      <div className="container mx-auto px-4 flex items-center h-12">
        <Link
          to="/"
          className="text-xl font-semibold tracking-tight transition-transform hover:scale-[1.02] duration-300 text-primary mr-6"
        >
          Arthive
        </Link>

        {/* Search Bar */}
        <div className="relative flex-grow max-w-md">
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10 h-9 bg-secondary/50 border-border/50 w-full rounded-full text-sm"
              onClick={() => setIsSearchOpen(true)}
            />
          </div>
        </div>

        {/* Right side buttons */}
        <div className="ml-auto">
          <Button size="sm" className="rounded-full">
            Create Post
          </Button>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border animate-slide-down py-4 px-4">
          <div className="container mx-auto">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
