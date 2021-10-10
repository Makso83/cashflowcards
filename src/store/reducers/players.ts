import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import playersTemplates, { Templates } from '../../constants/playersTemplates';
import { ExtendedPlayer } from '../../utils/makeNewPlayer';
import { RootState } from '../index';

type PlayerState = {
  playersList: Array<ExtendedPlayer>,
  currentPlayer: string | null,
  playersTemplates: Templates,
}

const initialState: PlayerState = {
  playersList: [],
  currentPlayer: null,
  playersTemplates,
};

const player = createSlice({
  name: 'player',
  initialState,
  reducers: {
    addPlayer: (state: PlayerState, action: PayloadAction<ExtendedPlayer>) => {
      if (action.payload) {
        state.playersList.push(action.payload);
      }
    },
    deletePlayer: (state: PlayerState, action: PayloadAction<string>) => ({
      ...state,
      playersList:
          state.playersList.filter((playerElement) => playerElement.uid !== action.payload),
    }),
    resetPlayer: () => initialState,
    deleteProfession: (state: PlayerState, action: PayloadAction<string>) => ({
      ...state,
      playersTemplates:
          state.playersTemplates.filter((template) => template.professionId !== action.payload),
    }),
    restoreProfession: (state: PlayerState, action: PayloadAction<string>) => {
      const id = action.payload;
      const restored = playersTemplates.find((profession) => profession.professionId === id);
      return restored ? {
        ...state,
        playersTemplates: [...state.playersTemplates, restored],
      } : state;
    },
    setCurrentPlayer: (state: PlayerState, action: PayloadAction<string>) => ({
      ...state,
      currentPlayer: action.payload,
    }),
    resetCurrentPlayer: (state: PlayerState) => ({
      ...state,
      currentPlayer: null,
    }),
    refillAccountCash: (
      state: PlayerState,
      action: PayloadAction<{uid: string, amount: number}>,
    ) => {
      // const newState = { ...state };
      const playerUID = action.payload.uid;
      const playerLink = state.playersList.find((person) => person.uid === playerUID);
      if (playerLink) {
        playerLink.cash += action.payload.amount;
      }
      return state;
    },
    withdrawAccountCash: (
      state: PlayerState,
      action: PayloadAction<{uid: string, amount: number}>,
    ) => {
      const playerUID = action.payload.uid;
      const playerLink = state.playersList.find((person) => person.uid === playerUID);
      if (playerLink) {
        playerLink.cash -= action.payload.amount;
      }
      return state;
    },
    addBankCredit: (
      state: PlayerState,
      action: PayloadAction<{uid: string, amount: number}>,
    ) => {
      const playerUID = action.payload.uid;
      const playerLink = state.playersList.find((person) => person.uid === playerUID);
      if (playerLink) {
        playerLink.cash += +action.payload.amount;
        playerLink.debts.bank += +action.payload.amount;
        playerLink.payments.bank += +action.payload.amount * 0.1;
      }
      return state;
    },
  },
});

export const selectPlayersList = (state: RootState) => state.players.playersList;
export const selectCurrentPlayer = (state: RootState) => state.players.currentPlayer;
export const selectPlayersTemplates = (state: RootState) => state.players.playersTemplates;

export const {
  addPlayer,
  deletePlayer,
  resetPlayer,
  deleteProfession,
  addBankCredit,
  restoreProfession,
  setCurrentPlayer,
  resetCurrentPlayer,
  refillAccountCash,
  withdrawAccountCash,
} = player.actions;

export default player.reducer;
