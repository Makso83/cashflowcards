import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { useDispatch } from 'react-redux';
import styles from './CustomModal.module.scss';
import { hideModal } from '../../store/reducers/activeModal';

function CustomModal({
  isOpen, children, customStyles,
}) {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(hideModal());
  };

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
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.element,
  customStyles: PropTypes.object,
};

export default CustomModal;
