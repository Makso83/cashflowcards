import { configureStore } from '@reduxjs/toolkit';
import activeModal from './reducers/activeModal';
import players from './reducers/players';

export const store = configureStore({
  reducer: {
    activeModal,
    players,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
