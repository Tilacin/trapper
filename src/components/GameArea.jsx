import { useState, useEffect } from 'react'
import Countdown from './Countdown'
import Config from './Config'
import ProgressPage from './ProgressPage'

const GameArea = () => {
  const [gameOver, setGameOver] = useState(true)
  const [horse, setHorse] = useState([])
  const [score, setScore] = useState(0)
  const [horseTimeout, setHorseTimeout] = useState(null)
  const [columns, setColumns] = useState(3)
  const [rows, setRows] = useState(3)
  const [level, setLevel] = useState(1);
  const [countdown, setCountdown] = useState(20);

  const handleLevelUp = () => {
    setLevel(level + 1); // Увеличение уровня
  };

  
  const generateHorse = () => {
    const newHorses = [];
    for (let i = 0; i < columns * rows; i++) {
      const isCrab = Math.random() < 0.3;
      newHorses.push({ id: i, active: false, isCrab }); // Возвращаем сгенерированных лошадей напрямую
    }
    return newHorses;
  }

  const activateHorse = () => {
    const horseIndex = Math.floor(Math.random() * columns * rows);
    setHorse((prevhorse) => {
      const updatedhorse = [...prevhorse];
      updatedhorse[horseIndex].hit = false;
      updatedhorse[horseIndex].active = true;
      return updatedhorse;
    });

    setHorseTimeout(
      setTimeout(() => {
        deactivateHorse(horseIndex);
      }, Math.floor(Math.random() * 600 + 1200))//время показа конька
    );
  }
  const deactivateHorse = (index) => {
    setHorse((prevhorse) => {
      const updatedhorse = [...prevhorse]
      updatedhorse[index].active = false
      return updatedhorse
    })

    setHorseTimeout(
      setTimeout(() => {
        activateHorse()
      }, Math.floor(Math.random() * 600 + 400))
    )
  }

  const startGame = () => {
    setScore(0)
    setHorse(generateHorse(columns, rows));
    setGameOver(false)
    generateHorse()
    setHorseTimeout(
      setTimeout(() => {
        activateHorse()
      }, Math.floor(Math.random() * 600 + 400))
    )
  }

  const handleHorseClick = (index) => {
    setHorse((prevHorse) => {
      return prevHorse.map((horse, i) => {
        if (i === index) {
          return {
            ...horse,
            hit: true,
            active: false
          };
        }
        return horse;
      });
    });
    setScore((prevScore) => prevScore + 1);
  }

  const endGame = () => {
    setGameOver(true);
    setHorse([]); // Обнуляем массив лошадей
    clearTimeout(horseTimeout); // Очищаем таймаут
    setHorseTimeout(null); // Установка horseTimeout в null для его сброса
  }

  useEffect(() => {
    return () => {
      clearTimeout(horseTimeout)
    }
  }, [horseTimeout])



  if (gameOver) {

    return (
      <>
        <h2 className='score-start'>Очки: {score}</h2>
        <span className='size-start'>размер: {columns}  X {rows}</span>
        <Config
          columns={parseInt(columns, 10)}
          setColumns={(value) => {
            setColumns(value);
            setHorse([]); // Добавьте это, чтобы перегенерировать набор кротов
          }}
          rows={parseInt(rows, 10)}
          setRows={(value) => {
            setRows(value);
            setHorse([]); // Добавьте это, чтобы перегенерировать набор кротов
          }}
        />
        <button className="glow-on-hover" onClick={startGame}>Играть</button>
      </>
    )
  }
  if (countdown === 0 && !gameOver) {
    return <ProgressPage />;
  } else if (countdown !== 0 && !gameOver) {
    return (

      <>
        <div className='score-container'>
          <h2 className='score-text'>Score: {score}</h2>
          <Countdown updateCountdown={setCountdown} initialCountdown={countdown} />
          <div className='setting'>
            <img src='/play.png' alt='play' width={35} height={35} />
            <img src='/house.png' alt='house' width={35} height={35} onClick={endGame} />
          </div>

        </div>
        <span className="countdown">
          УРОВЕНЬ: 1
        </span>

        <div
          className='horse-container'
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >

          {horse.map((individualHorse, index) => (
            individualHorse && (
              <div key={individualHorse.id} className={`horse ${individualHorse.active ? 'active' : ''}`}>
                <div onClick={() => handleHorseClick(index)}>
                  {individualHorse.hit ? (
                    <img src='/flash.png' alt='flash' />
                  ) : (individualHorse.isCrab ? (
                    <img src='/crab.png' alt='crab' width={80} height={80} onClick={endGame} />
                  ) : (
                    <img className="img-seahorse" src='/seahorse.png' alt='seahorse' draggable='false' />
                  ))}
                </div>
              </div>
            )
          ))}

        </div>
      </>
    )
  }
}


export default GameArea

