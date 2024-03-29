import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import CustomButton from '../../CustomButton/CustomButton';
import { deletePlayer, resetCurrentPlayer, restoreProfession } from '../../../store/reducers/players';
import { hideModal } from '../../../store/reducers/activeModal';

import styles from './DeletePlayer.module.scss';

function DeletePlayer({ playerName, playerUID, professionId }) {
  const dispatch = useDispatch();
  const onAccept = () => {
    dispatch(resetCurrentPlayer());
    dispatch(deletePlayer(playerUID));
    dispatch(hideModal());
    dispatch(restoreProfession(professionId));
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

DeletePlayer.defaultProps = {
  playerName: '',
  playerUID: '',
  professionId: '',
};

DeletePlayer.propTypes = {
  playerName: PropTypes.string,
  playerUID: PropTypes.string,
  professionId: PropTypes.string,
};

export default DeletePlayer;
