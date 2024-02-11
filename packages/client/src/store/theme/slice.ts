import { themeApi } from '@/services/api/theme/theme-api';
import { ThemeMode } from '@/types/theme/mode';
import { ThemeResonse } from '@/types/theme/theme';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: ThemeMode.Light,
};

export const fetchCurrentMode = createAsyncThunk(
  'theme/fetchMode',
  async () => {
    const response = await themeApi.getMode();
    return response.data;
  }
);

// TODO COD-64 вместо toggleColorMode вызывать fetchToggleCurrentMode
export const fetchToggleCurrentMode = createAsyncThunk(
  'theme/fetchToggleCurrentMode',
  async () => {
    const response = await themeApi.toggleMode();
    return response.data;
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
        (state, action: PayloadAction<ThemeResonse>) => {
          state.mode = action.payload.mode;
        }
      )
      .addCase(
        fetchToggleCurrentMode.fulfilled,
        (state, action: PayloadAction<ThemeResonse>) => {
          state.mode = action.payload.mode;
        }
      );
  },
});
