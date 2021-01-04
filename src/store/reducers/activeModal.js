import { HIDE, MODAL, SHOW } from '../constants/actionTypes';

const initState = {
  name: '',
};

const activeModal = (state = initState, action) => {
  switch (action.type) {
    case `${SHOW} ${MODAL}`: {
      return {
        ...action.payload,
      };
    }
    case `${HIDE} ${MODAL}`: {
      return {
        ...initState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default activeModal;
