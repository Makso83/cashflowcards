import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import PlayerPreview from '../PlayerPreview/PlayerPreview';
import CustomModal from '../CustomModal/CustomModal';
import selectActiveModal from '../../store/selectors/activeModal';

import styles from './PlayersList.module.scss';
import DeletePlayer from '../ModalViews/DeletePlayer/DeletePlayer';
import { DELETE_PLAYER_MODAL } from '../../constants/modals';

function PlayersList({ playersList }) {
  const isPlayerList = playersList && Array.isArray(playersList) && playersList.length;
  const [playerToDelete, setPlayerToDelete] = useState({});
  const activeModal = useSelector(selectActiveModal);

  const isOpen = activeModal.name === DELETE_PLAYER_MODAL;

  useEffect(() => {
    if (isOpen) {
      setPlayerToDelete(activeModal.data);
    }
  }, [isOpen]);

  if (!isPlayerList) {
    return null;
  }
  return (
    <>
      <div className={styles.listRoot}>
        {playersList.map((player) => <PlayerPreview key={player.uid} player={player} />)}
      </div>
      <CustomModal isOpen={isOpen}>
        <DeletePlayer
          playerName={playerToDelete.name}
          playerUID={playerToDelete.uid}
          professionId={playerToDelete.professionId}
        />
      </CustomModal>
    </>

  );
}

PlayersList.defaultProps = {
  playersList: [],
};

PlayersList.propTypes = {
  playersList: PropTypes.array,
};

export default PlayersList;
