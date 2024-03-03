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
  const [countdown, setCountdown] = useState(100);
  const [timeNumber, setTimeNumber] = useState(1400)
  
  const generateHorse = () => {
    const newHorses = [];
    for (let i = 0; i < columns * rows; i++) {
      const isCrab = Math.random() < 0.3;
      newHorses.push({ id: i, active: false, isCrab }); // Возвращаем сгенерированных лошадей напрямую
    }
    setHorse(newHorses)
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
      }, Math.floor(Math.random() * 600 + timeNumber))//время показа конька
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
    setHorse([]);
    setGameOver(false)
    generateHorse()
    setHorseTimeout(
      setTimeout(() => {
        activateHorse()
      }, Math.floor(Math.random() * 600 + 400))
    )
    setTimeNumber(1400)
    setLevel(1)
  }

  const handleHorseClick = (index) => {
    setHorse((prevHorse) => {
      const updatedhorse = [...prevHorse]
      updatedhorse[index].hit = true
      updatedhorse[index].active = false
      return updatedhorse
    })
    setScore(score + 5)
  }

  const endGame = () => {
    setGameOver(true)
    setHorseTimeout(null)
    setHorse([])
    setCountdown(100)
  }

  useEffect(() => {
    return () => {
      clearTimeout(horseTimeout)
    }
  }, [horseTimeout])

  const handleCrabClick = () => {
    setGameOver(true)
    setCountdown(100)
    setHorseTimeout(null)
  }

   

  if (gameOver) {

    return (
      <>
        <h2 className='score-start'>Очки: {score}</h2>
        <span className='size-start'>размер: {columns}  X {rows}</span>
        <Config
          columns={columns}
          setColumns={setColumns}
          rows={rows}
          setRows={setRows}
        />
        <button className="glow-on-hover" onClick={startGame}>Играть</button>
      </>
    )
  }
  if (countdown === 0 && !gameOver) {
    return (
      <ProgressPage
        setCountdown={setCountdown}
        score={score}
        timeNumber={timeNumber}
        setTimeNumber={setTimeNumber}
        level={level}
        setLevel={setLevel}
        endGame={endGame}
        setHorseTimeout={setHorseTimeout}
        generateHorse={generateHorse}
        activateHorse={activateHorse}
      />)
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
          УРОВЕНЬ:{level}
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
                    <img src='/crab.png' alt='crab' width={80} height={80} onClick={handleCrabClick} />
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

