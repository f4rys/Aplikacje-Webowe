import React, { useState } from 'react';
import Przycisk from './Przycisk';

const NowyLicznik: React.FC = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div className='licznik'>
      <div>Licznik: {count}</div>
      <Przycisk onClick={incrementCount} />
    </div>
  );
};

export default NowyLicznik;