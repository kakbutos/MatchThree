import { userSlice } from './slice';
import * as selectors from './selectors';

export const userReducer = userSlice.reducer;

export const UserStore = {
  actions: userSlice.actions,
  selectors: selectors,
};
