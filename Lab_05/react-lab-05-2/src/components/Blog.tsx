import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  interface Article {
    id: number;
    title: string;
  }

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const savedArticles = localStorage.getItem('articles');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    }
  }, []);

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <Link to={`/article/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;