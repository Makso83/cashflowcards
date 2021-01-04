import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CustomButton from '../CustomButton/CustomButton';
import { calculateNetAmount } from '../../utils/calculateAmounts';

function PlayerPreview({ player }) {
  return (
    <Card>
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
