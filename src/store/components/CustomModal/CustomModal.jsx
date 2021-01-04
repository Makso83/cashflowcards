import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import styles from './CustomModal.module.scss';

function CustomModal({
  isOpen, children, closeModal, customStyles,
}) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
      className={styles.modal}
      overlayClassName={styles.overlay}
      shouldCloseOnOverlayClick
    >
      {children}
    </ReactModal>
  );
}

CustomModal.defaultProps = {
  isOpen: false,
  children: null,
  customStyles: {},
  closeModal: () => {},
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.element,
  customStyles: PropTypes.object,
  closeModal: PropTypes.func,
};

export default CustomModal;
