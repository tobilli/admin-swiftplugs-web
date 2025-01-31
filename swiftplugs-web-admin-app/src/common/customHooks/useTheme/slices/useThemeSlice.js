import {createSlice} from '@reduxjs/toolkit';

const useThemeSlice = createSlice({
  name: 'useTheme',
  initialState: {
    isDarkmode: null,
  },

  reducers: {
    setIsDarkMode: (state, action) => {
      state.isDarkmode = action.payload;
    },
  },
});

export const {setIsDarkMode} = useThemeSlice.actions;

export default useThemeSlice.reducer;

export const selectedTheme = state => state.useTheme.isDarkmode;
