import styles from './burgerButton.module.scss';

const BurgerButton = (props) => {
	return (
		<button
			type={'button'}
			onClick={props.onClick}
			className={`${styles.button} ${props.classname}`}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};

export default BurgerButton;
