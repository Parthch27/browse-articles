
import { Link, useLocation } from "react-router-dom";
import { Clock, Bookmark, Tag, Star, User, Settings } from "lucide-react";
import { categories } from "@/data/articles";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-56 border-r border-border shrink-0">
      <div className="py-4 px-3">
        <div className="mb-1">
          <span className="text-xs font-medium text-muted-foreground">TOPICS</span>
        </div>
        <div className="space-y-1">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium",
                location.pathname === `/category/${category.slug}`
                  ? "bg-primary text-primary-foreground" 
                  : "text-foreground hover:bg-primary/10 transition-colors"
              )}
            >
              {category.name === "Technology" && <Tag size={18} />}
              {category.name === "Design" && <Star size={18} />}
              {category.name === "Business" && <User size={18} />}
              {category.name === "Culture" && <Settings size={18} />}
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
