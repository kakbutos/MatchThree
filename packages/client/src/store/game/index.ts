import { gameSlice } from './slice';
import * as selectors from './selectors';

export const gameReducer = gameSlice.reducer;

export const GameStore = {
  actions: gameSlice.actions,
  selectors: selectors,
};
