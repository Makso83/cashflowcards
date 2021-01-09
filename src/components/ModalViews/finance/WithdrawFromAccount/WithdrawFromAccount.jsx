import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../../../store/actions/activeModal';
import { withdrawAccountCash } from '../../../../store/actions/players';
import { selectCurrentPlayer } from '../../../../store/selectors/players';
import CustomButton from '../../../CustomButton/CustomButton';
import CustomInput from '../../../CustomInput/CustomInput';

import styles from './WithdrawFromAccount.module.scss';

function WithdrawFromAccount() {
  const currentPlayer = useSelector(selectCurrentPlayer);
  const [amount, setAmount] = useState(0);
  const [notEnough, setNotEnough] = useState(false);
  const dispatch = useDispatch();
  if (!currentPlayer) {
    return null;
  }

  const onAmountChange = (evt) => {
    setAmount(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (+amount > +currentPlayer.cash) {
      setNotEnough(true);
    } else {
      setNotEnough(false);
      dispatch(withdrawAccountCash({ uid: currentPlayer.uid, amount }));
      dispatch(hideModal());
    }
  };
  return (
    <form onSubmit={onSubmit} className={styles.formWrapper}>
      <h2 className={styles.formHeader}>Списание денежных средств</h2>
      <div className={styles.inputWrapper}>
        <CustomInput
          inputName="Name"
          type="number"
          onChange={onAmountChange}
          placeholder="Введите имя игрока"
          error={notEnough}
          inputValue={amount}
          onFocus={() => setNotEnough(false)}
          autoFocus
        />
      </div>
      {notEnough
        ? <p className={styles.errorText}>Сумма на счете недостаточна для списания.</p>
        : <p>Укажите сумму для списания</p>}
      <div className={styles.buttonWrapper}>
        <CustomButton buttonText="Списать" buttonType="submit" />
      </div>
    </form>
  );
}

export default WithdrawFromAccount;
