import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from '../index';
import { ADD_BANK_DEBT, WITHDRAW_FROM_ACCOUNT } from '../../constants/modals';

export type ModalState = {
  name: string,
  data?: unknown,
  type?: typeof WITHDRAW_FROM_ACCOUNT | typeof ADD_BANK_DEBT
}

const initialState: ModalState = {
  name: '',
};

export const modalSlice = createSlice({
  name: 'activeModal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalState>) => ({
      ...action.payload,
    }),
    hideModal: () => ({
      ...initialState,
    }),
  },
});

export const selectActiveModal = (state: RootState) => state.activeModal;
export const selectActiveModalData = createSelector(
  selectActiveModal,
  (modal) => {
    if (modal.data) {
      return modal.data;
    }
    return null;
  },
);

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
