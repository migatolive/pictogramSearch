import React, { useState } from 'react';
import { getPictogramId, getPictogramImage } from '../services/arasaacService';
import { speakText } from '../services/speechService';

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const id = await getPictogramId(searchText);
      const imageUrl = await getPictogramImage(id);
      setImageSrc(imageUrl);
      speakText(searchText); // Llamar a la función TTS
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search for a pictogram"
      />
      <button onClick={handleSearch}>Search</button>
      {imageSrc && <img src={imageSrc} alt="Pictogram" style={{ width: '100px', height: '100px' }} />}
    </div>
  );
};

export default SearchBar;
