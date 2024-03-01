import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

const Countdown = ({ endGame, gameOver }) => {
  const [countdown, setCountdown] = useState(null)

  useEffect(() => {
    setCountdown(60)
  }, [])

  useEffect(() => {
    let interval;
    if (countdown && !gameOver) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
  
    if (countdown === 0) {
      endGame();
    }
  
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [countdown, gameOver]);

  return (
    <div className='countdown'>
      
      <span>⏳</span>
      {countdown}
    </div>
  )
}

Countdown.propTypes = {
  endGame: PropTypes.func,
  gameOver: PropTypes.bool
};

export default Countdown