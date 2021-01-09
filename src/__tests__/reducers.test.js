import { DELETE_PLAYER_MODAL } from '../constants/modals';
import {
  ACCOUNT_CASH, ADD, CURRENT_PLAYER, DELETE, HIDE, MODAL, PLAYER, REFILL, RESET, SET, SHOW, WITHDRAW,
} from '../store/constants/actionTypes';
import activeModal from '../store/reducers/activeModal';
import makeNewPlayer from '../utils/makeNewPlayer';
import playersTemplates from '../constants/playersTemplates';
import playersReducer from '../store/reducers/players';

describe('active modal reducer', () => {
  it('sets active modal', () => {
    const action = {
      type: `${SHOW} ${MODAL}`,
      payload: {
        name: DELETE_PLAYER_MODAL,
        data: 24,
      },
    };

    const newState = activeModal({}, action);
    expect(newState.name).toEqual(DELETE_PLAYER_MODAL);
    expect(newState.data).toEqual(24);
  });

  it('reset modals', () => {
    const action = {
      type: `${HIDE} ${MODAL}`,
    };

    const newState = activeModal({ name: DELETE_PLAYER_MODAL, data: 24 }, action);
    expect(newState.name).toEqual('');
    expect(newState.data).toBeUndefined();
  });
});

describe('player manipulations', () => {
  let playersInitialState;
  let stateWithPlayer;
  let testPlayer;

  const addNewTestPlayerAction = () => {
    const newPlayer = makeNewPlayer('Dummy', playersTemplates);
    const action = {
      type: `${ADD} ${PLAYER}`,
      payload: newPlayer,
    };
    return action;
  };
  beforeEach(() => {
    playersInitialState = {
      playersList: [],
      currentPlayer: null,
      playersTemplates,
    };
    stateWithPlayer = playersReducer(playersInitialState, addNewTestPlayerAction());
    testPlayer = stateWithPlayer.playersList[0];
  });
  it('creates a new player', () => {
    const newState = playersReducer(playersInitialState, addNewTestPlayerAction());
    const testPlayer = newState.playersList[0];
    expect(newState.playersList.length).toEqual(1);
    expect(testPlayer.playerName).toEqual('Dummy');
    expect(testPlayer.payments).toBeTruthy();
    expect(newState.currentPlayer).toBeNull();
  });
  it('removes all players', () => {
    const action = {
      type: `${RESET} ${PLAYER}`,
    };
    const resetedState = playersReducer(stateWithPlayer, action);
    expect(resetedState.playersList.length).toEqual(0);
  });
  it('sets current player', () => {
    const action = {
      type: `${SET} ${CURRENT_PLAYER}`,
      payload: testPlayer,
    };
    const newState = playersReducer(stateWithPlayer, action);
    expect(newState.currentPlayer.uid).toEqual(testPlayer.uid);
  });
  it('delete player', () => {
    const action = {
      type: `${DELETE} ${PLAYER}`,
      payload: testPlayer.uid,
    };
    const newState = playersReducer(stateWithPlayer, action);
    expect(newState.playersList.length).toEqual(0);
  });
  it('adds cash', () => {
    const testPlayerCash = testPlayer.cash;
    const action = {
      type: `${REFILL} ${ACCOUNT_CASH}`,
      payload: {
        uid: stateWithPlayer.playersList[0].uid,
        amount: 1000,
      },
    };
    const newState = playersReducer(stateWithPlayer, action);
    expect(newState.playersList[0].cash).toEqual(testPlayerCash + 1000);
  });
  it('withdraw cash', () => {
    const testPlayerCash = testPlayer.cash;
    const action = {
      type: `${WITHDRAW} ${ACCOUNT_CASH}`,
      payload: {
        uid: stateWithPlayer.playersList[0].uid,
        amount: 10,
      },
    };
    const newState = playersReducer(stateWithPlayer, action);
    expect(newState.playersList[0].cash).toEqual(testPlayerCash - 10);
  });
});
