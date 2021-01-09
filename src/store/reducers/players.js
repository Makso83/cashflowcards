import {
  ACCOUNT_CASH,
  ADD, CURRENT_PLAYER, DEBT, DELETE, PLAYER, PROFESSION, REFILL, RESET, RESTORE, SET, WITHDRAW,
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
    case `${RESTORE} ${PROFESSION}`: {
      const id = action.payload;
      const restored = playersTemplates.find((profession) => profession.professionId === id);
      return {
        ...state,
        playersTemplates: [...state.playersTemplates, restored],
      };
    }
    case `${SET} ${CURRENT_PLAYER}`: {
      return {
        ...state,
        currentPlayer: action.payload,
      };
    }
    case `${RESET} ${CURRENT_PLAYER}`: {
      return {
        ...state,
        currentPlayer: null,
      };
    }
    case `${REFILL} ${ACCOUNT_CASH}`: {
      const newState = { ...state };
      const playerUID = action.payload.uid;
      const player = newState.playersList.find((person) => person.uid === playerUID);
      player.cash += action.payload.amount;
      return {
        ...newState,
      };
    }
    case `${WITHDRAW} ${ACCOUNT_CASH}`: {
      const newState = { ...state };
      const playerUID = action.payload.uid;
      const player = newState.playersList.find((person) => person.uid === playerUID);
      player.cash -= action.payload.amount;
      return {
        ...newState,
      };
    }
    case `${ADD} ${DEBT}`: {
      const newState = { ...state };
      const playerUID = action.payload.uid;
      const player = newState.playersList.find((person) => person.uid === playerUID);
      player.cash += +action.payload.amount;
      player.debts.bank += +action.payload.amount;
      player.payments.bank += +action.payload.amount * 0.1;
      return {
        ...newState,
      };
    }
    default:
      return state;
  }
};

export default playersReducer;
