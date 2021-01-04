import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import CustomButton from '../../CustomButton/CustomButton';
import { deletePlayer } from '../../../store/actions/players';
import { hideModal } from '../../../store/actions/activeModal';

import styles from './DeletePlayer.module.scss';

function DeletePlayer({ playerName, playerUID }) {
  const dispatch = useDispatch();
  const onAccept = () => {
    dispatch(deletePlayer(playerUID));
    dispatch(hideModal());
  };
  return (
    <div className={styles.root}>
      <h2>{playerName}</h2>
      <p className={styles.confirmText}>
        Вы уверены, что хотите удалить игрока?
        У вас не будет возможности восстановить игрока после удаления.
      </p>
      <CustomButton buttonText="Да" onClick={onAccept} />
    </div>
  );
}

DeletePlayer.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerUID: PropTypes.string.isRequired,
};

export default DeletePlayer;
