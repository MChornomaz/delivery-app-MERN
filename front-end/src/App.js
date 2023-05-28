import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import ShopPage from './pages/ShopPage/ShopPage';
import CartPage from './pages/CartPage/CartPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Spinner from './UI/Spinner/Spinner';

import ProductList from './pages/ShopPage/ProductList/ProductList';
import { fetchRestaurants } from './store/shops/restaurant-actions';
import { selectShops } from './store/shops/shopsSlice';
import { ROUTES } from './routes';

import './App.css';

function App() {
	const [burgerOpened, setBurgerOpened] = useState(false);
	const [mobileScreen, setMobileScreen] = useState(false);

	const burgerButtonClickHandler = useCallback(() => {
		if (mobileScreen) {
			setBurgerOpened(!burgerOpened);
		}
	}, [burgerOpened, mobileScreen]);

	const dispatch = useDispatch();
	const { shopsLoading, shopsError } = useSelector(selectShops);

	useEffect(() => {
		function handleResize() {
			if (window.innerWidth <= 900) {
				setMobileScreen(true);
			} else {
				setMobileScreen(false);
			}
		}
		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		dispatch(fetchRestaurants());
	}, [dispatch]);
	return (
		<>
			{shopsLoading && !shopsError && <Spinner />}
			<Header
				burgerOpened={burgerOpened}
				burgerHandler={burgerButtonClickHandler}
			/>
			{!shopsLoading && !shopsError && (
				<main className='app-main'>
					<Routes>
						<Route path='/' element={<Navigate to={ROUTES.homePage} />} />
						<Route
							path={ROUTES.homePage}
							element={
								<ShopPage
									burgerOpened={burgerOpened}
									burgerHandler={burgerButtonClickHandler}
								/>
							}
						>
							<Route
								path={`${ROUTES.homePage}/:shopId`}
								element={<ProductList burgerOpened={burgerOpened} />}
							/>
						</Route>
						<Route path={ROUTES.cartPage} element={<CartPage />} />
						<Route path={ROUTES.historyPage} element={<HistoryPage />}></Route>
					</Routes>
				</main>
			)}
			<Footer />
		</>
	);
}

export default App;
