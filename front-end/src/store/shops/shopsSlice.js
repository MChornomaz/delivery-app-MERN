import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	shopsLoading: false,
	shopsError: null,
	shopsData: [],
};

export const shopsSlice = createSlice({
	name: 'shops',
	initialState,

	reducers: {
		setShopLoading: (state) => {
			state.shopsLoading = true;
		},
		setShopsData: (state, action) => {
			state.shopsData = action.payload;
			state.shopsLoading = false;
		},
		setShopsError: (state, action) => {
			state.shopsError = action.payload;
			state.shopsLoading = false;
		},
	},
});

export const { setShopLoading, setShopsData, setShopsError } =
	shopsSlice.actions;

export const selectShops = (state) => state.shops;

export default shopsSlice.reducer;
