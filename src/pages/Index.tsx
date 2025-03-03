
import { useState } from "react";
import { articles } from "@/data/articles";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ArticleCard from "@/components/ArticleCard";
import { Badge } from "@/components/ui/badge";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Filter articles based on search query and selected filters
  const filteredArticles = articles.filter((article) => {
    // Search filter
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesFilter = selectedFilters.length === 0 || 
      selectedFilters.includes(article.category.slug);
    
    return matchesSearch && matchesFilter;
  });

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold text-center">Browse Articles</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Discover the latest articles, insights, and stories across various topics
          </p>
          
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2 justify-center">
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
                variant={selectedFilters.includes(category) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleFilter(category)}
              >
                {categoryObj.name}
              </Badge>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFilters([]);
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
