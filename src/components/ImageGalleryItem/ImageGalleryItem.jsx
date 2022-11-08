import s from '../../styles/styles.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({ item, openModal }) {
  const { largeImageURL, webformatURL, tags } = item;
  return (
    <li className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        onClick={() => openModal({ largeImageURL, tags })}
      />
    </li>
  );
}

export default ImageGalleryItem;
ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
