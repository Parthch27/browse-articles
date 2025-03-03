
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Article } from "@/types";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact";
  className?: string;
  index?: number;
}

const ArticleCard = ({ 
  article, 
  variant = "default", 
  className,
  index = 0
}: ArticleCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100 + index * 100); // Stagger animation
    
    return () => clearTimeout(timeout);
  }, [index]);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (variant === "compact") {
    return (
      <Link 
        to={`/article/${article.id}`}
        className={cn(
          "group block",
          "opacity-0 translate-y-4",
          isVisible && "opacity-100 translate-y-0 transition-all duration-700 ease-out",
          className
        )}
      >
        <div className="flex gap-4 items-start">
          <div>
            <h3 className="font-medium group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {formattedDate} · {article.readTime} min read
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={`/article/${article.id}`} 
      className={cn(
        "group block overflow-hidden",
        "opacity-0 translate-y-4",
        isVisible && "opacity-100 translate-y-0 transition-all duration-700 ease-out",
        className
      )}
    >
      <div className="mt-4">
        <div className="flex items-center text-xs mb-2">
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {article.category.name}
          </span>
          <span className="mx-2 text-muted-foreground">·</span>
          <span className="text-muted-foreground">{formattedDate}</span>
          <span className="mx-2 text-muted-foreground">·</span>
          <span className="text-muted-foreground">{article.readTime} min read</span>
        </div>
        <h3 className="text-xl font-medium group-hover:text-primary transition-colors duration-300">
          {article.title}
        </h3>
        <p className="mt-2 text-muted-foreground line-clamp-2">{article.excerpt}</p>
        <div className="mt-4 flex items-center">
          <span className="text-sm font-medium">{article.author.name}</span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
