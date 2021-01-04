import React from 'react';
import PropTypes from 'prop-types';
import PlayerPreview from '../PlayerPreview/PlayerPreview';

import styles from './PlayersList.module.scss';

function PlayersList({ playersList }) {
  const isPlayerList = playersList && Array.isArray(playersList) && playersList.length;
  if (!isPlayerList) {
    return null;
  }
  return (
    <div className={styles.listRoot}>
      {playersList.map((player) => <PlayerPreview key={player.uid} player={player} />)}
    </div>
  );
}

PlayersList.defaultProps = {
  playersList: [],
};

PlayersList.propTypes = {
  playersList: PropTypes.array,
};

export default PlayersList;
