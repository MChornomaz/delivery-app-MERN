import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { selectCart } from '../../store/cart/cartSlice';
import { selectShops } from '../../store/shops/shopsSlice';
import { ROUTES } from '../../routes';
import Spinner from '../../UI/Spinner/Spinner';
import ShopList from './ShopList/ShopList';

import styles from './shopPage.module.scss';

const ShopPage = ({ burgerOpened, burgerHandler }) => {
	const [shopSelected, setShopSelected] = useState(false);
	const { shopsLoading, shopsError } = useSelector(selectShops);
	const { selectedRestaurant } = useSelector(selectCart);
	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (selectedRestaurant) {
			navigate(`${ROUTES.homePage}/${selectedRestaurant}`);
		}
	}, [selectedRestaurant, navigate]);

	useEffect(() => {
		if (pathname === '/shop') {
			setShopSelected(false);
		} else {
			setShopSelected(true);
		}
	}, [pathname]);

	const selectShopHandler = useCallback(() => {
		setShopSelected(true);
	}, []);

	return (
		<div
			className={`${styles.content} ${
				burgerOpened ? styles.burger_opened : ''
			}`}
		>
			{shopsLoading && !shopsError && <Spinner />}
			{!shopsLoading && !shopsError && (
				<>
					<ShopList
						onSelect={selectShopHandler}
						burgerOpened={burgerOpened}
						burgerHandler={burgerHandler}
					/>
					<div className={styles.menu}>
						{!shopSelected && <h2>Please select the shop!</h2>}
						<Outlet />
					</div>
				</>
			)}
			{shopsError && <h3>Sorry, something went wrong, try again later :(</h3>}
		</div>
	);
};

export default ShopPage;
