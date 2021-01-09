import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentPlayer } from '../../store/selectors/players';
import PlayerDetails from '../PlayerDetails/PlayerDetails';

function CurrentPlayer() {
  const currentPlayer = useSelector(selectCurrentPlayer);
  if (!currentPlayer) {
    return null;
  }
  return (
    <div>
      <PlayerDetails player={currentPlayer} />
    </div>
  );
}

export default CurrentPlayer;
