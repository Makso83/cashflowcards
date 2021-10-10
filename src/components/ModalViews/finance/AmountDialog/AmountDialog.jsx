import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_BANK_DEBT, WITHDRAW_FROM_ACCOUNT } from '../../../../constants/modals';
import { hideModal } from '../../../../store/reducers/activeModal';
import {
  addBankCredit, setCurrentPlayer, withdrawAccountCash, selectCurrentPlayer, selectPlayersList,
} from '../../../../store/reducers/players';

import CustomButton from '../../../CustomButton/CustomButton';
import CustomInput from '../../../CustomInput/CustomInput';

import styles from './AmountDialog.module.scss';

function AmountDialog({ amountType }) {
  const currentUid = useSelector(selectCurrentPlayer);
  const playersList = useSelector(selectPlayersList);
  const currentPlayer = playersList.find((player) => player.uid === currentUid);
  const [amount, setAmount] = useState(null);
  const [amountError, setAmountError] = useState(false);
  const dispatch = useDispatch();

  const isWithdrawal = amountType.trim() ? amountType === WITHDRAW_FROM_ACCOUNT : false;
  const isAddBankDebt = amountType.trim() ? amountType === ADD_BANK_DEBT : false;

  const buttonText = () => {
    if (isWithdrawal) {
      return 'Списать';
    }
    if (isAddBankDebt) {
      return 'Взять кредит';
    }
    return 'Button';
  };

  if (!currentPlayer) {
    return null;
  }

  const onAmountChange = (evt) => {
    setAmount(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (isWithdrawal) {
      if (+amount > +currentPlayer.cash) {
        setAmountError(true);
      } else {
        setAmountError(false);
        dispatch(withdrawAccountCash({ uid: currentPlayer.uid, amount }));
        dispatch(hideModal());
      }
    }
    if (isAddBankDebt) {
      if (+amount % 1000 === 0) {
        dispatch(addBankCredit({ uid: currentPlayer.uid, amount }));
        dispatch(setCurrentPlayer(currentPlayer.uid));
        dispatch(hideModal());
      } else {
        setAmountError(true);
      }
    }
  };
  return (
    <form onSubmit={onSubmit} className={styles.formWrapper}>
      <h2 className={styles.formHeader}>Движение денежных средств</h2>
      <div className={styles.inputWrapper}>
        <CustomInput
          inputName="Сумма"
          type="number"
          onChange={onAmountChange}
          placeholder="Сумма"
          error={amountError}
          inputValue={amount}
          onFocus={() => setAmountError(false)}
          autoFocus
        />
      </div>
      {isWithdrawal && (
      <>
        {amountError
          ? <p className={styles.errorText}>Сумма на счете недостаточна для списания.</p>
          : <p>Укажите сумму для списания</p>}
      </>
      )}
      {isAddBankDebt && (
      <>
        {amountError
          ? <p className={styles.errorText}>Сумма должна быть кратна 1000</p>
          : <p>{`Ежемесячная выплата: $${(amount * 0.1).toFixed(0)}`}</p>}
      </>
      )}
      <div className={styles.buttonWrapper}>
        <CustomButton buttonText={buttonText()} buttonType="submit" />
      </div>
    </form>
  );
}

AmountDialog.defaultProps = {
  amountType: '',
};
AmountDialog.propTypes = {
  amountType: PropTypes.string || PropTypes.number,
};

export default AmountDialog;
