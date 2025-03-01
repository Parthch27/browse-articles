
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  category: Category;
  tags: string[];
  image: string;
  publishedAt: string;
  readTime: number;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}
