import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentPlayer, selectPlayersList } from '../../store/reducers/players';
import PlayerDetails from '../PlayerDetails/PlayerDetails';

function CurrentPlayer() {
  const currentPlayerUid = useSelector(selectCurrentPlayer);
  const playersList = useSelector(selectPlayersList);
  if (!currentPlayerUid) {
    return null;
  }
  const currentPlayer = playersList.find((player) => player.uid === currentPlayerUid);
  return (
    <div>
      <PlayerDetails player={currentPlayer} />
    </div>
  );
}

export default CurrentPlayer;
