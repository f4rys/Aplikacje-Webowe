import React, { useState, useEffect } from 'react';

const Odliczanie: React.FC = () => {
  const [count, setCount] = useState(15.0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning && count > 0) {
      interval = setInterval(() => {
        setCount((prevCount) => Math.max(prevCount - 0.1, 0));
      }, 100);
    } else if (count === 0) {
      setIsRunning(false);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, count]);

  const handleButtonClick = () => {
    if (count > 0) {
      setIsRunning(!isRunning);
    }
  };

  return (
    <div>
      <div>Odliczanie: {count.toFixed(1)} sek</div>
      <button onClick={handleButtonClick} disabled={count === 0}>
        {count === 0 ? 'Odliczanie zakończone' : isRunning ? 'STOP' : 'START'}
      </button>
    </div>
  );
};

export default Odliczanie;