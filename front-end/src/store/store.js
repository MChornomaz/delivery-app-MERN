import { configureStore } from '@reduxjs/toolkit';
import shopsReducer from './shops/shopsSlice';
import cartReducer from './cart/cartSlice';

export const store = configureStore({
	reducer: {
		shops: shopsReducer,
		cart: cartReducer,
	},
});
