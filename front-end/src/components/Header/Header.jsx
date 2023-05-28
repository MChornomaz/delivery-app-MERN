import React from 'react';
import { NavLink } from 'react-router-dom';

import BurgerButton from '../../UI/BurgerButton/BurgerButton';
import { ROUTES } from '../../routes';

import styles from './header.module.scss';

const Header = ({ burgerOpened, burgerHandler }) => {
	return (
		<header className={styles.header}>
			<BurgerButton
				classname={`${styles.burger} ${burgerOpened && styles.opened}`}
				onClick={burgerHandler}
			>
				<span />
			</BurgerButton>
			<nav className={styles.header__navigation}>
				<NavLink className={styles.header__link} to={ROUTES.homePage}>
					Shop
				</NavLink>
				<span className={styles.header__separator}></span>
				<NavLink className={styles.header__link} to={ROUTES.cartPage}>
					Shopping Cart
				</NavLink>
				<span className={styles.header__separator}></span>
				<NavLink className={styles.header__link} to={ROUTES.historyPage}>
					History
				</NavLink>
			</nav>
		</header>
	);
};

export default Header;
