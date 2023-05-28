import React from 'react';

import styles from './footer.module.scss';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<p>
				Just simple delivery app. Developed by Maksym Chornomaz. &copy; No
				rights reserved :P
			</p>
		</footer>
	);
};

export default Footer;
