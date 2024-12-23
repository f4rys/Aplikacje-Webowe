import React from 'react';
import Produkt from './Produkt';

const Koszyk: React.FC = () => {
  return (
    <div className="koszyk">
      <Produkt nazwa="Jabłko" />
      <Produkt nazwa="Gruszka" />
      <Produkt nazwa="Banana" />
      <Produkt nazwa="Pomarańcza" />
      <Produkt nazwa="Winogrona" />
    </div>
  );
};

export default Koszyk;