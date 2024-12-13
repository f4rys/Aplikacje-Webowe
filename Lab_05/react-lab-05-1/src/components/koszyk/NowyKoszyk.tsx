import React from 'react';
import Produkt from './Produkt';

const NowyKoszyk: React.FC = () => {
  const produkty = ["Jabłko", "Gruszka", "Banana", "Pomarańcza", "Winogrona"];

  return (
    <div className="koszyk">
      {produkty.map((nazwa, index) => (
        <Produkt key={index} nazwa={nazwa} />
      ))}
    </div>
  );
};

export default NowyKoszyk;