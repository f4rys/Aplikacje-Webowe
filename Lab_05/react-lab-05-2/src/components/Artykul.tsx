import { useState, useEffect } from 'react';

interface Article {
  id: string;
  title: string;
  content: string;
}

import { useParams } from 'react-router-dom';

interface MatchParams extends Record<string, string | undefined> {
  id: string;
}

const Artykul = () => {
  const { id } = useParams<MatchParams>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const savedArticles = localStorage.getItem('articles');
    if (savedArticles) {
      const articles: Article[] = JSON.parse(savedArticles);
      const foundArticle = articles.find(a => a.id === id);
      setArticle(foundArticle || null);
    }
  }, [id]);

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div>
      <h4>{article.id}</h4>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
};

export default Artykul;