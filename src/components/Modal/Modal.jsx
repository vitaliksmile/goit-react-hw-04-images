import { createPortal } from 'react-dom';
import s from '../../styles/styles.module.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal');
function Modal({ modalData, closeModal }) {
  const handleCloseByEsc = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleCloseByEsc);
    return () => {
      window.removeEventListener('keydown', handleCloseByEsc);
    };
  });

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img src={modalData.largeImageURL} alt={modalData.tags} />
      </div>
    </div>,
    modalRoot
  );
}

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleCloseByEsc);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleCloseByEsc);
//   }

//   handleCloseByEsc = e => {
//     if (e.code === 'Escape') {
//       this.props.closeModal();
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.target === e.currentTarget) {
//       this.props.closeModal();
//     }
//   };
//   render() {
//     const { modalData } = this.props.modalData;
//     return createPortal(
//       <div className={s.Overlay} onClick={this.handleBackdropClick}>
//         <div className={s.Modal}>
//           <img src={modalData.largeImageURL} alt={modalData.tags} />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }
export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalData: PropTypes.shape({
    modalData: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
