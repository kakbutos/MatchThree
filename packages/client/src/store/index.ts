import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user';
import { gameReducer } from './game';
import type { UserState } from '@/store/user/slice';
import type { GameState } from '@/store/game/slice';

export interface PreloadedState {
  user: UserState;
  game: GameState;
}

export const store = (
  preloadedState: PreloadedState | Record<string, never> = {}
) =>
  configureStore({
    reducer: {
      user: userReducer,
      game: gameReducer,
    },
    preloadedState,
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
