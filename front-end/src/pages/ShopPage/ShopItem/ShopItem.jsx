import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCart } from '../../../store/cart/cartSlice';
import { ROUTES } from '../../../routes';

import styles from './shopItem.module.scss';

const ShopItem = ({ shopData, onSelect, burgerHandler }) => {
	const navigate = useNavigate();
	const { shopId } = useParams();
	const [activeShop, setActiveShop] = useState(false);
	const { name, id } = shopData;
	const { selectedRestaurant } = useSelector(selectCart);
	const [shopAvailable, setShopAvailable] = useState(true);

	useEffect(() => {
		if (shopId === id) {
			setActiveShop(true);
		} else {
			setActiveShop(false);
		}
	}, [id, shopId]);

	useEffect(() => {
		if (selectedRestaurant === shopId) {
			setShopAvailable(false);
		} else {
			setShopAvailable(true);
		}
	}, [selectedRestaurant, shopId]);

	const selectShopHandler = useCallback(() => {
		if (!selectedRestaurant || selectedRestaurant === id) {
			onSelect();
			navigate(`${ROUTES.homePage}/${id}`);
			burgerHandler();
		}
	}, [onSelect, navigate, id, selectedRestaurant, burgerHandler]);

	const classes = `${styles.item} ${activeShop ? styles.active : ''} ${
		!shopAvailable ? styles.disabled : ''
	}`;

	return (
		<li onClick={selectShopHandler} className={classes}>
			{name}
		</li>
	);
};

export default ShopItem;
