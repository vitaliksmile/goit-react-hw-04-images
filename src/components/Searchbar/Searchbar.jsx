import { Component } from 'react';
import PropTypes from 'prop-types';
import s from '../../styles/styles.module.css';
class Searchbar extends Component {
  state = {
    input: '',
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.setQuery(this.state.input);
  };
  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={s.SearchFormInput}
            type="text"
            value={this.state.input}
            placeholder="Search images and photos"
            onChange={e => this.setState({ input: e.target.value })}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;

Searchbar.propTypes = {
  setQuery: PropTypes.func.isRequired,
};
