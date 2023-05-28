import styles from './input.module.scss';

const Input = (props) => {
	const { id, label, addclass, hasError, errorText, ...otherProps } = props;

	return (
		<div className={`${styles.group} ${addclass} `}>
			<input
				{...otherProps}
				className={`${styles['form-input']} ${
					hasError && styles['form-input--error']
				}`}
			/>

			{label && (
				<label
					htmlFor={id}
					className={`${
						props.value && props.value.length ? styles.shrink : ''
					} ${styles['form-input-label']} ${
						hasError && styles['form-input-label--error']
					}`}
				>
					{label}
				</label>
			)}
			{hasError && <p className={styles.error}>{errorText}</p>}
		</div>
	);
};

export default Input;
