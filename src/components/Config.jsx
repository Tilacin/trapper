import PropTypes from 'prop-types';

const Config = ({ setColumns, setRows, handleNextImage, selectSize, changeBackground, playNext }) => {
  const handleSetColumns = (value) => {
    const columns = parseInt(value.split('*')[0], 10);
    const rows = parseInt(value.split('*')[1], 10);
    setColumns(columns);
    setRows(rows);
    playNext()
  };

  function nextBackground() {
    handleNextImage()
    playNext()
  }

  return (

    <div className='config'>
      <label >{selectSize}: </label>
      <div className='config-container'>
        <button className='config-button' onClick={() => handleSetColumns('2*2')}>
          2x2
        </button>
        <button className='config-button' onClick={() => handleSetColumns('2*3')}>
          2x3
        </button>
        <button className='config-button' onClick={() => handleSetColumns('3*3')}>
          3x3
        </button>

        <button className=' button-desctop ' onClick={() => handleSetColumns('3*4')}>
          3x4
        </button>
        <button className=' button-desctop' onClick={() => handleSetColumns('4*4')}>
          4x4
        </button>
        <button className='button-desctop' onClick={() => handleSetColumns('4*5')}>
          4x5
        </button>
        <button className='button-desctop' onClick={() => handleSetColumns('5*5')}>
          5x5
        </button>
        <button className='button-desctop' onClick={() => handleSetColumns('5*6')}>
          5x6
        </button>
        <button className='button-desctop' onClick={() => handleSetColumns('6*6')}>
          6x6
        </button>
      </div>
      <span className='next-image' onClick={nextBackground}> {changeBackground} </span>
    </div>

  );
};

Config.propTypes = {
  handleImageChange: PropTypes.func,
  columns: PropTypes.number,
  setColumns: PropTypes.func,
  rows: PropTypes.number,
  setRows: PropTypes.func,
  handleNextImage: PropTypes.func,
  selectSize: PropTypes.string,
  changeBackground: PropTypes.string,
  playNext: PropTypes.func
};

export default Config;
