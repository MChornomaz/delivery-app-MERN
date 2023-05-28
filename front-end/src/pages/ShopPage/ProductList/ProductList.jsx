import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectShops } from '../../../store/shops/shopsSlice';
import ProductCard from '../ProductCard/ProductCard';
import Modal from '../../../UI/Modal/Modal';
import Button from '../../../UI/buttons/Button';

import styles from './productList.module.scss';

const ProductList = ({ burgerOpened }) => {
	const [products, setProducts] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const { shopId } = useParams();

	const { shopsData } = useSelector(selectShops);

	const modalHandler = useCallback(() => {
		setShowModal(!showModal);
	}, [showModal]);

	useEffect(() => {
		if (shopId && shopsData) {
			const selectedShop = shopsData.find((shop) => shop.id === shopId);
			if (selectedShop) {
				setProducts(selectedShop.menu);
			}
		}
	}, [shopId, shopsData]);

	return (
		<>
			{showModal && (
				<Modal onClose={setShowModal} small={true}>
					<div className={styles.modal}>
						<h3>Successfully added to cart! </h3>
						<Button onClick={modalHandler}>Close</Button>
					</div>
				</Modal>
			)}
			<ul
				className={`${styles.products} ${
					burgerOpened ? styles.burger_open : ''
				}`}
			>
				{products.map((product) => (
					<ProductCard
						productData={product}
						key={product.name}
						showModal={modalHandler}
						shop={shopId}
					/>
				))}
			</ul>
		</>
	);
};

export default ProductList;
