
import { Link, useLocation } from "react-router-dom";
import { Home, Clock, Star, Bell, Search } from "lucide-react";
import { categories } from "@/data/articles";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: <Home size={18} />, name: "Home", path: "/" },
    { icon: <Clock size={18} />, name: "Recent", path: "/recent" },
    { icon: <Star size={18} />, name: "Topics", path: "/topics" },
    { icon: <Bell size={18} />, name: "Notifications", path: "/notifications" },
    { icon: <Search size={18} />, name: "Search", path: "/search" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 p-4 border-r border-border shrink-0">
      <div className="space-y-1 mb-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium",
              location.pathname === item.path
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-primary/10 transition-colors"
            )}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <h3 className="font-semibold text-sm mb-3 px-3">Categories</h3>
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
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
