import { useState, useEffect } from 'react'
import Countdown from './Countdown'
import Config from './Config'

const GameArea = () => {
  const [gameOver, setGameOver] = useState(true)
  const [horse, setHorse] = useState([])
  const [score, setScore] = useState(0)
  const [horseTimeout, setHorseTimeout] = useState(null)
  const [columns, setColumns] = useState(3)
  const [rows, setRows] = useState(3)


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
        <h2>Score: {score}</h2>
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
        <button onClick={startGame}>Start</button>
      </>
    )
  }

  return (

    <>
      <div className='score-container'>
        <h2>Score: {score}</h2>
        <Countdown endGame={endGame} gameOver={gameOver} />
      </div>

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
          <img src='/crab.png' alt='crab' />
        ) : (
          <img src='/seahorse.png' alt='seahorse' draggable='false' />
        ))}
      </div>
    </div>
  )
))}

      </div>
    </>
  )
}


export default GameArea

