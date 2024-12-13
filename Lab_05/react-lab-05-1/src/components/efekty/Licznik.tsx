import React, { useState, useEffect } from 'react';

const Licznik: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Hello world');
  }, []);

  useEffect(() => {
    console.log(`Licznik zwiększył się do ${count}`);
  }, [count]);

  return (
    <div className='licznik'>
      <div>Licznik: {count}</div>
      <button onClick={() => setCount(count + 1)}>Dodaj</button>
    </div>
  );
};

export default Licznik;