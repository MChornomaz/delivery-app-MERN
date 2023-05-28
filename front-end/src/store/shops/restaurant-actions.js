import { setShopLoading, setShopsData, setShopsError } from './shopsSlice';

export const fetchRestaurants = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_URL}/restaurants`
			);

			if (!response.ok) {
				throw new Error('Could not fetch places data!');
			}
			const data = await response.json();

			return data;
		};

		try {
			const restaurantsData = await fetchData();
			dispatch(setShopLoading(true));
			dispatch(setShopsData(restaurantsData.restaurants));
		} catch (error) {
			dispatch(setShopsError('Fetching places failed!'));
		}
	};
};
