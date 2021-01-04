import React from 'react';
import Chip from '@material-ui/core/Chip';
import { useSelector } from 'react-redux';
import { selectPlayersTemplates } from '../../store/selectors/players';

function AvailableProfessions() {
  const professions = useSelector(selectPlayersTemplates);
  const styles = {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '20px',
  };
  return (
    <div style={styles}>
      {professions.map((item) => <Chip label={item.profession} />)}
    </div>
  );
}

export default AvailableProfessions;
