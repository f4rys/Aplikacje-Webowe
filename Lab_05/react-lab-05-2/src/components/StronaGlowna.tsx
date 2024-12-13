import { Link } from 'react-router-dom';
import Licznik from './Licznik';

const StronaGlowna = () => {
  return (
    <div>
      <Licznik />
      <h1>Welcome to the Blog</h1>
      <Link to="/blog">Go to Blog</Link>
    </div>
  );
};

export default StronaGlowna;