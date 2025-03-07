
import { useState } from "react";
import { articles } from "@/data/articles";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ArrowRight, TrendingUp, Star, Clock, Share2 } from "lucide-react";
import { toast } from "sonner";

export default function Index() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("latest");
  
  // Filter articles based on active category
  const filteredArticles = activeCategory 
    ? articles.filter(article => article.category.slug === activeCategory)
    : articles;

  // Filter based on selected filter (trending, popular, latest)
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (activeFilter === "trending") {
      // Sort by trending (using publishedAt as a proxy for trending)
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    } else if (activeFilter === "popular") {
      // Sort by popularity (could be based on views or comments, but we'll use a random value for demo)
      return (Math.floor(Math.random() * 10) + 1) - (Math.floor(Math.random() * 10) + 1);
    } else {
      // Sort by latest
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
  });

  const handleShareArticle = (articleTitle: string) => {
    // In a real app, we'd implement actual sharing functionality
    navigator.clipboard.writeText(`Check out this article: ${articleTitle}`);
    toast.success("Link copied to clipboard");
  };

  return (
    <MainLayout>
      <div className="w-full">
        {/* Filter by Category */}
        <div className="sticky top-16 z-10 bg-background/95 backdrop-blur-sm border-b border-border py-3 px-4">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
            <span className="text-sm font-medium whitespace-nowrap">Filter by Category:</span>
            <Badge
              key="all"
              variant={activeCategory === null ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setActiveCategory(null)}
            >
              All
            </Badge>
            {articles.reduce<string[]>((acc, article) => {
              if (!acc.includes(article.category.slug)) {
                acc.push(article.category.slug);
              }
              return acc;
            }, []).map(category => {
              const categoryObj = articles.find(article => article.category.slug === category)?.category;
              if (!categoryObj) return null;
              
              return (
                <Badge 
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setActiveCategory(category === activeCategory ? null : category)}
                >
                  {categoryObj.name}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Featured Thread */}
        <div className="bg-secondary/30 p-4 border-b border-border">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
                {articles[0].author.name.charAt(0)}
              </div>
              <div className="h-full w-px bg-border my-2"></div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <span className="font-medium">{articles[0].author.name}</span>
                <span>•</span>
                <span>Posted by {articles[0].author.name}</span>
                <span>•</span>
                <span>{new Date(articles[0].publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              
              <h2 className="text-lg font-bold mb-1">The Future of Interface Design</h2>
              
              <p className="text-sm text-muted-foreground mb-2">
                Exploring new interactions and methodologies that will shape the next generation of digital interfaces and information models.
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-primary/5">{articles[0].category.name}</Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs gap-1" 
                    onClick={() => handleShareArticle("The Future of Interface Design")}
                  >
                    <Share2 size={14} />
                    Share
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-xs gap-1">
                    Read Full Thread <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Latest Posts</h2>
            <div className="flex items-center">
              <Button 
                variant={activeFilter === "latest" ? "default" : "outline"} 
                size="sm" 
                className="mr-2 gap-1"
                onClick={() => setActiveFilter("latest")}
              >
                <Clock size={14} />
                Latest
              </Button>
              <Button 
                variant={activeFilter === "trending" ? "default" : "outline"} 
                size="sm"
                className="mr-2 gap-1"
                onClick={() => setActiveFilter("trending")}
              >
                <TrendingUp size={14} />
                Trending
              </Button>
              <Button 
                variant={activeFilter === "popular" ? "default" : "outline"} 
                size="sm"
                className="gap-1"
                onClick={() => setActiveFilter("popular")}
              >
                <Star size={14} />
                Popular
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            {sortedArticles.slice(0, 4).map((article, index) => (
              <div key={article.id} className="border-b border-border pb-6 last:border-0">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
                      {article.author.name.charAt(0)}
                    </div>
                    <div className="h-full w-px bg-border my-2"></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <span className="font-medium">{article.author.name}</span>
                      <span>•</span>
                      <span>Posted by {article.author.name}</span>
                      <span>•</span>
                      <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    
                    <h3 className="text-base font-semibold mb-1">{article.title}</h3>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-primary/5">{article.category.name}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-1 text-xs text-muted-foreground"
                          onClick={() => handleShareArticle(article.title)}
                        >
                          <Share2 size={14} />
                          <span>Share</span>
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MessageSquare size={14} />
                          <span>{Math.floor(Math.random() * 10) + 1} Comments</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 pt-6 pb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">More Posts</h2>
          </div>
          
          <div className="space-y-6">
            {sortedArticles.slice(4, 8).map((article) => (
              <div key={article.id} className="border-b border-border pb-6 last:border-0">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
                      {article.author.name.charAt(0)}
                    </div>
                    <div className="h-full w-px bg-border my-2"></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <span className="font-medium">{article.author.name}</span>
                      <span>•</span>
                      <span>Posted by {article.author.name}</span>
                      <span>•</span>
                      <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    
                    <h3 className="text-base font-semibold mb-1">{article.title}</h3>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-primary/5">{article.category.name}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-1 text-xs text-muted-foreground"
                          onClick={() => handleShareArticle(article.title)}
                        >
                          <Share2 size={14} />
                          <span>Share</span>
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MessageSquare size={14} />
                          <span>{Math.floor(Math.random() * 10) + 1} Comments</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
