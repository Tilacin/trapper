
import { Route, Routes } from 'react-router-dom';
import GameArea from './components/GameArea';
import ProgressPage from './components/ProgressPage';
import { useState } from 'react';



const AppWrapper = () => {
  const [imageIndex, setImageIndex] = useState(1);

  const handleNextImage = () => {
    if (imageIndex < 9) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(1); // Если достигнут последний индекс, вернуться к первому
    }
  };

  const imageURL = `url(../area${imageIndex}.png)`; // Формирование URL изображения

  return (
    <div
      style={{
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: imageURL,
        backgroundPosition: '',
        backgroundSize: 'cover',
        transition: 'background 1s ease',
      }}
    >
      <Routes>
        <Route path="/" element={<GameArea handleNextImage={handleNextImage}/>} />
        <Route path="/progress" element={<ProgressPage />} />
      </Routes>
    </div>
  );
};

export default AppWrapper;
