import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    starters: [],
    mains: [],
    drinks: [],
    desserts: [],
  },
  reducers: {
    setMenuData: (state, action) => {
      const { starters, mains, drinks, desserts } = action.payload;
      state.starters = starters;
      state.mains = mains;
      state.drinks = drinks;
      state.desserts = desserts;
    },
  },
});

export const { setMenuData } = menuSlice.actions;
export const selectMenuData = (state) => state.menu;

export default menuSlice.reducer;