

import PropTypes from 'prop-types';

const ProgressPage = ({ score, level, handleGameEnd, handleNextLevel }) => {
  const handleContinue = () => {
    // Логика продолжения игры (например, переход к следующему уровню)
    handleNextLevel(); // Функция для перехода на следующий уровень
  };

  const handleEnd = () => {
    // Логика завершения игры (например, отображение результатов и решение о завершении или продолжении)
    handleGameEnd(); // Функция для завершения игры
  };
  return (
    <div className="progress">
      <div className="progress-container">
        <div className="styled stroked">
          <h2>УРОВЕНЬ: {level}</h2>
          <h2>ОЧКИ: {score}</h2>
        </div>
        <div className="progress-button">
          <button className="glow-on-hover" onClick={handleContinue}>Следующий уровень</button>
          <button className="glow-on-hover" onClick={handleEnd}>Завершить игру</button>
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
  handleGameEnd: PropTypes.func,
  handleNextLevel: PropTypes.func
};

export default ProgressPage;