import { createSelector } from 'reselect';

const selectActiveModal = (state) => state.activeModal;
export const selectActiveModalData = createSelector(
  selectActiveModal,
  (modal) => {
    if (modal.data) {
      return modal.data;
    }
    return null;
  },
);

export default selectActiveModal;
