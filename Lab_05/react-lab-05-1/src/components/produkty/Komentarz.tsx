import React, { useState } from 'react';

interface User {
  id: number;
  username: string;
  fullName: string;
}

interface KomentarzProps {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
}

const Komentarz: React.FC<KomentarzProps> = ({ id, body, postId, likes, user }) => {
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => setLikeCount(likeCount + 1);
  const handleDislike = () => setLikeCount(likeCount - 1);

  return (
    <div className="komentarz">
      <div className="komentarz-header">
        <h3>{user.fullName} (@{user.username})</h3>
      </div>
      <div className="komentarz-body">
        <p>{body}</p>
      </div>
      <div className="komentarz-footer">
        <button onClick={handleLike}>👍</button>
        <button onClick={handleDislike}>👎</button>
        <span>Likes: {likeCount}</span>
      </div>
    </div>
  );
};

export default Komentarz;