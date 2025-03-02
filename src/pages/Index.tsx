
import { useState, useEffect } from "react";
import { articles } from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";
import FeatureArticle from "@/components/FeatureArticle";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [votes, setVotes] = useState<{[key: string]: number}>({});
  
  // Sort articles by published date (newest first)
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  
  useEffect(() => {
    setIsLoaded(true);
    // Initialize votes
    const initialVotes = sortedArticles.reduce((acc, article) => {
      acc[article.id] = Math.floor(Math.random() * 1000); // Random initial vote count
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

  return (
    <MainLayout>
      <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto px-2 sm:px-4 pt-2 flex flex-col lg:flex-row gap-4">
          {/* Main Content - Feed */}
          <div className="lg:w-2/3 space-y-3">
            {/* Feed Header */}
            <div className="bg-card rounded-md p-3 border border-border/60 flex items-center gap-2">
              <Button variant="outline" className="text-sm font-medium">Best</Button>
              <Button variant="ghost" className="text-sm font-medium">Hot</Button>
              <Button variant="ghost" className="text-sm font-medium">New</Button>
              <Button variant="ghost" className="text-sm font-medium">Top</Button>
              <Button variant="ghost" className="ml-auto">
                <MoreHorizontal size={18} />
              </Button>
            </div>
            
            {/* Articles Feed */}
            {sortedArticles.map((article, index) => (
              <div 
                key={article.id} 
                className="bg-card rounded-md border border-border/60 hover:border-border transition-all duration-200"
              >
                {/* Post Layout */}
                <div className="flex">
                  {/* Voting */}
                  <div className="w-12 bg-secondary/30 flex flex-col items-center py-2 rounded-l-md">
                    <button 
                      onClick={() => handleVote(article.id, true)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ArrowUp size={20} />
                    </button>
                    <span className="text-sm font-medium my-1">{votes[article.id] || 0}</span>
                    <button 
                      onClick={() => handleVote(article.id, false)}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ArrowDown size={20} />
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
                    <h3 className="text-lg font-medium mb-2">{article.title}</h3>
                    
                    {/* Post Content - Truncated Text */}
                    <div className="text-sm line-clamp-3 mb-2">{article.excerpt}</div>
                    
                    {/* Post Image - If Available */}
                    {article.image && (
                      <div 
                        className="w-full h-56 sm:h-80 bg-cover bg-center rounded-md mb-2"
                        style={{ backgroundImage: `url(${article.image})` }}
                      />
                    )}
                    
                    {/* Post Actions */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <button className="flex items-center gap-1 hover:bg-secondary/50 rounded-md px-2 py-1">
                        <MessageCircle size={16} />
                        <span>{Math.floor(Math.random() * 100)} Comments</span>
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
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-4">
              {/* Community Card */}
              <div className="bg-card rounded-md border border-border/60 overflow-hidden">
                <div className="h-12 bg-primary"></div>
                <div className="p-3">
                  <h3 className="font-medium mb-3">Arthive Community</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your place for thought-provoking articles and discussions on various topics.
                  </p>
                  <Button className="w-full mb-2">Create Post</Button>
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
              
              {/* Popular Articles Card */}
              <div className="bg-card rounded-md border border-border/60 overflow-hidden">
                <div className="p-3 border-b border-border/60">
                  <h3 className="font-medium">Popular Articles</h3>
                </div>
                <div className="divide-y divide-border/60">
                  {sortedArticles.slice(0, 5).map((article, index) => (
                    <div key={article.id} className="p-3 hover:bg-secondary/30 transition-colors">
                      <div className="flex items-center text-xs text-muted-foreground mb-1">
                        <span>{index + 1}</span>
                        <span className="mx-1">•</span>
                        <span className="font-medium text-foreground">r/{article.category.name}</span>
                      </div>
                      <p className="text-sm font-medium line-clamp-2">{article.title}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="bg-card rounded-md border border-border/60 p-3">
                <h3 className="font-medium mb-2">Stay Updated</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Subscribe to our newsletter to get the latest articles.
                </p>
                <form className="flex flex-col space-y-2">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="px-4 py-2 rounded-md border border-border/60 bg-background text-sm"
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
