import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addItemToCart, selectRestaurant } from '../../../store/cart/cartSlice';
import Button from './../../../UI/buttons/Button';

import styles from './productCard.module.scss';

const ProductCard = ({
	productData: { name, price, description, imageUrl },
	showModal,
	shop,
}) => {
	const [counter, setCounter] = useState(0);
	const dispatch = useDispatch();

	const increaseProductCount = useCallback(() => {
		if (counter < 10) {
			setCounter((counter) => counter + 1);
		} else {
			setCounter(10);
		}
	}, [counter]);

	const decreaseProductCount = useCallback(() => {
		if (counter > 0) {
			setCounter((counter) => counter - 1);
		} else {
			setCounter(0);
		}
	}, [counter]);

	const addToCartHandler = useCallback(() => {
		if (counter > 0) {
			const newCartItem = {
				name: name,
				price: price,
				imageUrl: imageUrl,
				quantity: counter,
			};
			dispatch(addItemToCart(newCartItem));
			dispatch(selectRestaurant(shop));
			showModal();
		}
	}, [counter, name, price, imageUrl, dispatch, showModal, shop]);

	return (
		<li className={styles.card}>
			<div
				className={styles.card__image}
				style={{ backgroundImage: `url(${imageUrl})` }}
			></div>
			<div>
				<h3 className={styles.card__name}>{name}</h3>
				<p className={styles.card__description}>{description}</p>
				<p className={styles.card__price}>{price}</p>
			</div>
			<div className={styles.card__form}>
				<div className={styles.card__counter}>
					<button
						className={styles['card__counter-btn']}
						type='button'
						onClick={decreaseProductCount}
					>
						-
					</button>
					<p type='number' className={styles.card__input}>
						{counter}
					</p>
					<button
						className={styles['card__counter-btn']}
						type='button'
						onClick={increaseProductCount}
					>
						+
					</button>
				</div>
				<Button onClick={addToCartHandler} disabled={counter === 0}>
					Add to Cart
				</Button>
			</div>
		</li>
	);
};

export default ProductCard;
