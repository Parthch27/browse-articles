
import { useState, useEffect } from "react";
import { articles } from "@/data/articles";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { ArrowUp, ArrowDown, MessageCircle, Share2, Bookmark, MoreHorizontal, MessageSquare, Clock, Fire, TrendingUp, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [votes, setVotes] = useState<{[key: string]: number}>({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Latest");
  const location = useLocation();
  
  // Sort articles by published date (newest first)
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  
  useEffect(() => {
    setIsLoaded(true);
    // Initialize votes
    const initialVotes = sortedArticles.reduce((acc, article) => {
      acc[article.id] = Math.floor(Math.random() * 100); // Random initial vote count
      return acc;
    }, {} as {[key: string]: number});
    setVotes(initialVotes);
  }, []);

  const handleVote = (articleId: string, increment: boolean) => {
    setVotes(prev => ({
      ...prev,
      [articleId]: prev[articleId] + (increment ? 1 : -1)
    }));
  };

  // Navigation items for the sidebar
  const mainNavItems = [
    { icon: <Home size={18} />, name: "Home", path: "/" },
    { icon: <TrendingUp size={18} />, name: "Popular", path: "/popular" },
    { icon: <Clock size={18} />, name: "Recent", path: "/recent" },
    { icon: <Star size={18} />, name: "Topics", path: "/topics" },
  ];

  // Extract unique categories for the sidebar
  const categories = Array.from(new Set(articles.map(article => article.category.name)));

  return (
    <MainLayout>
      <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto px-0 lg:px-4 pt-0 flex">
          {/* Left Sidebar */}
          <div className="hidden md:block w-56 pr-4 pt-4 border-r border-border/60">
            {/* Main Navigation */}
            <div className="mb-6">
              {mainNavItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium mb-1",
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

            {/* Topics Heading */}
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Topics
            </div>

            {/* Category List */}
            <div className="space-y-1">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/category/${category.toLowerCase()}`}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium",
                    location.pathname === `/category/${category.toLowerCase()}` 
                      ? "bg-primary text-primary-foreground" 
                      : "text-foreground hover:bg-primary/10 transition-colors"
                  )}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Main Content - Feed */}
          <div className="flex-1 min-w-0">
            {/* Topic Header */}
            <div className="sticky top-16 z-10 bg-background border-b border-border/60 px-4 py-3">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                  {location.pathname.includes('/category/') 
                    ? `r/${location.pathname.split('/category/')[1]}`
                    : "Home"}
                </h1>
                
                {/* Sort Options */}
                <div className="flex space-x-1">
                  <Button 
                    variant={sortOption === "Latest" ? "default" : "ghost"} 
                    onClick={() => setSortOption("Latest")}
                    size="sm" 
                    className="text-xs rounded-full"
                  >
                    <Clock size={14} className="mr-1" />
                    Latest
                  </Button>
                  <Button 
                    variant={sortOption === "Hot" ? "default" : "ghost"} 
                    onClick={() => setSortOption("Hot")}
                    size="sm" 
                    className="text-xs rounded-full"
                  >
                    <Fire size={14} className="mr-1" />
                    Hot
                  </Button>
                  <Button 
                    variant={sortOption === "Top" ? "default" : "ghost"} 
                    onClick={() => setSortOption("Top")}
                    size="sm" 
                    className="text-xs rounded-full"
                  >
                    <TrendingUp size={14} className="mr-1" />
                    Top
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Articles Feed */}
            <div className="px-4 py-2 space-y-3">
              {sortedArticles.map((article, index) => (
                <div 
                  key={article.id} 
                  className="bg-card rounded-md border border-border/60 hover:border-border transition-all duration-200"
                >
                  {/* Post Layout */}
                  <div className="flex">
                    {/* Voting */}
                    <div className="w-10 bg-secondary/30 flex flex-col items-center py-2 rounded-l-md">
                      <button 
                        onClick={() => handleVote(article.id, true)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ArrowUp size={18} />
                      </button>
                      <span className="text-xs font-medium my-1">{votes[article.id] || 0}</span>
                      <button 
                        onClick={() => handleVote(article.id, false)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ArrowDown size={18} />
                      </button>
                    </div>
                    
                    {/* Post Content */}
                    <div className="p-3 w-full">
                      {/* Post Header */}
                      <div className="flex items-center text-xs text-muted-foreground mb-2">
                        <span className="font-medium text-foreground">r/{article.category.name}</span>
                        <span className="mx-1">•</span>
                        <span>Posted by u/{article.author.name.split(' ')[0].toLowerCase()}</span>
                        <span className="mx-1">•</span>
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                      
                      {/* Post Title */}
                      <h3 className="text-base font-medium mb-2">{article.title}</h3>
                      
                      {/* Post Content - Truncated Text */}
                      <div className="text-sm line-clamp-3 mb-2">{article.excerpt}</div>
                      
                      {/* Post Image - If Available */}
                      {article.image && (
                        <div 
                          className="w-full h-48 bg-cover bg-center rounded-md mb-2"
                          style={{ backgroundImage: `url(${article.image})` }}
                        />
                      )}
                      
                      {/* Post Actions */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <button className="flex items-center gap-1 hover:bg-secondary/50 rounded-md px-2 py-1">
                          <MessageSquare size={16} />
                          <span>{Math.floor(Math.random() * 30)} Comments</span>
                        </button>
                        <button className="flex items-center gap-1 hover:bg-secondary/50 rounded-md px-2 py-1">
                          <Share2 size={16} />
                          <span>Share</span>
                        </button>
                        <button className="flex items-center gap-1 hover:bg-secondary/50 rounded-md px-2 py-1">
                          <Bookmark size={16} />
                          <span>Save</span>
                        </button>
                        <button className="flex items-center gap-1 hover:bg-secondary/50 rounded-md px-2 py-1">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="hidden lg:block w-80 pl-4 pt-4">
            <div className="sticky top-24 space-y-4">
              {/* Today's Updated */}
              <div className="bg-card rounded-md border border-border/60 overflow-hidden">
                <div className="p-3 border-b border-border/60 flex justify-between items-center">
                  <h3 className="font-medium">Stay Updated</h3>
                </div>
                <div className="p-3">
                  <p className="text-sm text-muted-foreground mb-4">
                    Get the latest articles delivered directly to your inbox.
                  </p>
                  <Button size="sm" className="w-full">Subscribe to Newsletter</Button>
                </div>
              </div>
              
              {/* Popular Threads Card */}
              <div className="bg-card rounded-md border border-border/60 overflow-hidden">
                <div className="p-3 border-b border-border/60">
                  <h3 className="font-medium">Popular Threads</h3>
                </div>
                <div className="divide-y divide-border/60">
                  {sortedArticles.slice(0, 5).map((article, index) => (
                    <div key={article.id} className="p-3 hover:bg-secondary/30 transition-colors">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-medium text-muted-foreground">{index + 1}</span>
                        <div>
                          <p className="text-sm font-medium line-clamp-2">{article.title}</p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <span className="font-medium">r/{article.category.name}</span>
                            <span className="mx-1">•</span>
                            <span>{Math.floor(Math.random() * 20 + 5)} comments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Community Card */}
              <div className="bg-card rounded-md border border-border/60 overflow-hidden">
                <div className="h-8 bg-primary"></div>
                <div className="p-3">
                  <h3 className="font-medium mb-3">Arthive Community</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your place for thought-provoking articles and discussions on various topics.
                  </p>
                  <Button className="w-full mb-2" size="sm">Create Post</Button>
                  <hr className="my-3 border-border/60" />
                  <div className="text-xs text-muted-foreground">
                    <div className="flex justify-between mb-2">
                      <span>Members</span>
                      <span className="font-medium">{Math.floor(Math.random() * 100000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Online</span>
                      <span className="font-medium">{Math.floor(Math.random() * 1000)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Import the missing Home icon from lucide-react
import { Home } from "lucide-react";

export default Index;
