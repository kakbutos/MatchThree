import { RootState } from '..';

export const selectGameStatus = (state: RootState) => state.game.currentStatus;
