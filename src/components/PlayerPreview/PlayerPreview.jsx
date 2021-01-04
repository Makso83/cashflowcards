import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useDispatch } from 'react-redux';
import CustomButton from '../CustomButton/CustomButton';
import { calculateNetAmount } from '../../utils/calculateAmounts';

import styles from './PlayerPreview.module.scss';
import { showModal } from '../../store/actions/activeModal';
import { DELETE_PLAYER_MODAL } from '../../constants/modals';

function PlayerPreview({ player }) {
  const dispatch = useDispatch();
  const deletePlayer = () => {
    dispatch(showModal({
      name: DELETE_PLAYER_MODAL,
      data: {
        name: player.playerName,
        uid: player.uid,
      },
    }));
  };
  return (
    <Card className={styles.card}>
      <DeleteForeverIcon className={styles.deleteIcon} onClick={deletePlayer} />
      <CardContent>
        <Typography variant="h5" component="h2">{player.playerName}</Typography>
        <Typography color="textSecondary">{player.profession}</Typography>
        <Typography color="textPrimary">{`Денежный поток $${calculateNetAmount(player)}/мес.`}</Typography>
      </CardContent>
      <CardActions>
        <CustomButton buttonText="Подробнее.." />
      </CardActions>
    </Card>
  );
}

PlayerPreview.defaultProps = {
  player: {},
};

PlayerPreview.propTypes = {
  player: PropTypes.object,
};

export default PlayerPreview;
