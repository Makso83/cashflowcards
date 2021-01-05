import { Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectActiveModalData } from '../../../store/selectors/activeModal';
// import PropTypes from 'prop-types';

import styles from './PlayerDetails.module.scss';

function PlayerDetails() {
  const player = useSelector(selectActiveModalData);
  if (!player) {
    return null;
  }
  return (
    <>
      <div className={styles.header}>
        <Typography variant="h5" component="h2">{player.playerName}</Typography>
        <Typography variant="subtitle2">{player.profession}</Typography>
      </div>
    </>
  );
}

// PlayerDetails.propTypes = {

// };

export default PlayerDetails;
