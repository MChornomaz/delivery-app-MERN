import React from 'react';
import styles from './button.module.scss';

const Button = (props) => {
	return (
		<button className={styles.button} {...props}>
			{props.children}
		</button>
	);
};

export default Button;
