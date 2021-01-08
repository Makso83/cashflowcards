import {
  ACCOUNT_CASH,
  ADD, CURRENT_PLAYER, DELETE, PLAYER, PROFESSION, REFILL, RESET, RESTORE, SET,
} from '../constants/actionTypes';

export const addPlayer = (payload) => ({
  type: `${ADD} ${PLAYER}`,
  payload,
});

export const deletePlayer = (id) => ({
  type: `${DELETE} ${PLAYER}`,
  payload: id,
});

export const removeProfessionTemplate = (id) => ({
  type: `${DELETE} ${PROFESSION}`,
  payload: id,
});

export const restoreProfessionTemplate = (id) => ({
  type: `${RESTORE} ${PROFESSION}`,
  payload: id,
});

export const resetPlayers = () => ({
  type: `${RESET} ${PLAYER}`,
});

export const setCurrentPlayer = (payload) => ({
  type: `${SET} ${CURRENT_PLAYER}`,
  payload,
});

export const resetCurrentPlayer = () => ({
  type: `${RESET} ${CURRENT_PLAYER}`,
});

export const refillAccountCash = (payload) => ({
  type: `${REFILL} ${ACCOUNT_CASH}`,
  payload,
});
