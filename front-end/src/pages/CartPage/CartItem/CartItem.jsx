import React, { useCallback, useState } from 'react';

import styles from './cartItem.module.scss';
import { useDispatch } from 'react-redux';
import {
	addItemToCart,
	removeItemFromCart,
} from '../../../store/cart/cartSlice';

const CartItem = ({ data: { name, price, imageUrl, quantity }, isHistory }) => {
	const [amount, setAmount] = useState(quantity);
	const dispatch = useDispatch();

	const amountChangeHandler = useCallback((e) => {
		setAmount(e.target.value);
	}, []);

	const addItemToCartHandler = useCallback(() => {
		setAmount((prevAmount) => prevAmount + 1);
		const itemToAdd = {
			name: name,
			price: price,
			imageUrl: imageUrl,
			quantity: 1,
		};
		dispatch(addItemToCart(itemToAdd));
	}, [dispatch, imageUrl, name, price]);

	const removeItemFromCartHandler = useCallback(() => {
		setAmount((prevAmount) => prevAmount - 1);
		const itemToAdd = {
			name: name,
			price: price,
			imageUrl: imageUrl,
			quantity: 1,
		};
		dispatch(removeItemFromCart(itemToAdd));
	}, [dispatch, imageUrl, name, price]);

	return (
		<li className={styles.item}>
			<div
				className={styles.item__image}
				style={{ backgroundImage: `url(${imageUrl})` }}
			></div>
			<div className={styles.item__content}>
				<p className={styles.item__name}>{name}</p>
				<p>
					Price:
					<span>{price}</span>
				</p>
				<div className={styles.item__controls}>
					{!isHistory && <button onClick={removeItemFromCartHandler}>-</button>}
					<input
						type='number'
						value={amount}
						onChange={amountChangeHandler}
						className={styles.item__input}
						disabled
					/>
					{!isHistory && <button onClick={addItemToCartHandler}>+</button>}
				</div>
			</div>
		</li>
	);
};

export default CartItem;
