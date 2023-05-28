import ReactDOM from 'react-dom';

import styles from './modal.module.scss';

const Backdrop = (props) => {
	return <div className={styles.backdrop} onClick={props.onClick}></div>;
};

const ModalOverlay = (props) => {
	return (
		<div className={`${styles.modal} ${props.small ? styles.small : ''}`}>
			<>{props.children}</>
		</div>
	);
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
	return (
		<>
			{ReactDOM.createPortal(
				<Backdrop onClick={props.onClose} />,
				portalElement
			)}
			{ReactDOM.createPortal(
				<ModalOverlay small={props.small}>{props.children}</ModalOverlay>,
				portalElement
			)}
		</>
	);
};

export default Modal;
