import {
  Button,
  Paper,
  Table, TableCell, TableRow, Typography,
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
  calculateAmountByType, calculateIncome, calculatePayment,
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

const createRow = (player, title, table, valueName) => {
  const value = `$${calculateAmountByType(player, table, valueName)}`;
  return { rowTitle: title, value };
};

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
          <div>
            <Typography variant="subtitle1">Доходы</Typography>
            <Table>
              {incomeTableData.map((line) => {
                const { title, table, valueName } = line;
                const { rowTitle, value } = createRow(player, title, table, valueName);
                return (
                  <TableRow key={rowTitle}>
                    <TableCell>{rowTitle}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell><p className={styles.strongText}>Итого доходов:</p></TableCell>
                <TableCell><p className={styles.strongText}>{`$${playerIncome}`}</p></TableCell>
              </TableRow>
            </Table>
          </div>
          <div>
            <Typography variant="subtitle1">Расходы</Typography>
            <Table>
              {paymentTableData.map((line) => {
                const { title, table, valueName } = line;
                const { rowTitle, value } = createRow(player, title, table, valueName);
                return (
                  <TableRow key={rowTitle}>
                    <TableCell>{rowTitle}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell><p className={styles.strongText}>Итого расходов:</p></TableCell>
                <TableCell><p className={styles.strongText}>{`$${calculatePayment(player)}`}</p></TableCell>
              </TableRow>
            </Table>
          </div>
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
        <div>
          <Typography variant="subtitle1">Выписка по задолженности</Typography>
          <Table>
            {debtsTable.map((line) => {
              const { title, table, valueName } = line;
              const { rowTitle, value } = createRow(player, title, table, valueName);
              return (
                <TableRow key={rowTitle}>
                  <TableCell>{rowTitle}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              );
            })}
          </Table>
        </div>
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
