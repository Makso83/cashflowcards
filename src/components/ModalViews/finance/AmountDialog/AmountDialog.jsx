import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_BANK_DEBT, WITHDRAW_FROM_ACCOUNT } from '../../../../constants/modals';
import { hideModal } from '../../../../store/actions/activeModal';
import { addBankCredit, setCurrentPlayer, withdrawAccountCash } from '../../../../store/actions/players';
import { selectCurrentPlayer } from '../../../../store/selectors/players';
import CustomButton from '../../../CustomButton/CustomButton';
import CustomInput from '../../../CustomInput/CustomInput';

import styles from './AmountDialog.module.scss';

function AmountDialog({ amountType }) {
  const currentPlayer = useSelector(selectCurrentPlayer);
  const [amount, setAmount] = useState(0);
  const [notEnough, setNotEnough] = useState(false);
  const dispatch = useDispatch();

  const isWithdrawal = amountType.trim() ? amountType === WITHDRAW_FROM_ACCOUNT : false;
  const isAddBankDebt = amountType.trim() ? amountType === ADD_BANK_DEBT : false;

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
        setNotEnough(true);
      } else {
        setNotEnough(false);
        dispatch(withdrawAccountCash({ uid: currentPlayer.uid, amount }));
      }
    }
    if (isAddBankDebt) {
      dispatch(addBankCredit({ uid: currentPlayer.uid, amount }));
      dispatch(setCurrentPlayer(currentPlayer));
    }
    dispatch(hideModal());
  };
  return (
    <form onSubmit={onSubmit} className={styles.formWrapper}>
      <h2 className={styles.formHeader}>Списание денежных средств</h2>
      <div className={styles.inputWrapper}>
        <CustomInput
          inputName="Name"
          type="number"
          onChange={onAmountChange}
          placeholder="Сумму"
          error={notEnough}
          inputValue={amount}
          onFocus={() => setNotEnough(false)}
          autoFocus
        />
      </div>
      {isWithdrawal && (
      <>
        {notEnough
          ? <p className={styles.errorText}>Сумма на счете недостаточна для списания.</p>
          : <p>Укажите сумму для списания</p>}
      </>
      )}
      {isAddBankDebt && <p>{`Ежемесячная выплата: $${amount * 0.1}`}</p>}
      <div className={styles.buttonWrapper}>
        <CustomButton buttonText="Списать" buttonType="submit" />
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
