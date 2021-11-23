import { useRadioGroup } from "@material-ui/core";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateUser } from "services/appAuth";
import { getThemes as getThemesAPI } from "../../services/theme";

export const getThemes = createAsyncThunk("theme/getThemes", async (_, { dispatch }) => {
  const { data } = await getThemesAPI();
  await dispatch(setThemes(data));
});

export const DEFAULT_THEME = "light";
export const DARK_THEME = "dark";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    current: DEFAULT_THEME,
    themes: [],
  },
  reducers: {
    setCurrent: (state, { payload }) => {
      state.current = payload;
    },
    toggleTheme: (state) => {
      state.current = state.current === DEFAULT_THEME ? DARK_THEME : DEFAULT_THEME;
    },
    setThemes: (state, { payload }) => {
      state.themes = payload;
    },
  },
});

export const { setCurrent, toggleTheme, setThemes } = themeSlice.actions;

//@ts-ignore
export const currentThemeSelector = (state) => state.theme.themes.find((t) => t.name === state.theme.current);

//@ts-ignore
export const currentThemeNameSelector = (state) => state.theme.current;
export default themeSlice.reducer;
