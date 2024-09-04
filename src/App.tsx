import React from 'react';
import SearchBar from './components/searchComponent';

const App: React.FC = () => {
  return (
    <div className="pictogram-items" id="list">
      <button><SearchBar ></SearchBar></button>
      <button></button>
    </div>
  );
};

export default App;