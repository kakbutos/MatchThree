import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user';
import { gameReducer } from './game';

export const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
