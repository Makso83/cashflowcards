import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { hideModal } from '../../../store/actions/activeModal';

function RefillSuccess() {
  const dispatch = useDispatch();
  return (
    <div style={
        {
          textAlign: 'center',
          padding: '30px',
        }
    }
    >
      <MonetizationOnIcon fontSize="large" />
      <p>Счет игрока успешно пополнен</p>
      <Button variant="contained" color="primary" onClick={() => dispatch(hideModal())}>OK</Button>
    </div>
  );
}

export default RefillSuccess;
