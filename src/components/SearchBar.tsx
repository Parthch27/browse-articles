
import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { articles } from "@/data/articles";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar = ({ onClose }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof articles>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.category.name.toLowerCase().includes(query.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleResultClick = (id: string) => {
    navigate(`/article/${id}`);
    if (onClose) onClose();
    setQuery("");
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Search size={18} className="absolute left-3 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search articles, topics, or keywords..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 py-6 text-base rounded-full border border-border/60 focus-visible:ring-1 bg-secondary/50"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-2 rounded-full hover:bg-secondary"
          >
            <X size={16} />
          </Button>
        )}
      </div>

      {results.length > 0 && (
        <div className="mt-2 bg-card rounded-lg overflow-hidden shadow-lg border border-border/60 animate-fade-in max-h-[400px] overflow-y-auto">
          <div className="p-2">
            {results.map((article) => (
              <div
                key={article.id}
                onClick={() => handleResultClick(article.id)}
                className="p-3 rounded-md hover:bg-secondary/70 cursor-pointer transition-colors"
              >
                <div className="flex items-start space-x-2">
                  <div
                    className="w-12 h-12 rounded bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${article.image})` }}
                  />
                  <div className="flex-1">
                    <h4 className="font-medium line-clamp-1">{article.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {article.category.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(article.publishedAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
