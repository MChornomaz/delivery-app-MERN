import React, { useCallback, useEffect } from 'react';

import Input from '../../../UI/Input/Input';
import useInput from './../../../hooks/use-input';

import styles from './cartForm.module.scss';

const CartForm = ({
	setFormValidity,
	setUserName,
	setUserEmail,
	setUserPhone,
	setUserAddress,
}) => {
	const {
		value: userName,
		isValid: userNameIsValid,
		hasError: userNameHasError,
		inputBlurHandler: userNameInputBlurHandler,
		setEnteredValue: setName,
	} = useInput((value) => value.length >= 3);

	const {
		value: userEmail,
		isValid: userEmailIsValid,
		hasError: userEmailHasError,
		inputBlurHandler: userEmailInputBlurHandler,
		setEnteredValue: setEmail,
	} = useInput((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

	const {
		value: userPhone,
		isValid: userPhoneIsValid,
		hasError: userPhoneHasError,
		inputBlurHandler: userPhoneInputBlurHandler,
		setEnteredValue: setPhone,
	} = useInput((value) => /^\d{10}$/.test(value));

	const {
		value: userAddress,
		isValid: userAddressIsValid,
		hasError: userAddressHasError,
		inputBlurHandler: userAddressInputBlurHandler,
		setEnteredValue: setAddress,
	} = useInput((value) => value.length > 10);

	useEffect(() => {
		if (
			userNameIsValid &&
			userPhoneIsValid &&
			userEmailIsValid &&
			userAddressIsValid
		) {
			setFormValidity(true);
		} else {
			setFormValidity(false);
		}
	}, [
		setFormValidity,
		userNameIsValid,
		userPhoneIsValid,
		userEmailIsValid,
		userAddressIsValid,
	]);

	const userNameChangeHandler = useCallback(
		(e) => {
			setName(e.target.value);
			setUserName(e.target.value);
		},
		[setUserName, setName]
	);

	const userEmailChangeHandler = useCallback(
		(e) => {
			setEmail(e.target.value);
			setUserEmail(e.target.value);
		},
		[setUserEmail, setEmail]
	);

	const userPhoneChangeHandler = useCallback(
		(e) => {
			setPhone(e.target.value);
			setUserPhone(e.target.value);
		},
		[setUserPhone, setPhone]
	);

	const userAddressChangeHandler = useCallback(
		(e) => {
			setAddress(e.target.value);
			setUserAddress(e.target.value);
		},
		[setUserAddress, setAddress]
	);

	return (
		<div className={styles.form__container}>
			<form className={styles.form}>
				<Input
					type='text'
					label='Name:'
					id='user-name'
					value={userName}
					onChange={userNameChangeHandler}
					onBlur={userNameInputBlurHandler}
					hasError={userNameHasError}
					errorText='Please enter your name'
				/>
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
					type='tel'
					label='Phone:'
					id='user-phone'
					value={userPhone}
					onChange={userPhoneChangeHandler}
					onBlur={userPhoneInputBlurHandler}
					hasError={userPhoneHasError}
					errorText='Please enter your phone starting with 0'
				/>
				<Input
					type='text'
					label='Address:'
					id='user-address'
					value={userAddress}
					onChange={userAddressChangeHandler}
					onBlur={userAddressInputBlurHandler}
					hasError={userAddressHasError}
					errorText='Please enter your address'
				/>
			</form>
		</div>
	);
};

export default CartForm;
