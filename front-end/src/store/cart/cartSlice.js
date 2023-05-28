import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	selectedRestaurant: null,
	cartLoading: false,
	cartError: null,
	cartData: [],
	cartTotal: 0,
	orderId: '',
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,

	reducers: {
		setCartLoading: (state, action) => {
			state.cartLoading = action.payload;
		},
		addItemToCart: (state, action) => {
			const index = state.cartData.findIndex(
				(el) => el.name === action.payload.name
			);
			if (index === -1) {
				state.cartData.push(action.payload);
			} else {
				const element = state.cartData[index];
				element.quantity = element.quantity + action.payload.quantity;
				state.cartData[index] = element;
			}

			state.cartTotal = parseFloat(
				(
					state.cartTotal +
					action.payload.quantity * action.payload.price
				).toFixed(2)
			);
		},
		removeItemFromCart: (state, action) => {
			const index = state.cartData.findIndex(
				(el) => el.name === action.payload.name
			);
			const element = state.cartData[index];
			if (element.quantity === 1) {
				state.cartData = state.cartData.filter(
					(el) => el.name !== action.payload.name
				);
				state.cartTotal = parseFloat(
					(
						state.cartTotal -
						action.payload.quantity * action.payload.price
					).toFixed(2)
				);
			} else if (element.quantity > action.payload.quantity) {
				element.quantity = element.quantity - action.payload.quantity;
				state.cartData[index] = element;
				state.cartTotal = parseFloat(
					(
						state.cartTotal -
						action.payload.quantity * action.payload.price
					).toFixed(2)
				);
			}
		},
		setCartError: (state, action) => {
			state.cartError = action.payload;
			state.cartLoading = false;
		},
		setOrderId: (state, action) => {
			state.orderId = action.payload;
			state.cartLoading = false;
		},
		clearCart: (state) => {
			state.cartData = [];
		},
		selectRestaurant: (state, action) => {
			state.selectedRestaurant = action.payload;
		},
		clearSelectedRestaurant: (state) => {
			state.selectedRestaurant = null;
		},
	},
});

export const {
	setCartLoading,
	addItemToCart,
	removeItemFromCart,
	setCartError,
	setOrderId,
	clearCart,
	selectRestaurant,
	clearSelectedRestaurant,
} = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
