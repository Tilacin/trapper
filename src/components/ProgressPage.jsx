import PropTypes from 'prop-types';

const ProgressPage = ({ score, level, setCountdown, setLevel, endGame, timeNumber, setTimeNumber, setHorseTimeout, generateHorse, activateHorse }) => {


  const handleLevelUp = () => {
    setLevel(level + 1); // Увеличение уровня
    if (timeNumber > 400) {
      setTimeNumber(timeNumber - 100)//уменьшаю время показа
    }

  };

  const handleContinue = () => {
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
        <div className="styled stroked">
          <h2>УРОВЕНЬ  {level}</h2>
          <h2>ОЧКИ: {score}</h2>
        </div>
        <div className="progress-button">
          <button className="glow-on-hover" onClick={handleContinue}>Следующий уровень</button>
          <button className="glow-on-hover" onClick={endGame}>Завершить игру</button>
          <span className="progress-span">За просмотр рекламы:</span>
          <button className="glow-on-hover">Бонусный уровень</button>
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
  activateHorse: PropTypes.func
};

export default ProgressPage;