import s from '../../styles/styles.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';

class ImageGalleryItem extends Component {
  render() {
    const { largeImageURL, webformatURL, tags } = this.props.item;
    return (
      <li className={s.ImageGalleryItem}>
        <img
          className={s.ImageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={() => this.props.openModal({ largeImageURL, tags })}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
