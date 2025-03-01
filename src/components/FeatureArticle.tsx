
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Article } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureArticleProps {
  article: Article;
  className?: string;
}

const FeatureArticle = ({ article, className }: FeatureArticleProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, []);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section 
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "opacity-0",
        isVisible && "opacity-100 transition-opacity duration-1000 ease-out",
        className
      )}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transform scale-[1.01] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        style={{ 
          backgroundImage: `url(${article.image})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
      </div>
      
      <div className="relative px-6 py-16 md:p-16 lg:p-20 flex flex-col h-full">
        <div className="mt-auto max-w-3xl">
          <div className="flex items-center text-sm mb-4">
            <span className="bg-primary/20 text-white backdrop-blur-sm px-3 py-1 rounded-full">
              {article.category.name}
            </span>
            <span className="mx-3 text-white/70">·</span>
            <span className="text-white/70">{formattedDate}</span>
            <span className="mx-3 text-white/70">·</span>
            <span className="text-white/70">{article.readTime} min read</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
            {article.title}
          </h1>
          
          <p className="mt-4 text-white/80 text-lg max-w-2xl">
            {article.excerpt}
          </p>
          
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={article.author.avatar} 
                alt={article.author.name}
                className="w-10 h-10 rounded-full border-2 border-white/20 mr-3"
              />
              <span className="text-white font-medium">{article.author.name}</span>
            </div>
            
            <Link to={`/article/${article.id}`}>
              <Button 
                variant="outline" 
                className="group bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white"
              >
                Read Article 
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureArticle;
