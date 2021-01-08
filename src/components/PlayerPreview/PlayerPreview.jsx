import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../CustomButton/CustomButton';
import { calculateNetAmount } from '../../utils/calculateAmounts';

import styles from './PlayerPreview.module.scss';
import { showModal } from '../../store/actions/activeModal';
import { DELETE_PLAYER_MODAL } from '../../constants/modals';
import { setCurrentPlayer } from '../../store/actions/players';
import { selectCurrentPlayer } from '../../store/selectors/players';

function PlayerPreview({ player }) {
  const dispatch = useDispatch();
  const currentPlayer = useSelector(selectCurrentPlayer);

  const isCurrentPlayer = currentPlayer ? player.uid === currentPlayer.uid : false;

  const deletePlayer = () => {
    dispatch(showModal({
      name: DELETE_PLAYER_MODAL,
      data: {
        name: player.playerName,
        uid: player.uid,
        professionId: player.professionId,
      },
    }));
  };

  const openDetails = () => {
    dispatch(setCurrentPlayer(player));
  };

  return (
    <>
      <Card className={styles.card}>
        <DeleteForeverIcon className={styles.deleteIcon} onClick={deletePlayer} />
        <CardContent>
          <Typography variant="h5" component="h2">{player.playerName}</Typography>
          <Typography variant="subtitle2">{player.profession}</Typography>
          <Typography color="textPrimary">{`Денежный поток $${calculateNetAmount(player)}/мес.`}</Typography>
          <Typography color="textPrimary">{`Наличные $${player.cash}`}</Typography>
          <Typography color="textPrimary">{`Детей ${player.children ? `: ${player.children}` : 'нет'}`}</Typography>
        </CardContent>
        <CardActions>
          {!isCurrentPlayer && <CustomButton buttonText="Подробнее..." onClick={openDetails} />}
        </CardActions>
        {isCurrentPlayer && <ArrowDownwardIcon className={styles.downArrow} />}
      </Card>
    </>
  );
}

PlayerPreview.defaultProps = {
  player: {},
};

PlayerPreview.propTypes = {
  player: PropTypes.object,
};

export default PlayerPreview;
