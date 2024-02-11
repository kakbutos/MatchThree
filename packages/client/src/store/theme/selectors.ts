import { RootState } from '..';

export const selectMode = (state: RootState) => state.theme.mode;
