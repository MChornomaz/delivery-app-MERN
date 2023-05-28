import {
	clearCart,
	setCartError,
	setCartLoading,
	setOrderId,
} from './cartSlice';

export const createOrder = (order) => {
	return async (dispatch) => {
		const sendData = async () => {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_URL}/orders`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(order),
				}
			);

			if (!response.ok) {
				throw new Error('Creating order failed!');
			}

			const data = await response.json();

			return data.id;
		};

		try {
			const orderId = await sendData();
			dispatch(setCartLoading(true));
			dispatch(setOrderId(orderId));
			dispatch(clearCart());
		} catch (error) {
			dispatch(setCartError('Sending order failed!'));
		}
	};
};
