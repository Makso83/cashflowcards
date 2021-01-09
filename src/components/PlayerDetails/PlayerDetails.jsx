import {
  Button,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { debtsTable, incomeTableData, paymentTableData } from '../../constants/detailsTableData';
import {
  calculateIncome, calculatePayment,
} from '../../utils/calculateAmounts';
import styles from './PlayerDetails.module.scss';
import { refillAccountCash, resetCurrentPlayer } from '../../store/actions/players';
import {
  ACCOUNT_REFILL_SUCCESS, ADD_BANK_DEBT, AMOUNT_DIALOG_MODAL, WITHDRAW_FROM_ACCOUNT,
} from '../../constants/modals';
import { showModal } from '../../store/actions/activeModal';
import CustomModal from '../CustomModal/CustomModal';
import selectActiveModal from '../../store/selectors/activeModal';
import RefillSuccess from '../ModalViews/finance/RefillSuccess';
import AmountDialog from '../ModalViews/finance/AmountDialog/AmountDialog';
import DetailsTable from '../DetailsTable/DetailsTable';

function PlayerDetails({ player }) {
  const dispatch = useDispatch();

  const activeModal = useSelector(selectActiveModal);

  const isSuccessRefillOpen = activeModal.name === ACCOUNT_REFILL_SUCCESS;
  const isWithdrawModalOpen = activeModal.name === AMOUNT_DIALOG_MODAL;

  const playerIncome = calculateIncome(player);
  const playerPayment = calculatePayment(player);
  const playerCashlow = playerIncome - playerPayment;

  const [isSalaryEnabled, seIsSalaryEnabled] = useState(true);
  if (!player) {
    return null;
  }
  const closeDatails = () => {
    dispatch(resetCurrentPlayer());
  };

  const addSalaryAmount = () => {
    seIsSalaryEnabled(false);
    setTimeout(() => {
      dispatch(refillAccountCash({ uid: player.uid, amount: playerCashlow }));
      seIsSalaryEnabled(true);
      dispatch(showModal({ name: ACCOUNT_REFILL_SUCCESS }));
    }, 1000);
  };

  const withdrawFromAccount = () => {
    dispatch(showModal({
      name: AMOUNT_DIALOG_MODAL,
      data: player.uid,
      type: WITHDRAW_FROM_ACCOUNT,
    }));
  };

  const addBankDebt = () => {
    dispatch(showModal({
      name: AMOUNT_DIALOG_MODAL,
      data: player.uid,
      type: ADD_BANK_DEBT,
    }));
  };

  return (
    <>
      <Paper className={styles.paper}>
        <VisibilityOffIcon className={styles.hideIcon} onClick={closeDatails} />
        <div className={styles.header}>
          <Typography variant="h5" component="h2">{player.playerName}</Typography>
          <Typography variant="subtitle2">{player.profession}</Typography>
        </div>
        <div className={styles.topTables}>
          <DetailsTable
            player={player}
            tableData={incomeTableData}
            header="Доходы"
            totalAmount={playerIncome}
            styles={styles}
          />
          <DetailsTable
            player={player}
            tableData={paymentTableData}
            header="Расходы"
            totalAmount={playerPayment}
            styles={styles}
          />
        </div>
        <div className={styles.accountInfo}>
          <Typography variant="h6" component="h4">{`Ежемесячный денежный поток: $${playerCashlow}`}</Typography>
          <Typography variant="h6" component="h4">{`БАНКОВСКИЙ СЧЕТ: $${player.cash}`}</Typography>
          <div className={styles.buttonBlock}>
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              disabled={!isSalaryEnabled}
              onClick={addSalaryAmount}
            >
              Чек оплаты
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<RemoveCircleIcon />}
              disabled={!isSalaryEnabled}
              onClick={withdrawFromAccount}
            >
              Списать со счета
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AccountBalanceIcon />}
              disabled={!isSalaryEnabled}
              onClick={addBankDebt}
            >
              Взять кредит
            </Button>
          </div>
        </div>
        <DetailsTable
          player={player}
          tableData={debtsTable}
          header="Выписка по задолженности"
          styles={styles}
        />
      </Paper>
      <CustomModal isOpen={isSuccessRefillOpen || isWithdrawModalOpen}>
        {isSuccessRefillOpen && <RefillSuccess />}
        {isWithdrawModalOpen && <AmountDialog amountType={activeModal.type} />}
      </CustomModal>
    </>
  );
}

PlayerDetails.defaultProps = {
  player: {},
};

PlayerDetails.propTypes = {
  player: PropTypes.object,
};

export default PlayerDetails;
