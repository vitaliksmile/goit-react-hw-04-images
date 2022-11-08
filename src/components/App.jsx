import { Component } from 'react';
import s from '../styles/styles.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

class App extends Component {
  state = {
    query: '',
  };
  setQuery = query => {
    this.setState({ query });
  };
  render() {
    return (
      <div className={s.App}>
        <Searchbar setQuery={this.setQuery} />
        <ImageGallery query={this.state.query} />
      </div>
    );
  }
}
export default App;
