import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DodajArtykul = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  interface Article {
    id: string;
    title: string;
    content: string;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newArticle: Article = { id: Date.now().toString(), title, content };
    const savedArticles = localStorage.getItem('articles');
    const articles: Article[] = savedArticles ? JSON.parse(savedArticles) : [];
    articles.push(newArticle);
    localStorage.setItem('articles', JSON.stringify(articles));
    navigate('/blog');
  };

  return (
    <div>
      <h1>Add Article</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default DodajArtykul;