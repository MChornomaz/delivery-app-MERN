import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ShopItem from '../ShopItem/ShopItem';
import { selectShops } from '../../../store/shops/shopsSlice';

import styles from './shopList.module.scss';

const ShopList = ({ burgerOpened, burgerHandler, onSelect }) => {
	const [shops, setShops] = useState([]);

	const { shopsData } = useSelector(selectShops);
	useEffect(() => {
		if (shopsData.length > 0) {
			setShops(shopsData);
		}
	}, [shopsData]);

	return (
		<aside className={`${styles.sidebar} ${burgerOpened ? styles.shown : ''}`}>
			<h2 className={styles.sidebar__heading}>Shops:</h2>
			<nav className={styles.sidebar__navigation}>
				<ul className={styles['sidebar__navigation-list']}>
					{shops.length > 0 &&
						shops.map((shop) => (
							<ShopItem
								onSelect={onSelect}
								shopData={shop}
								key={shop.id}
								burgerHandler={burgerHandler}
							/>
						))}
				</ul>
			</nav>
		</aside>
	);
};

export default ShopList;
