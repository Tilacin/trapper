import PropTypes from 'prop-types';

const Config = ({ setColumns, setRows }) => {
  const handleSetColumns = (value) => {
    const columns = parseInt(value.split('*')[0], 10);
    const rows = parseInt(value.split('*')[1], 10);
    setColumns(columns);
    setRows(rows);
  };
  
  return (
    <div>
      <div>
        <label>Выберите размер:</label>
        <br />
        <button onClick={() => handleSetColumns('2*2')}>
          2x2
        </button>
        <button onClick={() => handleSetColumns('2*3')}>
          2x3
        </button>
        <button onClick={() => handleSetColumns('3*3')}>
          3x3
        </button>
        <button onClick={() => handleSetColumns('3*4')}>
          3x4
        </button>
        <button onClick={() => handleSetColumns('4*4')}>
          4x4
        </button>
        <button onClick={() => handleSetColumns('5*5')}>
          5x5
        </button>
        <button onClick={() => handleSetColumns('6*6')}>
          6x6
        </button>
      </div>
    </div>
  );
};

Config.propTypes = {
  handleImageChange: PropTypes.func,
  columns: PropTypes.number,
  setColumns: PropTypes.func,
  rows: PropTypes.number,
  setRows: PropTypes.func,
};

export default Config;
