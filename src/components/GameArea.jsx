import { useState, useEffect } from 'react'
import Countdown from './Countdown'
import Config from './Config'
import ProgressPage from './ProgressPage'
import PropTypes from 'prop-types';
import IMAGES from '../images/images'


const translations = {
  ru: {
    rating: 'Счёт',
    size: 'Размер',
    selectSize: 'Выберите размер поля',
    changeBackground: 'Изменить фон',
    plays: "Играть",
    levels: 'Уровень',
    nextLevel: 'Следующий уровень',
    endGames: 'Завершить игру',

  },
  en: {
    rating: 'Score',
    size: 'Size',
    selectSize: 'Select the field size',
    changeBackground: 'Change the background',
    plays: "Play",
    levels: 'Level',
    nextLevel: 'Next level',
    endGames: 'End game',

  },
};

const GameArea = ({ handleNextImage }) => {
  const [gameOver, setGameOver] = useState(true)
  const [horse, setHorse] = useState([])
  const [score, setScore] = useState(0)
  const [horseTimeout, setHorseTimeout] = useState(null)
  const [columns, setColumns] = useState(3)
  const [rows, setRows] = useState(3)
  const [level, setLevel] = useState(1);
  const [countdown, setCountdown] = useState(100);
  const [timeNumber, setTimeNumber] = useState(1400)
  const [language, setLanguage] = useState('ru');

  //музыка
  const correctSound = new Audio('sounds/correct.mp3');
  const loseSound = new Audio('sounds/lose.mp3');
  const musicGameOver = new Audio('sounds/gameOver.mp3');
  const musicGameStart = new Audio('sounds/start.mp3');
  const winnerSound = new Audio('sounds/winnner.mp3');
  const musicBell = new Audio('sounds/bell.mp3');

  const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  const playMusic = () => {
    playNext()
    setIsMusicPlaying(true);

  };

  const stopMusic = () => {
    playNext()
    setIsMusicPlaying(false);

  };

  const playCorrect = () => {
    isMusicPlaying ? correctSound.play() : correctSound.pause()

  };
  const playLose = () => {
    isMusicPlaying ? loseSound.play() : loseSound.pause()
  };
  const playGameOver = () => {
    isMusicPlaying ? musicGameOver.play() : musicGameOver.pause()
  }
  const playGameStart = () => {
    isMusicPlaying ? musicGameStart.play() : musicGameStart.pause()
  }
  const playNext = () => {
    isMusicPlaying ? musicBell.play() : musicBell.pause()
  }
  const playWinner = () => {
    isMusicPlaying ? winnerSound.play() : winnerSound.pause()
  }


  //язык
  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    playNext()
  };

  const { rating, size, selectSize, changeBackground, plays, levels, nextLevel, endGames
  } = translations[language];

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
    playGameStart()
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

    playGameOver()
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
    playLose()
    setGameOver(true)
    setCountdown(100)
    setHorseTimeout(null)
    setScore(0);
  }

  if (gameOver) {

    return (
      <div className='start-container'>
        <h2 className='score-start'></h2>
        <div className='language'>
          <button onClick={() => handleLanguageChange('en')} className='language-button'>
            <img src={IMAGES.en} alt='flag en' width={50} height={25} />
            Eng</button>
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
          <button onClick={() => handleLanguageChange('ru')} className='language-button'>
            <img src={IMAGES.ru} alt='flag ru' width={50} height={25} />
            Рус</button>
        </div>

        <span className='size-start'>{size}: {columns}  X {rows}</span>
        <Config
          columns={columns}
          setColumns={setColumns}
          rows={rows}
          setRows={setRows}
          handleNextImage={handleNextImage}
          selectSize={selectSize}
          changeBackground={changeBackground}
          playNext={playNext}
        />
        <button className="glow-on-hover" onClick={startGame}>{plays}</button>
      </div>
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
        levels={levels}
        rating={rating}
        nextLevel={nextLevel}
        endGames={endGames}
        playWinner={playWinner}
        playGameStart={playGameStart}
        playMusic={playMusic}
        stopMusic={stopMusic}
        isMusicPlaying={isMusicPlaying}
      />)
  } else if (countdown !== 0 && !gameOver) {
    return (
      <>
        <div className='score-container'>
          <h2 className='score-text'>{rating}: {score}</h2>
          <Countdown updateCountdown={setCountdown} initialCountdown={countdown} />
          <div className='setting'>
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
            <img src={IMAGES.house} alt='house' width={35} height={35} onClick={endGame} className='setting-img' />
          </div>
        </div>
        <span className="countdown">
          {levels}:{level}
        </span>
        <div
          className='horse-container'
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gridAutoRows: 'minmax(50px, auto)'
          }}
        >
          {horse.map((individualHorse, index) => (
            individualHorse && (
              <div key={individualHorse.id} className={`horse ${individualHorse.active ? 'active' : ''}`}>
                <div onClick={() => handleHorseClick(index)} className='image-wrapper'>
                  {individualHorse.hit ? (
                    <img src={IMAGES.flash} alt='flash' />
                  ) : (individualHorse.isCrab ? (
                    <img src={IMAGES.crab} alt='crab' className='crab' onClick={handleCrabClick} />
                  ) : (
                    <img className="img-seahorse" src={IMAGES.seahorse} alt='seahorse' draggable='false' onClick={playCorrect} />
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

GameArea.propTypes = {
  handleNextImage: PropTypes.func
}

export default GameArea

