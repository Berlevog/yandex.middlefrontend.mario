import { createSlice } from "@reduxjs/toolkit";

export const drawerSlice = createSlice({
  name: "drawer",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleIsOpen } = drawerSlice.actions;

//@ts-ignore
export const isOpenSelector = (state) => state.drawer.isOpen;

export default drawerSlice.reducer;
