import React, { useState } from 'react';

const Formularz: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="formularz">
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <div>{inputValue}</div>
    </div>
  );
};

export default Formularz;