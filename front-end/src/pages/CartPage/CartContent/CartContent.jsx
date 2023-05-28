import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CartItem from '../CartItem/CartItem';
import {
	clearSelectedRestaurant,
	selectCart,
} from '../../../store/cart/cartSlice';

import styles from './cartContent.module.scss';

const CartContent = () => {
	const { cartData } = useSelector(selectCart);
	const [cartItems, setCartItems] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		setCartItems(cartData);
	}, [cartData]);

	useEffect(() => {
		if (cartData.length === 0) {
			dispatch(clearSelectedRestaurant());
		}
	}, [cartData.length, dispatch]);

	return (
		<div className={styles.cart}>
			{cartItems.length === 0 && (
				<p className={styles.cart__empty}>
					Your cart is empty! Please add meals to cart!
				</p>
			)}
			{cartItems.length > 0 && (
				<ul className={styles.cart__list}>
					{cartItems.map((el) => (
						<CartItem data={el} key={el.name} />
					))}
				</ul>
			)}
		</div>
	);
};

export default CartContent;
