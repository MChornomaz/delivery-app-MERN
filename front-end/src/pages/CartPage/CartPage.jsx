import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CartForm from './CartForm/CartForm';
import CartContent from './CartContent/CartContent';
import Button from '../../UI/buttons/Button';
import Modal from '../../UI/Modal/Modal';
import Spinner from '../../UI/Spinner/Spinner';
import { selectCart } from '../../store/cart/cartSlice';
import { createOrder } from '../../store/cart/cart-actions';
import { ROUTES } from '../../routes';

import styles from './cartPage.module.scss';

const CartPage = () => {
	const [totalPrice, setTotalPrice] = useState(0);
	const [formIsValid, setFormIsValid] = useState(false);
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPhone, setUserPhone] = useState('');
	const [userAddress, setUserAddress] = useState('');
	const { cartTotal, cartData, orderId } = useSelector(selectCart);
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { cartLoading, cartError } = useSelector(selectCart);
	const [showErrorModal, setShowErrorModal] = useState(false);

	useEffect(() => {
		setTotalPrice(cartTotal);
	}, [cartTotal]);

	const createOrderHandler = () => {
		if (formIsValid && cartData.length > 0) {
			const order = {
				userName,
				userEmail,
				userPhone,
				userAddress,
				total: cartTotal,
				order: cartData,
			};

			dispatch(createOrder(order));
			setShowModal(true);
		} else {
			setShowErrorModal(true);
		}
	};

	const closeModalHandler = useCallback(() => {
		setShowModal(false);
		navigate(ROUTES.homePage);
	}, [navigate]);

	const closeErrorModalHandler = useCallback(() => {
		setShowErrorModal(false);
	}, []);

	return (
		<>
			{showModal && orderId && (
				<Modal onClose={closeModalHandler}>
					<div className={styles.modal}>
						<h2 className={styles.modal__heading}>
							Thanks, your order is successful!
						</h2>
						<p className={styles.modal__text}>
							Your order id is: <span>{orderId}</span>
						</p>
						<Button onClick={closeModalHandler}>Close</Button>
					</div>
				</Modal>
			)}
			{showErrorModal && (
				<Modal onClose={closeErrorModalHandler} small={true}>
					<div className={styles.modal}>
						<h2 className={styles.modal__heading}>
							Please enter your name, email, phone and address
						</h2>

						<Button onClick={closeErrorModalHandler}>Close</Button>
					</div>
				</Modal>
			)}
			{cartLoading && !cartError && <Spinner />}
			{cartError && (
				<h3 className='loading-error'>
					Something went wrong, please try again later
				</h3>
			)}
			{!cartLoading && !cartError && (
				<div className={styles.container}>
					<div className={styles.cart}>
						<CartForm
							setFormValidity={setFormIsValid}
							setUserName={setUserName}
							setUserEmail={setUserEmail}
							setUserPhone={setUserPhone}
							setUserAddress={setUserAddress}
						/>
						<CartContent />
					</div>
					<div className={styles.cart__order}>
						<div className={styles.cart__controls}>
							<div className={styles.cart__price}>
								<p>Total price:</p>
								<span>{totalPrice}</span>
							</div>
							<Button
								onClick={createOrderHandler}
								disabled={cartData.length === 0}
							>
								Submit
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CartPage;
