import PropTypes from 'prop-types';
import { useState } from 'react';
import s from '../../styles/styles.module.css';

function Searchbar({ setQuery }) {
  const [input, setInput] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    setQuery(input.trim());
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={s.SearchFormInput}
          type="text"
          value={input}
          placeholder="Search images and photos"
          onChange={e => setInput(e.target.value)}
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  setQuery: PropTypes.func.isRequired,
};
