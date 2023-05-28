import React, { useState } from 'react';

import Input from '../../UI/Input/Input';
import Button from '../../UI/buttons/Button';
import useInput from '../../hooks/use-input';
import CartItem from '../CartPage/CartItem/CartItem';
import Spinner from '../../UI/Spinner/Spinner';

import styles from './historyPage.module.scss';

const HistoryPage = () => {
	const {
		value: orderId,
		isValid: orderIdIsValid,
		valueChangeHandler: orderIdChangeHandler,
		hasError: orderIdHasError,
		inputBlurHandler: orderIdInputBlurHandler,
	} = useInput((value) => value.length >= 3);

	const {
		value: userEmail,
		isValid: userEmailIsValid,
		valueChangeHandler: userEmailChangeHandler,
		hasError: userEmailHasError,
		inputBlurHandler: userEmailInputBlurHandler,
	} = useInput((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

	const [orderData, setOrderData] = useState(null);
	const [historyLoading, setHistoryLoading] = useState(false);
	const [historyError, setHistoryError] = useState(null);

	const formSubmitHandler = async (e) => {
		e.preventDefault();
		if (orderIdIsValid || userEmailIsValid) {
			const requestData = {
				orderId: orderIdIsValid ? orderId : null,
				userEmail: userEmailIsValid ? userEmail : null,
			};

			try {
				setHistoryLoading(true);
				setHistoryError(null);
				const response = await fetch(
					`${process.env.REACT_APP_SERVER_URL}/orders/history`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(requestData),
					}
				);

				if (!response.ok) {
					setHistoryError('Nothing was found, please check your data!');
					throw new Error('Fetching order failed!');
				}

				const data = await response.json();
				setOrderData(data.orders);
			} catch (error) {
				setHistoryError('Nothing was found, please check your data!');
			} finally {
				setHistoryLoading(false);
			}
		}
	};

	return (
		<div className={styles.content}>
			<section className={styles.data}>
				<div className={styles.data__content}>
					<h2>Enter your Email or order ID to see your order history</h2>
					<form onSubmit={formSubmitHandler} className={styles.data__form}>
						<Input
							type='email'
							label='Email:'
							id='user-email'
							value={userEmail}
							onChange={userEmailChangeHandler}
							onBlur={userEmailInputBlurHandler}
							hasError={userEmailHasError}
							errorText='Please enter valid email'
						/>
						<Input
							type='text'
							label='Order ID:'
							id='order-id'
							value={orderId}
							onChange={orderIdChangeHandler}
							onBlur={orderIdInputBlurHandler}
							hasError={orderIdHasError}
							errorText='Please enter valid order id'
						/>
						<Button type='submit'>Search</Button>
					</form>
				</div>
				<div className={styles.history}>
					{historyLoading && !historyError && <Spinner />}
					{historyError && (
						<h3 className='loading-error'>
							Nothing was found, please check your data
						</h3>
					)}
					{!historyLoading && !historyError && (
						<div className={styles.history__list}>
							{orderData &&
								orderData.map((order) => (
									<div key={order.id} className={styles.history__item}>
										<div className={styles.history__cards}>
											{order.order.map((item) => (
												<CartItem
													data={item}
													key={item.name}
													isHistory={true}
												/>
											))}
										</div>
										<div className={styles.history__price}>
											<p>Total price: {order.total}</p>
										</div>
									</div>
								))}
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

export default HistoryPage;
