
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { articles } from "@/data/articles";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/components/ArticleCard";
import MainLayout from "@/layouts/MainLayout";
import NotFound from "./NotFound";

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const [isContentVisible, setIsContentVisible] = useState(false);
  const article = articles.find((a) => a.id === id);

  // Get related articles
  const relatedArticles = articles
    .filter((a) => a.id !== id && a.category.id === article?.category.id)
    .slice(0, 3);

  useEffect(() => {
    if (article) {
      const timeout = setTimeout(() => {
        setIsContentVisible(true);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [article]);

  if (!article) {
    return <NotFound />;
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <MainLayout>
      <div 
        className={`container mx-auto px-4 transition-opacity duration-700 ${
          isContentVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-3xl mx-auto mb-10">
          <Link to="/">
            <Button 
              variant="ghost" 
              className="mb-6 -ml-3 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to articles
            </Button>
          </Link>

          <div className="flex items-center text-sm mb-4">
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
              {article.category.name}
            </span>
            <span className="mx-3 text-muted-foreground">·</span>
            <span className="text-muted-foreground">{formattedDate}</span>
            <span className="mx-3 text-muted-foreground">·</span>
            <span className="text-muted-foreground">{article.readTime} min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            {article.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            {article.excerpt}
          </p>

          <div className="flex items-center mb-8 pb-8 border-b border-border/40">
            <div>
              <div className="font-medium">{article.author.name}</div>
              <div className="text-sm text-muted-foreground">
                {article.author.bio}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div 
            className="max-w-3xl mx-auto article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="max-w-3xl mx-auto mt-10 pt-10 border-t border-border/40">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 bg-secondary rounded-full text-sm text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {relatedArticles.length > 0 && (
          <div className="max-w-6xl mx-auto mt-20">
            <h2 className="text-2xl font-semibold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((article, index) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Article;
