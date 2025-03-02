
import { useState, useEffect } from "react";
import { articles } from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";
import FeatureArticle from "@/components/FeatureArticle";
import MainLayout from "@/layouts/MainLayout";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Sort articles by published date (newest first)
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  
  // Get featured article (most recent)
  const featuredArticle = sortedArticles[0];
  
  // Get remaining articles
  const remainingArticles = sortedArticles.slice(1);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <MainLayout>
      <div className={`container mx-auto px-4 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {/* Featured Article */}
        <FeatureArticle 
          article={featuredArticle} 
          className="h-[600px] mb-16"
        />
        
        {/* Latest Articles - Horizontal Layout */}
        <div className="mt-16 mb-16">
          <h2 className="text-2xl font-semibold mb-8">Latest Articles</h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6 min-w-max">
              {remainingArticles.slice(0, 6).map((article, index) => (
                <div key={article.id} className="w-[300px] flex-shrink-0">
                  <ArticleCard 
                    article={article} 
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16">
          {/* Main Articles - Removed as now horizontal above */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-semibold mb-8">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {remainingArticles.slice(6, 10).map((article, index) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  index={index + 6}
                />
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Popular Articles</h2>
              <div className="space-y-6">
                {remainingArticles.slice(10, 13).map((article, index) => (
                  <ArticleCard 
                    key={article.id} 
                    article={article} 
                    variant="compact" 
                    index={index + 10}
                  />
                ))}
              </div>
              
              <div className="mt-12 p-6 bg-secondary/50 rounded-lg border border-border/60">
                <h3 className="font-medium mb-2">Stay Updated</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Subscribe to our newsletter to get the latest articles directly to your inbox.
                </p>
                <form className="flex flex-col space-y-2">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="px-4 py-2 rounded-md border border-border/60 bg-background"
                  />
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Subscribe
                  </button>
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
