import s from '../../styles/styles.module.css';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import searchNewApi from 'utils/newsAPI';
import { useCallback } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { useEffect, useState } from 'react';

function ImageGallery({ query }) {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modalData, setModalData] = useState({});

  const updatePage = () => {
    setPage(prev => prev + 1);
  };

  const openModal = modalData => {
    setIsOpen(true);
    setModalData(modalData);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData({});
  };

  const searchNew = useCallback(() => {
    setIsLoading(true);
    searchNewApi(query, page)
      .then(data => {
        setNews(prev => (page === 1 ? data.hits : [...prev, ...data.hits]));
        setTotalPages(Math.ceil(data.totalHits / 12));
      })
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [query, page]);

  useEffect(() => {
    if (page === 1 && query) {
      searchNew();
    } else {
      setPage(1);
    }

    setError(null);
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    if (!query) return;

    searchNew();
    // eslint-disable-next-line
  }, [page]);

  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <>
      <ul className={s.ImageGallery}>
        {news.map(item => (
          <ImageGalleryItem
            key={item.id}
            title={item.tags}
            item={item}
            openModal={openModal}
          />
        ))}
      </ul>
      {isLoading && <Loader />}
      {news.length > 0 && totalPages > page && (
        <Button updatePage={updatePage} />
      )}
      {isOpen && <Modal closeModal={closeModal} modalData={modalData} />}
    </>
  );
}

export default ImageGallery;
ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
