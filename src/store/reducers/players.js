import { ADD, PLAYER } from '../constants/actionTypes';

const initState = {
  playersList: [],
};

const playersReducer = (state = initState, action) => {
  switch (action.type) {
    case `${ADD} ${PLAYER}`: {
      return {
        ...state,
        playersList: [...state.playersList, action.payload],
      };
    }
    default:
      return state;
  }
};

export default playersReducer;
