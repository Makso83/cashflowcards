import {
  ADD, DELETE, PLAYER, PROFESSION, RESET,
} from '../constants/actionTypes';

export const addPlayer = (payload) => ({
  type: `${ADD} ${PLAYER}`,
  payload,
});

export const removeProfessionTemplate = (id) => ({
  type: `${DELETE} ${PROFESSION}`,
  payload: id,
});

export const resetPlayers = () => ({
  type: `${RESET} ${PLAYER}`,
});
