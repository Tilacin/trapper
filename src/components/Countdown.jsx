import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Countdown = ({ updateCountdown, initialCountdown }) => {
  useEffect(() => {
    let interval;

    if (initialCountdown > 0) {
      interval = setInterval(() => {
        updateCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [initialCountdown, updateCountdown]);

  return (
    <div className='countdown'>
      <span>⏳</span>
      {initialCountdown}
    </div>
  );
};

Countdown.propTypes = {
  updateCountdown: PropTypes.func,
  initialCountdown: PropTypes.number
};

export default Countdown;