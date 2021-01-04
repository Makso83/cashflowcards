import { HIDE, MODAL, SHOW } from '../constants/actionTypes';

export const showModal = (payload) => ({
  type: `${SHOW} ${MODAL}`,
  payload,
});

export const hideModal = () => ({
  type: `${HIDE} ${MODAL}`,
});
