import { GameStatus } from '@/types/game-status';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface GameState {
  currentStatus: GameStatus;
}

const initialState: GameState = {
  currentStatus: GameStatus.GAME,
  // currentStatus: GameStatus.START,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeStatus(state, action: PayloadAction<GameStatus>) {
      state.currentStatus = action.payload;
    },
  },
});
