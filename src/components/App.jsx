import { useState } from 'react';
import s from '../styles/styles.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

function App() {
  const [query, setQuery] = useState('');
  return (
    <div className={s.App}>
      <Searchbar setQuery={setQuery} />
      <ImageGallery query={query} />
    </div>
  );
}

export default App;
