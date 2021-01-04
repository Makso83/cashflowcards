import {
  ADD, DELETE, PLAYER, PROFESSION, RESET,
} from '../constants/actionTypes';
import playersTemplates from '../../constants/playersTemplates';

const initState = {
  playersList: [],
  currentPlayer: null,
  playersTemplates,
};

const playersReducer = (state = initState, action) => {
  switch (action.type) {
    case `${ADD} ${PLAYER}`: {
      return {
        ...state,
        playersList: [...state.playersList, action.payload],
      };
    }
    case `${DELETE} ${PLAYER}`: {
      return {
        ...state,
        playersList: state.playersList.filter((player) => player.uid !== action.payload),
      };
    }
    case `${RESET} ${PLAYER}`: {
      return {
        ...initState,
      };
    }
    case `${DELETE} ${PROFESSION}`: {
      const id = action.payload;
      return {
        ...state,
        playersTemplates: state.playersTemplates.filter((template) => template.professionId !== id),
      };
    }
    default:
      return state;
  }
};

export default playersReducer;
