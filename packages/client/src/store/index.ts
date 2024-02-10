import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user';
import { gameReducer } from './game';
import { themeReducer } from './theme';
import type { UserState } from '@/store/user/slice';
import type { GameState } from '@/store/game/slice';
import type { ThemeState } from '@/store/theme/slice';

export interface PreloadedState {
  user: UserState;
  game: GameState;
  theme: ThemeState;
}

export const store = (
  preloadedState: PreloadedState | Record<string, never> = {}
) =>
  configureStore({
    reducer: {
      user: userReducer,
      game: gameReducer,
      theme: themeReducer,
    },
    preloadedState,
  });

// @ts-ignore
export type RootState = ReturnType<typeof store.getState>;
// @ts-ignore
export type AppDispatch = typeof store.dispatch;
