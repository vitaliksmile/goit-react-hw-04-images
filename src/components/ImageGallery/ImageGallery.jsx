import s from '../../styles/styles.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';
import Button from 'components/Button/Button';
import searchNewApi from 'utils/newsAPI';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

class ImageGallery extends Component {
  state = {
    news: [],
    isLoading: false,
    isOpen: false,
    error: null,
    query: '',
    page: 1,
    totalPages: 0,
    modalData: {},
  };
  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.query !== state.query) {
      return { page: 1, query: nextProps.query };
    }
    return state;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.query !== this.props.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      searchNewApi(this.props.query, this.state.page)
        .then(data =>
          this.setState(prev => ({
            news:
              this.state.page === 1 ? data.hits : [...prev.news, ...data.hits],
            totalPages: Math.ceil(data.totalHits / 12),
          }))
        )
        .catch(err => this.setState({ error: err.message }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }
  updatePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };
  openModal = modalData => {
    this.setState({ isOpen: true, modalData: { modalData } });
  };
  closeModal = () => {
    this.setState({ isOpen: false, modalData: {} });
  };
  render() {
    const { news, totalPages, page, isLoading, isOpen, modalData } = this.state;
    return (
      <>
        <ul className={s.ImageGallery}>
          {news.map(item => (
            <ImageGalleryItem
              key={item.id}
              title={item.tags}
              item={item}
              openModal={this.openModal}
            />
          ))}
        </ul>
        {isLoading && <Loader />}
        {news.length > 0 && totalPages > page && (
          <Button updatePage={this.updatePage} />
        )}
        {isOpen && <Modal closeModal={this.closeModal} modalData={modalData} />}
      </>
    );
  }
}

export default ImageGallery;
ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
