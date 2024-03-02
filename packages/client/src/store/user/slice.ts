import { authApi } from '@/services/api/auth/auth-api';
import { LoadingStatus } from '@/types/loading-status';
import type { User } from '@/types/user';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCurrentMode } from '../theme/slice';

export interface UserState {
  currentUser: User | null;
  status: LoadingStatus;
}

const initialState: UserState = {
  currentUser: null,
  status: LoadingStatus.INITIAL,
};

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (_, { dispatch }) => {
    const response = await authApi.getCurrent();
    if (response.data?.id) {
      dispatch(fetchCurrentMode(response.data?.id));
    }
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clear: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentUser.pending, state => {
        state.status = LoadingStatus.LOADING;
      })
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = LoadingStatus.SUCCEEDED;
          state.currentUser = action.payload;
        }
      )
      .addCase(fetchCurrentUser.rejected, state => {
        state.status = LoadingStatus.FAILED;
      });
  },
});
