
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { articles, categories } from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";
import MainLayout from "@/layouts/MainLayout";
import NotFound from "./NotFound";

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isLoaded, setIsLoaded] = useState(false);
  
  const category = categories.find((c) => c.slug === slug);
  const categoryArticles = articles.filter((a) => a.category.slug === slug);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!category) {
    return <NotFound />;
  }

  return (
    <MainLayout>
      <div className={`container mx-auto px-4 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-xl text-muted-foreground">
              {category.description}
            </p>
          )}
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {categoryArticles.map((article, index) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                index={index}
              />
            ))}
          </div>
          
          {categoryArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                No articles found in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Category;
