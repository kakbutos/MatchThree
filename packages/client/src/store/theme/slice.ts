import { themeApi } from '@/services/api/theme/theme-api';
import { ThemeMode } from '@/types/theme/mode';
import { ThemeRequest } from '@/types/theme/theme';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: ThemeMode.Light,
};

export const fetchCurrentMode = createAsyncThunk(
  'theme/fetchMode',
  async (userId: number) => {
    const response = await themeApi.getMode(userId);
    return response.data;
  }
);

export const fetchToggleCurrentMode = createAsyncThunk(
  'theme/fetchToggleCurrentMode',
  async (_, { getState }) => {
    const state: RootState = getState();
    const data = {
      userId: state.user.currentUser.id as number,
      theme:
        state.theme.mode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light,
    };
    await themeApi.toggleMode(data);
    return data;
  }
);

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    clear: () => initialState,
    toggleColorMode: state => {
      state.mode =
        state.mode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        fetchCurrentMode.fulfilled,
        (state, action: PayloadAction<ThemeRequest | null>) => {
          state.mode = action.payload?.theme || ThemeMode.Light;
        }
      )
      .addCase(
        fetchToggleCurrentMode.fulfilled,
        (state, action: PayloadAction<ThemeRequest>) => {
          state.mode = action.payload.theme;
        }
      );
  },
});
