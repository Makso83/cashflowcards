import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PlayerPreview from '../PlayerPreview/PlayerPreview';
import CustomModal from '../CustomModal/CustomModal';
import { selectActiveModal } from '../../store/reducers/activeModal';

import styles from './PlayersList.module.scss';
import DeletePlayer from '../ModalViews/DeletePlayer/DeletePlayer';
import { DELETE_PLAYER_MODAL } from '../../constants/modals';
import { ExtendedPlayer } from '../../utils/makeNewPlayer';

interface PlayerWithName extends ExtendedPlayer {
  name: string,
}

const PlayersList: React.FC<{ playersList: Array<ExtendedPlayer> }> = ({ playersList }) => {
  const isPlayerList = playersList && Array.isArray(playersList) && playersList.length;
  const [playerToDelete, setPlayerToDelete] = useState({
    name: '',
    uid: '',
    professionId: '',
  });
  const activeModal = useSelector(selectActiveModal);

  const isOpen = activeModal.name === DELETE_PLAYER_MODAL;

  useEffect(() => {
    if (isOpen && activeModal) {
      setPlayerToDelete(activeModal.data as PlayerWithName);
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
};

export default PlayersList;
