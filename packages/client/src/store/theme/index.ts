import { themeSlice } from './slice';
import * as selectors from './selectors';

export const themeReducer = themeSlice.reducer;

export const ThemeStore = {
  actions: themeSlice.actions,
  selectors: selectors,
};
