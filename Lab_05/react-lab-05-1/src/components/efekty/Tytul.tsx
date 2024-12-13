import React, { useState, useEffect } from 'react';

const Tytul: React.FC = () => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    document.title = title;
  }, [title]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <input type="text" value={title} onChange={handleChange} placeholder="Enter page title" />
    </div>
  );
};

export default Tytul;