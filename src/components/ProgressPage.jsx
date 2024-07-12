import PropTypes from 'prop-types';
import IMAGES from '../images/images'
import { useEffect } from 'react';

const ProgressPage = ({ score, level, setCountdown, setLevel, endGame, timeNumber, setTimeNumber, setHorseTimeout, generateHorse, activateHorse, levels, rating, nextLevel, endGames, playWinner, playGameStart, playMusic, stopMusic, isMusicPlaying }) => {

  useEffect(() => {
    playWinner();
  }, []);

  const handleLevelUp = () => {
    setLevel(level + 1); // Увеличение уровня
    if (timeNumber > 400) {
      setTimeNumber(timeNumber - 100)//уменьшаю время показа
    }
  };

  const handleContinue = () => {
    playGameStart()
    handleLevelUp()
    setCountdown(100)
    generateHorse()
    setHorseTimeout(
      setTimeout(() => {
        activateHorse()
      }, Math.floor(Math.random() * 600 + 400))
    )
  };

  return (
    <div className="progress">

      <div className="progress-container">
        <div className='music-controls'>
          <button
            className='setting-button'
            onClick={playMusic}
            style={{ display: isMusicPlaying ? 'none' : 'block' }}
          >
            <img src={IMAGES.stop} alt='play' width={35} height={35} />
          </button>
          <button
            className='setting-button'
            onClick={stopMusic}
            style={{ display: isMusicPlaying ? 'block' : 'none' }}
          >
            <img src={IMAGES.play} alt='play' width={35} height={35} />
          </button>
        </div>
        <div className="styled stroked">
          <h2>{levels}  {level}</h2>
          <h2>{rating}: {score}</h2>

        </div>

        <div className="progress-button">
          <div className='block-image'>
            <img src={IMAGES.seahorse} alt='cat' className='cat' />
          </div>
          <span className="progress-span"></span>
          <button className="glow-on-hover" onClick={handleContinue}>{nextLevel}</button>
          <button className="glow-on-hover" onClick={endGame}>{endGames}</button>
        </div>
      </div>
    </div>
  );
};

ProgressPage.propTypes = {
  score: PropTypes.number,
  level: PropTypes.number,
  setCountdown: PropTypes.func,
  timeNumber: PropTypes.number,
  setTimeNumber: PropTypes.func,
  setLevel: PropTypes.func,
  endGame: PropTypes.func,
  setHorseTimeout: PropTypes.func,
  generateHorse: PropTypes.func,
  activateHorse: PropTypes.func,
  endGames: PropTypes.string,
  nextLevel: PropTypes.string,
  rating: PropTypes.string,
  levels: PropTypes.string,
  playGameStart: PropTypes.string,
  playWinner: PropTypes.string,
  playMusic: PropTypes.func,
  stopMusic: PropTypes.func,
  isMusicPlaying: PropTypes.bool
};

export default ProgressPage;